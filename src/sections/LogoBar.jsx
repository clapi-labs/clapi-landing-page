import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';

// Placeholder — reemplazar por los logos reales de los clientes cuando estén
// disponibles.
const PLACEHOLDER_LOGOS = ['Nimbus', 'Vertex', 'Orbital', 'Atlas', 'Forma', 'Lumen'];

export default function LogoBar() {
  return (
    <section className="border-y border-lilac py-14">
      <Container>
        <SectionReveal className="text-center text-sm font-medium tracking-wide text-[#999999]">
          Empresas que ya confían en nosotros
        </SectionReveal>

        <SectionReveal
          delay={0.1}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16"
        >
          {PLACEHOLDER_LOGOS.map((name) => (
            <span
              key={name}
              className="select-none text-xl font-bold tracking-tight text-ink/25 grayscale"
            >
              {name}
            </span>
          ))}
        </SectionReveal>
      </Container>
    </section>
  );
}
