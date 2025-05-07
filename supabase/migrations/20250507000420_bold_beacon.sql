/*
  # Seed initial users data

  1. Initial Data
    - Create admin user
    - Link admin user to organizations
*/

-- Insert admin user
INSERT INTO users (id, email)
VALUES (
  'a1b2c3d4-e5f6-4a5b-9c8d-7e6f5d4c3b2a',
  'admin@example.com'
);

-- Update organization members to use the correct user ID
UPDATE organization_members
SET user_id = 'a1b2c3d4-e5f6-4a5b-9c8d-7e6f5d4c3b2a'
WHERE user_id IS NULL;