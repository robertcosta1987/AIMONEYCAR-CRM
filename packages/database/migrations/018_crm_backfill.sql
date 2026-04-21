-- =============================================================================
-- Migration 018: CRM Backfill
-- 1. Seeds default pipeline + stages for every existing dealership (idempotent).
-- 2. Backfills leads from agendamentos (source = 'appointment').
-- 3. Backfills leads from whatsapp_conversas (source = 'whatsapp').
-- 4. Deduplicates by (dealership_id, phone) — first occurrence wins.
-- =============================================================================

-- ─── 1. Seed default pipeline for all existing dealerships ───────────────────
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT id FROM dealerships LOOP
    PERFORM seed_default_pipeline(r.id);
  END LOOP;
END;
$$;

-- ─── 2. Backfill from agendamentos ───────────────────────────────────────────
-- Insert one lead per unique (dealership_id, lead_telefone), earliest appointment first.
-- Skips phones that already exist in leads (idempotent re-run safety).
INSERT INTO leads (
  dealership_id,
  source,
  source_ref_id,
  name,
  phone,
  email,
  cpf,
  stage_id,
  status,
  vehicle_interest_type,
  last_activity_at,
  created_at,
  updated_at
)
SELECT DISTINCT ON (a.dealership_id, a.lead_telefone)
  a.dealership_id,
  'appointment'                          AS source,
  a.id                                   AS source_ref_id,
  a.lead_nome                            AS name,
  a.lead_telefone                        AS phone,
  a.lead_email                           AS email,
  a.lead_cpf                             AS cpf,
  ps.id                                  AS stage_id,
  'open'                                 AS status,
  a.veiculo_interesse                    AS vehicle_interest_type,
  a.data_inicio                          AS last_activity_at,
  a.created_at,
  a.created_at                           AS updated_at
FROM agendamentos a
JOIN pipelines p    ON p.dealership_id = a.dealership_id AND p.is_default = true
JOIN pipeline_stages ps ON ps.pipeline_id = p.id AND ps.position = 0
WHERE a.lead_telefone IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM leads l
    WHERE l.dealership_id = a.dealership_id
      AND l.phone = a.lead_telefone
  )
ORDER BY a.dealership_id, a.lead_telefone, a.created_at ASC;

-- ─── 3. Backfill from whatsapp_conversas ─────────────────────────────────────
-- Insert leads for WhatsApp contacts not already ingested via agendamentos.
INSERT INTO leads (
  dealership_id,
  source,
  source_ref_id,
  name,
  phone,
  stage_id,
  status,
  last_activity_at,
  created_at,
  updated_at
)
SELECT DISTINCT ON (wc.dealership_id, wc.telefone_limpo)
  wc.dealership_id,
  'whatsapp'                             AS source,
  wc.id                                  AS source_ref_id,
  COALESCE(wc.nome_contato, wc.telefone) AS name,
  wc.telefone                            AS phone,
  ps.id                                  AS stage_id,
  'open'                                 AS status,
  wc.ultima_mensagem_em                  AS last_activity_at,
  wc.criado_em                           AS created_at,
  wc.criado_em                           AS updated_at
FROM whatsapp_conversas wc
JOIN pipelines p      ON p.dealership_id = wc.dealership_id AND p.is_default = true
JOIN pipeline_stages ps ON ps.pipeline_id = p.id AND ps.position = 0
WHERE wc.telefone IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM leads l
    WHERE l.dealership_id = wc.dealership_id
      AND l.phone = wc.telefone
  )
ORDER BY wc.dealership_id, wc.telefone_limpo, wc.criado_em ASC;
