-- =============================================================================
-- Migration 019: Link lead references to sales and agendamentos
-- Adds nullable lead_id FK to sales and agendamentos.
-- Best-effort backfill: matches by (dealership_id, phone).
-- =============================================================================

-- ─── sales.lead_id ───────────────────────────────────────────────────────────
ALTER TABLE sales
  ADD COLUMN IF NOT EXISTS lead_id uuid NULL REFERENCES leads(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_sales_lead_id ON sales(lead_id) WHERE lead_id IS NOT NULL;

-- Best-effort backfill: match sale's customer_phone to a lead phone
UPDATE sales s
SET lead_id = l.id
FROM leads l
WHERE l.dealership_id  = s.dealership_id
  AND l.phone          = s.customer_phone
  AND s.lead_id        IS NULL
  AND s.customer_phone IS NOT NULL;

-- ─── agendamentos.lead_id ────────────────────────────────────────────────────
ALTER TABLE agendamentos
  ADD COLUMN IF NOT EXISTS lead_id uuid NULL REFERENCES leads(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_agendamentos_lead_id ON agendamentos(lead_id) WHERE lead_id IS NOT NULL;

-- Best-effort backfill: match appointment's lead_telefone to a lead phone
UPDATE agendamentos a
SET lead_id = l.id
FROM leads l
WHERE l.dealership_id   = a.dealership_id
  AND l.phone           = a.lead_telefone
  AND a.lead_id         IS NULL
  AND a.lead_telefone   IS NOT NULL;
