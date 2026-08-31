import { useRef } from 'react';
import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';

// Placeholder — reemplazar por testimonios reales de clientes.
const TESTIMONIALS = [
  {
    name: 'Camila Rojas',
    role: 'Operaciones',
    company: 'Nimbus',
    quote:
      'Automatizaron algo que nos quitaba medio día cada semana. Ahora corre solo y nadie lo piensa dos veces.',
  },
  {
    name: 'Diego Salazar',
    role: 'Fundador',
    company: 'Orbital',
    quote:
      'Entendieron el proceso mejor que nosotros mismos. Lo que entregaron funcionó desde el primer día.',
  },
  {
    name: 'Valentina Ibarra',
    role: 'Atención al cliente',
    company: 'Vertex',
    quote:
      'El bot de WhatsApp responde el 80% de las consultas solo. El equipo por fin respira.',
  },
  {
    name: 'Mateo Herrera',
    role: 'Finanzas',
    company: 'Atlas',
    quote:
      'Los reportes que armábamos a mano ahora llegan solos cada lunes. Sin errores, sin excusas.',
  },
  {
    name: 'Sofía Larraín',
    role: 'Directora comercial',
    company: 'Forma',
    quote:
      'Nada de plantillas genéricas: la solución calzó exacto con cómo trabajamos nosotros.',
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
                <div className="mt-auto flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lilac text-sm font-semibold text-brand">
                    {initials(t.name)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-sm text-ink/60">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </SectionReveal>
      </Container>
    </section>
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
