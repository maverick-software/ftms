INSERT INTO organizations (id, name, type, contact_person, email, phone, status)
VALUES
  (
    'c47c3c1a-b775-4f8d-a3d8-3d76f3f3f928',
    'Austin Police Department',
    'Law Enforcement',
    'John Smith',
    'jsmith@apd.example.com',
    '(512) 555-0123',
    'active'
  ),
  (
    'd8b4b3d6-7b3a-4c8e-9f0a-9f1b3d6e5c4b',
    'Travis County Sheriff',
    'Law Enforcement',
    'Sarah Johnson',
    'sjohnson@tcsheriff.example.com',
    '(512) 555-0124',
    'active'
  ),
  (
    'e7c5a4d3-6b2a-4c8e-9f0a-8e7d6c5b4a3c',
    'Central Texas Training Center',
    'Training Center',
    'Michael Brown',
    'mbrown@cttc.example.com',
    '(512) 555-0125',
    'active'
  ),
  (
    'f6d4b3c2-a1b0-4d8e-9f0a-7d6c5b4a3b2c',
    'Texas Rangers Division',
    'Law Enforcement',
    'Robert Wilson',
    'rwilson@txdps.example.com',
    '(512) 555-0126',
    'active'
  ),
  (
    'g5e4c3b2-a1b0-4d8e-9f0a-6c5b4a3b2c1d',
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
  (SELECT id FROM auth.users WHERE email = 'admin@example.com'),
  'admin'
FROM organizations org;