import { Link } from 'react-router-dom';
import Container from './Container.jsx';
import SectionReveal from './SectionReveal.jsx';
import Button from './Button.jsx';
import { useChat } from '../context/ChatContext.jsx';

/**
 * CTA de cierre de página, reutilizado en /servicios, /proyectos, /precios y
 * /nosotros. El CTA principal siempre abre el chat; el secundario puede ser
 * un botón outline (servicios) o un link subrayado (el resto).
 */
export default function PageCTA({
  title,
  primaryLabel = 'Hablemos →',
  secondaryLabel,
  secondaryTo,
  secondaryStyle = 'link',
  bg = 'white',
}) {
  const { openChat } = useChat();

  return (
    <section className={`py-20 md:py-28 ${bg === 'mist' ? 'bg-mist' : ''}`}>
      <Container>
        <SectionReveal className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
          <h2 className="text-3xl font-semibold leading-tight text-ink sm:text-4xl">{title}</h2>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Button as="button" type="button" onClick={openChat}>
              {primaryLabel}
            </Button>
            {secondaryLabel &&
              secondaryTo &&
              (secondaryStyle === 'outline' ? (
                <Button as={Link} to={secondaryTo} variant="outline">
                  {secondaryLabel}
                </Button>
              ) : (
                <Link
                  to={secondaryTo}
                  className="text-base font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                >
                  {secondaryLabel}
                </Link>
              ))}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
