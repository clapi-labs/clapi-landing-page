import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import { FlowIcon, BotIcon, LinkIcon, ClockReportIcon } from '../components/icons.jsx';

const SERVICES = [
  {
    Icon: FlowIcon,
    title: 'Automatización de flujos internos',
    text: 'Conectamos tus herramientas para que la información fluya sola entre sistemas.',
    example:
      'Un formulario se llena → se crea el registro en tu CRM → se notifica al equipo por Slack.',
  },
  {
    Icon: BotIcon,
    title: 'Bots y asistentes con IA',
    text: 'Asistentes inteligentes que responden, clasifican y ejecutan tareas sin intervención humana.',
    example:
      'Tu cliente escribe por WhatsApp → el bot responde, toma el pedido y lo registra automáticamente.',
  },
  {
    Icon: LinkIcon,
    title: 'Integración entre herramientas',
    text: 'Hacemos que tus herramientas actuales hablen entre sí, sin cambiar lo que ya funciona.',
    example: 'Una venta en tu POS → actualiza inventario → genera factura → envía confirmación al cliente.',
  },
  {
    Icon: ClockReportIcon,
    title: 'Automatización de reportes y datos',
    text: 'Reportes que se generan solos, datos que se organizan sin que nadie los toque.',
    example:
      'Cada lunes a las 8am → tu reporte de ventas semanal llega a tu correo, listo para revisar.',
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

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {SERVICES.map(({ Icon, title, text, example }, i) => (
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
              <p className="mt-1 text-sm leading-relaxed text-ink/50">{example}</p>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
