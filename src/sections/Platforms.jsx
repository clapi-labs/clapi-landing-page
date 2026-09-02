import { Link } from 'react-router-dom';
import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import Button from '../components/Button.jsx';
import { BrowserIcon, DesktopIcon, MobileIcon } from '../components/icons.jsx';

const PLATFORMS = [
  {
    Icon: BrowserIcon,
    title: 'Aplicaciones web',
    text: 'Dashboards, paneles de control, sistemas internos. Accesibles desde cualquier navegador.',
  },
  {
    Icon: DesktopIcon,
    title: 'Aplicaciones de escritorio',
    text: 'Herramientas instalables para tu equipo, rápidas y diseñadas para tu flujo de trabajo.',
  },
  {
    Icon: MobileIcon,
    title: 'Apps móviles y asistentes',
    text: 'Aplicaciones para celular, bots en WhatsApp, asistentes en Telegram — donde más te sirva.',
  },
];

/**
 * Bloque 3: la capacidad de construir la plataforma, presentada como opción
 * y no como obligación — de ahí la línea de cierre que la relativiza antes
 * de mandar al CTA.
 */
export default function Platforms() {
  return (
    <section id="plataformas" className="py-20 md:py-32">
      <Container>
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold leading-tight text-ink sm:text-[44px]">
            Si tu automatización necesita una app, la construimos
          </h2>
          <p className="mx-auto mt-6 max-w-[650px] text-lg leading-relaxed text-ink/80">
            Según lo que tu proyecto necesite, creamos la plataforma ideal — personalizada,
            integrada con tu automatización y lista para usar.
          </p>
        </SectionReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PLATFORMS.map(({ Icon, title, text }, i) => (
            <SectionReveal
              key={title}
              delay={i * 0.08}
              className="flex flex-col items-center gap-4 rounded-card bg-mist px-8 py-10 text-center"
            >
              <Icon className="h-14 w-14 text-brand" strokeWidth={1.25} />
              <h3 className="text-xl font-semibold text-ink">{title}</h3>
              <p className="leading-relaxed text-ink/80">{text}</p>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.24} className="mx-auto mt-12 max-w-prose text-center text-base text-ink/60">
          No siempre es necesario — pero cuando lo es, tenemos la capacidad de hacerlo bien.
        </SectionReveal>

        <SectionReveal delay={0.3} className="mt-10 flex justify-center">
          <Button as={Link} to="/servicios" variant="outline">
            Ver servicios completos →
          </Button>
        </SectionReveal>
      </Container>
    </section>
  );
}
