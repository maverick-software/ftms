/*
  # Create courses schema
  
  1. New Tables
    - `courses`
      - Course details and requirements
    - `course_enrollments`
      - Student enrollment tracking
    - `course_requirements`
      - Course completion requirements
  
  2. Security
    - Enable RLS on all tables
    - Policies for admin access
    - Policies for instructor access
*/

CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  duration integer NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  firearms text[] NOT NULL DEFAULT '{}',
  legal_knowledge boolean NOT NULL DEFAULT false,
  mental_health_training boolean NOT NULL DEFAULT false,
  additional_elements text[] NOT NULL DEFAULT '{}',
  delivery_method text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS course_requirements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS course_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  enrollment_date date NOT NULL DEFAULT CURRENT_DATE,
  completion_date date,
  status text NOT NULL DEFAULT 'enrolled',
  score integer,
  instructor_notes text,
  certificate_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

-- Courses policies
CREATE POLICY "Allow read access to all authenticated users for courses"
  ON courses FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to admin users for courses"
  ON courses FOR INSERT TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow update access to admin users for courses"
  ON courses FOR UPDATE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow delete access to admin users for courses"
  ON courses FOR DELETE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Course requirements policies
CREATE POLICY "Allow read access to all authenticated users for course_requirements"
  ON course_requirements FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to admin users for course_requirements"
  ON course_requirements FOR INSERT TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow update access to admin users for course_requirements"
  ON course_requirements FOR UPDATE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow delete access to admin users for course_requirements"
  ON course_requirements FOR DELETE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Course enrollments policies
CREATE POLICY "Allow read access to all authenticated users for course_enrollments"
  ON course_enrollments FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow insert access to admin users for course_enrollments"
  ON course_enrollments FOR INSERT TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Allow update access to admin users for course_enrollments"
  ON course_enrollments FOR UPDATE TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');