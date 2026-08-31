import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import Button from '../components/Button.jsx';

export default function FinalCTA() {
  return (
    <section
      id="contacto"
      className="bg-[linear-gradient(160deg,#532CE1_0%,#3D1FA8_100%)] py-24 md:py-32"
    >
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold leading-tight text-white sm:text-[44px]">
            ¿Listo para dejar de hacer lo mismo mil veces?
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-lg leading-relaxed text-white/80">
            Cuéntanos qué proceso te quita más tiempo. Nosotros nos encargamos del resto.
          </p>
          <div className="mt-10">
            <Button href="mailto:hola@clapi.tech" variant="onDark">
              Conversemos →
            </Button>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
