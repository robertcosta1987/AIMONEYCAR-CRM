-- Migration 023: Workflow automations table for CRM follow-up

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TABLE IF NOT EXISTS workflows (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dealership_id  uuid NOT NULL REFERENCES dealerships(id) ON DELETE CASCADE,
  name           text NOT NULL,
  description    text,
  is_active      boolean NOT NULL DEFAULT true,
  trigger_type   text NOT NULL,
  trigger_config jsonb NOT NULL DEFAULT '{}',
  actions        jsonb NOT NULL DEFAULT '[]',
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_workflows_dealership ON workflows(dealership_id);
CREATE INDEX IF NOT EXISTS idx_workflows_trigger    ON workflows(trigger_type) WHERE is_active;

ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "workflows_dealership" ON workflows
  FOR ALL USING (dealership_id = my_dealership_id());

CREATE TRIGGER set_updated_at_workflows
  BEFORE UPDATE ON workflows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
