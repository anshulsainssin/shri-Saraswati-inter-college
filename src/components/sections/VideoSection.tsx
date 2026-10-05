import { Flag, Megaphone } from 'lucide-react';
import { useLang } from '@/LanguageContext';
import { Section, SectionHeading } from '@/components/Section';
import { useReveal } from '@/hooks/useReveal';

export function VideoSection() {
  const { t, lang } = useLang();
  const { ref, visible } = useReveal();
  const isHi = lang === 'hi';

  return (
    <Section id="video" className="bg-slate-50">
      <SectionHeading eyebrow={t.video.eyebrow} title={t.video.title} subtitle={t.video.subtitle} />

      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mt-12 space-y-10`}>
        {/* Independence Day video */}
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 bg-brand-700 px-6 py-3">
            <Flag className="h-5 w-5 text-gold-300" />
            <span className={`text-sm font-bold uppercase tracking-wider text-white ${isHi ? 'font-hindi' : ''}`}>
              {isHi ? 'स्वतंत्रता दिवस समारोह 2026' : 'Independence Day Celebration 2026'}
            </span>
          </div>
          <div className="aspect-video w-full bg-black">
            <video
              src="/videos/ssic-15-august-video.mp4"
              controls
              preload="metadata"
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-5">
            <p className={`text-sm leading-relaxed text-slate-600 ${isHi ? 'font-hindi' : ''}`}>
              {isHi
                ? '15 अगस्त 2026 को विद्यालय में स्वतंत्रता दिवस के अवसर पर आयोजित कार्यक्रम की झलक।'
                : 'A glimpse of the Independence Day programme organised at the school on 15 August 2026.'}
            </p>
          </div>
        </div>

        {/* Prabhat Feri / Student Rally */}
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 bg-gold-500/90 px-6 py-3">
            <Megaphone className="h-5 w-5 text-brand-900" />
            <span className={`text-sm font-bold uppercase tracking-wider text-brand-900 ${isHi ? 'font-hindi' : ''}`}>
              {isHi ? 'प्रभात फेरी / छात्र रैली' : 'Prabhat Feri / Student Rally'}
            </span>
          </div>
          <div className="aspect-video w-full bg-black">
            <video
              src="/videos/ssic-main-video.mp4"
              controls
              preload="metadata"
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-5">
            <p className={`text-sm leading-relaxed text-slate-600 ${isHi ? 'font-hindi' : ''}`}>
              {isHi
                ? 'स्वतंत्रता दिवस के अवसर पर विद्यार्थियों द्वारा निकाली गई प्रभात फेरी / छात्र रैली।'
                : 'A Prabhat Feri / student rally taken out by students on the occasion of Independence Day.'}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
