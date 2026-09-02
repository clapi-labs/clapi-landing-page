import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import PageHeader from '../components/PageHeader.jsx';
import PageCTA from '../components/PageCTA.jsx';
import usePageMeta from '../hooks/usePageMeta.js';

// Placeholder — reemplazar por el equipo real cuando esté disponible.
const TEAM = [
  { name: 'Nombre Apellido', role: 'Co-fundador · Desarrollo', bio: 'Le gusta simplificar lo complicado.' },
  { name: 'Nombre Apellido', role: 'Co-fundador · Producto', bio: 'Obsesionado con que las cosas funcionen bien.' },
  { name: 'Nombre Apellido', role: 'Desarrollo', bio: 'Construye la mitad de lo que ves funcionando.' },
];

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);
}

export default function Nosotros() {
  usePageMeta(
    'Nosotros — Clapi',
    'Un equipo de desarrolladores que cree que la tecnología debe simplificar, no complicar.'
  );

  return (
    <>
      <PageHeader
        title="Nosotros"
        subtitle="Un equipo de desarrolladores que cree que la tecnología debe simplificar, no complicar."
      />

      <section className="py-16 md:py-20">
        <Container>
          <SectionReveal className="mx-auto max-w-[700px] space-y-6 text-center text-lg leading-relaxed text-ink/80">
            <p>
              Clapi nació de una idea simple: hay demasiados negocios perdiendo tiempo en tareas que
              una máquina puede hacer mejor, más rápido y sin errores.
            </p>
            <p>
              Somos un equipo de desarrolladores en Colombia que se especializó en automatizaciones.
              No somos una consultora gigante ni una agencia genérica — somos un equipo técnico que
              trabaja directamente contigo, entiende tu negocio y construye exactamente lo que
              necesitas.
            </p>
            <p>
              Creemos que toda empresa, sin importar su tamaño, merece acceder a la automatización. Y
              creemos que la mejor forma de hacerlo es con un equipo que se toma el tiempo de entender
              antes de construir.
            </p>
          </SectionReveal>
        </Container>
      </section>

      <section className="bg-mist py-24 md:py-32">
        <Container>
          <SectionReveal className="mx-auto max-w-3xl text-center">
            <p className="text-[32px] font-semibold leading-[1.3] text-brand">
              Usamos la tecnología para liberar el potencial de las personas y las empresas.
            </p>
          </SectionReveal>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionReveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold leading-tight text-ink sm:text-[40px]">Equipo</h2>
          </SectionReveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m, i) => (
              <SectionReveal key={m.name + i} delay={i * 0.08} className="flex flex-col gap-4">
                <div className="flex aspect-square items-center justify-center rounded-card bg-[linear-gradient(160deg,#EDE6FF_0%,#F7F7F7_100%)]">
                  <span className="text-4xl font-bold text-brand/30">{initials(m.name)}</span>
                </div>
                <div>
                  <p className="text-lg font-semibold text-ink">{m.name}</p>
                  <p className="text-sm text-brand">{m.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{m.bio}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>

      <PageCTA
        title="¿Quieres trabajar con nosotros?"
        primaryLabel="Hablemos →"
        secondaryLabel="Ver servicios →"
        secondaryTo="/servicios"
      />
    </>
  );
}
