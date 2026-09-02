import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';

const POINTS = [
  {
    title: 'Sin mantenimiento',
    text: 'No te cobramos por mantener lo que ya funciona.',
  },
  {
    title: 'Actualizaciones incluidas',
    text: 'Mejoras menores sin costo. Tu sistema se mantiene al día.',
  },
  {
    title: 'Crece contigo',
    text: 'A medida que tu negocio cambia, tu automatización se adapta.',
  },
];

/**
 * Bloque 5: declaración de principios, no lista de features — por eso va sin
 * cards, solo el símbolo, el título y una línea. Los separadores verticales
 * hacen el trabajo que harían los bordes de una card, con mucho menos ruido.
 */
export default function Evolves() {
  return (
    <section id="evoluciona" className="py-20 md:py-32">
      <Container>
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-[30px] font-semibold leading-tight text-ink sm:text-[44px]">
            Lo que construimos no se queda quieto
          </h2>
          <p className="mx-auto mt-6 max-w-[650px] text-lg leading-relaxed text-ink/80 sm:text-xl">
            Tu automatización evoluciona contigo. Incluimos actualizaciones sin costo adicional
            para que tu sistema mejore con el tiempo — no se degrade.
          </p>
        </SectionReveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-0">
          {POINTS.map((point, i) => (
            <SectionReveal
              key={point.title}
              delay={i * 0.08}
              className={`px-0 text-center md:px-8 ${
                i > 0 ? 'md:border-l md:border-ink/10' : ''
              }`}
            >
              <span aria-hidden="true" className="text-2xl leading-none text-brand">
                ✦
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{point.title}</h3>
              <p className="mt-2 leading-relaxed text-ink/80">{point.text}</p>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
