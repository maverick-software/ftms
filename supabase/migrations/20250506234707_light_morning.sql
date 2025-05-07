/*
  # Certifications Management Schema

  1. New Tables
    - `certification_types`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `validity_period` (integer, months)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `certification_requirements`
      - `id` (uuid, primary key)
      - `certification_type_id` (uuid, foreign key)
      - `name` (text)
      - `type` (text)
      - `description` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `student_certifications`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `certification_type_id` (uuid, foreign key)
      - `issue_date` (timestamptz)
      - `expiration_date` (timestamptz)
      - `certificate_number` (text)
      - `status` (text)
      - `file_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create certification_types table
CREATE TABLE IF NOT EXISTS certification_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  validity_period integer NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create certification_requirements table
CREATE TABLE IF NOT EXISTS certification_requirements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  certification_type_id uuid REFERENCES certification_types(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create student_certifications table
CREATE TABLE IF NOT EXISTS student_certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  certification_type_id uuid REFERENCES certification_types(id) ON DELETE RESTRICT,
  issue_date timestamptz NOT NULL,
  expiration_date timestamptz,
  certificate_number text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  file_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE certification_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE certification_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_certifications ENABLE ROW LEVEL SECURITY;

-- Create policies for certification_types
CREATE POLICY "Allow read access to all authenticated users for certification_types"
  ON certification_types
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to admin users for certification_types"
  ON certification_types
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow update access to admin users for certification_types"
  ON certification_types
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow delete access to admin users for certification_types"
  ON certification_types
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create policies for certification_requirements
CREATE POLICY "Allow read access to all authenticated users for certification_requirements"
  ON certification_requirements
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to admin users for certification_requirements"
  ON certification_requirements
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow update access to admin users for certification_requirements"
  ON certification_requirements
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow delete access to admin users for certification_requirements"
  ON certification_requirements
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create policies for student_certifications
CREATE POLICY "Allow read access to all authenticated users for student_certifications"
  ON student_certifications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to admin users for student_certifications"
  ON student_certifications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow update access to admin users for student_certifications"
  ON student_certifications
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow delete access to admin users for student_certifications"
  ON student_certifications
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');