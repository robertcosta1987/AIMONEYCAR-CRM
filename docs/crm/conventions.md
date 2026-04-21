# CRM Module — Conventions & Architecture Notes

## Database

### UUID generation
Use `gen_random_uuid()` (built-in PG 13+). Migration 016 established this. Do not use `uuid_generate_v4()`.

### RLS pattern
Every tenant table uses the shared helper function:
```sql
create or replace function my_dealership_id()
returns uuid language sql stable
as $$ select dealership_id from users where id = auth.uid(); $$;
```
Policy template (single policy covers all operations):
```sql
create policy "<table>_dealership" on <table>
  for all using (dealership_id = my_dealership_id());
```
Service-role writes (cron jobs, API routes using service key) bypass RLS — that is intentional and expected.

### updated_at trigger
Every mutable table gets the standard trigger:
```sql
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger trg_<table>_updated_at
  before update on <table>
  for each row execute function set_updated_at();
```

### Migration numbering
Sequential, zero-padded to 3 digits: `017_crm_core.sql`, `018_crm_backfill.sql`, etc.
Never edit a prior migration. New behaviour → new migration.

### Naming
- Tables: `snake_case` plural English (`leads`, `pipeline_stages`, `lead_activities`)
- Indexes: `idx_<table>_<column(s)>`
- Triggers: `trg_<table>_<purpose>`
- Policies: `"<table>_dealership"` (consistent with existing pattern)

---

## TypeScript / Next.js

### Model constants (do not hardcode elsewhere)
```ts
export const MODEL_SONNET = 'claude-sonnet-4-20250514'
export const MODEL_HAIKU  = 'claude-haiku-4-5-20251001'
```
Defined in `apps/web/lib/ai/models.ts`, imported everywhere.

### API routes
- Location: `apps/web/app/api/crm/`
- Always use the **service-role** Supabase client for writes (bypasses RLS server-side).
- Always use the **anon** client (with cookie auth) for reads where RLS should apply.
- Return shape: `{ data: T } | { error: string }` — never expose raw Supabase errors to the client.

### Server state
Use `@tanstack/react-query` for all data fetching in CRM components.
- List stale time: 30 s
- Detail stale time: 10 s
- Pipeline stale time: 5 s
Do NOT mix with ad-hoc `useEffect` fetches.

### Feature flag
`NEXT_PUBLIC_CRM_ENABLED=true` gates the CRM nav entry and all CRM pages.
Check: `process.env.NEXT_PUBLIC_CRM_ENABLED === 'true'`

---

## Frontend / CRM Theme

The CRM module uses a **CRM-scoped light theme** that does not affect the rest of the app.
Scope: `apps/web/app/(dashboard)/dashboard/crm/layout.tsx` wraps children in `<CRMThemeProvider>`.
The provider injects CSS custom properties under `.crm-scope` that override the app's dark tokens.

### Palette (light CRM)
```
--crm-bg:          #F8FAFC  (slate-50)
--crm-bg-elevated: #FFFFFF
--crm-bg-paper:    #F1F5F9  (slate-100)
--crm-border:      #E2E8F0  (slate-200)
--crm-text:        #0F172A  (slate-900)
--crm-text-muted:  #475569  (slate-600)
--crm-text-subtle: #94A3B8  (slate-400)
--crm-accent:      #6366F1  (indigo-500)
--crm-accent-2:    #8B5CF6  (violet-500)
--crm-aqua:        #06B6D4  (cyan-500)
--crm-success:     #10B981  (emerald-500)
--crm-warning:     #F59E0B  (amber-500)
--crm-danger:      #EF4444  (red-500)
--crm-hot:         #F43F5E  (rose-500)
--crm-warm:        #F59E0B  (amber-500)
--crm-cold:        #3B82F6  (blue-500)
```

### Motion
- Page transition: fade + 8 px slide-up, 300 ms, `ease: [0.16, 1, 0.3, 1]`
- Card drag: spring `stiffness: 300, damping: 30`
- List stagger: 40 ms/item, max 10 items
- Honor `prefers-reduced-motion`

---

## Sidebar integration
The existing sidebar uses named `NavGroup` arrays. CRM entry is added to the `standaloneTop` array
(or as a new top-level standalone), gated by `NEXT_PUBLIC_CRM_ENABLED`.

---

## Source tables for backfill
- `agendamentos` → leads with `source = 'appointment'`
- `whatsapp_conversas` → leads with `source = 'whatsapp'`
- `widget_conversations` does NOT exist in this repo's migrations — skip.
- Dedup by `(dealership_id, phone)` — first occurrence wins.

---

## Cron jobs (vercel.json)
New entries:
- `/api/cron/crm-sequences`  — every 15 min (`*/15 * * * *`)
- `/api/cron/crm-repurchase` — daily 09:00 UTC (`0 9 * * *`)
