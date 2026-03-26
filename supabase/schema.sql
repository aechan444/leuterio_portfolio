create extension if not exists pgcrypto;

create table if not exists public.portfolio_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_events (
  id bigint generated always as identity primary key,
  event_type text not null,
  path text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.portfolio_inquiries enable row level security;
alter table public.portfolio_events enable row level security;

drop policy if exists "Allow anon insert inquiries" on public.portfolio_inquiries;
create policy "Allow anon insert inquiries"
on public.portfolio_inquiries
for insert
to anon
with check (true);

drop policy if exists "Allow anon read inquiries counts" on public.portfolio_inquiries;
create policy "Allow anon read inquiries counts"
on public.portfolio_inquiries
for select
to anon
using (true);

drop policy if exists "Allow anon insert events" on public.portfolio_events;
create policy "Allow anon insert events"
on public.portfolio_events
for insert
to anon
with check (true);

drop policy if exists "Allow anon read events counts" on public.portfolio_events;
create policy "Allow anon read events counts"
on public.portfolio_events
for select
to anon
using (true);
