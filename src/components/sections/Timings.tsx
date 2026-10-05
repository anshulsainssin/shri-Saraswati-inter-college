import { Snowflake, Sun, Clock } from 'lucide-react';
import { useLang } from '@/LanguageContext';
import { Section, SectionHeading } from '@/components/Section';
import { useReveal } from '@/hooks/useReveal';

export function Timings() {
  const { t, lang } = useLang();
  const { ref, visible } = useReveal();

  return (
    <Section id="timings" className="bg-white">
      <SectionHeading eyebrow={t.timings.eyebrow} title={t.timings.title} subtitle={t.timings.subtitle} />

      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2`}>
        {/* Winter */}
        <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-50 to-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-100/60 blur-2xl" />
          <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-brand-700 text-white shadow-lg shadow-brand-700/30">
            <Snowflake className="h-7 w-7" />
          </span>
          <h3 className={`relative mt-5 text-xl font-bold text-brand-900 ${lang === 'hi' ? 'font-hindi' : ''}`}>{t.timings.winter}</h3>
          <p className="relative mt-1 text-sm font-medium text-slate-500">{t.timings.winterMonths}</p>
          <div className="relative mt-5 flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm">
            <Clock className="h-5 w-5 text-brand-600" />
            <span className="text-lg font-bold text-brand-800">{t.timings.winterTime}</span>
          </div>
        </div>

        {/* Summer */}
        <div className="group relative overflow-hidden rounded-3xl border border-gold-200 bg-gradient-to-br from-gold-50 to-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold-100/60 blur-2xl" />
          <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gold-500 text-brand-950 shadow-lg shadow-gold-500/30">
            <Sun className="h-7 w-7" />
          </span>
          <h3 className={`relative mt-5 text-xl font-bold text-brand-900 ${lang === 'hi' ? 'font-hindi' : ''}`}>{t.timings.summer}</h3>
          <p className="relative mt-1 text-sm font-medium text-slate-500">{t.timings.summerMonths}</p>
          <div className="relative mt-5 flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm">
            <Clock className="h-5 w-5 text-gold-600" />
            <span className="text-lg font-bold text-gold-800">{t.timings.summerTime}</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
