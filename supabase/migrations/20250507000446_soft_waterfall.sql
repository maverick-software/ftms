/*
  # Seed Organizations Data

  1. Initial Data
    - Sample organizations
    - Organization members
*/

-- Insert organizations
INSERT INTO organizations (name, type, contact_person, email, phone, status)
VALUES
  (
    'Austin Police Department',
    'Law Enforcement',
    'John Smith',
    'jsmith@apd.example.com',
    '(512) 555-0123',
    'active'
  ),
  (
    'Travis County Sheriff',
    'Law Enforcement',
    'Sarah Johnson',
    'sjohnson@tcsheriff.example.com',
    '(512) 555-0124',
    'active'
  ),
  (
    'Central Texas Training Center',
    'Training Center',
    'Michael Brown',
    'mbrown@cttc.example.com',
    '(512) 555-0125',
    'active'
  ),
  (
    'Texas Rangers Division',
    'Law Enforcement',
    'Robert Wilson',
    'rwilson@txdps.example.com',
    '(512) 555-0126',
    'active'
  ),
  (
    'Tactical Training Solutions',
    'Training Center',
    'Lisa Martinez',
    'lmartinez@tts.example.com',
    '(512) 555-0127',
    'active'
  );