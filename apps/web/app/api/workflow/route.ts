import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('users').select('dealership_id').eq('id', user.id).single()
  if (!profile?.dealership_id) return NextResponse.json([], { status: 200 })

  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('dealership_id', profile.dealership_id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('users').select('dealership_id').eq('id', user.id).single()
  if (!profile?.dealership_id) return NextResponse.json({ error: 'No dealership' }, { status: 400 })

  const body = await req.json()
  const { name, description, trigger_type, trigger_config, actions } = body

  if (!name || !trigger_type) return NextResponse.json({ error: 'name and trigger_type required' }, { status: 400 })

  const { data, error } = await supabase.from('workflows').insert({
    dealership_id: profile.dealership_id,
    name,
    description: description || null,
    trigger_type,
    trigger_config: trigger_config ?? {},
    actions: actions ?? [],
    is_active: true,
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
