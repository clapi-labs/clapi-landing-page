import { useRef } from 'react';
import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';

// role y company son opcionales: la línea bajo el nombre solo se muestra si hay datos.
const TESTIMONIALS = [
  {
    name: 'Alvaro Burbano',
    quote:
      'Antes tenía que hacerlo todo a mano y se me iban horas en cada tarea. Ahora simplemente le digo a mi asistente lo que necesito y él se encarga del resto, a la perfección.',
  },
];

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);
}

export default function Testimonials() {
  const trackRef = useRef(null);

  function scrollByCards(dir) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('[data-card]');
    const width = card ? card.getBoundingClientRect().width + 24 : 320;
    track.scrollBy({ left: dir * width, behavior: 'smooth' });
  }

  // Con un solo testimonio el carrusel no aporta (flechas sin destino), así
  // que se muestra como cita destacada centrada.
  if (TESTIMONIALS.length === 1) {
    const [t] = TESTIMONIALS;
    return (
      <section id="casos" className="py-20 md:py-32">
        <Container>
          <SectionReveal className="text-center">
            <h2 className="text-4xl font-semibold leading-tight text-ink sm:text-[44px]">
              Lo que dicen quienes ya trabajan con nosotros
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <article className="relative mx-auto mt-12 flex max-w-3xl flex-col items-center gap-8 rounded-card bg-white px-8 py-12 text-center shadow-card md:px-14 md:py-14">
              <span aria-hidden="true" className="font-serif text-7xl leading-none text-brand/20">
                &ldquo;
              </span>
              <p className="-mt-6 text-xl leading-relaxed text-ink/80 md:text-2xl">{t.quote}</p>
              <TestimonialAuthor t={t} />
            </article>
          </SectionReveal>
        </Container>
      </section>
    );
  }

  return (
    <section id="casos" className="py-20 md:py-32">
      <Container>
        <SectionReveal className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <h2 className="text-4xl font-semibold leading-tight text-ink sm:text-[44px]">
            Lo que dicen quienes ya trabajan con nosotros
          </h2>
          <div className="flex gap-3">
            <CarouselButton direction={-1} onClick={() => scrollByCards(-1)} />
            <CarouselButton direction={1} onClick={() => scrollByCards(1)} />
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div
            ref={trackRef}
            className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                data-card
                className="flex w-[85%] shrink-0 snap-start flex-col gap-5 rounded-card bg-white p-8 shadow-card sm:w-[calc((100%-3rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <p className="leading-relaxed text-ink/80">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-auto">
                  <TestimonialAuthor t={t} />
                </div>
              </article>
            ))}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}

function TestimonialAuthor({ t }) {
  const meta = [t.role, t.company].filter(Boolean).join(' · ');
  return (
    <div className="flex items-center gap-3 text-left">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lilac text-sm font-semibold text-brand">
        {initials(t.name)}
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">{t.name}</p>
        {meta && <p className="text-sm text-ink/60">{meta}</p>}
      </div>
    </div>
  );
}

function CarouselButton({ direction, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === -1 ? 'Testimonio anterior' : 'Siguiente testimonio'}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-lilac bg-white text-ink transition-colors hover:border-brand hover:text-brand"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d={direction === -1 ? 'M10 3L5 8L10 13' : 'M6 3L11 8L6 13'}
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
