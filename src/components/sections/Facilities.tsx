import { Cpu, Library, FlaskConical, Monitor, School, Dumbbell, Building2 } from 'lucide-react';
import { useLang } from '@/LanguageContext';
import { Section, SectionHeading } from '@/components/Section';
import { useReveal } from '@/hooks/useReveal';

type FacilityItem = {
  name: string;
  desc: string;
  icon: typeof Library;
};

const FACILITY_ICONS: Record<string, typeof Library> = {
  'पुस्तकालय': Library,
  'Library': Library,
  'विज्ञान प्रयोगशाला': FlaskConical,
  'Science Laboratory': FlaskConical,
  'कंप्यूटर लैब': Cpu,
  'Computer Lab': Cpu,
  'कक्षाएँ': School,
  'Classrooms': School,
  'खेलकूद': Dumbbell,
  'Sports': Dumbbell,
  'विद्यालय परिसर': Building2,
  'School Campus': Building2,
};

export function Facilities() {
  const { t, lang } = useLang();
  const { ref, visible } = useReveal();

  const items: FacilityItem[] = t.facilities.items.map((item) => {
    const icon = FACILITY_ICONS[item.name] ?? Building2;
    return { ...item, icon };
  });

  return (
    <Section id="facilities" className="bg-slate-50">
      <SectionHeading eyebrow={t.facilities.eyebrow} title={t.facilities.title} subtitle={t.facilities.subtitle} />

      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3`}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.name} className="card overflow-hidden">
              <div className="flex aspect-16/10 w-full items-center justify-center bg-gradient-to-br from-brand-50 to-slate-100">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-brand-400 shadow-sm">
                  <Icon className="h-8 w-8" strokeWidth={1.2} />
                </span>
              </div>
              <div className="p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-100 text-brand-700">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className={`mt-4 text-lg font-bold text-brand-900 ${lang === 'hi' ? 'font-hindi' : ''}`}>{item.name}</h3>
                <p className={`mt-2 text-sm leading-relaxed text-slate-600 ${lang === 'hi' ? 'font-hindi' : ''}`}>{item.desc}</p>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
