import { Link } from 'react-router-dom';
import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import Button from '../components/Button.jsx';
import {
  ConversationIcon,
  BlueprintIcon,
  CodeIcon,
  CheckCircleIcon,
} from '../components/icons.jsx';

const STEPS = [
  { Icon: ConversationIcon, title: 'Conversamos' },
  { Icon: BlueprintIcon, title: 'Diseñamos' },
  { Icon: CodeIcon, title: 'Construimos' },
  { Icon: CheckCircleIcon, title: 'Entregamos' },
];

/*
 * Visual de apoyo: una "ficha de solución" con el aire de un presupuesto
 * hecho a medida. Se construye con los mismos tokens del sitio (card, lila,
 * morado) en vez de una ilustración importada — así no desentona si mañana
 * cambia la paleta, y no añade peso de imagen.
 */
function TailoredCard() {
  return (
    <div className="rounded-card bg-white p-7 shadow-card">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-brand/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="ml-2 text-xs font-medium uppercase tracking-wider text-ink/40">
          Tu solución
        </span>
      </div>

      <dl className="mt-7 space-y-4">
        {[
          ['Proceso', 'Gestión de pedidos'],
          ['Herramientas', 'WhatsApp · Sheets · ERP'],
          ['Tiempo estimado', '3 semanas'],
        ].map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-4 border-b border-lilac pb-4">
            <dt className="shrink-0 text-sm text-ink/50">{label}</dt>
            <dd className="text-right text-sm font-medium text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 rounded-2xl bg-lilac px-5 py-4">
        <p className="text-sm font-medium leading-relaxed text-brand">
          Diseñada para tu negocio — no una plantilla adaptada.
        </p>
      </div>
    </div>
  );
}

/**
 * Bloque 2: personalización + proceso, contados como una sola idea.
 *
 * Los 4 pasos van aquí abajo en versión compacta (círculo + nombre) y NO
 * como sección propia con descripciones: el texto de arriba ya explicó el
 * cómo, y repetirlo en prosa haría que la página se sintiera dos veces la
 * misma cosa.
 */
export default function Tailored() {
  return (
    <section id="a-tu-medida" className="bg-mist py-20 md:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionReveal>
            <h2 className="text-[30px] font-semibold leading-tight text-ink sm:text-[44px]">
              Tu solución, diseñada a tu medida
            </h2>
            <p className="mt-6 max-w-[550px] text-lg leading-relaxed text-ink/80">
              No vendemos paquetes genéricos. Cada automatización que construimos empieza por
              escucharte — entender tu negocio, tus procesos y lo que realmente necesitas.
            </p>
            <p className="mt-5 max-w-[550px] text-lg leading-relaxed text-ink/80">
              Conversamos contigo, diseñamos una solución con tiempos y costos claros, la
              construimos juntos y te la entregamos lista para funcionar. Así de simple.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <TailoredCard />
          </SectionReveal>
        </div>

        {/* Pasos compactos: solo círculo + nombre, conectados por una línea.
            En móvil la fila se convierte en línea de tiempo vertical — un 2×2
            suelto no comunica secuencia, y el conector horizontal no conecta
            nada cuando los pasos están apilados. */}
        <div className="relative mt-16 md:mt-20">
          {/* Conector vertical (móvil): de centro a centro de los círculos.
              `left-7` y `top/bottom-7` = 28px = radio del círculo (h-14). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-7 left-7 top-7 w-0.5 bg-brand/30 md:hidden"
          />
          {/* Conector horizontal (md+): mismos centros, en fila. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 bg-brand/30 md:block"
          />

          {/* Los pasos van DESPUÉS de las líneas en el DOM y son `relative`,
              así que se pintan encima y tapan el tramo que les toca. */}
          <div className="flex flex-col gap-8 md:grid md:grid-cols-4 md:gap-0">
            {STEPS.map(({ Icon, title }, i) => (
              <SectionReveal
                key={title}
                delay={i * 0.08}
                className="relative flex items-center gap-5 md:flex-col md:gap-3"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand">
                  <Icon className="h-6 w-6 text-white" />
                </span>
                <p className="text-base font-semibold text-ink md:text-sm">{title}</p>
              </SectionReveal>
            ))}
          </div>
        </div>

        <SectionReveal delay={0.3} className="mt-14 flex justify-center">
          <Button as={Link} to="/nosotros" variant="outline">
            Conoce al equipo →
          </Button>
        </SectionReveal>
      </Container>
    </section>
  );
}
