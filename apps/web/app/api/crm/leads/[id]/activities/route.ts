import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: activities, error } = await supabase
      .from('lead_activities')
      .select('*')
      .eq('lead_id', params.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) throw error
    return NextResponse.json({ data: activities })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { kind, body: activityBody, direction, metadata } = body

    if (!kind) return NextResponse.json({ error: 'kind required' }, { status: 400 })

    const { data: lead } = await supabase
      .from('leads')
      .select('dealership_id')
      .eq('id', params.id)
      .single()

    if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 })

    const { data: activity, error } = await supabase
      .from('lead_activities')
      .insert({
        dealership_id: lead.dealership_id,
        lead_id: params.id,
        kind,
        direction: direction ?? null,
        body: activityBody ?? null,
        metadata: metadata ?? {},
        created_by_user_id: user.id,
      })
      .select()
      .single()

    if (error) throw error

    await supabase
      .from('leads')
      .update({ last_activity_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('id', params.id)

    return NextResponse.json({ data: activity }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
