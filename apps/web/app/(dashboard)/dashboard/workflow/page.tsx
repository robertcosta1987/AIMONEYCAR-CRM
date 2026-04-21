'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Plus, Zap, Play, Pause, Pencil, Trash2, ChevronRight, AlertCircle, Loader2 } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { QueryProvider } from '@/components/providers/query-provider'

type Workflow = {
  id: string
  name: string
  description: string | null
  is_active: boolean
  trigger_type: string
  trigger_config: Record<string, any>
  actions: WorkflowAction[]
  created_at: string
  executions_count?: number
}

type WorkflowAction = {
  type: 'send_whatsapp' | 'send_email' | 'create_task' | 'move_stage' | 'add_tag' | 'wait'
  config: Record<string, any>
  delay_hours?: number
}

const TRIGGER_LABELS: Record<string, string> = {
  lead_created:      'Novo Lead criado',
  stage_changed:     'Lead mudou de etapa',
  no_activity:       'Sem atividade por X dias',
  temperature_changed: 'Temperatura alterada',
  lead_won:          'Lead ganho',
  lead_lost:         'Lead perdido',
}

const ACTION_LABELS: Record<string, string> = {
  send_whatsapp: '💬 WhatsApp',
  send_email:    '📧 E-mail',
  create_task:   '✅ Tarefa',
  move_stage:    '➡️ Mover etapa',
  add_tag:       '🏷️ Tag',
  wait:          '⏳ Aguardar',
}

async function fetchWorkflows(): Promise<Workflow[]> {
  const res = await fetch('/api/workflow')
  if (!res.ok) throw new Error('Falha ao carregar')
  return res.json()
}

function WorkflowCard({ wf, onToggle, onDelete }: {
  wf: Workflow
  onToggle: (id: string, active: boolean) => void
  onDelete: (id: string) => void
}) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <Card className={cn('transition-all', !wf.is_active && 'opacity-60')}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className={cn(
              'mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
              wf.is_active ? 'bg-primary/10 text-primary' : 'bg-background-elevated text-foreground-muted'
            )}>
              <Zap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-sm text-foreground truncate">{wf.name}</h3>
                <Badge variant={wf.is_active ? 'default' : 'secondary'} className="text-[10px] px-1.5 py-0">
                  {wf.is_active ? 'Ativo' : 'Pausado'}
                </Badge>
              </div>
              {wf.description && (
                <p className="text-xs text-foreground-muted mt-0.5 line-clamp-1">{wf.description}</p>
              )}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-xs bg-background-elevated text-foreground-muted px-2 py-0.5 rounded-full">
                  🎯 {TRIGGER_LABELS[wf.trigger_type] ?? wf.trigger_type}
                </span>
                {wf.actions.slice(0, 3).map((a, i) => (
                  <span key={i} className="text-xs bg-background-elevated text-foreground-muted px-2 py-0.5 rounded-full">
                    {ACTION_LABELS[a.type] ?? a.type}
                  </span>
                ))}
                {wf.actions.length > 3 && (
                  <span className="text-xs text-foreground-subtle">+{wf.actions.length - 3}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => onToggle(wf.id, !wf.is_active)}
              className={cn(
                'p-1.5 rounded-lg transition-colors',
                wf.is_active
                  ? 'text-warning hover:bg-warning/10'
                  : 'text-success hover:bg-success/10'
              )}
              title={wf.is_active ? 'Pausar' : 'Ativar'}
            >
              {wf.is_active ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <Link
              href={`/dashboard/workflow/${wf.id}`}
              className="p-1.5 rounded-lg text-foreground-muted hover:bg-background-elevated hover:text-foreground transition-colors"
              title="Editar"
            >
              <Pencil className="w-3.5 h-3.5" />
            </Link>
            {confirmDelete ? (
              <div className="flex items-center gap-1">
                <button onClick={() => onDelete(wf.id)} className="text-xs px-2 py-1 bg-danger text-white rounded-lg">
                  Confirmar
                </button>
                <button onClick={() => setConfirmDelete(false)} className="text-xs px-2 py-1 rounded-lg text-foreground-muted hover:bg-background-elevated">
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="p-1.5 rounded-lg text-foreground-muted hover:bg-danger/10 hover:text-danger transition-colors"
                title="Excluir"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function WorkflowPageInner() {
  const queryClient = useQueryClient()
  const { data: workflows, isLoading, error } = useQuery({
    queryKey: ['workflows'],
    queryFn: fetchWorkflows,
  })

  const toggleMutation = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      fetch(`/api/workflow/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: active }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workflows'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => fetch(`/api/workflow/${id}`, { method: 'DELETE' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['workflows'] }),
  })

  const activeCount = workflows?.filter(w => w.is_active).length ?? 0

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            Workflow
          </h1>
          <p className="text-foreground-muted text-sm mt-1">
            Automações de follow-up com clientes
          </p>
        </div>
        <Link href="/dashboard/workflow/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Automação
          </Button>
        </Link>
      </div>

      {/* Stats */}
      {workflows && workflows.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{workflows.length}</p>
              <p className="text-xs text-foreground-muted mt-1">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-success">{activeCount}</p>
              <p className="text-xs text-foreground-muted mt-1">Ativos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground-muted">{workflows.length - activeCount}</p>
              <p className="text-xs text-foreground-muted mt-1">Pausados</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* List */}
      {isLoading && (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <Card className="border-danger/30 bg-danger/5">
          <CardContent className="p-4 flex items-center gap-2 text-danger">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Erro ao carregar automações.</span>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && workflows?.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-12 flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Zap className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Nenhuma automação criada</h3>
              <p className="text-sm text-foreground-muted mt-1">
                Crie automações para fazer follow-up automático com seus leads
              </p>
            </div>
            <Link href="/dashboard/workflow/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Criar primeira automação
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {!isLoading && workflows && workflows.length > 0 && (
        <div className="space-y-3">
          {workflows.map(wf => (
            <WorkflowCard
              key={wf.id}
              wf={wf}
              onToggle={(id, active) => toggleMutation.mutate({ id, active })}
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          ))}
        </div>
      )}

      {/* Templates */}
      <div>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wide mb-3">
          Templates Prontos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: 'Follow-up após 24h sem resposta', trigger: 'no_activity', desc: 'Manda WhatsApp se o lead não respondeu em 1 dia' },
            { name: 'Boas-vindas para novo lead', trigger: 'lead_created', desc: 'Mensagem automática ao criar um novo lead' },
            { name: 'Reengajamento de lead frio', trigger: 'temperature_changed', desc: 'Sequência de 3 mensagens para lead que esfriou' },
            { name: 'Parabéns por negócio fechado', trigger: 'lead_won', desc: 'Mensagem de agradecimento após venda concluída' },
          ].map(t => (
            <Link
              key={t.name}
              href={`/dashboard/workflow/new?template=${t.trigger}`}
              className="group"
            >
              <Card className="hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{t.name}</p>
                    <p className="text-xs text-foreground-muted mt-0.5">{t.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-foreground-subtle flex-shrink-0 group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function WorkflowPage() {
  return (
    <QueryProvider>
      <WorkflowPageInner />
    </QueryProvider>
  )
}
