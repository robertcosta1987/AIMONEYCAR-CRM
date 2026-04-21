import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function svc() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// Delay in days per repurchase step
const STEP_DELAYS = [30, 90, 180]

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization')
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = svc()
  let processed = 0

  try {
    const { data: cadences } = await supabase
      .from('repurchase_cadences')
      .select('id, sale_id, customer_id, step, dealership_id, sales(lead_id)')
      .eq('status', 'active')
      .lte('next_touch_at', new Date().toISOString())
      .limit(50)

    for (const cadence of cadences ?? []) {
      try {
        const leadId = (cadence.sales as any)?.lead_id

        if (leadId) {
          await supabase.from('lead_activities').insert({
            dealership_id: cadence.dealership_id,
            lead_id: leadId,
            kind: 'system',
            body: `Lembrete de recompra — Passo ${cadence.step}`,
            metadata: { cadence_id: cadence.id, step: cadence.step },
          })
        }

        const nextStep = cadence.step + 1
        if (nextStep > STEP_DELAYS.length) {
          await supabase
            .from('repurchase_cadences')
            .update({ status: 'done', updated_at: new Date().toISOString() })
            .eq('id', cadence.id)
        } else {
          const nextTouch = new Date()
          nextTouch.setDate(nextTouch.getDate() + STEP_DELAYS[nextStep - 1])
          await supabase
            .from('repurchase_cadences')
            .update({
              step: nextStep,
              next_touch_at: nextTouch.toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('id', cadence.id)
        }

        processed++
      } catch {
        // continue processing remaining cadences
      }
    }

    return NextResponse.json({ ok: true, processed })
  } catch (err) {
    console.error('[crm-repurchase cron]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
