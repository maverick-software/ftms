/*
  # Add users table and establish relationships

  1. New Tables
    - `users` table with basic user information
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Changes
    - Add foreign key relationship between `organization_members.user_id` and `users.id`

  3. Security
    - Enable RLS on `users` table
    - Add policies for authenticated users
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
  WITH CHECK ((jwt() ->> 'role'::text) = 'admin'::text);

CREATE POLICY "Allow update access to admin users for users"
  ON users
  FOR UPDATE
  TO authenticated
  USING ((jwt() ->> 'role'::text) = 'admin'::text)
  WITH CHECK ((jwt() ->> 'role'::text) = 'admin'::text);

CREATE POLICY "Allow delete access to admin users for users"
  ON users
  FOR DELETE
  TO authenticated
  USING ((jwt() ->> 'role'::text) = 'admin'::text);

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