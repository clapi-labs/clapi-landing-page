import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import { ClipboardIcon, MailIcon, ChartIcon, ChatIcon } from '../components/icons.jsx';

const PAINS = [
  { Icon: ClipboardIcon, text: 'Copiar datos manualmente entre sistemas' },
  { Icon: MailIcon, text: 'Enviar correos repetitivos uno por uno' },
  { Icon: ChartIcon, text: 'Actualizar reportes y hojas de cálculo a mano' },
  { Icon: ChatIcon, text: 'Responder las mismas preguntas todos los días' },
];

export default function Problem() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold leading-tight text-ink sm:text-[44px]">
            ¿Cuántas horas a la semana pierdes haciendo lo mismo?
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-lg leading-relaxed text-ink/80">
            Copiar datos entre sistemas. Enviar los mismos correos. Actualizar hojas de
            cálculo. Responder lo mismo una y otra vez. Si algo en tu negocio se repite —
            se puede automatizar.
          </p>
        </SectionReveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PAINS.map(({ Icon, text }, i) => (
            <SectionReveal
              key={text}
              delay={i * 0.08}
              className="flex flex-col gap-4 rounded-card border border-lilac bg-mist p-6"
            >
              <Icon className="h-7 w-7 text-brand" />
              <p className="text-base font-medium leading-snug text-ink">{text}</p>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
