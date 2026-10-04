import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import PageHeader from '../components/PageHeader.jsx';
import PageCTA from '../components/PageCTA.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { ReceiptIcon, BoxIcon, CalendarIcon, RocketIcon } from '../components/icons.jsx';

const SERVICES = [
  {
    Icon: ReceiptIcon,
    title: 'Sistema de toma de pedidos por WhatsApp para restaurantes',
    text: 'Tus clientes piden por WhatsApp y el sistema toma el pedido completo: menú, cantidades, dirección y forma de pago. Sin errores de transcripción y sin perder mensajes en hora pico.',
    example:
      'El cliente escribe por WhatsApp → recibe el menú → arma su pedido → el pedido llega confirmado a la cocina. Todo automático.',
  },
  {
    Icon: BoxIcon,
    title: 'Sistema de toma de pedidos por WhatsApp para minimarkets',
    text: 'Tu tienda recibe pedidos por WhatsApp a cualquier hora. El sistema registra los productos, confirma disponibilidad y deja el pedido listo para alistar y despachar.',
    example:
      'El cliente envía su lista por WhatsApp → se confirman productos y total → el pedido queda registrado para alistar.',
  },
  {
    Icon: CalendarIcon,
    title: 'Sistema de agendamiento automático de domiciliarios por WhatsApp',
    text: 'Asignamos y coordinamos tus domicilios por WhatsApp. Cada domiciliario recibe sus entregas con dirección y horario, y tú sabes en qué va cada pedido sin hacer una sola llamada.',
    example:
      'Entra un pedido → se asigna al domiciliario disponible → recibe los datos por WhatsApp → el cliente es notificado del envío.',
  },
];

export default function Servicios() {
  usePageMeta(
    'CLAPI — Servicios',
    'Sistemas de toma de pedidos por WhatsApp para restaurantes y minimarkets, y agendamiento automático de domiciliarios.'
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

            <SectionReveal className="mx-auto flex w-full max-w-3xl flex-col items-center rounded-card border-2 border-dashed border-brand/20 bg-[linear-gradient(160deg,rgba(237,230,255,0.5)_0%,rgba(247,247,247,0.5)_100%)] px-8 py-12 text-center md:py-14">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-dark shadow-card">
                <span className="h-1.5 w-1.5 rounded-full bg-accent ring-[3px] ring-accent/35" />
                En camino
              </span>
              <span className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/80">
                <RocketIcon className="h-7 w-7 text-brand/60" />
              </span>
              <h2 className="mt-5 text-[28px] font-semibold leading-tight text-ink/60">
                Próximamente más...
              </h2>
              <p className="mt-3 max-w-md leading-relaxed text-ink/50">
                Estamos construyendo nuevas soluciones para más tipos de negocio. Muy pronto
                las verás aquí.
              </p>
            </SectionReveal>
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
