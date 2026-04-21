import { cn } from '@/lib/utils'

interface LeadScoreBadgeProps {
  score: number
  className?: string
}

export function LeadScoreBadge({ score, className }: LeadScoreBadgeProps) {
  const color =
    score >= 70 ? 'var(--crm-success)' :
    score >= 40 ? 'var(--crm-warning)' :
                  'var(--crm-text-subtle)'

  return (
    <span
      className={cn('inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold text-white', className)}
      style={{ background: color }}
      title={`Score: ${score}`}
    >
      {score}
    </span>
  )
}
