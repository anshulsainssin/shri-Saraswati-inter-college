import { Building2, Calendar, GraduationCap, Languages, MapPin, School, User, BookMarked } from 'lucide-react';
import { useLang } from '@/LanguageContext';
import { Section, SectionHeading } from '@/components/Section';
import { useReveal } from '@/hooks/useReveal';

const FACT_ICONS = [Calendar, MapPin, Building2, GraduationCap, BookMarked, Languages, School, User];

export function About() {
  const { t, lang } = useLang();
  const { ref, visible } = useReveal();

  return (
    <Section id="about" className="bg-white">
      <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />

      <div className="mt-14 grid items-start gap-12 lg:grid-cols-2">
        {/* Text */}
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">{t.about.p1}</p>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{t.about.p2}</p>

          {/* Facts grid */}
          <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-gold-700">{t.about.factsTitle}</h3>
          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {t.about.facts.map((fact, i) => {
              const Icon = FACT_ICONS[i] ?? Building2;
              return (
                <div key={fact.label} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-100 text-brand-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{fact.label}</dt>
                    <dd className={`text-sm font-semibold text-brand-900 ${lang === 'hi' ? 'font-hindi' : ''}`}>{fact.value}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>

        {/* Journey timeline */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-700">{t.about.journeyTitle}</h3>
          <p className="mt-1 text-sm text-slate-500">{t.about.journeySubtitle}</p>

          <ol className="mt-6 space-y-8 border-l-2 border-dashed border-brand-200 pl-8">
            {t.about.journey.map((item, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[2.6rem] top-0 grid h-7 w-7 place-items-center rounded-full bg-gold-500 text-[10px] font-bold text-brand-950 shadow ring-4 ring-white" />
                <p className="text-sm font-bold text-brand-700">{item.year}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
