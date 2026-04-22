'use client'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Mail, FileText, MessageSquare, Calendar, Clock, Plus, Edit2, Check, ArrowRightLeft } from 'lucide-react'
import { GlassCard } from './primitives/glass-card'
import { TemperatureChip } from './primitives/temperature-chip'
import { LeadScoreBadge } from './primitives/lead-score-badge'
import type { Lead, LeadActivity, KanbanStage } from '@/lib/crm/leads'

const activityIcons: Record<string, React.ElementType> = {
  note: FileText,
  call: Phone,
  email: Mail,
  whatsapp: MessageSquare,
  appointment: Calendar,
  stage_change: Clock,
  score_change: Clock,
  assignment: Clock,
  system: Clock,
}

const activityLabels: Record<string, string> = {
  note: 'Nota',
  call: 'Ligação',
  email: 'E-mail',
  whatsapp: 'WhatsApp',
  appointment: 'Agendamento',
  stage_change: 'Mudança de etapa',
  system: 'Sistema',
}

interface Props {
  lead: Lead | null
  stages: KanbanStage[]
  onClose: () => void
  onUpdate: () => void
}

export function LeadDrawer({ lead, stages, onClose, onUpdate }: Props) {
  const queryClient = useQueryClient()
  const [noteText, setNoteText] = useState('')
  const [savingNote, setSavingNote] = useState(false)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [movingStage, setMovingStage] = useState(false)

  const { data: activities } = useQuery({
    queryKey: ['lead-activities', lead?.id],
    queryFn: async () => {
      const res = await fetch(`/api/crm/leads/${lead!.id}/activities`)
      if (!res.ok) return []
      return (await res.json()).data as LeadActivity[]
    },
    enabled: !!lead?.id,
    staleTime: 10_000,
  })

  const { data: detail } = useQuery({
    queryKey: ['lead-detail', lead?.id],
    queryFn: async () => {
      const res = await fetch(`/api/crm/leads/${lead!.id}`)
      if (!res.ok) return null
      return (await res.json()).data as Lead
    },
    enabled: !!lead?.id,
    staleTime: 10_000,
  })

  const current = detail ?? lead

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  async function addNote() {
    if (!noteText.trim() || !lead?.id) return
    setSavingNote(true)
    try {
      await fetch(`/api/crm/leads/${lead.id}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'note', body: noteText }),
      })
      setNoteText('')
      queryClient.invalidateQueries({ queryKey: ['lead-activities', lead.id] })
    } finally {
      setSavingNote(false)
    }
  }

  async function saveField(field: string) {
    if (!lead?.id) return
    await fetch(`/api/crm/leads/${lead.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: editValue }),
    })
    queryClient.invalidateQueries({ queryKey: ['lead-detail', lead.id] })
    onUpdate()
    setEditingField(null)
  }

  async function updateTemperature(temp: string) {
    if (!lead?.id) return
    await fetch(`/api/crm/leads/${lead.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ temperature: temp }),
    })
    queryClient.invalidateQueries({ queryKey: ['lead-detail', lead.id] })
    onUpdate()
  }

  async function moveToStage(stageId: string) {
    if (!lead?.id || stageId === current?.stage_id) return
    setMovingStage(true)
    try {
      await fetch(`/api/crm/leads/${lead.id}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage_id: stageId }),
      })
      queryClient.invalidateQueries({ queryKey: ['lead-detail', lead.id] })
      onUpdate()
    } finally {
      setMovingStage(false)
    }
  }

  function startEdit(field: string, value: string) {
    setEditingField(field)
    setEditValue(value ?? '')
  }

  function fmt(str: string) {
    return new Date(str).toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
    })
  }

  const statusLabel: Record<string, string> = {
    open: 'Aberto', won: 'Ganho', lost: 'Perdido', archived: 'Arquivado',
  }

  return (
    <AnimatePresence>
      {lead && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-[var(--crm-bg-elevated)] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-[var(--crm-border)]">
              <div className="min-w-0 pr-3 flex-1">
                {editingField === 'name' ? (
                  <div className="flex items-center gap-2">
                    <input
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && saveField('name')}
                      autoFocus
                      className="flex-1 px-2 py-1 rounded-lg border border-[var(--crm-accent)]/40 bg-[var(--crm-bg)] text-[var(--crm-text)] text-base font-bold focus:outline-none"
                    />
                    <button onClick={() => saveField('name')} className="text-[var(--crm-success)]">
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit('name', current?.name ?? '')}
                    className="group flex items-center gap-1.5 text-left"
                  >
                    <h2 className="text-base font-bold text-[var(--crm-text)] truncate">{current?.name}</h2>
                    <Edit2 className="w-3 h-3 text-[var(--crm-text-subtle)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </button>
                )}
                {current?.phone && (
                  <a href={`tel:${current.phone}`} className="text-sm text-[var(--crm-accent)] hover:underline">
                    {current.phone}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {current && <LeadScoreBadge score={current.score} />}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-[var(--crm-bg-paper)] transition-colors"
                >
                  <X className="w-4 h-4 text-[var(--crm-text-muted)]" />
                </button>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Status chips */}
              {current && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--crm-bg-paper)] text-[var(--crm-text-muted)] font-medium">
                    {statusLabel[current.status] ?? current.status}
                  </span>
                  {current.vehicle_interest_type && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--crm-accent)]/10 text-[var(--crm-accent)] font-medium">
                      {current.vehicle_interest_type}
                    </span>
                  )}
                </div>
              )}

              {/* Temperature selector */}
              {current && (
                <div>
                  <p className="text-xs font-semibold text-[var(--crm-text-subtle)] uppercase tracking-wide mb-2">Temperatura</p>
                  <div className="flex gap-2">
                    {(['cold', 'warm', 'hot'] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => updateTemperature(t)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          current.temperature === t
                            ? 'bg-[var(--crm-text)] text-[var(--crm-bg)]'
                            : 'bg-[var(--crm-bg-paper)] text-[var(--crm-text-muted)] hover:bg-[var(--crm-border)]'
                        }`}
                      >
                        <TemperatureChip value={t} className="pointer-events-none" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Move stage */}
              {current && stages.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-[var(--crm-text-subtle)] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    Mover Etapa
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {stages.map(stage => {
                      const isCurrent = stage.id === current.stage_id
                      return (
                        <button
                          key={stage.id}
                          onClick={() => moveToStage(stage.id)}
                          disabled={isCurrent || movingStage}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                            isCurrent
                              ? 'bg-[var(--crm-accent)]/15 text-[var(--crm-accent)] cursor-default ring-1 ring-[var(--crm-accent)]/30'
                              : 'bg-[var(--crm-bg-paper)] text-[var(--crm-text-muted)] hover:bg-[var(--crm-bg-elevated)] hover:text-[var(--crm-text)] disabled:opacity-50'
                          }`}
                        >
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: stage.color }} />
                          <span className="flex-1 truncate">{stage.name}</span>
                          {isCurrent && (
                            <span className="text-xs opacity-70 flex-shrink-0">atual</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Contact details */}
              {current && (
                <GlassCard className="p-4 space-y-2.5">
                  <p className="text-xs font-semibold text-[var(--crm-text-subtle)] uppercase tracking-wide">Contato</p>
                  {/* Email */}
                  {editingField === 'email' ? (
                    <div className="flex items-center gap-2">
                      <input
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        type="email"
                        autoFocus
                        className="flex-1 px-2 py-1 rounded-lg border border-[var(--crm-accent)]/40 bg-[var(--crm-bg)] text-[var(--crm-text)] text-sm focus:outline-none"
                      />
                      <button onClick={() => saveField('email')} className="text-[var(--crm-success)]"><Check className="w-4 h-4" /></button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit('email', current.email ?? '')}
                      className="group flex items-center gap-2 text-sm text-[var(--crm-text-muted)] hover:text-[var(--crm-accent)] transition-colors w-full text-left"
                    >
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{current.email || 'Adicionar e-mail...'}</span>
                      <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-60 ml-auto flex-shrink-0" />
                    </button>
                  )}
                  {/* Notes summary */}
                  {editingField === 'notes_summary' ? (
                    <div className="space-y-2">
                      <textarea
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        rows={3}
                        autoFocus
                        className="w-full px-2 py-1.5 rounded-lg border border-[var(--crm-accent)]/40 bg-[var(--crm-bg)] text-[var(--crm-text)] text-sm resize-none focus:outline-none"
                      />
                      <button onClick={() => saveField('notes_summary')} className="flex items-center gap-1 text-xs text-[var(--crm-success)]">
                        <Check className="w-3 h-3" /> Salvar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit('notes_summary', current.notes_summary ?? '')}
                      className="group w-full text-left text-sm text-[var(--crm-text-muted)] hover:text-[var(--crm-text)] transition-colors"
                    >
                      {current.notes_summary || <span className="italic opacity-60">Adicionar notas...</span>}
                    </button>
                  )}
                </GlassCard>
              )}

              {/* Add note */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[var(--crm-text-subtle)] uppercase tracking-wide">Nova Nota</p>
                <textarea
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addNote()
                  }}
                  placeholder="Adicionar nota... (Cmd+Enter para salvar)"
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--crm-border)] bg-[var(--crm-bg)] text-[var(--crm-text)] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--crm-accent)]/30"
                />
                <button
                  onClick={addNote}
                  disabled={!noteText.trim() || savingNote}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--crm-accent)] text-white text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {savingNote ? 'Salvando...' : 'Salvar Nota'}
                </button>
              </div>

              {/* Activity feed */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[var(--crm-text-subtle)] uppercase tracking-wide">
                  Atividades ({activities?.length ?? 0})
                </p>
                {(activities ?? []).map(activity => {
                  const Icon = activityIcons[activity.kind] ?? FileText
                  return (
                    <div key={activity.id} className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-[var(--crm-bg-paper)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-[var(--crm-text-muted)]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-[var(--crm-text-subtle)]">
                          {activityLabels[activity.kind] ?? activity.kind}
                        </p>
                        {activity.body && (
                          <p className="text-sm text-[var(--crm-text)] mt-0.5">{activity.body}</p>
                        )}
                        <p className="text-xs text-[var(--crm-text-subtle)] mt-0.5">{fmt(activity.created_at)}</p>
                      </div>
                    </div>
                  )
                })}
                {(!activities || activities.length === 0) && (
                  <p className="text-sm text-[var(--crm-text-subtle)] italic">Sem atividades ainda.</p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
