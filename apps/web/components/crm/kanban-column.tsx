'use client'
import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import { LeadCard } from './lead-card'
import { Users } from 'lucide-react'
import type { KanbanStage, Lead } from '@/lib/crm/leads'

interface Props {
  stage: KanbanStage
  onLeadClick: (lead: Lead) => void
}

export function KanbanColumn({ stage, onLeadClick }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id })

  return (
    <div className="min-w-0">
      {/* Stage header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: stage.color }} />
        <span className="text-sm font-semibold text-[var(--crm-text)] truncate">{stage.name}</span>
        <span className="ml-auto text-xs font-semibold text-[var(--crm-text-subtle)] bg-[var(--crm-bg-paper)] px-2 py-0.5 rounded-full flex-shrink-0">
          {stage.leads.length}
        </span>
      </div>

      {/* Droppable area */}
      <div
        ref={setNodeRef}
        className={cn(
          'space-y-2 min-h-[120px] rounded-xl p-1.5 transition-all duration-150',
          isOver && 'bg-[var(--crm-accent)]/8 ring-2 ring-[var(--crm-accent)]/30 ring-dashed'
        )}
      >
        {stage.leads.map(lead => (
          <LeadCard
            key={lead.id}
            lead={lead}
            stageId={stage.id}
            onOpen={onLeadClick}
          />
        ))}

        {stage.leads.length === 0 && (
          <div className={cn(
            'flex flex-col items-center justify-center h-20 rounded-xl border-2 border-dashed transition-colors',
            isOver
              ? 'border-[var(--crm-accent)]/40 bg-[var(--crm-accent)]/5'
              : 'border-[var(--crm-border)]'
          )}>
            <Users className="w-4 h-4 mb-1 text-[var(--crm-text-subtle)]" />
            <span className="text-xs text-[var(--crm-text-subtle)]">Solte aqui</span>
          </div>
        )}
      </div>
    </div>
  )
}
