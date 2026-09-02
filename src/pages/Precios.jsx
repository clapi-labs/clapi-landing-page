import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import PageHeader from '../components/PageHeader.jsx';
import PageCTA from '../components/PageCTA.jsx';
import Button from '../components/Button.jsx';
import Faq from '../components/Faq.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { useChat } from '../context/ChatContext.jsx';

const PLANS = [
  {
    title: 'Automatización simple',
    price: 'Desde $XXX USD',
    text: 'Flujos básicos: conectar dos herramientas, automatizar un correo, generar un reporte. Ideal para empezar.',
    time: '1-2 semanas',
    cta: 'Empezar →',
    variant: 'outline',
    highlighted: false,
  },
  {
    title: 'Automatización intermedia',
    price: 'Desde $XXX USD',
    text: 'Flujos con lógica, integraciones múltiples o bots básicos. Para negocios que ya saben qué necesitan.',
    time: '2-4 semanas',
    cta: 'Empezar →',
    variant: 'primary',
    highlighted: true,
  },
  {
    title: 'Solución completa',
    price: 'A medida',
    text: 'Sistemas completos, asistentes con IA, dashboards, múltiples integraciones. Lo diseñamos contigo.',
    time: 'según alcance',
    cta: 'Hablemos →',
    variant: 'outline',
    highlighted: false,
  },
];

const FAQ_ITEMS = [
  {
    q: '¿Cobran mantenimiento?',
    a: 'No. Lo que entregamos funciona y punto. Incluimos actualizaciones menores sin costo adicional.',
  },
  {
    q: '¿Cuánto tarda una automatización?',
    a: 'Depende de la complejidad, pero siempre te damos un tiempo estimado antes de empezar. Las más simples toman 1-2 semanas.',
  },
  {
    q: '¿Qué pasa si necesito cambios después?',
    a: 'Ajustes menores están incluidos. Si necesitas algo más grande, te hacemos una propuesta nueva con alcance y precio claros.',
  },
  {
    q: '¿Necesito saber de tecnología?',
    a: 'Para nada. Tú nos explicas cómo funciona tu proceso hoy y nosotros hacemos el resto.',
  },
  {
    q: '¿Trabajan con empresas pequeñas?',
    a: 'Sí. Trabajamos con empresas y profesionales de todos los tamaños. No necesitas ser una multinacional para automatizar.',
  },
];

export default function Precios() {
  usePageMeta(
    'Precios — Clapi',
    'Rangos de precio claros para automatizaciones simples, intermedias y a medida. Sin letra pequeña.'
  );
  const { openChat } = useChat();

  return (
    <>
      <PageHeader
        title="Transparentes con el precio desde el día uno"
        subtitle="Cada automatización es diferente, pero queremos que tengas una idea clara antes de hablar con nosotros."
      />

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
            {PLANS.map(({ title, price, text, time, cta, variant, highlighted }, i) => (
              <SectionReveal
                key={title}
                delay={i * 0.08}
                className={`flex flex-col rounded-card bg-white p-8 shadow-card ${
                  highlighted ? 'border-2 border-brand lg:-translate-y-3' : ''
                }`}
              >
                <h3 className="text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-3 text-3xl font-bold text-brand">{price}</p>
                <p className="mt-4 leading-relaxed text-ink/80">{text}</p>
                <p className="mt-6 text-sm font-medium text-ink/50">Tiempo estimado: {time}</p>
                <Button
                  as="button"
                  type="button"
                  onClick={openChat}
                  variant={variant}
                  className="mt-8 justify-center"
                >
                  {cta}
                </Button>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.2} className="mx-auto mt-14 max-w-[600px] text-center text-base leading-relaxed text-ink/70">
            El precio final depende de lo que necesitas — pero siempre lo sabes antes de empezar. Sin
            letra pequeña, sin costos ocultos.
          </SectionReveal>
        </Container>
      </section>

      <section className="bg-mist py-20 md:py-28">
        <Container>
          <SectionReveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold leading-tight text-ink sm:text-[40px]">
              Preguntas frecuentes
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.1} className="mt-12">
            <Faq items={FAQ_ITEMS} />
          </SectionReveal>
        </Container>
      </section>

      <PageCTA
        title="¿Ya tienes una idea de lo que necesitas?"
        primaryLabel="Cuéntanos tu caso →"
        secondaryLabel="Ver nuestros proyectos →"
        secondaryTo="/proyectos"
      />
    </>
  );
}
