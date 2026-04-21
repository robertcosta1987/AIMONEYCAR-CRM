import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { computeScore } from '@/lib/crm/scoring'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: lead, error } = await supabase
      .from('leads')
      .select(`
        *,
        pipeline_stages(id, name, color, position),
        lead_vehicle_interest(
          id, vehicle_id, source, ai_score,
          vehicles(id, brand, model, year_model, price)
        )
      `)
      .eq('id', params.id)
      .single()

    if (error || !lead) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json({ data: lead })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { status, ...updates } = body

    const extra: Record<string, unknown> = {}
    if (status === 'won' || status === 'lost') {
      extra.closed_at = new Date().toISOString()
    }
    if (status) extra.status = status

    if (updates.temperature || updates.phone || updates.email) {
      const { data: existing } = await supabase
        .from('leads')
        .select('*')
        .eq('id', params.id)
        .single()
      if (existing) {
        extra.score = computeScore({ ...existing, ...updates })
      }
    }

    const { data: lead, error } = await supabase
      .from('leads')
      .update({ ...updates, ...extra, updated_at: new Date().toISOString() })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data: lead })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
