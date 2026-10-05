export type Notice = {
  id: string;
  title_hi: string;
  title_en: string;
  content_hi: string;
  content_en: string;
  date: string;
  is_important: boolean;
  created_at: string;
  updated_at: string;
};

export type SchoolEvent = {
  id: string;
  title_hi: string;
  title_en: string;
  description_hi: string;
  description_en: string;
  date: string;
  category: string;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
};

export type GalleryPhoto = {
  id: string;
  src: string;
  category_en: string;
  category_hi: string;
  label_en: string | null;
  label_hi: string | null;
  event_date: string | null;
  created_at: string;
  updated_at: string;
};

export type PrincipalInfo = {
  id: string;
  name_hi: string;
  name_en: string;
  role_hi: string;
  role_en: string;
  message_hi: string;
  message_en: string;
  photo_url: string | null;
  updated_at: string;
};

export const GALLERY_CATEGORIES_EN = [
  'School Events',
  'Independence Day',
  'Student Activities',
  'Principal & Teachers',
  'Labs',
  'Library',
  'School Campus',
  'Cultural Activities',
  'Creative Activities',
  'Group Photos',
  'Student Achievements',
];

export const GALLERY_CATEGORIES_HI = [
  'विद्यालय कार्यक्रम',
  'स्वतंत्रता दिवस',
  'विद्यार्थी गतिविधियाँ',
  'प्रधानाचार्य एवं शिक्षक',
  'प्रयोगशालाएँ',
  'पुस्तकालय',
  'विद्यालय परिसर',
  'सांस्कृतिक गतिविधियाँ',
  'रचनात्मक गतिविधियाँ',
  'समूह चित्र',
  'विद्यार्थी उपलब्धियाँ',
];
