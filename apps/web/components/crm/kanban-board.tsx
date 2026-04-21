'use client'
import { useState, useCallback } from 'react'
import {
  DndContext, DragEndEvent, DragOverlay, DragStartEvent,
  PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { KanbanColumn } from './kanban-column'
import { LeadCard } from './lead-card'
import { LeadDrawer } from './lead-drawer'
import { LeadForm } from './lead-form'
import { GlassCard } from './primitives/glass-card'
import { KPIBlock } from './primitives/kpi-block'
import { Plus, RefreshCw } from 'lucide-react'
import type { Lead, KanbanStage } from '@/lib/crm/leads'

async function fetchPipeline() {
  const res = await fetch('/api/crm/pipeline')
  if (!res.ok) throw new Error('Failed')
  return (await res.json()).data.pipeline as { name: string; stages: KanbanStage[] }
}

export function KanbanBoard() {
  const queryClient = useQueryClient()
  const [dragLead, setDragLead] = useState<Lead | null>(null)
  const [dragStageId, setDragStageId] = useState<string>('')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const { data: pipeline, isLoading, error, refetch } = useQuery({
    queryKey: ['crm-pipeline'],
    queryFn: fetchPipeline,
    staleTime: 5_000,
    refetchInterval: 60_000,
  })

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setDragLead(event.active.data.current?.lead ?? null)
    setDragStageId(event.active.data.current?.stageId ?? '')
  }, [])

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const lead = dragLead
    setDragLead(null)
    setDragStageId('')

    const { over } = event
    if (!over || !lead || over.id === dragStageId) return

    const toStageId = over.id as string

    // Optimistic update
    queryClient.setQueryData(['crm-pipeline'], (old: typeof pipeline) => {
      if (!old) return old
      return {
        ...old,
        stages: old.stages.map(stage => {
          if (stage.id === dragStageId) {
            return { ...stage, leads: stage.leads.filter(l => l.id !== lead.id) }
          }
          if (stage.id === toStageId) {
            return { ...stage, leads: [{ ...lead, stage_id: toStageId }, ...stage.leads] }
          }
          return stage
        }),
      }
    })

    try {
      const res = await fetch(`/api/crm/leads/${lead.id}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage_id: toStageId }),
      })
      if (!res.ok) throw new Error('Failed to move lead')
    } catch {
      queryClient.invalidateQueries({ queryKey: ['crm-pipeline'] })
    }
  }, [dragLead, dragStageId, queryClient])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[var(--crm-accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !pipeline) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <p className="text-[var(--crm-danger)]">Erro ao carregar o pipeline.</p>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-1.5 text-sm text-[var(--crm-accent)] hover:underline"
        >
          <RefreshCw className="w-4 h-4" /> Tentar novamente
        </button>
      </div>
    )
  }

  const stages = pipeline.stages
  const totalLeads = stages.reduce((n, s) => n + s.leads.length, 0)
  const hotLeads = stages.flatMap(s => s.leads).filter(l => l.temperature === 'hot').length
  const activeStages = stages.filter(s => !s.is_terminal_won && !s.is_terminal_lost)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--crm-text)]">Pipeline de Vendas</h1>
          <p className="text-sm text-[var(--crm-text-muted)] mt-0.5">{pipeline.name}</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--crm-accent)] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Novo Lead
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <KPIBlock label="Leads Ativos" value={totalLeads} />
        </GlassCard>
        <GlassCard className="p-4">
          <KPIBlock
            label="Quentes"
            value={hotLeads}
            sub={hotLeads > 0 ? 'precisam de atenção' : undefined}
            trend={hotLeads > 0 ? 'up' : 'neutral'}
          />
        </GlassCard>
        <GlassCard className="p-4">
          <KPIBlock label="Etapas Ativas" value={activeStages.length} />
        </GlassCard>
        <GlassCard className="p-4">
          <KPIBlock
            label="Taxa de Conclusão"
            value={
              totalLeads > 0
                ? `${Math.round((stages.find(s => s.is_terminal_won)?.leads.length ?? 0) / Math.max(totalLeads, 1) * 100)}%`
                : '—'
            }
          />
        </GlassCard>
      </div>

      {/* Kanban */}
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map(stage => (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              onLeadClick={setSelectedLead}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={{ duration: 150, easing: 'ease' }}>
          {dragLead && (
            <LeadCard
              lead={dragLead}
              stageId={dragStageId}
              onOpen={() => {}}
              isDragOverlay
            />
          )}
        </DragOverlay>
      </DndContext>

      {/* Lead detail drawer */}
      <LeadDrawer
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdate={() => queryClient.invalidateQueries({ queryKey: ['crm-pipeline'] })}
      />

      {/* Create lead modal */}
      {showCreate && (
        <LeadForm
          stages={stages}
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false)
            queryClient.invalidateQueries({ queryKey: ['crm-pipeline'] })
          }}
        />
      )}
    </div>
  )
}
