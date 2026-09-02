import Container from './Container.jsx';
import SectionReveal from './SectionReveal.jsx';

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="pb-16 pt-36 md:pb-20 md:pt-44">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">{eyebrow}</p>
          )}
          <h1 className="mt-3 text-4xl font-bold leading-tight text-ink sm:text-5xl md:text-[56px]">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-6 max-w-prose text-lg leading-relaxed text-ink/80">{subtitle}</p>
          )}
        </SectionReveal>
      </Container>
    </section>
  );
}
