/*
# Admin Panel Tables — Notices, Events, Gallery Photos, Principal/Staff Info

## Purpose
This migration creates the database tables that power the school website's
admin panel. The admin (website owner) can log in via Supabase Auth and then
add, edit, and delete notices, events, gallery photos, and principal/staff
information. Public visitors can READ all of this data but cannot write.

## New Tables

1. `notices`
   - `id` (uuid PK)
   - `title_hi` / `title_en` — bilingual title
   - `content_hi` / `content_en` — bilingual body
   - `date` (text) — display date (e.g. "15 August 2026")
   - `is_important` (boolean) — marks as the highlighted/featured notice
   - `created_at` / `updated_at`

2. `events`
   - `id` (uuid PK)
   - `title_hi` / `title_en`
   - `description_hi` / `description_en`
   - `date` (text) — display date (optional)
   - `category` (text)
   - `photo_url` (text, optional)
   - `created_at` / `updated_at`

3. `gallery_photos`
   - `id` (uuid PK)
   - `src` (text) — image URL or /images/ path
   - `category_en` (text)
   - `category_hi` (text)
   - `label_en` (text, optional)
   - `label_hi` (text, optional)
   - `event_date` (text, optional)
   - `created_at` / `updated_at`

4. `principal_info`
   - `id` (uuid PK, single row — we use a fixed UUID)
   - `name_hi` / `name_en`
   - `role_hi` / `role_en`
   - `message_hi` / `message_en`
   - `photo_url` (text, optional — null means placeholder)
   - `updated_at`

## Security (RLS)

All tables have RLS enabled.

- **SELECT**: `TO anon, authenticated` — public visitors can read all data.
  This is intentional: the website is public content.
- **INSERT / UPDATE / DELETE**: `TO authenticated` only — only a logged-in
  admin can modify data. Any authenticated user can write (the admin is the
  only authenticated user in this single-admin setup).

## Notes
- No `user_id` columns are needed — this is a single-admin app where any
  authenticated user IS the admin.
- The `principal_info` table stores a single row with a fixed UUID
  ('00000000-0000-0000-0000-000000000001') so the frontend can upsert it.
*/

-- ===== NOTICES =====
CREATE TABLE IF NOT EXISTS notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_hi text NOT NULL DEFAULT '',
  title_en text NOT NULL DEFAULT '',
  content_hi text NOT NULL DEFAULT '',
  content_en text NOT NULL DEFAULT '',
  date text NOT NULL DEFAULT '',
  is_important boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_notices" ON notices;
CREATE POLICY "public_read_notices" ON notices FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_notices" ON notices;
CREATE POLICY "admin_insert_notices" ON notices FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_notices" ON notices;
CREATE POLICY "admin_update_notices" ON notices FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_notices" ON notices;
CREATE POLICY "admin_delete_notices" ON notices FOR DELETE
  TO authenticated USING (true);

-- ===== EVENTS =====
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_hi text NOT NULL DEFAULT '',
  title_en text NOT NULL DEFAULT '',
  description_hi text NOT NULL DEFAULT '',
  description_en text NOT NULL DEFAULT '',
  date text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  photo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_events" ON events;
CREATE POLICY "public_read_events" ON events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_events" ON events;
CREATE POLICY "admin_insert_events" ON events FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_events" ON events;
CREATE POLICY "admin_update_events" ON events FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_events" ON events;
CREATE POLICY "admin_delete_events" ON events FOR DELETE
  TO authenticated USING (true);

-- ===== GALLERY PHOTOS =====
CREATE TABLE IF NOT EXISTS gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  src text NOT NULL,
  category_en text NOT NULL DEFAULT '',
  category_hi text NOT NULL DEFAULT '',
  label_en text,
  label_hi text,
  event_date text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_gallery" ON gallery_photos;
CREATE POLICY "public_read_gallery" ON gallery_photos FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_gallery" ON gallery_photos;
CREATE POLICY "admin_insert_gallery" ON gallery_photos FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_gallery" ON gallery_photos;
CREATE POLICY "admin_update_gallery" ON gallery_photos FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_gallery" ON gallery_photos;
CREATE POLICY "admin_delete_gallery" ON gallery_photos FOR DELETE
  TO authenticated USING (true);

-- ===== PRINCIPAL INFO =====
CREATE TABLE IF NOT EXISTS principal_info (
  id uuid PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001',
  name_hi text NOT NULL DEFAULT 'श्री प्रदीप चौहान',
  name_en text NOT NULL DEFAULT 'Pradeep Chauhan',
  role_hi text NOT NULL DEFAULT 'प्रधानाचार्य, श्री सरस्वती इंटर कॉलेज',
  role_en text NOT NULL DEFAULT 'Principal, Shri Saraswati Inter College',
  message_hi text NOT NULL DEFAULT '',
  message_en text NOT NULL DEFAULT '',
  photo_url text,
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE principal_info ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_principal" ON principal_info;
CREATE POLICY "public_read_principal" ON principal_info FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_principal" ON principal_info;
CREATE POLICY "admin_update_principal" ON principal_info FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_insert_principal" ON principal_info;
CREATE POLICY "admin_insert_principal" ON principal_info FOR INSERT
  TO authenticated WITH CHECK (true);

-- Seed the single principal_info row with default values
INSERT INTO principal_info (id, message_hi, message_en)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'हमारे विद्यालय का उद्देश्य विद्यार्थियों को गुणवत्तापूर्ण शिक्षा के साथ-साथ संस्कार, अनुशासन, नैतिक मूल्यों एवं जिम्मेदारी की भावना से परिपूर्ण करना है। हमारा विश्वास है कि प्रत्येक विद्यार्थी में असीम संभावनाएँ होती हैं। उचित मार्गदर्शन, निरंतर प्रयास और सकारात्मक सोच के माध्यम से वे अपने लक्ष्यों को प्राप्त कर सकते हैं।\n\nहम विद्यालय में ऐसा वातावरण प्रदान करने के लिए प्रतिबद्ध हैं, जहाँ विद्यार्थी ज्ञान के साथ-साथ रचनात्मकता, वैज्ञानिक दृष्टिकोण, तकनीकी दक्षता और सामाजिक जिम्मेदारी भी विकसित करें।\n\nआइए, हम सब मिलकर विद्यार्थियों के उज्ज्वल भविष्य और राष्ट्र के निर्माण में अपना योगदान दें।',
  'The purpose of our school is to provide students with quality education along with संस्कार, discipline, moral values, and a sense of responsibility. We believe that every student has limitless potential. With proper guidance, consistent effort, and positive thinking, they can achieve their goals.\n\nWe are committed to creating an environment where students develop creativity, a scientific outlook, technical skills, and social responsibility along with knowledge.\n\nLet us work together for the bright future of our students and contribute to the building of our nation.'
)
ON CONFLICT (id) DO NOTHING;

-- Seed the existing Independence Day notice
INSERT INTO notices (title_hi, title_en, content_hi, content_en, date, is_important)
VALUES (
  'स्वतंत्रता दिवस — 15 अगस्त 2026',
  'Independence Day — 15 August 2026',
  '15 अगस्त 2026 को स्वतंत्रता दिवस के अवसर पर विद्यालय में कार्यक्रम आयोजित किया जाएगा।',
  'A programme will be organised at the school on the occasion of Independence Day on 15 August 2026.',
  '15 August 2026',
  true
)
ON CONFLICT DO NOTHING;

-- Seed existing gallery photos from the uploaded images
INSERT INTO gallery_photos (src, category_en, category_hi, label_en, label_hi) VALUES
  ('/images/SSIC6.jpeg', 'School Events', 'विद्यालय कार्यक्रम', 'School Event', 'विद्यालय कार्यक्रम'),
  ('/images/SSIC7.jpeg', 'Student Activities', 'विद्यार्थी गतिविधियाँ', 'Student Activities', 'विद्यार्थी गतिविधियाँ'),
  ('/images/PRINCIPAL.jpeg', 'Principal & Teachers', 'प्रधानाचार्य एवं शिक्षक', 'Principal & Teachers', 'प्रधानाचार्य एवं शिक्षक'),
  ('/images/SSIC3.jpeg', 'Creative Activities', 'रचनात्मक गतिविधियाँ', 'Creative Activities', 'रचनात्मक गतिविधियाँ'),
  ('/images/WhatsApp_Image_2026-08-13_at_2.51.42_PM.jpeg', 'Group Photos', 'समूह चित्र', 'Group Photo', 'समूह चित्र')
ON CONFLICT DO NOTHING;
