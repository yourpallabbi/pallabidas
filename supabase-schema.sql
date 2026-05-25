-- ================================================================
-- Pallabi Das — Supabase Database Schema
-- Run this in Supabase Dashboard → SQL Editor
-- ================================================================

-- COURSES
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  tag text not null default 'Cohort',
  duration text not null,
  seats text not null,
  price text not null,
  desc text not null,
  bullets text[] not null default '{}',
  featured boolean not null default false,
  created_at timestamptz default now()
);

-- BOOKS
create table if not exists books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  desc text not null,
  cover_url text not null,
  amazon_url text not null,
  tag text not null,
  accent text not null default 'oklch(0.65 0.27 295)',
  created_at timestamptz default now()
);

-- PORTFOLIO
create table if not exists portfolio (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  desc text not null,
  image_url text not null,
  cat text not null,
  tags text[] not null default '{}',
  link text,
  accent text not null default 'from-fuchsia-500/30 to-purple-500/10',
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

-- BLOGS
create table if not exists blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  cover_url text not null default '',
  category text not null,
  published boolean not null default false,
  created_at timestamptz default now()
);

-- ================================================================
-- Row Level Security (RLS)
-- Public can READ, only authenticated admin can WRITE
-- ================================================================

alter table courses enable row level security;
alter table books enable row level security;
alter table portfolio enable row level security;
alter table blogs enable row level security;

-- Read policies (public)
create policy "Public read courses" on courses for select using (true);
create policy "Public read books" on books for select using (true);
create policy "Public read portfolio" on portfolio for select using (true);
create policy "Public read published blogs" on blogs for select using (published = true);

-- Admin write policies (authenticated users only)
create policy "Admin insert courses" on courses for insert to authenticated with check (true);
create policy "Admin update courses" on courses for update to authenticated using (true);
create policy "Admin delete courses" on courses for delete to authenticated using (true);

create policy "Admin insert books" on books for insert to authenticated with check (true);
create policy "Admin update books" on books for update to authenticated using (true);
create policy "Admin delete books" on books for delete to authenticated using (true);

create policy "Admin insert portfolio" on portfolio for insert to authenticated with check (true);
create policy "Admin update portfolio" on portfolio for update to authenticated using (true);
create policy "Admin delete portfolio" on portfolio for delete to authenticated using (true);

create policy "Admin insert blogs" on blogs for insert to authenticated with check (true);
create policy "Admin update blogs" on blogs for update to authenticated using (true);
create policy "Admin delete blogs" on blogs for delete to authenticated using (true);
create policy "Admin read all blogs" on blogs for select to authenticated using (true);
