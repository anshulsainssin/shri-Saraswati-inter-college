import { ArrowRight, CalendarDays, ChevronDown, GraduationCap, BookOpen, Award, Globe2 } from 'lucide-react';
import { useLang } from '@/LanguageContext';

export function Hero() {
  const { t, lang } = useLang();

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const quickCards = [
    { icon: Award, label: t.quick.establishedLabel, value: t.quick.established },
    { icon: BookOpen, label: t.quick.classesLabel, value: t.quick.classes },
    { icon: GraduationCap, label: t.quick.boardLabel, value: t.quick.board },
    { icon: Globe2, label: t.quick.mediumLabel, value: t.quick.medium },
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-brand-950 pt-28 lg:pt-36">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-brand-700/30 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950/40 via-brand-950/70 to-brand-950" />

      <div className="container-x relative pb-16 pt-10 lg:pb-24 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              {lang === 'hi' ? 'यूपी बोर्ड • स्थापित 1954' : 'UP Board • Est. 1954'}
            </span>
            <h1
              className={`mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl ${
                lang === 'hi' ? 'font-hindi' : 'font-serif'
              }`}
            >
              {t.hero.name}
            </h1>
            <p className="mt-3 text-lg font-medium text-brand-200 sm:text-xl">{t.hero.location}</p>
            <p className="mx-auto mt-6 max-w-xl text-lg italic text-gold-200 lg:mx-0">{t.hero.tagline}</p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <button onClick={() => go('about')} className="btn-gold group w-full sm:w-auto">
                {t.hero.about}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => go('admissions')} className="btn-outline w-full border-white/30 bg-white/5 text-white hover:border-white hover:bg-white/10 hover:text-white sm:w-auto">
                <CalendarDays className="h-4 w-4" />
                {t.hero.admission}
              </button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="aspect-4/5 w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-2xl lg:aspect-square lg:max-w-none">
              <img
                src="/images/ChatGPT_Image_Aug_15,_2026,_06_40_32_PM.png"
                alt={lang === 'hi' ? 'विद्यालय भवन' : 'School building'}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-100 text-gold-700">
                  <Award className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs text-slate-500">{t.quick.establishedLabel}</p>
                  <p className="text-sm font-bold text-brand-900">{t.quick.established}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick info cards */}
        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {quickCards.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="group rounded-2xl border border-white/15 bg-white/5 p-5 text-center backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gold-400/20 text-gold-300 transition-colors group-hover:bg-gold-400/30">
                <Icon className="h-6 w-6" />
              </span>
              <p className="mt-3 text-xs uppercase tracking-wider text-brand-200">{label}</p>
              <p className="mt-1 text-sm font-bold text-white sm:text-base">{value}</p>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => go('about')}
            className="flex flex-col items-center gap-1 text-brand-200/60 transition-colors hover:text-white"
            aria-label={t.hero.scroll}
          >
            <span className="text-xs">{t.hero.scroll}</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
