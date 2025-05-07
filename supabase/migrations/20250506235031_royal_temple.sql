/*
  # Create storage buckets for files

  1. New Buckets
    - `certificates`: For storing student certification files
    - `student-photos`: For storing student profile photos
    - `organization-logos`: For storing organization logos

  2. Security
    - Enable public access for organization logos
    - Restrict access to certificates and student photos to authenticated users
    - Allow admin users to upload/delete files
*/

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES
  (
    'certificates',
    'certificates',
    false,
    false,
    5242880, -- 5MB limit
    ARRAY['application/pdf', 'image/jpeg', 'image/png']::text[]
  ),
  (
    'student-photos',
    'student-photos',
    false,
    false,
    2097152, -- 2MB limit
    ARRAY['image/jpeg', 'image/png']::text[]
  ),
  (
    'organization-logos',
    'organization-logos',
    true, -- Public access enabled
    false,
    1048576, -- 1MB limit
    ARRAY['image/jpeg', 'image/png', 'image/svg+xml']::text[]
  );

-- Policies for certificates bucket
CREATE POLICY "Allow public read access for organization logos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'organization-logos');

CREATE POLICY "Allow authenticated read access for certificates"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'certificates');

CREATE POLICY "Allow authenticated read access for student photos"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'student-photos');

CREATE POLICY "Allow admin users to upload files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id IN ('certificates', 'student-photos', 'organization-logos')
    AND auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Allow admin users to update files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id IN ('certificates', 'student-photos', 'organization-logos')
    AND auth.jwt() ->> 'role' = 'admin'
  )
  WITH CHECK (
    bucket_id IN ('certificates', 'student-photos', 'organization-logos')
    AND auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Allow admin users to delete files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id IN ('certificates', 'student-photos', 'organization-logos')
    AND auth.jwt() ->> 'role' = 'admin'
  );