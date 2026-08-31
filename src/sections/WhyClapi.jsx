import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';

const REASONS = [
  {
    title: 'Personalización real',
    text: 'No vendemos paquetes genéricos. Cada solución se diseña para tu negocio específico.',
  },
  {
    title: 'Fiabilidad garantizada',
    text: 'Lo que entregamos funciona. Punto. Probamos todo antes de que lo veas.',
  },
  {
    title: 'Sin costos de mantenimiento',
    text: 'No te cobramos por mantener lo que ya funciona. Incluimos actualizaciones menores.',
  },
  {
    title: 'Tu sistema mejora con el tiempo',
    text: 'Tu automatización evoluciona contigo. No se degrada — se optimiza.',
  },
];

export default function WhyClapi() {
  return (
    <section id="por-que-clapi" className="py-20 md:py-32">
      <Container>
        <SectionReveal className="text-center">
          <h2 className="text-4xl font-semibold leading-tight text-ink sm:text-[44px]">
            ¿Por qué Clapi?
          </h2>
        </SectionReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {REASONS.map((reason, i) => (
            <SectionReveal
              key={reason.title}
              delay={i * 0.08}
              className="rounded-card bg-white p-8 shadow-card"
            >
              <p className="flex items-start gap-3 text-xl font-semibold text-ink">
                <span className="text-brand">✦</span>
                {reason.title}
              </p>
              <p className="mt-3 leading-relaxed text-ink/80">{reason.text}</p>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
