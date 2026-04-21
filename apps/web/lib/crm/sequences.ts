import { createClient } from '@supabase/supabase-js'

function svc() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function processSequenceEnrollments(): Promise<{ processed: number; errors: number }> {
  const supabase = svc()
  let processed = 0
  let errors = 0

  const { data: enrollments } = await supabase
    .from('sequence_enrollments')
    .select('id, lead_id, sequence_id, current_step, dealership_id, sequences(name, channel)')
    .eq('status', 'active')
    .lte('next_run_at', new Date().toISOString())
    .limit(100)

  if (!enrollments?.length) return { processed, errors }

  for (const enrollment of enrollments) {
    try {
      const { data: step } = await supabase
        .from('sequence_steps')
        .select('*')
        .eq('sequence_id', enrollment.sequence_id)
        .eq('position', enrollment.current_step)
        .single()

      if (!step) {
        await supabase
          .from('sequence_enrollments')
          .update({ status: 'completed', updated_at: new Date().toISOString() })
          .eq('id', enrollment.id)
        processed++
        continue
      }

      await supabase.from('lead_activities').insert({
        dealership_id: enrollment.dealership_id,
        lead_id: enrollment.lead_id,
        kind: step.channel === 'email' ? 'email' : 'whatsapp',
        direction: 'outbound',
        body: `Sequência: ${(enrollment.sequences as any)?.name} — Passo ${enrollment.current_step + 1}`,
        metadata: { sequence_id: enrollment.sequence_id, step_id: step.id, template: step.template },
      })

      const { data: nextStep } = await supabase
        .from('sequence_steps')
        .select('id')
        .eq('sequence_id', enrollment.sequence_id)
        .eq('position', enrollment.current_step + 1)
        .single()

      if (nextStep) {
        const nextRun = new Date()
        nextRun.setHours(nextRun.getHours() + step.delay_hours)
        await supabase
          .from('sequence_enrollments')
          .update({
            current_step: enrollment.current_step + 1,
            next_run_at: nextRun.toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', enrollment.id)
      } else {
        await supabase
          .from('sequence_enrollments')
          .update({ status: 'completed', updated_at: new Date().toISOString() })
          .eq('id', enrollment.id)
      }

      processed++
    } catch {
      errors++
    }
  }

  return { processed, errors }
}
