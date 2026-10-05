import { useState, type FormEvent } from 'react';
import { ClipboardList, IndianRupee, MessageSquareText, X, CheckCircle2, Send, CalendarClock, User, Info, Atom, FlaskConical, Palette, Sprout } from 'lucide-react';
import { useLang } from '@/LanguageContext';
import { Section, SectionHeading } from '@/components/Section';
import { useReveal } from '@/hooks/useReveal';

const STREAM_ICONS = [Atom, FlaskConical, Palette, Sprout];

export function Admissions() {
  const { t, lang } = useLang();
  const { ref, visible } = useReveal();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const isHi = lang === 'hi';

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => setSubmitted(false), 200);
  };

  return (
    <Section id="admissions" className="bg-brand-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300">
            {t.admissions.eyebrow}
          </span>
          <h2 className="heading-2 mt-5 text-white">{t.admissions.title}</h2>
          <p className="mt-4 text-base text-brand-200 sm:text-lg">{t.admissions.subtitle}</p>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gold-500" />
        </div>

        {/* Confirmed date banner */}
        <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-2xl border border-gold-400/30 bg-gold-400/10 p-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <CalendarClock className="h-6 w-6 text-gold-300" />
            <p className={`text-lg font-semibold text-gold-200 ${isHi ? 'font-hindi' : ''}`}>
              {t.admissions.confirmedDateLabel}
            </p>
          </div>
          <p className={`mt-2 text-2xl font-bold text-white ${isHi ? 'font-hindi' : ''}`}>
            {t.admissions.confirmedDate}
          </p>
        </div>

        {/* Available streams */}
        <div className="mx-auto mt-8 max-w-4xl">
          <div className="text-center">
            <h3 className={`text-lg font-bold text-white sm:text-xl ${isHi ? 'font-hindi' : ''}`}>
              {t.academics.streamTitle}
            </h3>
            <p className={`mt-2 text-sm text-brand-200 ${isHi ? 'font-hindi' : ''}`}>
              {t.academics.streamSubtitle}
            </p>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.academics.streams.map((stream, index) => {
              const Icon = STREAM_ICONS[index] ?? Atom;
              return (
                <div key={stream.name} className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-400/20 text-gold-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-base font-bold text-white">{stream.name}</p>
                      <p className={`text-xs text-brand-200 ${isHi ? 'font-hindi' : ''}`}>{stream.fullName}</p>
                    </div>
                  </div>
                  <p className={`mt-3 text-sm leading-relaxed text-brand-200 ${isHi ? 'font-hindi' : ''}`}>{stream.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Admission Process */}
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mt-10`}>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-gold-300" />
              <h3 className={`text-lg font-bold text-white ${isHi ? 'font-hindi' : ''}`}>{t.admissions.processTitle}</h3>
            </div>
            <div className="mt-5 space-y-4">
              {t.admissions.processSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-400/20 text-sm font-bold text-gold-300">
                    {i + 1}
                  </span>
                  <p className={`text-sm leading-relaxed text-brand-100 sm:text-base ${isHi ? 'font-hindi' : ''}`}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fees note */}
        <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-start gap-3">
            <IndianRupee className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
            <div>
              <p className={`text-sm font-semibold text-white ${isHi ? 'font-hindi' : ''}`}>{t.admissions.fees}</p>
              <p className={`mt-1 text-sm leading-relaxed text-brand-200 ${isHi ? 'font-hindi' : ''}`}>{t.admissions.feesNote}</p>
            </div>
          </div>
        </div>

        {/* Documents note */}
        <div className="mx-auto mt-4 max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
            <div>
              <p className={`text-sm font-semibold text-white ${isHi ? 'font-hindi' : ''}`}>{t.admissions.documents}</p>
              <p className={`mt-1 text-sm leading-relaxed text-brand-200 ${isHi ? 'font-hindi' : ''}`}>{t.admissions.documentsNote}</p>
            </div>
          </div>
        </div>

        {/* Clerk contact card */}
        <div className="mx-auto mt-6 max-w-2xl overflow-hidden rounded-2xl border border-gold-400/30 bg-gradient-to-br from-gold-400/10 to-transparent">
          <div className="flex items-center gap-3 bg-gold-400/10 px-6 py-3">
            <User className="h-5 w-5 text-gold-300" />
            <span className={`text-sm font-bold uppercase tracking-wider text-gold-200 ${isHi ? 'font-hindi' : ''}`}>
              {t.admissions.clerkTitle}
            </span>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-400/20 text-gold-300">
                <User className="h-5 w-5" />
              </span>
              <div>
                <p className={`text-base font-bold text-white ${isHi ? 'font-hindi' : ''}`}>{t.admissions.clerkName}</p>
                <p className={`mt-0.5 text-sm font-medium text-gold-300 ${isHi ? 'font-hindi' : ''}`}>{t.admissions.clerkRole}</p>
              </div>
            </div>
            <p className={`mt-3 text-sm leading-relaxed text-brand-200 ${isHi ? 'font-hindi' : ''}`}>{t.admissions.clerkDesc}</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button onClick={() => setOpen(true)} className="btn-gold">
            <MessageSquareText className="h-4 w-4" />
            {t.admissions.enquiryBtn}
          </button>
        </div>
      </div>

      {/* Enquiry modal */}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-950/80 p-4 backdrop-blur-sm" onClick={closeModal}>
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              aria-label={t.admissions.close}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 p-10 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 className="h-9 w-9" />
                </span>
                <p className={`text-lg font-semibold text-brand-900 ${isHi ? 'font-hindi' : ''}`}>{t.admissions.success}</p>
                <button onClick={closeModal} className="btn-primary mt-2">
                  {t.admissions.close}
                </button>
              </div>
            ) : (
              <div className="p-6 sm:p-8">
                <h3 className={`text-xl font-bold text-brand-900 ${isHi ? 'font-hindi' : ''}`}>{t.admissions.enquiryTitle}</h3>
                <p className="mt-1 text-sm text-slate-500">{t.admissions.enquirySubtitle}</p>
                <form className="mt-6 space-y-4" onSubmit={onSubmit}>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">{t.admissions.nameField}</label>
                    <input required type="text" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:bg-white" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">{t.admissions.phoneField}</label>
                      <input required type="tel" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:bg-white" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">{t.admissions.classField}</label>
                      <select required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:bg-white">
                        <option value="">{t.admissions.selectClass}</option>
                        {t.academics.classes.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">{t.admissions.messageField}</label>
                    <textarea rows={3} className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:bg-white" />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    <Send className="h-4 w-4" />
                    {t.admissions.submit}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
