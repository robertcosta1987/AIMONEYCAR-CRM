import { cn } from '@/lib/utils'

type Temperature = 'hot' | 'warm' | 'cold'

const labels: Record<Temperature, string> = { hot: 'Quente', warm: 'Morno', cold: 'Frio' }

interface TemperatureChipProps {
  value: Temperature
  className?: string
}

export function TemperatureChip({ value, className }: TemperatureChipProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white',
      value === 'hot'  && 'bg-[var(--crm-hot)]',
      value === 'warm' && 'bg-[var(--crm-warm)]',
      value === 'cold' && 'bg-[var(--crm-cold)]',
      className
    )}>
      {value === 'hot' ? '🔥' : value === 'warm' ? '☀️' : '❄️'} {labels[value]}
    </span>
  )
}
