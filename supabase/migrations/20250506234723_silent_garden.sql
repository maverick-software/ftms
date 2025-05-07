/*
  # Seed Data for Certifications

  1. Initial Data
    - Basic certification types
    - Requirements for each certification
    - Sample student certifications
*/

-- Seed certification types
INSERT INTO certification_types (id, name, description, validity_period, status) VALUES
  (
    'cf5bdc75-a3cf-4429-8582-4d3ca46a3d9b',
    'Basic Firearms Safety',
    'Certification for basic firearms safety and handling',
    24,
    'active'
  ),
  (
    'd8b4b3d6-7b3a-4c8e-9f0a-9f1b3d6e5c4b',
    'Advanced Tactical Training',
    'Advanced certification for tactical firearms operations',
    12,
    'active'
  ),
  (
    'e7c5a4d3-6b2a-4c8e-9f0a-8e7d6c5b4a3c',
    'Concealed Carry Certification',
    'Comprehensive certification for concealed carry permits',
    12,
    'active'
  );

-- Seed certification requirements
INSERT INTO certification_requirements (certification_type_id, name, type, description) VALUES
  (
    'cf5bdc75-a3cf-4429-8582-4d3ca46a3d9b',
    'Basic Safety Course',
    'course',
    'Must complete the Basic Safety Course'
  ),
  (
    'cf5bdc75-a3cf-4429-8582-4d3ca46a3d9b',
    'Written Exam',
    'other',
    'Must pass written examination with 80% or higher'
  ),
  (
    'cf5bdc75-a3cf-4429-8582-4d3ca46a3d9b',
    'Practical Assessment',
    'other',
    'Must demonstrate proficiency in safe handling'
  ),
  (
    'd8b4b3d6-7b3a-4c8e-9f0a-9f1b3d6e5c4b',
    'Advanced Tactical Course',
    'course',
    'Must complete Advanced Tactical Training course'
  ),
  (
    'd8b4b3d6-7b3a-4c8e-9f0a-9f1b3d6e5c4b',
    'Physical Assessment',
    'other',
    'Must pass physical fitness requirements'
  ),
  (
    'd8b4b3d6-7b3a-4c8e-9f0a-9f1b3d6e5c4b',
    'Basic Firearms Safety',
    'competency',
    'Must hold valid Basic Firearms Safety certification'
  ),
  (
    'e7c5a4d3-6b2a-4c8e-9f0a-8e7d6c5b4a3c',
    'Legal Knowledge',
    'course',
    'Must complete legal requirements course'
  ),
  (
    'e7c5a4d3-6b2a-4c8e-9f0a-8e7d6c5b4a3c',
    'Range Qualification',
    'other',
    'Must pass shooting qualification course'
  ),
  (
    'e7c5a4d3-6b2a-4c8e-9f0a-8e7d6c5b4a3c',
    'Background Check',
    'other',
    'Must pass background check requirements'
  );