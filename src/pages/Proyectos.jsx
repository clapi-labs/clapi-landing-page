import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import PageHeader from '../components/PageHeader.jsx';
import PageCTA from '../components/PageCTA.jsx';
import Testimonials from '../sections/Testimonials.jsx';
import usePageMeta from '../hooks/usePageMeta.js';

// Placeholder — reemplazar por casos reales de clientes cuando estén
// disponibles. La estructura ya queda lista para solo cambiar contenido.
const CASES = [
  {
    client: 'Tienda online de ropa',
    industry: 'E-commerce',
    problem: 'Procesaban pedidos de WhatsApp manualmente — errores constantes y 3 horas diarias perdidas.',
    solution: 'Bot de WhatsApp que toma pedidos, los registra y actualiza inventario automáticamente.',
    metrics: [
      { value: '+68%', label: 'Tiempo ahorrado' },
      { value: '-95%', label: 'Errores' },
      { value: '3x', label: 'Pedidos procesados al día' },
    ],
  },
  {
    client: 'Estudio de arquitectura',
    industry: 'Servicios profesionales',
    problem: 'Cada propuesta de cliente se armaba a mano en varias herramientas distintas — horas por proyecto.',
    solution: 'Flujo que arma la propuesta, la envía a firma y agenda el seguimiento automáticamente.',
    metrics: [
      { value: '+70%', label: 'Tiempo ahorrado por propuesta' },
      { value: '-80%', label: 'Idas y vueltas por correo' },
      { value: '2 días', label: 'Menos en el ciclo de venta' },
    ],
  },
  {
    client: 'Clínica odontológica',
    industry: 'Salud',
    problem: 'Las confirmaciones y recordatorios de citas se hacían llamando uno por uno.',
    solution: 'Recordatorios automáticos por WhatsApp con reprogramación en un clic.',
    metrics: [
      { value: '-60%', label: 'Inasistencias' },
      { value: '+90%', label: 'Citas confirmadas a tiempo' },
      { value: '5 hrs/sem', label: 'Liberadas en recepción' },
    ],
  },
];

export default function Proyectos() {
  usePageMeta(
    'Proyectos — Clapi',
    'Casos de éxito y automatizaciones que hemos construido para negocios como el tuyo.'
  );

  return (
    <>
      <PageHeader title="Proyectos" subtitle="Lo que hemos construido para negocios como el tuyo." />

      <section className="pb-8 md:pb-12">
        <Container>
          <div className="flex flex-col gap-8">
            {CASES.map(({ client, industry, problem, solution, metrics }) => (
              <SectionReveal key={client} className="rounded-card bg-white p-8 shadow-card md:p-10">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                  <div>
                    <span className="inline-block rounded-pill bg-lilac px-4 py-1.5 text-sm font-medium text-brand">
                      {industry}
                    </span>
                    <h2 className="mt-4 text-2xl font-semibold text-ink">{client}</h2>

                    <div className="mt-6 space-y-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-ink/50">El problema</p>
                        <p className="mt-1 leading-relaxed text-ink/80">{problem}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-ink/50">
                          Qué automatizamos
                        </p>
                        <p className="mt-1 leading-relaxed text-ink/80">{solution}</p>
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-4">
                      {metrics.map((m) => (
                        <div key={m.label}>
                          <p className="text-2xl font-bold text-brand sm:text-3xl">{m.value}</p>
                          <p className="mt-1 text-xs leading-snug text-ink/60">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex aspect-video items-center justify-center rounded-card bg-[linear-gradient(160deg,#EDE6FF_0%,#F7F7F7_100%)] lg:aspect-square">
                    <span className="text-sm font-medium text-ink/30">Screenshot próximamente</span>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>

      <Testimonials />

      <PageCTA
        title="¿Quieres algo así para tu negocio?"
        primaryLabel="Quiero algo así →"
        secondaryLabel="Ver precios →"
        secondaryTo="/precios"
      />
    </>
  );
}
