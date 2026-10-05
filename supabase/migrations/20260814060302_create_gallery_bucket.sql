/*
# Create gallery storage bucket for admin photo uploads

## Purpose
Creates a public storage bucket named "gallery" so the admin can upload
photos (gallery images, event photos, principal photo) through the admin
panel. The bucket is public so website visitors can view the images.

## Changes
- Create bucket "gallery" if it doesn't exist
- Set public read access
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read
DROP POLICY IF EXISTS "public_read_gallery_bucket" ON storage.objects;
CREATE POLICY "public_read_gallery_bucket" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'gallery');

-- Allow authenticated upload
DROP POLICY IF EXISTS "admin_upload_gallery_bucket" ON storage.objects;
CREATE POLICY "admin_upload_gallery_bucket" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'gallery');

-- Allow authenticated update (for upsert)
DROP POLICY IF EXISTS "admin_update_gallery_bucket" ON storage.objects;
CREATE POLICY "admin_update_gallery_bucket" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'gallery') WITH CHECK (bucket_id = 'gallery');

-- Allow authenticated delete
DROP POLICY IF EXISTS "admin_delete_gallery_bucket" ON storage.objects;
CREATE POLICY "admin_delete_gallery_bucket" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'gallery');
