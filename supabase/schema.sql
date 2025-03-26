-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create categories table
create table categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create menu_items table
create table menu_items (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text not null,
  price decimal(10,2) not null,
  category_id uuid references categories(id) on delete cascade,
  image_url text,
  is_available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create table_qrs table
create table table_qrs (
  id uuid default uuid_generate_v4() primary key,
  table_number integer not null unique,
  qr_code_url text not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table categories enable row level security;
alter table menu_items enable row level security;
alter table table_qrs enable row level security;

-- Create RLS policies for categories
create policy "Enable read access for all users" on categories
  for select using (true);

create policy "Enable insert for authenticated users only" on categories
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on categories
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on categories
  for delete using (auth.role() = 'authenticated');

-- Create RLS policies for menu_items
create policy "Enable read access for all users" on menu_items
  for select using (true);

create policy "Enable insert for authenticated users only" on menu_items
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on menu_items
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on menu_items
  for delete using (auth.role() = 'authenticated');

-- Create RLS policies for table_qrs
create policy "Enable read access for all users" on table_qrs
  for select using (true);

create policy "Enable insert for authenticated users only" on table_qrs
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on table_qrs
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on table_qrs
  for delete using (auth.role() = 'authenticated'); 