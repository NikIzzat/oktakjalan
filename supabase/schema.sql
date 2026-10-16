create table if not exists public.route_segment_statuses (
  segment_id text primary key,
  status text not null check (status in ('open', 'maintenance', 'closed')),
  reason text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.route_reports (
  id uuid primary key,
  route_id text not null,
  route_name text not null,
  segment_id text not null,
  segment_name text not null,
  rating text not null check (rating in ('Bad', 'Average', 'Good')),
  reason text not null,
  photo_name text not null default '',
  photo_data text not null default '',
  created_at timestamptz not null default now(),
  location jsonb
);

alter table public.route_segment_statuses enable row level security;
alter table public.route_reports enable row level security;

drop policy if exists "Anyone can read route statuses" on public.route_segment_statuses;
create policy "Anyone can read route statuses"
  on public.route_segment_statuses for select to anon, authenticated using (true);

drop policy if exists "Anyone can add or update route statuses" on public.route_segment_statuses;
create policy "Anyone can add or update route statuses"
  on public.route_segment_statuses for insert to anon, authenticated with check (true);
drop policy if exists "Anyone can update route statuses" on public.route_segment_statuses;
create policy "Anyone can update route statuses"
  on public.route_segment_statuses for update to anon, authenticated using (true) with check (true);

drop policy if exists "Anyone can read route reports" on public.route_reports;
create policy "Anyone can read route reports"
  on public.route_reports for select to anon, authenticated using (true);

drop policy if exists "Anyone can add route reports" on public.route_reports;
create policy "Anyone can add route reports"
  on public.route_reports for insert to anon, authenticated with check (true);

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'route_segment_statuses'
  ) then
    alter publication supabase_realtime add table public.route_segment_statuses;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'route_reports'
  ) then
    alter publication supabase_realtime add table public.route_reports;
  end if;
end $$;
