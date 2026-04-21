import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { stage_id } = await req.json()
    if (!stage_id) return NextResponse.json({ error: 'stage_id required' }, { status: 400 })

    const { data: existing } = await supabase
      .from('leads')
      .select('stage_id, dealership_id, pipeline_stages(name)')
      .eq('id', params.id)
      .single()

    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const { data: newStage } = await supabase
      .from('pipeline_stages')
      .select('name, is_terminal_won, is_terminal_lost, default_probability')
      .eq('id', stage_id)
      .single()

    const updates: Record<string, unknown> = {
      stage_id,
      last_activity_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    if (newStage?.is_terminal_won) {
      updates.status = 'won'
      updates.closed_at = new Date().toISOString()
    } else if (newStage?.is_terminal_lost) {
      updates.status = 'lost'
      updates.closed_at = new Date().toISOString()
    }

    const { data: lead, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    await supabase.from('lead_activities').insert({
      dealership_id: existing.dealership_id,
      lead_id: params.id,
      kind: 'stage_change',
      body: `Movido para: ${newStage?.name ?? stage_id}`,
      metadata: {
        from_stage_id: existing.stage_id,
        from_stage_name: (existing.pipeline_stages as any)?.name,
        to_stage_id: stage_id,
        to_stage_name: newStage?.name,
      },
      created_by_user_id: user.id,
    })

    return NextResponse.json({ data: lead })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
