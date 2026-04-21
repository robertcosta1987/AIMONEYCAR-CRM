import { cn } from '@/lib/utils'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'bg-[var(--crm-bg-elevated)] border border-[var(--crm-border)] rounded-2xl shadow-sm',
        hover && 'transition-shadow duration-200 hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
