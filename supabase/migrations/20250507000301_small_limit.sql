/*
  # Seed Organizations Table

  1. Initial Data
    - Add sample organizations with different types
    - Include contact information and status
*/

INSERT INTO organizations (id, name, type, contact_person, email, phone, status)
VALUES
  (
    'org_01',
    'Austin Police Department',
    'Law Enforcement',
    'John Smith',
    'jsmith@apd.example.com',
    '(512) 555-0123',
    'active'
  ),
  (
    'org_02',
    'Travis County Sheriff',
    'Law Enforcement',
    'Sarah Johnson',
    'sjohnson@tcsheriff.example.com',
    '(512) 555-0124',
    'active'
  ),
  (
    'org_03',
    'Central Texas Training Center',
    'Training Center',
    'Michael Brown',
    'mbrown@cttc.example.com',
    '(512) 555-0125',
    'active'
  ),
  (
    'org_04',
    'Texas Rangers Division',
    'Law Enforcement',
    'Robert Wilson',
    'rwilson@txdps.example.com',
    '(512) 555-0126',
    'active'
  ),
  (
    'org_05',
    'Tactical Training Solutions',
    'Training Center',
    'Lisa Martinez',
    'lmartinez@tts.example.com',
    '(512) 555-0127',
    'active'
  );

-- Insert organization members for testing
INSERT INTO organization_members (organization_id, user_id, role)
SELECT 
  org.id,
  (SELECT id FROM users WHERE email = 'admin@example.com'),
  'admin'
FROM organizations org;