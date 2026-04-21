import type { Lead } from './leads'

export function computeScore(lead: Partial<Lead>): number {
  let score = 0

  // Contact completeness
  if (lead.phone) score += 10
  if (lead.email) score += 5
  if (lead.cpf) score += 5

  // Intent signals
  if (lead.budget_min_cents || lead.budget_max_cents) score += 10
  if (lead.financing_needed != null) score += 5
  if (lead.vehicle_interest_type) score += 10

  // Temperature
  if (lead.temperature === 'hot') score += 30
  else if (lead.temperature === 'warm') score += 20
  else score += 10

  // Recency
  if (lead.last_activity_at) {
    const hours = (Date.now() - new Date(lead.last_activity_at).getTime()) / 3_600_000
    if (hours < 24) score += 15
    else if (hours < 168) score += 10
    else if (hours < 720) score += 5
  }

  return Math.min(100, score)
}
