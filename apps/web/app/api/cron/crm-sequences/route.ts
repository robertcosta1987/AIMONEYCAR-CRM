import { NextResponse } from 'next/server'
import { processSequenceEnrollments } from '@/lib/crm/sequences'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization')
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await processSequenceEnrollments()
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    console.error('[crm-sequences cron]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
