import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import PageHeader from '../components/PageHeader.jsx';
import PageCTA from '../components/PageCTA.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { FlowIcon, BotIcon, LinkIcon, ClockReportIcon } from '../components/icons.jsx';

const SERVICES = [
  {
    Icon: FlowIcon,
    title: 'Automatización de flujos internos',
    text: 'Conectamos tus herramientas para que la información fluya entre sistemas sin que nadie la mueva manualmente.',
    example:
      'Un formulario se llena → se crea el registro en tu CRM → se notifica al equipo por Slack → se agenda el seguimiento. Todo automático.',
  },
  {
    Icon: BotIcon,
    title: 'Bots y asistentes con IA',
    text: 'Asistentes inteligentes que responden, clasifican y ejecutan tareas sin intervención humana. Disponibles 24/7.',
    example:
      'Tu cliente escribe por WhatsApp → el bot responde, toma el pedido y lo registra automáticamente en tu sistema.',
  },
  {
    Icon: LinkIcon,
    title: 'Integración entre herramientas',
    text: 'Hacemos que tus herramientas actuales hablen entre sí. Sin cambiar lo que ya funciona, sin migrar nada.',
    example:
      'Una venta en tu POS → actualiza inventario → genera factura → envía confirmación al cliente. Sin tocar nada.',
  },
  {
    Icon: ClockReportIcon,
    title: 'Automatización de reportes y datos',
    text: 'Reportes que se generan solos, datos que se organizan sin que nadie los toque. En el formato que necesites, cuando lo necesites.',
    example: 'Cada lunes a las 8am → tu reporte de ventas semanal llega a tu correo, listo para revisar.',
  },
];

export default function Servicios() {
  usePageMeta(
    'Servicios — Clapi',
    'Automatización de flujos, bots con IA, integraciones y reportes automáticos, a medida de tu negocio.'
  );

  return (
    <>
      <PageHeader
        title="Nuestros servicios"
        subtitle="Cada automatización se diseña para tu negocio. No usamos plantillas — construimos lo que necesitas."
      />

      <section className="pb-12 md:pb-20">
        <Container>
          <div className="flex flex-col gap-20 md:gap-28">
            {SERVICES.map(({ Icon, title, text, example }, i) => {
              const reversed = i % 2 === 1;
              return (
                <SectionReveal
                  key={title}
                  className={`flex flex-col items-center gap-10 lg:flex-row lg:gap-16 ${
                    reversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="w-full max-w-lg flex-1">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lilac">
                      <Icon className="h-7 w-7 text-brand" />
                    </span>
                    <h2 className="mt-6 text-[28px] font-semibold leading-tight text-ink">{title}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-ink/80">{text}</p>
                    <p className="mt-6 rounded-r-lg border-l-[3px] border-brand bg-mist px-5 py-4 text-sm leading-relaxed text-ink/70">
                      {example}
                    </p>
                  </div>
                  <div className="flex w-full flex-1 items-center justify-center">
                    <div className="flex aspect-square w-full max-w-sm items-center justify-center rounded-card bg-[linear-gradient(160deg,#EDE6FF_0%,#F7F7F7_100%)]">
                      <Icon className="h-24 w-24 text-brand/25" />
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 md:py-28">
        <Container>
          <SectionReveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold leading-tight text-ink sm:text-[40px]">
              Si se repite, se puede automatizar
            </h2>
            <div className="mx-auto mt-6 max-w-prose space-y-4 text-lg leading-relaxed text-ink/80">
              <p>
                Los servicios que ves arriba son los más comunes, pero cada negocio tiene procesos
                únicos que ni siquiera parecen automatizables — hasta que nos los cuentas.
              </p>
              <p>
                Si en tu día a día hay algo que haces igual una y otra vez, con los mismos pasos y
                las mismas reglas, probablemente se puede automatizar. No importa si es algo
                pequeño o complejo.
              </p>
              <p>Tú nos explicas cómo funciona tu proceso hoy. Del resto nos encargamos nosotros.</p>
            </div>
          </SectionReveal>
        </Container>
      </section>

      <PageCTA
        title="¿Tienes un proceso en mente?"
        primaryLabel="Quiero automatizar →"
        secondaryLabel="Ver precios →"
        secondaryTo="/precios"
        secondaryStyle="outline"
      />
    </>
  );
}
