/*
  # Create competencies schema
  
  1. New Tables
    - `competencies`
      - Competency definitions and requirements
    - `student_competencies`
      - Track student competency achievements
  
  2. Security
    - Enable RLS on all tables
    - Policies for admin access
    - Policies for instructor access
*/

CREATE TABLE IF NOT EXISTS competencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  level text NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  validity_period integer NOT NULL,
  recertification_required boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS competency_requirements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competency_id uuid REFERENCES competencies(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(competency_id, course_id)
);

CREATE TABLE IF NOT EXISTS student_competencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  competency_id uuid REFERENCES competencies(id) ON DELETE CASCADE,
  achieved_date date NOT NULL DEFAULT CURRENT_DATE,
  expiration_date date,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE competency_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_competencies ENABLE ROW LEVEL SECURITY;

-- Competencies policies
CREATE POLICY "Allow read access to all authenticated users for competencies"
  ON competencies FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to admin users for competencies"
  ON competencies FOR INSERT TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow update access to admin users for competencies"
  ON competencies FOR UPDATE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow delete access to admin users for competencies"
  ON competencies FOR DELETE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Competency requirements policies
CREATE POLICY "Allow read access to all authenticated users for competency_requirements"
  ON competency_requirements FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to admin users for competency_requirements"
  ON competency_requirements FOR INSERT TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow update access to admin users for competency_requirements"
  ON competency_requirements FOR UPDATE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow delete access to admin users for competency_requirements"
  ON competency_requirements FOR DELETE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Student competencies policies
CREATE POLICY "Allow read access to all authenticated users for student_competencies"
  ON student_competencies FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to admin users for student_competencies"
  ON student_competencies FOR INSERT TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow update access to admin users for student_competencies"
  ON student_competencies FOR UPDATE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow delete access to admin users for student_competencies"
  ON student_competencies FOR DELETE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');