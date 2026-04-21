import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
export const dynamic = 'force-dynamic'

async function getAuthorizedWorkflow(supabase: any, user: any, id: string) {
  const { data: profile } = await supabase.from('users').select('dealership_id').eq('id', user.id).single()
  if (!profile?.dealership_id) return null
  const { data } = await supabase.from('workflows').select('*').eq('id', id).eq('dealership_id', profile.dealership_id).single()
  return data
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const wf = await getAuthorizedWorkflow(supabase, user, params.id)
  if (!wf) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(wf)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const wf = await getAuthorizedWorkflow(supabase, user, params.id)
  if (!wf) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await req.json()
  const allowed = ['name', 'description', 'is_active', 'trigger_type', 'trigger_config', 'actions']
  const update: Record<string, any> = {}
  for (const key of allowed) {
    if (key in body) update[key] = body[key]
  }

  const { data, error } = await supabase.from('workflows').update(update).eq('id', params.id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const wf = await getAuthorizedWorkflow(supabase, user, params.id)
  if (!wf) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { error } = await supabase.from('workflows').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
