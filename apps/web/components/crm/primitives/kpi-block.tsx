import { cn } from '@/lib/utils'

interface KPIBlockProps {
  label: string
  value: string | number
  sub?: string
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export function KPIBlock({ label, value, sub, trend, className }: KPIBlockProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-xs font-medium text-[var(--crm-text-muted)] uppercase tracking-wide">
        {label}
      </span>
      <span className="text-2xl font-bold text-[var(--crm-text)] leading-none">
        {value}
      </span>
      {sub && (
        <span className={cn(
          'text-xs font-medium',
          trend === 'up'   && 'text-[var(--crm-success)]',
          trend === 'down' && 'text-[var(--crm-danger)]',
          (!trend || trend === 'neutral') && 'text-[var(--crm-text-subtle)]'
        )}>
          {sub}
        </span>
      )}
    </div>
  )
}
