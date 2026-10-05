import { useEffect, useState } from 'react';
import { Quote, User } from 'lucide-react';
import { useLang } from '@/LanguageContext';
import { Section, SectionHeading } from '@/components/Section';
import { useReveal } from '@/hooks/useReveal';
import { supabase } from '@/lib/supabase';
import type { PrincipalInfo } from '@/lib/types';

const PRINCIPAL_ID = '00000000-0000-0000-0000-000000000001';

export function Principal() {
  const { t, lang } = useLang();
  const { ref, visible } = useReveal();
  const [info, setInfo] = useState<PrincipalInfo | null>(null);

  useEffect(() => {
    supabase
      .from('principal_info')
      .select('*')
      .eq('id', PRINCIPAL_ID)
      .maybeSingle()
      .then(({ data }) => setInfo(data));
  }, []);

  const isHi = lang === 'hi';
  const name = info ? (isHi ? info.name_hi : info.name_en) : t.principal.name;
  const role = info ? (isHi ? info.role_hi : info.role_en) : t.principal.role;
  const message = info ? (isHi ? info.message_hi : info.message_en) : t.principal.message;
  const photoUrl = info?.photo_url;

  const paragraphs = message.split('\n\n');

  return (
    <Section id="principal" className="bg-slate-50">
      <SectionHeading eyebrow={t.principal.eyebrow} title={t.principal.title} />

      <div
        ref={ref}
        className={`reveal ${visible ? 'is-visible' : ''} mx-auto mt-14 grid max-w-5xl items-center gap-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-[280px_1fr]`}
      >
        {/* Photo */}
        <div className="mx-auto w-full max-w-[280px]">
          <div className="aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={t.principal.photoAlt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-slate-400">
                <User className="h-12 w-12" strokeWidth={1} />
                <span className={`text-xs ${isHi ? 'font-hindi' : ''}`}>
                  {isHi ? 'फोटो जल्द अपलोड किया जाएगा' : 'Photo coming soon'}
                </span>
              </div>
            )}
          </div>
          <div className="mt-4 text-center">
            <p className={`text-lg font-bold text-brand-900 ${isHi ? 'font-hindi' : ''}`}>{name}</p>
            <p className={`mt-1 text-sm text-gold-700 ${isHi ? 'font-hindi' : ''}`}>{role}</p>
          </div>
        </div>

        {/* Message */}
        <div className="relative">
          <Quote className="h-10 w-10 text-gold-300" />
          <div className="mt-4 rounded-2xl border border-gold-200 bg-gold-50/40 p-6">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className={`text-base leading-relaxed text-slate-700 sm:text-lg ${isHi ? 'font-hindi' : ''} ${i > 0 ? 'mt-4' : ''}`}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
