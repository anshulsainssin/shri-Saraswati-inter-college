import { useEffect, useState } from 'react';
import { FileText, Flag, Loader2 } from 'lucide-react';
import { useLang } from '@/LanguageContext';
import { Section, SectionHeading } from '@/components/Section';
import { useReveal } from '@/hooks/useReveal';
import { supabase } from '@/lib/supabase';
import type { Notice } from '@/lib/types';

export function Notices() {
  const { t, lang } = useLang();
  const { ref, visible } = useReveal();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('notices')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setNotices(data ?? []);
        setLoading(false);
      });
  }, []);

  const isHi = lang === 'hi';
  const important = notices.find((n) => n.is_important);
  const rest = notices.filter((n) => !n.is_important);

  return (
    <Section id="notices" className="bg-white">
      <SectionHeading eyebrow={t.notices.eyebrow} title={t.notices.title} subtitle={t.notices.subtitle} />

      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mt-12`}>
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
          </div>
        ) : (
          <>
            {/* Current important notice */}
            {important && (
              <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border-2 border-brand-200 bg-gradient-to-br from-brand-50 to-white shadow-md">
                <div className="flex items-center gap-3 bg-brand-700 px-6 py-3">
                  <Flag className="h-5 w-5 text-gold-300" />
                  <span className={`text-sm font-bold uppercase tracking-wider text-white ${isHi ? 'font-hindi' : ''}`}>
                    {t.notices.currentLabel}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className={`text-lg font-bold text-brand-900 sm:text-xl ${isHi ? 'font-hindi' : ''}`}>
                    {isHi ? important.title_hi : important.title_en}
                  </h3>
                  {important.date && <p className="mt-1 text-xs text-slate-400">{important.date}</p>}
                  <p className={`mt-3 text-base leading-relaxed text-slate-600 ${isHi ? 'font-hindi' : ''}`}>
                    {isHi ? important.content_hi : important.content_en}
                  </p>
                  {t.notices.currentNote && (
                    <p className={`mt-3 flex items-center gap-1.5 text-sm font-medium text-brand-600 ${isHi ? 'font-hindi' : ''}`}>
                      <Flag className="h-3.5 w-3.5" />
                      {t.notices.currentNote}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Additional notices */}
            {rest.length > 0 && (
              <div className={`mt-8 grid gap-5 md:grid-cols-2 ${important ? '' : 'mx-auto max-w-4xl'}`}>
                {rest.map((n) => (
                  <article key={n.id} className="card p-6">
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold-100 text-gold-700">
                        <FileText className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className={`text-base font-bold text-brand-900 ${isHi ? 'font-hindi' : ''}`}>
                          {isHi ? n.title_hi : n.title_en}
                        </h3>
                        {n.date && <p className="text-xs text-slate-400">{n.date}</p>}
                      </div>
                    </div>
                    <p className={`mt-3 text-sm leading-relaxed text-slate-600 ${isHi ? 'font-hindi' : ''}`}>
                      {isHi ? n.content_hi : n.content_en}
                    </p>
                  </article>
                ))}
              </div>
            )}

            {!loading && notices.length === 0 && (
              <div className="mx-auto max-w-md rounded-2xl border-2 border-dashed border-slate-300 p-10 text-center text-slate-500">
                {t.notices.subtitle}
              </div>
            )}
          </>
        )}
      </div>
    </Section>
  );
}
