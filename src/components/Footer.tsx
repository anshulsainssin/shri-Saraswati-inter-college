import { GraduationCap, MapPin, Mail, Clock, Facebook, ArrowUpRight, Lock } from 'lucide-react';
import { useLang } from '@/LanguageContext';
import { navigate } from '@/lib/router';

const QUICK_LINKS = ['home', 'about', 'academics', 'facilities', 'gallery', 'notices', 'admissions', 'contact'] as const;
const FB_LINK = 'https://www.facebook.com/p/Shri-Saraswati-Inter-College-Titron-Saharanpur-61552788050177/';

export function Footer() {
  const { t, lang } = useLang();

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-brand-100">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-700/20 blur-3xl" />

      <div className="container-x relative py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* School */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-lg">
                <GraduationCap className="h-6 w-6" />
              </span>
              <div>
                <p className={`text-sm font-bold text-white ${lang === 'hi' ? 'font-hindi' : 'font-serif'}`}>{t.hero.name}</p>
                <p className="text-xs text-gold-300">{t.hero.location}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-brand-200">{t.footer.builtWith}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">{t.footer.quickLinks}</h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((id) => (
                <li key={id}>
                  <button
                    onClick={() => go(id)}
                    className={`group flex items-center gap-1.5 text-sm text-brand-200 transition-colors hover:text-white ${lang === 'hi' ? 'font-hindi' : ''}`}
                  >
                    <span className="h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-4" />
                    {t.nav[id]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">{t.footer.contact}</h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-200">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span className={lang === 'hi' ? 'font-hindi' : ''}>{lang === 'hi' ? 'तीतरों देहात, गंगोह, सहारनपुर, उत्तर प्रदेश – 247343' : 'Titron Dehat, Gangoh, Saharanpur, Uttar Pradesh – 247343'}</span>
              </li>
              <li>
                <a href="mailto:1060.sre@gmail.com" className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-gold-400" />
                  1060.sre@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours + Social */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">{t.footer.hours}</h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-200">
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>{t.footer.hoursWinter}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>{t.footer.hoursSummer}</span>
              </li>
            </ul>

            <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-white">{t.footer.social}</h3>
            <a
              href={FB_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-4 py-2 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#166FE5]"
            >
              <Facebook className="h-4 w-4" />
              {t.social.facebookLabel}
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className={`text-center text-xs text-brand-300 ${lang === 'hi' ? 'font-hindi' : ''}`}>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
