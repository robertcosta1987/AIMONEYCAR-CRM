'use client'
import { useState } from 'react'
import { ChevronDown, Users, Clock } from 'lucide-react'
import { TemperatureChip } from './primitives/temperature-chip'
import { cn } from '@/lib/utils'
import type { KanbanStage, Lead } from '@/lib/crm/leads'

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return '—'
  const diff = Date.now() - new Date(dateStr).getTime()
  const hours = Math.floor(diff / 3_600_000)
  if (hours < 1) return 'agora'
  if (hours < 24) return `${hours}h`
  return `${Math.floor(hours / 24)}d`
}

interface Props {
  stage: KanbanStage
  onLeadClick: (lead: Lead) => void
  defaultOpen?: boolean
}

export function KanbanColumn({ stage, onLeadClick, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={cn(
      'rounded-xl border transition-colors',
      stage.is_terminal_won  && 'border-[var(--crm-success)]/30 bg-[var(--crm-success)]/5',
      stage.is_terminal_lost && 'border-[var(--crm-danger)]/30 bg-[var(--crm-danger)]/5',
      !stage.is_terminal_won && !stage.is_terminal_lost && 'border-[var(--crm-border)] bg-[var(--crm-bg-paper)]',
    )}>
      {/* Accordion header */}
      <button
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/5 transition-colors rounded-xl"
        onClick={() => setOpen(o => !o)}
      >
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: stage.color }} />
        <span className="flex-1 text-left text-sm font-semibold text-[var(--crm-text)]">
          {stage.name}
        </span>
        <span className={cn(
          'text-xs font-bold px-2.5 py-0.5 rounded-full flex-shrink-0',
          stage.leads.length > 0
            ? 'bg-[var(--crm-accent)]/15 text-[var(--crm-accent)]'
            : 'bg-[var(--crm-bg)] text-[var(--crm-text-subtle)]'
        )}>
          {stage.leads.length}
        </span>
        <ChevronDown className={cn(
          'w-4 h-4 text-[var(--crm-text-subtle)] transition-transform duration-200 flex-shrink-0',
          open && 'rotate-180'
        )} />
      </button>

      {/* Lead list */}
      {open && (
        <div className="border-t border-[var(--crm-border)]">
          {stage.leads.length === 0 ? (
            <div className="flex items-center justify-center gap-2 py-8 text-[var(--crm-text-subtle)]">
              <Users className="w-4 h-4" />
              <span className="text-sm">Nenhum lead nesta etapa</span>
            </div>
          ) : (
            <div className="divide-y divide-[var(--crm-border)]">
              {stage.leads.map(lead => (
                <button
                  key={lead.id}
                  onClick={() => onLeadClick(lead)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--crm-text)] truncate">{lead.name}</p>
                    {lead.phone && (
                      <p className="text-xs text-[var(--crm-text-subtle)] truncate mt-0.5">{lead.phone}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <TemperatureChip value={lead.temperature} />
                    <span className="flex items-center gap-1 text-xs text-[var(--crm-text-subtle)]">
                      <Clock className="w-3 h-3" />
                      {timeAgo(lead.last_activity_at ?? lead.created_at)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
