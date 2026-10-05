import { useEffect, useState } from 'react';
import { ImageOff, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useLang } from '@/LanguageContext';
import { Section, SectionHeading } from '@/components/Section';
import { useReveal } from '@/hooks/useReveal';
import { supabase } from '@/lib/supabase';
import type { GalleryPhoto } from '@/lib/types';

export function Gallery() {
  const { t, lang } = useLang();
  const { ref, visible } = useReveal();
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<string>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const isHi = lang === 'hi';

  useEffect(() => {
    supabase
      .from('gallery_photos')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPhotos(data ?? []);
        setLoading(false);
      });
  }, []);

  // Map each photo to the current language
  const items = photos.map((p) => ({
    category: isHi ? p.category_hi : p.category_en,
    label: isHi ? (p.label_hi ?? p.category_hi) : (p.label_en ?? p.category_en),
    src: p.src,
  }));

  // Build category list from the i18n categories that have photos
  const categoriesWithPhotos = t.gallery.categories.filter((cat) =>
    items.some((it) => it.category === cat)
  );

  const filtered = active === 'all' ? items : items.filter((it) => it.category === active);
  const tabs = ['all', ...categoriesWithPhotos];

  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const next = () => setLightbox((i) => (i === null ? null : (i + 1) % filtered.length));

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, filtered.length]);

  return (
    <Section id="gallery" className="bg-white">
      <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} subtitle={t.gallery.subtitle} />

      {/* Filter tabs */}
      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mt-10`}>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
          {tabs.map((tab) => {
            const isActive = active === tab;
            const label = tab === 'all' ? (isHi ? 'सभी' : 'All') : tab;
            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-700 text-white shadow-md shadow-brand-700/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700'
                } ${isHi ? 'font-hindi' : ''}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        </div>
      ) : filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <button
              key={item.category + i}
              onClick={() => setLightbox(i)}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
              aria-label={item.label}
            >
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-brand-950/80 via-brand-950/20 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <span className={`text-xs font-semibold text-white ${isHi ? 'font-hindi' : ''}`}>{item.label}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4 rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-10 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-slate-100 text-slate-400">
            <ImageOff className="h-8 w-8" strokeWidth={1.4} />
          </span>
          <p className={`text-base font-medium text-slate-500 ${isHi ? 'font-hindi' : ''}`}>{t.gallery.empty}</p>
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-950/90 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            aria-label={t.gallery.close}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label={t.gallery.prev}
            className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label={t.gallery.next}
            className="absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={filtered[lightbox].src}
                alt={filtered[lightbox].label}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>
            <p className={`mt-4 text-center text-sm font-semibold text-white ${isHi ? 'font-hindi' : ''}`}>
              {filtered[lightbox].label}
            </p>
          </div>
        </div>
      )}
    </Section>
  );
}
