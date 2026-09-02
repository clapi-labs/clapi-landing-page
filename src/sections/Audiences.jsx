import { Link } from 'react-router-dom';
import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import Button from '../components/Button.jsx';
import { BuildingIcon, UserIcon, RocketIcon } from '../components/icons.jsx';

const AUDIENCES = [
  {
    Icon: BuildingIcon,
    title: 'Empresas',
    text: 'Automatizamos los procesos que frenan tu operación — pedidos, reportes, atención al cliente, facturación.',
  },
  {
    Icon: UserIcon,
    title: 'Profesionales independientes',
    text: 'Liberamos tu tiempo de tareas repetitivas para que te enfoques en tus clientes y tu trabajo.',
  },
  {
    Icon: RocketIcon,
    title: 'Emprendedores',
    text: 'Te ayudamos a escalar sin contratar más gente — automatiza lo que puedas antes de crecer.',
  },
];

/**
 * Primer bloque tras el hero: rompe la barrera de "esto es solo para
 * empresas grandes" antes de contar nada del servicio.
 *
 * Las cards van flat (bg-mist, sin sombra) a propósito: las de servicio
 * usan blanco + shadow-card, y mezclar los dos estilos haría que estas se
 * leyeran como el mismo tipo de contenido.
 */
export default function Audiences() {
  return (
    <section id="para-quien" className="py-20 md:py-32">
      <Container>
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-[30px] font-semibold leading-tight text-ink sm:text-[44px]">
            No necesitas ser una gran empresa para automatizar
          </h2>
          <p className="mx-auto mt-6 max-w-[650px] text-lg leading-relaxed text-ink/80">
            Si eres profesional independiente, tienes un emprendimiento o manejas una empresa
            — si algo en tu día a día se repite, te lo automatizamos.
          </p>
        </SectionReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {AUDIENCES.map(({ Icon, title, text }, i) => (
            <SectionReveal
              key={title}
              delay={i * 0.08}
              className="flex flex-col gap-4 rounded-card bg-mist p-8"
            >
              <Icon className="h-8 w-8 text-brand" />
              <h3 className="text-xl font-semibold text-ink">{title}</h3>
              <p className="leading-relaxed text-ink/80">{text}</p>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.3} className="mt-14 flex justify-center">
          <Button as={Link} to="/servicios" variant="outline">
            Conoce nuestros servicios →
          </Button>
        </SectionReveal>
      </Container>
    </section>
  );
}
