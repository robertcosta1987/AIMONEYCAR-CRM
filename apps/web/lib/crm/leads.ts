export type LeadStatus = 'open' | 'won' | 'lost' | 'archived'
export type Temperature = 'hot' | 'warm' | 'cold'
export type LeadSource = 'widget' | 'appointment' | 'whatsapp' | 'manual' | 'import' | 'floor'
export type ActivityKind =
  | 'note' | 'call' | 'email' | 'whatsapp' | 'appointment'
  | 'stage_change' | 'score_change' | 'assignment' | 'system'

export interface Lead {
  id: string
  dealership_id: string
  source: LeadSource
  source_ref_id: string | null
  customer_id: string | null
  name: string
  phone: string | null
  email: string | null
  cpf: string | null
  stage_id: string
  owner_user_id: string | null
  status: LeadStatus
  lost_reason: string | null
  expected_value_cents: number | null
  probability_override: number | null
  score: number
  temperature: Temperature
  vehicle_interest_type: string | null
  budget_min_cents: number | null
  budget_max_cents: number | null
  financing_needed: boolean | null
  decision_window_days: number | null
  notes_summary: string | null
  last_activity_at: string | null
  next_action_at: string | null
  closed_at: string | null
  created_at: string
  updated_at: string
}

export interface LeadActivity {
  id: string
  dealership_id: string
  lead_id: string
  kind: ActivityKind
  direction: 'inbound' | 'outbound' | null
  body: string | null
  metadata: Record<string, unknown>
  created_by_user_id: string | null
  created_at: string
}

export interface PipelineStage {
  id: string
  pipeline_id: string
  dealership_id: string
  name: string
  position: number
  default_probability: number
  is_terminal_won: boolean
  is_terminal_lost: boolean
  color: string
}

export interface KanbanStage extends PipelineStage {
  leads: Lead[]
}
