import { Link } from 'react-router-dom';
import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import Button from '../components/Button.jsx';

/**
 * Bloque 6: la parte humana, justo antes del CTA final. Cierra el recorrido
 * racional (qué hacemos, cómo, con qué) con el quién.
 *
 * La foto es el mismo placeholder degradado que ya usan /nosotros y
 * /proyectos — reemplazar por la grupal real cuando esté disponible.
 */
export default function Team() {
  return (
    <section id="equipo" className="bg-mist py-20 md:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionReveal>
            <div className="flex aspect-[4/3] items-center justify-center rounded-card bg-[linear-gradient(160deg,#EDE6FF_0%,#F7F7F7_100%)] shadow-card">
              <span className="px-6 text-center text-sm font-medium text-brand/40">
                Foto del equipo
              </span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.12}>
            <h2 className="text-4xl font-semibold leading-tight text-ink sm:text-[44px]">
              Un equipo que sabe lo que hace
            </h2>
            <p className="mt-6 max-w-[550px] text-lg leading-relaxed text-ink/80">
              Somos un equipo de desarrolladores especializados en automatizaciones. Ya hemos
              construido soluciones para negocios reales y sabemos cómo llevar tu idea desde la
              conversación hasta un sistema funcionando.
            </p>
            <p className="mt-6 max-w-[550px] text-lg font-medium leading-relaxed text-brand">
              Trabajar con Clapi es trabajar directamente con quienes construyen tu solución.
            </p>

            <div className="mt-10">
              <Button as={Link} to="/nosotros" variant="outline">
                Conoce nuestra historia →
              </Button>
            </div>
          </SectionReveal>
        </div>
      </Container>
    </section>
  );
}
