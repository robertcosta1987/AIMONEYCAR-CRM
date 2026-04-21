-- Migration 020: Auto-seed default pipeline whenever a new dealership is created.
-- Covers all registration paths — API, trigger, or direct insert.

CREATE OR REPLACE FUNCTION on_dealership_created()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  PERFORM seed_default_pipeline(NEW.id);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_dealerships_seed_pipeline ON dealerships;

CREATE TRIGGER trg_dealerships_seed_pipeline
  AFTER INSERT ON dealerships
  FOR EACH ROW EXECUTE FUNCTION on_dealership_created();
