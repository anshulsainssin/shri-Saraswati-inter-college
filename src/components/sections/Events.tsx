import { useEffect, useState } from 'react';
import { CalendarDays, Loader2 } from 'lucide-react';
import { useLang } from '@/LanguageContext';
import { Section, SectionHeading } from '@/components/Section';
import { useReveal } from '@/hooks/useReveal';
import { supabase } from '@/lib/supabase';
import type { SchoolEvent } from '@/lib/types';

export function Events() {
  const { t, lang } = useLang();
  const { ref, visible } = useReveal();
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setEvents(data ?? []);
        setLoading(false);
      });
  }, []);

  const isHi = lang === 'hi';

  return (
    <Section id="events" className="bg-slate-50">
      <SectionHeading eyebrow={t.events.eyebrow} title={t.events.title} subtitle={t.events.subtitle} />

      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mt-12`}>
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
          </div>
        ) : events.length === 0 ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-10 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-brand-400">
              <CalendarDays className="h-8 w-8" strokeWidth={1.4} />
            </span>
            <p className={`text-base font-medium text-slate-500 ${isHi ? 'font-hindi' : ''}`}>{t.events.empty}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <article key={e.id} className="card overflow-hidden">
                {e.photo_url ? (
                  <div className="aspect-16/10 w-full overflow-hidden">
                    <img src={e.photo_url} alt={isHi ? e.title_hi : e.title_en} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="placeholder-box aspect-16/10 w-full rounded-none border-x-0 border-t-0">
                    <CalendarDays className="h-10 w-10" strokeWidth={1.2} />
                  </div>
                )}
                <div className="p-5">
                  {e.category && (
                    <span className="inline-block rounded-full bg-gold-100 px-3 py-1 text-xs font-medium text-gold-700">{e.category}</span>
                  )}
                  <h3 className={`mt-3 text-base font-bold text-brand-900 ${isHi ? 'font-hindi' : ''}`}>
                    {isHi ? e.title_hi : e.title_en}
                  </h3>
                  {e.date && <p className="text-xs text-slate-400">{e.date}</p>}
                  <p className={`mt-2 text-sm text-slate-600 ${isHi ? 'font-hindi' : ''}`}>
                    {isHi ? e.description_hi : e.description_en}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
