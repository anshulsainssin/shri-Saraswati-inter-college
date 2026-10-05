import { useEffect, useState } from 'react';
import { GraduationCap, Menu, X, Languages } from 'lucide-react';
import { useLang } from '@/LanguageContext';

const NAV_IDS = [
  'home',
  'about',
  'principal',
  'academics',
  'facilities',
  'gallery',
  'notices',
  'events',
  'achievements',
  'admissions',
  'contact',
] as const;

export function Navbar() {
  const { t, toggle, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = NAV_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      const pos = window.scrollY + 120;
      let current = 'home';
      for (const s of sections) {
        if (s.offsetTop <= pos) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const navItems = NAV_IDS.map((id) => ({ id, label: t.nav[id] }));

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-md shadow-brand-900/5 backdrop-blur' : 'bg-white/80 backdrop-blur'
      }`}
    >
      {/* Top contact strip */}
      <div className="hidden bg-brand-800 text-brand-100 lg:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <span className="font-medium">{lang === 'hi' ? 'तीतरों देहात, गंगोह, सहारनपुर, उ.प्र. — 247343' : 'Titron Dehat, Gangoh, Saharanpur, U.P. — 247343'}</span>
          <div className="flex items-center gap-4">
            <a href="mailto:1060.sre@gmail.com" className="transition-colors hover:text-white">
              1060.sre@gmail.com
            </a>
            <span className="text-brand-400">|</span>
            <span>{lang === 'hi' ? 'यूपी बोर्ड • हिंदी माध्यम • कक्षा 6–12' : 'UP Board • Hindi Medium • Class 6–12'}</span>
          </div>
        </div>
      </div>

      <nav className="container-x flex h-16 items-center justify-between gap-2 lg:h-20">
        {/* Logo */}
        <button onClick={() => go('home')} className="flex min-w-0 items-center gap-2.5 text-left sm:gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-md shadow-brand-700/30 lg:h-12 lg:w-12">
            <GraduationCap className="h-5 w-5 lg:h-6 lg:w-6" />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className={`truncate text-sm font-bold text-brand-900 sm:text-base ${lang === 'hi' ? 'font-hindi' : 'font-serif'}`}>
              {t.hero.name}
            </span>
            <span className="truncate text-[11px] font-medium text-gold-600 sm:text-xs">{t.hero.location}</span>
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex xl:gap-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => go(item.id)}
                className={`nav-link whitespace-nowrap px-2.5 py-1 text-[13px] xl:px-3 xl:text-sm ${active === item.id ? 'text-brand-700 after:w-full' : ''}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Language switcher */}
          <button
            onClick={toggle}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-2.5 py-2 text-xs font-semibold text-brand-700 transition-all hover:border-brand-700 hover:bg-brand-50 sm:px-3"
            aria-label="Switch language"
          >
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">{t.nav.switchTo}</span>
          </button>

          {/* CTA (desktop) */}
          <button onClick={() => go('admissions')} className="btn-gold hidden px-4 py-2.5 text-xs sm:inline-flex lg:px-5 lg:text-sm">
            {t.nav.cta}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-brand-800 transition-colors hover:bg-brand-50 lg:hidden"
            aria-label={t.nav.menu}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 top-16 z-40 bg-brand-950/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
      />
      <div
        className={`fixed inset-x-0 top-16 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? 'translate-y-0' : '-translate-y-4'
        }`}
        style={{ display: open ? 'block' : 'none' }}
      >
        <ul className="container-x flex flex-col gap-1 py-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => go(item.id)}
                className={`w-full rounded-xl px-4 py-3 text-left text-base font-medium transition-colors ${
                  active === item.id ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="mt-2 px-1">
            <button onClick={() => go('admissions')} className="btn-gold w-full">
              {t.nav.cta}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
