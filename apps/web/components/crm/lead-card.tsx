'use client'
import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import { GlassCard } from './primitives/glass-card'
import { TemperatureChip } from './primitives/temperature-chip'
import { LeadScoreBadge } from './primitives/lead-score-badge'
import { Clock } from 'lucide-react'
import type { Lead } from '@/lib/crm/leads'

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return '—'
  const diff = Date.now() - new Date(dateStr).getTime()
  const hours = Math.floor(diff / 3_600_000)
  if (hours < 1) return 'agora'
  if (hours < 24) return `${hours}h atrás`
  return `${Math.floor(hours / 24)}d atrás`
}

interface Props {
  lead: Lead
  stageId: string
  onOpen: (lead: Lead) => void
  isDragOverlay?: boolean
}

export function LeadCard({ lead, stageId, onOpen, isDragOverlay }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
    data: { lead, stageId },
    disabled: isDragOverlay,
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <GlassCard
        className={cn(
          'p-3 cursor-grab active:cursor-grabbing select-none transition-all',
          isDragging && 'opacity-30',
          isDragOverlay && 'shadow-xl rotate-1 cursor-grabbing opacity-100 scale-105'
        )}
        onClick={() => { if (!isDragging) onOpen(lead) }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[var(--crm-text)] truncate">{lead.name}</p>
            {lead.phone && (
              <p className="text-xs text-[var(--crm-text-subtle)] truncate">{lead.phone}</p>
            )}
          </div>
          <LeadScoreBadge score={lead.score} className="flex-shrink-0" />
        </div>
        <div className="flex items-center justify-between mt-2 gap-2">
          <TemperatureChip value={lead.temperature} />
          <span className="flex items-center gap-1 text-xs text-[var(--crm-text-subtle)] flex-shrink-0">
            <Clock className="w-3 h-3" />
            {timeAgo(lead.last_activity_at ?? lead.created_at)}
          </span>
        </div>
      </GlassCard>
    </div>
  )
}
