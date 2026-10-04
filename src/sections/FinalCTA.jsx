import { Link } from 'react-router-dom';
import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import Button from '../components/Button.jsx';
import { PHONE_DISPLAY, PHONE_TEL, whatsappLinkProps } from '../config/contact.js';

export default function FinalCTA() {
  return (
    <section
      id="contacto"
      className="bg-[linear-gradient(160deg,#532CE1_0%,#3D1FA8_100%)] py-24 md:py-32"
    >
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-[30px] font-semibold leading-tight text-white sm:text-[44px]">
            ¿Listo para automatizar lo que te quita tiempo?
          </h2>
          <p className="mx-auto mt-6 max-w-[600px] text-lg leading-relaxed text-white/80">
            Escríbenos por WhatsApp y cuéntanos tu caso. Nuestro equipo te responde en menos de
            24 horas.
          </p>
          {/* El secundario va debajo del botón (no al lado) para que la
              jerarquía sea evidente: una acción principal, una alternativa. */}
          <div className="mt-10 flex flex-col items-center gap-6">
            <Button {...whatsappLinkProps} variant="onDark">
              Quiero automatizar →
            </Button>
            <p className="text-sm text-white/70">
              o llámanos al{' '}
              <a href={PHONE_TEL} className="font-semibold text-white hover:text-accent">
                {PHONE_DISPLAY}
              </a>
            </p>
            <Link
              to="/precios"
              className="text-base font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
            >
              Ver precios →
            </Link>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
