import { Trophy, Laptop, Newspaper, Users, Building2, ImageOff } from 'lucide-react';
import { useLang } from '@/LanguageContext';
import { Section, SectionHeading } from '@/components/Section';
import { useReveal } from '@/hooks/useReveal';

const ITEM_ICONS = [Building2, Users, Laptop, Newspaper];
const PHOTO_SOURCES = ['/images/annui.jpeg', '/images/hlo.jpeg', '/images/r.jpeg', '/images/news.jpeg'];

export function Achievements() {
  const { t, lang } = useLang();
  const { ref, visible } = useReveal();
  const isHi = lang === 'hi';

  return (
    <Section id="achievements" className="bg-slate-50">
      <SectionHeading eyebrow={t.achievements.eyebrow} title={t.achievements.title} subtitle={t.achievements.subtitle} />

      {/* CodeYogi subsection */}
      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mt-12`}>
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-100 text-brand-700">
              <Trophy className="h-6 w-6" />
            </span>
            <div>
              <h3 className={`text-lg font-bold text-brand-900 sm:text-xl ${isHi ? 'font-hindi' : ''}`}>
                {t.achievements.codeyogiTitle}
              </h3>
              <p className={`mt-1 text-sm text-slate-500 ${isHi ? 'font-hindi' : ''}`}>
                {t.achievements.codeyogiSubtitle}
              </p>
            </div>
          </div>

          {/* Photo placeholders grid */}
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {t.achievements.codeyogiItems.map((item, i) => {
              const Icon = ITEM_ICONS[i] ?? ImageOff;
              return (
                <div key={i} className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="aspect-square w-full overflow-hidden bg-slate-100">
                    {PHOTO_SOURCES[i] ? (
                      <img src={PHOTO_SOURCES[i]} alt={item.label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
                        <Icon className="h-10 w-10" strokeWidth={1.2} />
                        <span className={`px-2 text-center text-xs font-medium ${isHi ? 'font-hindi' : ''}`}>
                          {t.achievements.photoSoon}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Label */}
                  <div className="p-3">
                    <p className={`text-sm font-semibold text-brand-900 ${isHi ? 'font-hindi' : ''}`}>{item.label}</p>
                    <p className={`mt-0.5 text-xs leading-snug text-slate-500 ${isHi ? 'font-hindi' : ''}`}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
