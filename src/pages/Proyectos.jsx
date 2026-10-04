import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import PageHeader from '../components/PageHeader.jsx';
import PageCTA from '../components/PageCTA.jsx';
import Testimonials from '../sections/Testimonials.jsx';
import usePageMeta from '../hooks/usePageMeta.js';

const CASES = [
  {
    name: 'BGC Platform',
    client: 'BGC (Cooperativa)',
    industry: 'Cooperativa · Finanzas',
    description:
      'Plataforma de automatización contable y gestión financiera con inteligencia artificial impulsada por agentes de voz y bots de mensajería.',
    features: [
      {
        title: 'Procesamiento inteligente por voz (NLU)',
        text: 'Transcripción automática de notas de voz de operadores y extracción de intenciones financieras con confirmación en dos pasos antes de ejecutar transacciones.',
      },
      {
        title: 'Sistema de notificaciones duales',
        text: 'Generación y envío automático de comprobantes en PDF (recibos y tablas de amortización) por Telegram al operador y por WhatsApp a los socios involucrados.',
      },
      {
        title: 'API financiera idempotente y resiliente',
        text: 'Backend robusto en PostgreSQL para registro de aportes, retiros, créditos, abonos a capital y pagos de cuotas, con garantía de integridad transaccional (rollback completo ante errores).',
      },
      {
        title: 'Recordatorios proactivos de cuotas',
        text: 'Módulo automatizado de notificaciones previas y de morosidad a socios con consentimiento previo (opt-in de WhatsApp).',
      },
      {
        title: 'Modo híbrido escritorio / nube',
        text: 'App de escritorio conectada a PostgreSQL en la nube, con modo de solo lectura sobre un snapshot local cuando no hay conexión.',
      },
    ],
    stack: [
      'Python',
      'PostgreSQL',
      'Telegram Bot API',
      'WhatsApp Cloud API',
      'NLU / Whisper (voz a texto)',
      'Docker',
      'Application APIs',
    ],
  },
];

export default function Proyectos() {
  usePageMeta(
    'CLAPI — Proyectos',
    'Casos de éxito y automatizaciones que hemos construido para negocios como el tuyo.'
  );

  return (
    <>
      <PageHeader title="Proyectos" subtitle="Lo que hemos construido para negocios como el tuyo." />

      <section className="pb-8 md:pb-12">
        <Container>
          <div className="flex flex-col gap-8">
            {CASES.map(({ name, client, industry, description, features, stack }) => (
              <SectionReveal key={name} className="rounded-card bg-white p-8 shadow-card md:p-10">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                  <div>
                    <span className="inline-block rounded-pill bg-lilac px-4 py-1.5 text-sm font-medium text-brand">
                      {industry}
                    </span>
                    <h2 className="mt-4 text-2xl font-semibold text-ink">{name}</h2>
                    <p className="mt-1 text-sm font-medium text-ink/50">{client}</p>
                    <p className="mt-4 leading-relaxed text-ink/80">{description}</p>

                    <div className="mt-8">
                      <p className="text-sm font-semibold uppercase tracking-wide text-ink/50">
                        Qué construimos
                      </p>
                      <ul className="mt-3 space-y-4">
                        {features.map((f) => (
                          <li key={f.title} className="flex gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />
                            <div>
                              <p className="font-semibold text-ink">{f.title}</p>
                              <p className="mt-1 leading-relaxed text-ink/80">{f.text}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <p className="text-sm font-semibold uppercase tracking-wide text-ink/50">Tecnologías</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {stack.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-pill border border-brand/15 bg-mist px-3 py-1 text-sm font-medium text-ink/70"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex aspect-video items-center justify-center rounded-card bg-[linear-gradient(160deg,#EDE6FF_0%,#F7F7F7_100%)] lg:sticky lg:top-28 lg:aspect-square">
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
