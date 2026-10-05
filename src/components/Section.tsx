import { type ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
};

export function SectionHeading({ eyebrow, title, subtitle, center = true }: SectionHeadingProps) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${center ? 'mx-auto text-center' : ''} max-w-3xl`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="heading-2 mt-5 text-balance">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-slate-500 sm:text-lg">{subtitle}</p>}
      <div className={`mt-6 h-1 w-20 rounded-full bg-gold-500 ${center ? 'mx-auto' : ''}`} />
    </div>
  );
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`section-pad ${className ?? ''}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}
