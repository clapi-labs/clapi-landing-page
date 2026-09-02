import { Link } from 'react-router-dom';
import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import Button from '../components/Button.jsx';
import { FlowIcon, BotIcon, LinkIcon, ClockReportIcon } from '../components/icons.jsx';

const SERVICES = [
  {
    Icon: FlowIcon,
    title: 'Flujos automatizados',
    text: 'Conectamos tus herramientas para que la información fluya sola.',
  },
  {
    Icon: BotIcon,
    title: 'Bots y asistentes con IA',
    text: 'Asistentes que responden, clasifican y ejecutan sin intervención.',
  },
  {
    Icon: LinkIcon,
    title: 'Integraciones',
    text: 'Tus herramientas actuales trabajando juntas, sin cambiar nada.',
  },
  {
    Icon: ClockReportIcon,
    title: 'Reportes automáticos',
    text: 'Datos organizados y reportes listos sin que nadie los toque.',
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-20 md:py-32">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold leading-tight text-ink sm:text-[44px]">
            Lo que hacemos
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-lg leading-relaxed text-ink/80">
            Soluciones a medida, no plantillas. Cada automatización se diseña para tu
            negocio específico.
          </p>
        </SectionReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ Icon, title, text }, i) => (
            <SectionReveal
              key={title}
              delay={i * 0.08}
              className="flex flex-col gap-4 rounded-card bg-white p-8 shadow-card"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lilac">
                <Icon className="h-6 w-6 text-brand" />
              </span>
              <h3 className="text-xl font-semibold text-ink">{title}</h3>
              <p className="leading-relaxed text-ink/80">{text}</p>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.3} className="mt-14 flex justify-center">
          <Button as={Link} to="/servicios" variant="outline">
            Conoce todos nuestros servicios →
          </Button>
        </SectionReveal>
      </Container>
    </section>
  );
}
