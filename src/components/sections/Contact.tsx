import { MapPin, Mail, User, Navigation, ExternalLink, Facebook } from 'lucide-react';
import { useLang } from '@/LanguageContext';
import { Section, SectionHeading } from '@/components/Section';
import { useReveal } from '@/hooks/useReveal';

const MAPS_LINK = 'https://www.google.com/maps/place/Shree+Sarasvati+Inter+College+Titron+Saharanpur/@29.6661358,77.3268782,17z/';
const FB_LINK = 'https://www.facebook.com/p/Shri-Saraswati-Inter-College-Titron-Saharanpur-61552788050177/';

export function Contact() {
  const { t, lang } = useLang();
  const { ref, visible } = useReveal();

  const info = [
    { icon: MapPin, label: t.contact.addressLabel, value: t.contact.address },
    { icon: Mail, label: t.contact.emailLabel, value: t.contact.email, href: `mailto:${t.contact.email}` },
    { icon: User, label: t.contact.principalLabel, value: t.contact.principal },
  ];

  return (
    <Section id="contact" className="bg-white">
      <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} subtitle={t.contact.subtitle} />

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-stretch">
        {/* Info */}
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
          <div className="space-y-4">
            {info.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
                  {href ? (
                    <a href={href} className={`mt-0.5 block text-sm font-semibold text-brand-700 hover:text-brand-800 ${lang === 'hi' ? 'font-hindi' : ''}`}>
                      {value}
                    </a>
                  ) : (
                    <p className={`mt-0.5 text-sm font-semibold text-brand-900 ${lang === 'hi' ? 'font-hindi' : ''}`}>{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1">
              <Navigation className="h-4 w-4" />
              {t.contact.directions}
            </a>
            <a href={`mailto:${t.contact.email}`} className="btn-outline flex-1">
              <Mail className="h-4 w-4" />
              {t.contact.emailUs}
            </a>
          </div>

          {/* Facebook */}
          <a
            href={FB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#1877F2] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1877F2]/20 transition-all hover:-translate-y-0.5 hover:bg-[#166FE5]"
          >
            <Facebook className="h-4 w-4" />
            {t.social.facebook}
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>
        </div>

        {/* Map */}
        <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between bg-brand-800 px-5 py-3">
            <span className="flex items-center gap-2 text-sm font-semibold text-white">
              <MapPin className="h-4 w-4 text-gold-300" />
              {t.contact.mapTitle}
            </span>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-gold-200 hover:text-white">
              {lang === 'hi' ? 'बड़ा नक्शा' : 'Larger map'}
            </a>
          </div>
          <div className="min-h-[360px] flex-1 lg:min-h-[500px]">
            <iframe
              title={t.contact.mapTitle}
              src="https://www.google.com/maps?q=Shree+Sarasvati+Inter+College+Titron+Saharanpur&z=15&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
