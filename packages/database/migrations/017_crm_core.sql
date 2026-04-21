-- =============================================================================
-- Migration 017: CRM Core
-- Creates the full CRM data model:
--   pipelines, pipeline_stages, leads, lead_activities,
--   lead_vehicle_interest, sequences, sequence_steps,
--   sequence_enrollments, repurchase_cadences
-- All tables use gen_random_uuid(), my_dealership_id() RLS, and updated_at triggers.
-- =============================================================================

-- ─── updated_at helper (idempotent) ──────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ─── pipelines ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pipelines (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dealership_id uuid NOT NULL REFERENCES dealerships(id) ON DELETE CASCADE,
  name          text NOT NULL,
  is_default    boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pipelines_dealership ON pipelines(dealership_id);

CREATE TRIGGER trg_pipelines_updated_at
  BEFORE UPDATE ON pipelines
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── pipeline_stages ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pipeline_stages (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pipeline_id         uuid NOT NULL REFERENCES pipelines(id) ON DELETE CASCADE,
  dealership_id       uuid NOT NULL REFERENCES dealerships(id) ON DELETE CASCADE,
  name                text NOT NULL,
  position            smallint NOT NULL DEFAULT 0,
  default_probability smallint NOT NULL DEFAULT 20 CHECK (default_probability BETWEEN 0 AND 100),
  is_terminal_won     boolean NOT NULL DEFAULT false,
  is_terminal_lost    boolean NOT NULL DEFAULT false,
  color               text NOT NULL DEFAULT '#6366F1',
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pipeline_stages_pipeline  ON pipeline_stages(pipeline_id);
CREATE INDEX IF NOT EXISTS idx_pipeline_stages_dealership ON pipeline_stages(dealership_id);

CREATE TRIGGER trg_pipeline_stages_updated_at
  BEFORE UPDATE ON pipeline_stages
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── leads ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dealership_id         uuid NOT NULL REFERENCES dealerships(id) ON DELETE CASCADE,
  source                text NOT NULL CHECK (source IN ('widget','appointment','whatsapp','manual','import','floor')),
  source_ref_id         uuid NULL,
  customer_id           uuid NULL REFERENCES customers(id) ON DELETE SET NULL,
  name                  text NOT NULL,
  phone                 text NULL,
  email                 text NULL,
  cpf                   text NULL,
  stage_id              uuid NOT NULL REFERENCES pipeline_stages(id),
  owner_user_id         uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  status                text NOT NULL DEFAULT 'open' CHECK (status IN ('open','won','lost','archived')),
  lost_reason           text NULL,
  expected_value_cents  bigint NULL,
  probability_override  smallint NULL CHECK (probability_override BETWEEN 0 AND 100),
  score                 smallint NOT NULL DEFAULT 0 CHECK (score BETWEEN 0 AND 100),
  temperature           text NOT NULL DEFAULT 'cold' CHECK (temperature IN ('hot','warm','cold')),
  vehicle_interest_type text NULL,
  budget_min_cents      bigint NULL,
  budget_max_cents      bigint NULL,
  financing_needed      boolean NULL,
  decision_window_days  smallint NULL,
  notes_summary         text NULL,
  last_activity_at      timestamptz NULL,
  next_action_at        timestamptz NULL,
  closed_at             timestamptz NULL,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_dealership      ON leads(dealership_id);
CREATE INDEX IF NOT EXISTS idx_leads_stage           ON leads(stage_id);
CREATE INDEX IF NOT EXISTS idx_leads_owner           ON leads(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_leads_status          ON leads(dealership_id, status);
CREATE INDEX IF NOT EXISTS idx_leads_temperature     ON leads(dealership_id, temperature);
CREATE INDEX IF NOT EXISTS idx_leads_phone           ON leads(dealership_id, phone) WHERE phone IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_last_activity   ON leads(dealership_id, last_activity_at DESC);

CREATE TRIGGER trg_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── lead_activities ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lead_activities (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dealership_id       uuid NOT NULL REFERENCES dealerships(id) ON DELETE CASCADE,
  lead_id             uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  kind                text NOT NULL CHECK (kind IN ('note','call','email','whatsapp','appointment','stage_change','score_change','assignment','system')),
  direction           text NULL CHECK (direction IN ('inbound','outbound')),
  body                text NULL,
  metadata            jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_by_user_id  uuid NULL REFERENCES users(id) ON DELETE SET NULL,
  created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lead_activities_lead        ON lead_activities(lead_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_activities_dealership  ON lead_activities(dealership_id);

-- ─── lead_vehicle_interest ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lead_vehicle_interest (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dealership_id uuid NOT NULL REFERENCES dealerships(id) ON DELETE CASCADE,
  lead_id       uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  vehicle_id    uuid NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  source        text NOT NULL CHECK (source IN ('ai_match','manual','implicit')),
  ai_score      smallint NULL CHECK (ai_score BETWEEN 0 AND 100),
  ai_reasoning  text NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (lead_id, vehicle_id)
);

CREATE INDEX IF NOT EXISTS idx_lead_vehicle_interest_lead    ON lead_vehicle_interest(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_vehicle_interest_vehicle ON lead_vehicle_interest(vehicle_id);

-- ─── sequences ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sequences (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dealership_id uuid NOT NULL REFERENCES dealerships(id) ON DELETE CASCADE,
  name          text NOT NULL,
  channel       text NOT NULL CHECK (channel IN ('email','whatsapp','mixed')),
  is_active     boolean NOT NULL DEFAULT true,
  trigger       jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sequences_dealership ON sequences(dealership_id);

CREATE TRIGGER trg_sequences_updated_at
  BEFORE UPDATE ON sequences
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── sequence_steps ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sequence_steps (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_id   uuid NOT NULL REFERENCES sequences(id) ON DELETE CASCADE,
  dealership_id uuid NOT NULL REFERENCES dealerships(id) ON DELETE CASCADE,
  position      smallint NOT NULL DEFAULT 0,
  delay_hours   int NOT NULL DEFAULT 24,
  channel       text NOT NULL CHECK (channel IN ('email','whatsapp')),
  template      jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sequence_steps_sequence ON sequence_steps(sequence_id, position);

-- ─── sequence_enrollments ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sequence_enrollments (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dealership_id uuid NOT NULL REFERENCES dealerships(id) ON DELETE CASCADE,
  lead_id       uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  sequence_id   uuid NOT NULL REFERENCES sequences(id) ON DELETE CASCADE,
  status        text NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused','completed','cancelled')),
  current_step  smallint NOT NULL DEFAULT 0,
  next_run_at   timestamptz NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sequence_enrollments_lead     ON sequence_enrollments(lead_id);
CREATE INDEX IF NOT EXISTS idx_sequence_enrollments_next_run ON sequence_enrollments(next_run_at) WHERE status = 'active';

CREATE TRIGGER trg_sequence_enrollments_updated_at
  BEFORE UPDATE ON sequence_enrollments
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── repurchase_cadences ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS repurchase_cadences (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dealership_id uuid NOT NULL REFERENCES dealerships(id) ON DELETE CASCADE,
  sale_id       uuid NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
  customer_id   uuid NULL REFERENCES customers(id) ON DELETE SET NULL,
  next_touch_at timestamptz NOT NULL,
  step          smallint NOT NULL DEFAULT 1,
  status        text NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused','done')),
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_repurchase_cadences_dealership ON repurchase_cadences(dealership_id);
CREATE INDEX IF NOT EXISTS idx_repurchase_cadences_next_touch ON repurchase_cadences(next_touch_at) WHERE status = 'active';

CREATE TRIGGER trg_repurchase_cadences_updated_at
  BEFORE UPDATE ON repurchase_cadences
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE pipelines              ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_stages        ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities        ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_vehicle_interest  ENABLE ROW LEVEL SECURITY;
ALTER TABLE sequences              ENABLE ROW LEVEL SECURITY;
ALTER TABLE sequence_steps         ENABLE ROW LEVEL SECURITY;
ALTER TABLE sequence_enrollments   ENABLE ROW LEVEL SECURITY;
ALTER TABLE repurchase_cadences    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pipelines_dealership"             ON pipelines             FOR ALL USING (dealership_id = my_dealership_id());
CREATE POLICY "pipeline_stages_dealership"       ON pipeline_stages       FOR ALL USING (dealership_id = my_dealership_id());
CREATE POLICY "leads_dealership"                 ON leads                 FOR ALL USING (dealership_id = my_dealership_id());
CREATE POLICY "lead_activities_dealership"       ON lead_activities       FOR ALL USING (dealership_id = my_dealership_id());
CREATE POLICY "lead_vehicle_interest_dealership" ON lead_vehicle_interest FOR ALL USING (dealership_id = my_dealership_id());
CREATE POLICY "sequences_dealership"             ON sequences             FOR ALL USING (dealership_id = my_dealership_id());
CREATE POLICY "sequence_steps_dealership"        ON sequence_steps        FOR ALL USING (dealership_id = my_dealership_id());
CREATE POLICY "sequence_enrollments_dealership"  ON sequence_enrollments  FOR ALL USING (dealership_id = my_dealership_id());
CREATE POLICY "repurchase_cadences_dealership"   ON repurchase_cadences   FOR ALL USING (dealership_id = my_dealership_id());

-- ─── Default pipeline seed function ──────────────────────────────────────────
-- Call once per dealership at creation or via backfill migration.
CREATE OR REPLACE FUNCTION seed_default_pipeline(p_dealership_id uuid)
RETURNS void LANGUAGE plpgsql AS $$
DECLARE
  v_pipeline_id uuid;
BEGIN
  -- Idempotent: skip if default pipeline already exists
  IF EXISTS (
    SELECT 1 FROM pipelines WHERE dealership_id = p_dealership_id AND is_default = true
  ) THEN RETURN; END IF;

  INSERT INTO pipelines (dealership_id, name, is_default)
  VALUES (p_dealership_id, 'Pipeline Principal', true)
  RETURNING id INTO v_pipeline_id;

  INSERT INTO pipeline_stages (pipeline_id, dealership_id, name, position, default_probability, color, is_terminal_won, is_terminal_lost)
  VALUES
    (v_pipeline_id, p_dealership_id, 'Novo',         0,  10, '#6366F1', false, false),
    (v_pipeline_id, p_dealership_id, 'Qualificado',  1,  25, '#06B6D4', false, false),
    (v_pipeline_id, p_dealership_id, 'Negociando',   2,  50, '#F59E0B', false, false),
    (v_pipeline_id, p_dealership_id, 'Proposta',     3,  75, '#10B981', false, false),
    (v_pipeline_id, p_dealership_id, 'Ganho',        4, 100, '#22C55E', true,  false),
    (v_pipeline_id, p_dealership_id, 'Perdido',      5,   0, '#EF4444', false, true);
END;
$$;
