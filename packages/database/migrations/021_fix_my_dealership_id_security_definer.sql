-- Migration 021: Fix my_dealership_id() circular RLS recursion.
-- Must be SECURITY DEFINER so it bypasses RLS when reading from users,
-- otherwise any table with a policy that calls this function causes
-- infinite recursion when the users table also has RLS enabled.

CREATE OR REPLACE FUNCTION my_dealership_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT dealership_id FROM users WHERE id = auth.uid();
$$;
