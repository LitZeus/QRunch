-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create users table for authentication
create table users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  password_hash text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create categories table
create table categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  created_by uuid references users(id) on delete set null,
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
  created_by uuid references users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create table_qrs table
create table table_qrs (
  id uuid default uuid_generate_v4() primary key,
  table_number integer not null unique,
  qr_code_url text not null,
  is_active boolean default true,
  created_by uuid references users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better performance
create index idx_menu_items_category_id on menu_items(category_id);
create index idx_menu_items_created_by on menu_items(created_by);
create index idx_menu_items_is_available on menu_items(is_available);
create index idx_categories_created_by on categories(created_by);
create index idx_table_qrs_created_by on table_qrs(created_by);
create index idx_table_qrs_is_active on table_qrs(is_active);

-- Admin functions
create or replace function get_menu_with_categories()
returns table (
    id uuid,
    name text,
    description text,
    price decimal(10,2),
    category_id uuid,
    category_name text,
    image_url text,
    is_available boolean
) as $$
begin
    return query
    select 
        mi.id,
        mi.name,
        mi.description,
        mi.price,
        c.id as category_id,
        c.name as category_name,
        mi.image_url,
        mi.is_available
    from menu_items mi
    join categories c on mi.category_id = c.id
    order by c.name, mi.name;
end;
$$ language plpgsql security definer;

-- Public functions
create or replace function get_public_menu()
returns table (
    id uuid,
    name text,
    description text,
    price decimal(10,2),
    category_name text,
    image_url text
) as $$
begin
    return query
    select 
        mi.id,
        mi.name,
        mi.description,
        mi.price,
        c.name as category_name,
        mi.image_url
    from menu_items mi
    join categories c on mi.category_id = c.id
    where mi.is_available = true
    order by c.name, mi.name;
end;
$$ language plpgsql security definer;

-- Table management functions
create or replace function get_available_tables()
returns table (
    id uuid,
    table_number integer,
    qr_code_url text
) as $$
begin
    return query
    select 
        id,
        table_number,
        qr_code_url
    from table_qrs
    where is_active = true
    order by table_number;
end;
$$ language plpgsql security definer;
