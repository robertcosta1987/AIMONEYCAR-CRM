import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { computeScore } from '@/lib/crm/scoring'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') ?? 'open'
    const stageId = searchParams.get('stage_id')
    const limit = Math.min(Number(searchParams.get('limit') ?? '100'), 500)

    let query = supabase
      .from('leads')
      .select('*')
      .eq('status', status)
      .order('last_activity_at', { ascending: false })
      .limit(limit)

    if (stageId) query = query.eq('stage_id', stageId)

    const { data: leads, error } = await query
    if (error) throw error

    return NextResponse.json({ data: leads })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: userRow } = await supabase
      .from('users')
      .select('dealership_id')
      .eq('id', user.id)
      .single()
    if (!userRow?.dealership_id) return NextResponse.json({ error: 'No dealership' }, { status: 403 })

    const body = await req.json()
    const { name, phone, email, stage_id, source = 'manual', ...rest } = body

    if (!name || !stage_id) {
      return NextResponse.json({ error: 'name and stage_id are required' }, { status: 400 })
    }

    const score = computeScore({ phone, email, temperature: rest.temperature ?? 'cold', ...rest })

    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        dealership_id: userRow.dealership_id,
        name,
        phone: phone || null,
        email: email || null,
        stage_id,
        source,
        score,
        status: 'open',
        temperature: rest.temperature ?? 'cold',
        vehicle_interest_type: rest.vehicle_interest_type || null,
        last_activity_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    await supabase.from('lead_activities').insert({
      dealership_id: userRow.dealership_id,
      lead_id: lead.id,
      kind: 'system',
      body: 'Lead criado',
      metadata: { source },
      created_by_user_id: user.id,
    })

    return NextResponse.json({ data: lead }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
