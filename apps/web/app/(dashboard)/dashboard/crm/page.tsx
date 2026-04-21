'use client'
import { useQuery } from '@tanstack/react-query'
import { GlassCard } from '@/components/crm/primitives/glass-card'
import { KPIBlock } from '@/components/crm/primitives/kpi-block'
import { TemperatureChip } from '@/components/crm/primitives/temperature-chip'
import { LeadScoreBadge } from '@/components/crm/primitives/lead-score-badge'
import { Users, Clock } from 'lucide-react'

type Lead = {
  id: string
  name: string
  phone: string | null
  score: number
  temperature: 'hot' | 'warm' | 'cold'
  status: string
  last_activity_at: string | null
  created_at: string
}

type Stage = {
  id: string
  name: string
  position: number
  color: string
  default_probability: number
  is_terminal_won: boolean
  is_terminal_lost: boolean
  leads: Lead[]
}

async function fetchPipeline() {
  const res = await fetch('/api/crm/pipeline')
  if (!res.ok) throw new Error('Failed to fetch pipeline')
  const json = await res.json()
  return json.data.pipeline
}

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return '—'
  const diff = Date.now() - new Date(dateStr).getTime()
  const hours = Math.floor(diff / 3_600_000)
  if (hours < 24) return `${hours}h atrás`
  return `${Math.floor(hours / 24)}d atrás`
}

export default function CRMPage() {
  const { data: pipeline, isLoading, error } = useQuery({
    queryKey: ['crm-pipeline'],
    queryFn: fetchPipeline,
    staleTime: 5_000,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[var(--crm-accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !pipeline) {
    return (
      <div className="p-8 text-[var(--crm-danger)]">
        Erro ao carregar o pipeline. Tente novamente.
      </div>
    )
  }

  const stages: Stage[] = pipeline.stages ?? []
  const totalLeads = stages.reduce((sum: number, s: Stage) => sum + s.leads.length, 0)
  const activeStages = stages.filter(s => !s.is_terminal_won && !s.is_terminal_lost)
  const hotLeads = stages.flatMap(s => s.leads).filter(l => l.temperature === 'hot').length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--crm-text)]">Pipeline de Vendas</h1>
          <p className="text-sm text-[var(--crm-text-muted)] mt-0.5">{pipeline.name}</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <KPIBlock label="Leads Ativos" value={totalLeads} />
        </GlassCard>
        <GlassCard className="p-4">
          <KPIBlock label="Leads Quentes" value={hotLeads} trend={hotLeads > 0 ? 'up' : 'neutral'} />
        </GlassCard>
        <GlassCard className="p-4">
          <KPIBlock label="Etapas" value={activeStages.length} />
        </GlassCard>
        <GlassCard className="p-4">
          <KPIBlock label="Pipeline" value={pipeline.name} />
        </GlassCard>
      </div>

      {/* Kanban */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage: Stage) => (
          <div key={stage.id} className="flex-shrink-0 w-72">
            {/* Stage header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full" style={{ background: stage.color }} />
              <span className="text-sm font-semibold text-[var(--crm-text)]">{stage.name}</span>
              <span className="ml-auto text-xs font-medium text-[var(--crm-text-subtle)] bg-[var(--crm-bg-paper)] px-2 py-0.5 rounded-full">
                {stage.leads.length}
              </span>
            </div>

            {/* Cards */}
            <div className="space-y-2 min-h-[120px]">
              {stage.leads.map((lead: Lead) => (
                <GlassCard key={lead.id} hover className="p-3 cursor-pointer">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[var(--crm-text)] truncate">{lead.name}</p>
                      {lead.phone && (
                        <p className="text-xs text-[var(--crm-text-subtle)] truncate">{lead.phone}</p>
                      )}
                    </div>
                    <LeadScoreBadge score={lead.score} />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <TemperatureChip value={lead.temperature} />
                    <span className="flex items-center gap-1 text-xs text-[var(--crm-text-subtle)]">
                      <Clock className="w-3 h-3" />
                      {timeAgo(lead.last_activity_at ?? lead.created_at)}
                    </span>
                  </div>
                </GlassCard>
              ))}

              {stage.leads.length === 0 && (
                <div className="flex flex-col items-center justify-center h-24 rounded-xl border-2 border-dashed border-[var(--crm-border)] text-[var(--crm-text-subtle)]">
                  <Users className="w-5 h-5 mb-1" />
                  <span className="text-xs">Sem leads</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
