import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';

export default function Narrative() {
  return (
    <section id="nosotros" className="py-24 md:py-40">
      <Container>
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <p className="text-[32px] font-semibold leading-[1.3] text-ink sm:text-4xl">
            Las lavadoras no reemplazaron a nadie — devolvieron tiempo.
            <br className="hidden sm:block" /> La automatización hace lo mismo con tu negocio.
          </p>

          <p className="mx-auto mt-8 max-w-prose text-lg leading-relaxed text-ink/80">
            Toda empresa y profesional, sin importar su tamaño, merece acceder a esto. No
            tienes que ser una multinacional para automatizar. Solo necesitas un equipo que
            entienda lo que necesitas y lo construya bien.
          </p>

          <p className="mt-6 text-lg font-medium text-brand">Ese equipo somos nosotros.</p>
        </SectionReveal>
      </Container>
    </section>
  );
}
