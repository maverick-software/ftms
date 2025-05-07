/*
  # Create students schema
  
  1. New Tables
    - `students`
      - Student personal info and status
    - `student_insurance`
      - Insurance details and tracking
  
  2. Security
    - Enable RLS on all tables
    - Policies for admin access
    - Policies for organization access
*/

CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  organization_id uuid REFERENCES organizations(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip text NOT NULL,
  date_of_birth date NOT NULL,
  enrollment_date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'pending',
  emergency_contact text NOT NULL,
  emergency_phone text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS student_insurance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  carry_insurance_provider text NOT NULL,
  carry_insurance_policy_number text NOT NULL,
  carry_insurance_expiration_date date NOT NULL,
  umbrella_insurance_provider text,
  umbrella_insurance_policy_number text,
  umbrella_insurance_expiration_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(student_id)
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_insurance ENABLE ROW LEVEL SECURITY;

-- Students policies
CREATE POLICY "Allow read access to all authenticated users for students"
  ON students FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to admin users for students"
  ON students FOR INSERT TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow update access to admin users for students"
  ON students FOR UPDATE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow delete access to admin users for students"
  ON students FOR DELETE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Student insurance policies
CREATE POLICY "Allow read access to all authenticated users for student_insurance"
  ON student_insurance FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to admin users for student_insurance"
  ON student_insurance FOR INSERT TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow update access to admin users for student_insurance"
  ON student_insurance FOR UPDATE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow delete access to admin users for student_insurance"
  ON student_insurance FOR DELETE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');