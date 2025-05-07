/*
  # Add users table and relationships

  1. New Tables
    - `users`
      - Basic user information
      - Email must be unique
      - Timestamps for created/updated

  2. Security
    - Enable RLS on users table
    - Add policies for authenticated access
    - Add foreign key relationship to organization_members
*/

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to all authenticated users for users"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to admin users for users"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'admin');

CREATE POLICY "Allow update access to admin users for users"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

CREATE POLICY "Allow delete access to admin users for users"
  ON users
  FOR DELETE
  TO authenticated
  USING (auth.role() = 'admin');

-- Add foreign key constraint if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints 
    WHERE constraint_name = 'organization_members_user_id_fkey'
  ) THEN
    ALTER TABLE organization_members
    ADD CONSTRAINT organization_members_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE;
  END IF;
END $$;