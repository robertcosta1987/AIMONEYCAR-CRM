import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: userRow } = await supabase
      .from('users')
      .select('dealership_id')
      .eq('id', user.id)
      .single()

    if (!userRow?.dealership_id) {
      return NextResponse.json({ error: 'No dealership' }, { status: 403 })
    }

    const { data: pipeline } = await supabase
      .from('pipelines')
      .select('id, name, pipeline_stages(id, name, position, color, default_probability, is_terminal_won, is_terminal_lost)')
      .eq('dealership_id', userRow.dealership_id)
      .eq('is_default', true)
      .single()

    if (!pipeline) {
      return NextResponse.json({ error: 'Pipeline not found' }, { status: 404 })
    }

    const stages = (pipeline.pipeline_stages as any[]).sort((a, b) => a.position - b.position)

    const leadsPerStage = await Promise.all(
      stages.map(async (stage) => {
        const { data: leads } = await supabase
          .from('leads')
          .select('id, name, phone, score, temperature, status, last_activity_at, created_at')
          .eq('stage_id', stage.id)
          .eq('status', 'open')
          .order('last_activity_at', { ascending: false })
          .limit(50)
        return { ...stage, leads: leads ?? [] }
      })
    )

    return NextResponse.json({ data: { pipeline: { ...pipeline, stages: leadsPerStage } } })
  } catch (err) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
