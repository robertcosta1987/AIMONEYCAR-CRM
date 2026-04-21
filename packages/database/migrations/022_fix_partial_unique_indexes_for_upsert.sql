-- Migration 022: Replace partial unique indexes on expenses and sales with full
-- unique constraints so Supabase upsert ON CONFLICT works.
-- PostgreSQL allows multiple NULLs in unique constraints (NULL != NULL), so
-- rows with external_id IS NULL are still allowed to duplicate.

ALTER TABLE expenses
  DROP CONSTRAINT IF EXISTS expenses_dealership_external_unique;
ALTER TABLE expenses
  ADD CONSTRAINT expenses_dealership_external_unique
  UNIQUE (dealership_id, external_id);

ALTER TABLE sales
  DROP CONSTRAINT IF EXISTS sales_dealership_external_unique;
ALTER TABLE sales
  ADD CONSTRAINT sales_dealership_external_unique
  UNIQUE (dealership_id, external_id);
