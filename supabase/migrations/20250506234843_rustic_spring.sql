/*
  # Create organizations schema
  
  1. New Tables
    - `organizations`
      - Basic organization info (name, type, contact details)
    - `organization_members`
      - Links users to organizations with roles
  
  2. Security
    - Enable RLS on all tables
    - Policies for admin access
    - Policies for member access
*/

CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS organization_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(organization_id, user_id)
);

-- Enable RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

-- Organizations policies
CREATE POLICY "Allow read access to all authenticated users for organizations"
  ON organizations FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to admin users for organizations"
  ON organizations FOR INSERT TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow update access to admin users for organizations"
  ON organizations FOR UPDATE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow delete access to admin users for organizations"
  ON organizations FOR DELETE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Organization members policies
CREATE POLICY "Allow read access to all authenticated users for organization_members"
  ON organization_members FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to admin users for organization_members"
  ON organization_members FOR INSERT TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow update access to admin users for organization_members"
  ON organization_members FOR UPDATE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow delete access to admin users for organization_members"
  ON organization_members FOR DELETE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');