import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import ToolsCarousel from '../components/ToolsCarousel.jsx';
import { CloudIcon, BrainIcon } from '../components/icons.jsx';

const BADGES = [
  {
    Icon: CloudIcon,
    title: 'Alta disponibilidad',
    text: 'Servidores en la nube, siempre activos',
  },
  {
    Icon: BrainIcon,
    title: 'IA integrada',
    text: 'Los modelos más avanzados del mercado',
  },
];

/**
 * Bloque 4: confianza técnica. Sin CTA a propósito — el contenido es prueba,
 * no invitación; la siguiente sección es la que empuja a actuar.
 */
export default function Infrastructure() {
  return (
    <section id="tecnologia" className="bg-mist py-20 md:py-32">
      <Container>
        {/* `grid-cols-1` explícito (no solo `grid`): Tailwind lo compila a
            `minmax(0, 1fr)`. Sin él la columna implícita se dimensiona a
            `max-content`, y como el track del carrusel mide ~3000px, la
            página entera se desbordaba a lo ancho en móvil. */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionReveal>
            <h2 className="text-[30px] font-semibold leading-tight text-ink sm:text-[44px]">
              Tecnología de primer nivel detrás de cada solución
            </h2>
            <p className="mt-6 max-w-[550px] text-lg leading-relaxed text-ink/80">
              Trabajamos con servidores en la nube de alta disponibilidad para que tu
              automatización esté siempre activa. E integramos las inteligencias artificiales
              más avanzadas del mercado cuando tu proyecto lo necesita — para que tu solución
              no solo funcione, sino que piense.
            </p>
          </SectionReveal>

          {/* `min-w-0` por si este bloque se reusa dentro de un contenedor
              flex/grid con tracks `auto`: el carrusel nunca debe empujar el
              ancho de su columna. */}
          <SectionReveal delay={0.12} className="min-w-0">
            <ToolsCarousel duration={38} />
            <p className="mt-8 text-center text-sm font-medium text-ink/50">
              Y muchas más. Usamos la herramienta correcta para cada proyecto.
            </p>
          </SectionReveal>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
          {BADGES.map(({ Icon, title, text }, i) => (
            <SectionReveal
              key={title}
              delay={0.2 + i * 0.08}
              className="flex items-center gap-4 rounded-card bg-white px-6 py-5 shadow-card"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lilac">
                <Icon className="h-6 w-6 text-brand" />
              </span>
              <div>
                <p className="font-semibold text-ink">{title}</p>
                <p className="mt-0.5 text-sm text-ink/70">{text}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
