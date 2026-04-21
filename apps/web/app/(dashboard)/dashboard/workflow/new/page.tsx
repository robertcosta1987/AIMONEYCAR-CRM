'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Plus, Trash2, GripVertical, Zap, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type ActionType = 'send_whatsapp' | 'send_email' | 'create_task' | 'move_stage' | 'wait'

type Action = {
  id: string
  type: ActionType
  delay_hours: number
  config: Record<string, any>
}

const TRIGGER_OPTIONS = [
  { value: 'lead_created',        label: 'Novo Lead criado' },
  { value: 'stage_changed',       label: 'Lead mudou de etapa' },
  { value: 'no_activity',         label: 'Sem atividade por X dias' },
  { value: 'temperature_changed', label: 'Temperatura alterada' },
  { value: 'lead_won',            label: 'Lead ganho' },
  { value: 'lead_lost',           label: 'Lead perdido' },
]

const ACTION_OPTIONS: { value: ActionType; label: string; icon: string }[] = [
  { value: 'send_whatsapp', label: 'Enviar WhatsApp', icon: '💬' },
  { value: 'send_email',    label: 'Enviar E-mail',   icon: '📧' },
  { value: 'create_task',   label: 'Criar Tarefa',    icon: '✅' },
  { value: 'move_stage',    label: 'Mover de Etapa',  icon: '➡️' },
  { value: 'wait',          label: 'Aguardar',        icon: '⏳' },
]

const TEMPLATE_DEFAULTS: Record<string, Partial<{ trigger: string; actions: Omit<Action, 'id'>[] }>> = {
  no_activity: {
    trigger: 'no_activity',
    actions: [
      { type: 'wait', delay_hours: 24, config: {} },
      { type: 'send_whatsapp', delay_hours: 0, config: { message: 'Olá {{nome}}, tudo bem? Fiquei pensando em você — ainda tem interesse no {{veiculo}}? Posso te ajudar!' } },
    ],
  },
  lead_created: {
    trigger: 'lead_created',
    actions: [
      { type: 'send_whatsapp', delay_hours: 0, config: { message: 'Olá {{nome}}! Aqui é da {{loja}}. Vi que você tem interesse em um veículo — posso te ajudar a encontrar a melhor opção?' } },
    ],
  },
  temperature_changed: {
    trigger: 'temperature_changed',
    actions: [
      { type: 'wait', delay_hours: 48, config: {} },
      { type: 'send_whatsapp', delay_hours: 0, config: { message: 'Olá {{nome}}, faz um tempo que não conversamos. Você ainda está pensando em trocar de carro?' } },
      { type: 'wait', delay_hours: 72, config: {} },
      { type: 'send_whatsapp', delay_hours: 0, config: { message: '{{nome}}, temos uma oferta especial esta semana! Que tal agendar uma visita?' } },
    ],
  },
  lead_won: {
    trigger: 'lead_won',
    actions: [
      { type: 'send_whatsapp', delay_hours: 0, config: { message: 'Parabéns {{nome}}! Seja bem-vindo(a) à família {{loja}}! Qualquer dúvida sobre seu novo veículo, estou aqui. 🎉' } },
    ],
  },
}

function newAction(type: ActionType = 'send_whatsapp'): Action {
  return { id: Math.random().toString(36).slice(2), type, delay_hours: 0, config: {} }
}

function ActionCard({ action, onChange, onDelete, index }: {
  action: Action
  onChange: (id: string, patch: Partial<Action>) => void
  onDelete: (id: string) => void
  index: number
}) {
  return (
    <div className="flex gap-3 items-start">
      <div className="flex flex-col items-center gap-1 pt-3">
        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[11px] font-bold flex items-center justify-center flex-shrink-0">
          {index + 1}
        </span>
        {index > 0 && <div className="w-px h-4 bg-border" />}
      </div>
      <Card className="flex-1">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Label className="text-xs text-foreground-muted mb-1.5 block">Ação</Label>
              <select
                value={action.type}
                onChange={e => onChange(action.id, { type: e.target.value as ActionType })}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {ACTION_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.icon} {o.label}</option>
                ))}
              </select>
            </div>
            {action.type !== 'wait' && (
              <div className="w-28">
                <Label className="text-xs text-foreground-muted mb-1.5 block">Atraso (h)</Label>
                <Input
                  type="number"
                  min={0}
                  value={action.delay_hours}
                  onChange={e => onChange(action.id, { delay_hours: Number(e.target.value) })}
                  className="text-sm"
                />
              </div>
            )}
            <button
              onClick={() => onDelete(action.id)}
              className="mt-5 p-1.5 rounded-lg text-foreground-muted hover:bg-danger/10 hover:text-danger transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {action.type === 'send_whatsapp' && (
            <div>
              <Label className="text-xs text-foreground-muted mb-1.5 block">
                Mensagem <span className="font-normal">(use {`{{nome}}`}, {`{{veiculo}}`}, {`{{loja}}`})</span>
              </Label>
              <textarea
                rows={3}
                value={action.config.message ?? ''}
                onChange={e => onChange(action.id, { config: { ...action.config, message: e.target.value } })}
                placeholder="Olá {{nome}}, tudo bem? ..."
                className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          )}

          {action.type === 'send_email' && (
            <>
              <div>
                <Label className="text-xs text-foreground-muted mb-1.5 block">Assunto</Label>
                <Input
                  value={action.config.subject ?? ''}
                  onChange={e => onChange(action.id, { config: { ...action.config, subject: e.target.value } })}
                  placeholder="Novidades para você, {{nome}}!"
                  className="text-sm"
                />
              </div>
              <div>
                <Label className="text-xs text-foreground-muted mb-1.5 block">Mensagem</Label>
                <textarea
                  rows={3}
                  value={action.config.message ?? ''}
                  onChange={e => onChange(action.id, { config: { ...action.config, message: e.target.value } })}
                  className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </>
          )}

          {action.type === 'create_task' && (
            <div>
              <Label className="text-xs text-foreground-muted mb-1.5 block">Descrição da tarefa</Label>
              <Input
                value={action.config.title ?? ''}
                onChange={e => onChange(action.id, { config: { ...action.config, title: e.target.value } })}
                placeholder="Ligar para {{nome}}"
                className="text-sm"
              />
            </div>
          )}

          {action.type === 'wait' && (
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Label className="text-xs text-foreground-muted mb-1.5 block">Aguardar</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={1}
                    value={action.config.hours ?? 24}
                    onChange={e => onChange(action.id, { config: { ...action.config, hours: Number(e.target.value) } })}
                    className="text-sm w-24"
                  />
                  <span className="text-sm text-foreground-muted">horas antes da próxima ação</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function NewWorkflowForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateKey = searchParams?.get('template') ?? ''
  const template = TEMPLATE_DEFAULTS[templateKey]

  const [name, setName] = useState(template ? TRIGGER_OPTIONS.find(t => t.value === template.trigger)?.label ?? '' : '')
  const [description, setDescription] = useState('')
  const [trigger, setTrigger] = useState(template?.trigger ?? 'lead_created')
  const [triggerConfig, setTriggerConfig] = useState<Record<string, any>>({})
  const [actions, setActions] = useState<Action[]>(
    template?.actions?.map(a => ({ ...a, id: Math.random().toString(36).slice(2) })) ?? [newAction()]
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const updateAction = (id: string, patch: Partial<Action>) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, ...patch } : a))
  }

  const addAction = () => setActions(prev => [...prev, newAction()])
  const deleteAction = (id: string) => setActions(prev => prev.filter(a => a.id !== id))

  const handleSave = async () => {
    if (!name.trim()) { setError('Nome é obrigatório'); return }
    if (actions.length === 0) { setError('Adicione ao menos uma ação'); return }
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, trigger_type: trigger, trigger_config: triggerConfig, actions }),
      })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Erro ao salvar')
      router.push('/dashboard/workflow')
    } catch (e: any) {
      setError(e.message)
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/workflow" className="p-1.5 rounded-lg hover:bg-background-elevated transition-colors">
          <ArrowLeft className="w-4 h-4 text-foreground-muted" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">Nova Automação</h1>
          <p className="text-sm text-foreground-muted">Configure o gatilho e as ações</p>
        </div>
      </div>

      {/* Basic info */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Identificação</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="wf-name">Nome *</Label>
            <Input
              id="wf-name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ex: Follow-up 24h sem resposta"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="wf-desc">Descrição (opcional)</Label>
            <Input
              id="wf-desc"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="O que esta automação faz?"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Trigger */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[11px] font-bold flex items-center justify-center">🎯</span>
            Gatilho — quando disparar?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs text-foreground-muted mb-1.5 block">Evento</Label>
            <select
              value={trigger}
              onChange={e => setTrigger(e.target.value)}
              className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {TRIGGER_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {trigger === 'no_activity' && (
            <div className="flex items-center gap-3">
              <Label className="text-sm whitespace-nowrap">Disparar após</Label>
              <Input
                type="number"
                min={1}
                value={triggerConfig.days ?? 1}
                onChange={e => setTriggerConfig({ ...triggerConfig, days: Number(e.target.value) })}
                className="w-20 text-sm"
              />
              <Label className="text-sm text-foreground-muted">dia(s) sem atividade</Label>
            </div>
          )}

          {trigger === 'stage_changed' && (
            <div>
              <Label className="text-xs text-foreground-muted mb-1.5 block">Etapa de destino (deixe vazio para qualquer)</Label>
              <Input
                value={triggerConfig.to_stage_name ?? ''}
                onChange={e => setTriggerConfig({ ...triggerConfig, to_stage_name: e.target.value })}
                placeholder="Ex: Proposta"
                className="text-sm"
              />
            </div>
          )}

          {trigger === 'temperature_changed' && (
            <div>
              <Label className="text-xs text-foreground-muted mb-1.5 block">Temperatura</Label>
              <select
                value={triggerConfig.to_temperature ?? ''}
                onChange={e => setTriggerConfig({ ...triggerConfig, to_temperature: e.target.value })}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Qualquer alteração</option>
                <option value="hot">Quente 🔥</option>
                <option value="warm">Morno 🌤</option>
                <option value="cold">Frio ❄️</option>
              </select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[11px] font-bold flex items-center justify-center">⚡</span>
            Ações — o que fazer?
          </h2>
          <span className="text-xs text-foreground-muted">{actions.length} ação(ões)</span>
        </div>

        <div className="space-y-2">
          {actions.map((action, i) => (
            <ActionCard
              key={action.id}
              action={action}
              index={i}
              onChange={updateAction}
              onDelete={deleteAction}
            />
          ))}
        </div>

        <button
          onClick={addAction}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-border text-sm text-foreground-muted hover:border-primary/40 hover:text-primary transition-colors"
        >
          <Plus className="w-4 h-4" />
          Adicionar ação
        </button>
      </div>

      {/* Save */}
      {error && <p className="text-sm text-danger">{error}</p>}
      <div className="flex gap-3">
        <Button onClick={handleSave} disabled={saving} className="gap-2 flex-1">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Salvando...</> : <><Zap className="w-4 h-4" /> Salvar Automação</>}
        </Button>
        <Link href="/dashboard/workflow">
          <Button variant="outline">Cancelar</Button>
        </Link>
      </div>
    </div>
  )
}

export default function NewWorkflowPage() {
  return (
    <Suspense>
      <NewWorkflowForm />
    </Suspense>
  )
}
