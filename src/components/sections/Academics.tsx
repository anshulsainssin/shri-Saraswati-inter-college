import { BookOpen, GraduationCap, Languages, Atom, FlaskConical, Palette } from 'lucide-react';
import { useLang } from '@/LanguageContext';
import { Section, SectionHeading } from '@/components/Section';
import { useReveal } from '@/hooks/useReveal';

const STREAM_ICONS = [Atom, FlaskConical, Palette];
const STREAM_COLORS = ['bg-brand-100 text-brand-700', 'bg-green-100 text-green-700', 'bg-gold-100 text-gold-700'];

export function Academics() {
  const { t, lang } = useLang();
  const { ref, visible } = useReveal();
  const isHi = lang === 'hi';

  return (
    <Section id="academics" className="bg-white">
      <SectionHeading eyebrow={t.academics.eyebrow} title={t.academics.title} subtitle={t.academics.subtitle} />

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {/* Board & Medium */}
        <div className="card flex flex-col gap-6 p-6">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-100 text-brand-700">
              <GraduationCap className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">{t.academics.board}</p>
              <p className={`text-sm font-semibold text-brand-900 ${isHi ? 'font-hindi' : ''}`}>{t.academics.boardValue}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-100 text-gold-700">
              <Languages className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">{t.academics.medium}</p>
              <p className="text-sm font-semibold text-brand-900">{t.academics.mediumValue}</p>
            </div>
          </div>
        </div>

        {/* Classes grid */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand-700" />
            <h3 className="heading-3">{isHi ? 'कक्षाएँ' : 'Classes'}</h3>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {t.academics.classes.map((cls, i) => (
              <div
                key={cls}
                className="group flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 text-center transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-md"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-700 text-sm font-bold text-white transition-transform group-hover:scale-110">
                  {i + 6}
                </span>
                <span className={`mt-2 text-sm font-semibold text-brand-900 ${isHi ? 'font-hindi' : ''}`}>{cls}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Streams */}
      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mt-10`}>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-brand-700" />
          <h3 className="heading-3">{t.academics.streamTitle}</h3>
        </div>
        <p className={`mt-2 text-sm text-slate-600 sm:text-base ${isHi ? 'font-hindi' : ''}`}>{t.academics.streamSubtitle}</p>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {t.academics.streams.map((stream, i) => {
            const Icon = STREAM_ICONS[i] ?? Atom;
            const colorClass = STREAM_COLORS[i] ?? STREAM_COLORS[0];
            return (
              <div
                key={stream.name}
                className="group rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className={`grid h-12 w-12 place-items-center rounded-xl ${colorClass} transition-transform group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h4 className="text-lg font-bold text-brand-900">{stream.name}</h4>
                    <p className={`text-xs text-slate-500 ${isHi ? 'font-hindi' : ''}`}>{stream.fullName}</p>
                  </div>
                </div>
                <p className={`mt-4 text-sm leading-relaxed text-slate-600 ${isHi ? 'font-hindi' : ''}`}>{stream.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
