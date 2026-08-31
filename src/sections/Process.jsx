import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';

const STEPS = [
  {
    n: '01',
    title: 'Entendemos',
    text: 'Conversamos contigo para entender tu negocio, tus procesos y qué se puede automatizar.',
  },
  {
    n: '02',
    title: 'Diseñamos',
    text: 'Te proponemos la solución con alcance, tiempos y costos claros antes de empezar.',
  },
  {
    n: '03',
    title: 'Construimos',
    text: 'Desarrollamos, probamos y ajustamos contigo hasta que quede perfecto.',
  },
  {
    n: '04',
    title: 'Entregamos',
    text: 'Tu automatización queda funcionando. Sin cobros de mantenimiento, con soporte incluido.',
  },
];

export default function Process() {
  return (
    <section id="proceso" className="py-20 md:py-32">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold leading-tight text-ink sm:text-[44px]">
            Simple de principio a fin
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-lg leading-relaxed text-ink/80">
            Trabajamos contigo en cada paso. Sin letra pequeña, sin sorpresas.
          </p>
        </SectionReveal>

        <div className="relative mt-16">
          {/* Conector punteado entre los pasos — solo desktop, donde van en fila. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[12%] right-[12%] top-[22px] hidden border-t border-dashed border-brand/25 lg:block"
          />

          <div className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, i) => (
              <SectionReveal
                key={step.n}
                delay={i * 0.08}
                className="relative flex gap-5 lg:flex-col lg:gap-4"
              >
                <span className="relative z-10 shrink-0 bg-canvas pr-2 text-3xl font-bold text-brand lg:pr-0 lg:text-4xl">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/80">{step.text}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
