'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import type { KanbanStage } from '@/lib/crm/leads'

interface Props {
  stages: KanbanStage[]
  defaultStageId?: string
  onClose: () => void
  onCreated: () => void
}

export function LeadForm({ stages, defaultStageId, onClose, onCreated }: Props) {
  const activeStages = stages.filter(s => !s.is_terminal_won && !s.is_terminal_lost)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    stage_id: defaultStageId ?? activeStages[0]?.id ?? '',
    temperature: 'cold',
    vehicle_interest_type: '',
    source: 'manual',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.stage_id) {
      setError('Nome e etapa são obrigatórios.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const j = await res.json()
        throw new Error(j.error ?? 'Erro ao criar lead')
      }
      onCreated()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-3 py-2 rounded-xl border border-[var(--crm-border)] bg-[var(--crm-bg)] text-[var(--crm-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--crm-accent)]/30'
  const labelClass = 'block text-xs font-semibold text-[var(--crm-text-muted)] uppercase tracking-wide mb-1'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[var(--crm-bg-elevated)] rounded-2xl shadow-2xl p-6 z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[var(--crm-text)]">Novo Lead</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[var(--crm-bg-paper)] transition-colors"
          >
            <X className="w-4 h-4 text-[var(--crm-text-muted)]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Nome *</label>
            <input value={form.name} onChange={set('name')} placeholder="Nome do lead" required className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Telefone</label>
              <input value={form.phone} onChange={set('phone')} placeholder="+55 11 9..." type="tel" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>E-mail</label>
              <input value={form.email} onChange={set('email')} placeholder="email@..." type="email" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Etapa *</label>
              <select value={form.stage_id} onChange={set('stage_id')} required className={inputClass}>
                {activeStages.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Temperatura</label>
              <select value={form.temperature} onChange={set('temperature')} className={inputClass}>
                <option value="cold">❄️ Frio</option>
                <option value="warm">☀️ Morno</option>
                <option value="hot">🔥 Quente</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Interesse de Veículo</label>
            <input
              value={form.vehicle_interest_type}
              onChange={set('vehicle_interest_type')}
              placeholder="Ex: SUV, Sedan, Hatch..."
              className={inputClass}
            />
          </div>

          {error && <p className="text-sm text-[var(--crm-danger)]">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[var(--crm-border)] text-sm font-medium text-[var(--crm-text-muted)] hover:bg-[var(--crm-bg-paper)] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-[var(--crm-accent)] text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Criando...' : 'Criar Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
