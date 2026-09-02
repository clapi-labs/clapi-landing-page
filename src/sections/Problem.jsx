import Container from '../components/Container.jsx';
import SectionReveal from '../components/SectionReveal.jsx';
import {
  MailIcon,
  ClipboardIcon,
  ChartIcon,
  ChatIcon,
  ReceiptIcon,
  BoxIcon,
} from '../components/icons.jsx';

const EXAMPLES = [
  { Icon: MailIcon, text: 'Enviar correos de seguimiento a clientes' },
  { Icon: ClipboardIcon, text: 'Pasar datos de un sistema a otro' },
  { Icon: ChartIcon, text: 'Generar reportes semanales o mensuales' },
  { Icon: ChatIcon, text: 'Responder preguntas frecuentes por WhatsApp' },
  { Icon: ReceiptIcon, text: 'Crear facturas y enviarlas automáticamente' },
  { Icon: BoxIcon, text: 'Actualizar inventario cuando se hace una venta' },
];

export default function Problem() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold leading-tight text-ink sm:text-[44px]">
            Más de lo que crees
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-lg leading-relaxed text-ink/80">
            Si en tu negocio algo se hace igual todos los días, con los mismos pasos y las
            mismas reglas — se puede automatizar.
          </p>
        </SectionReveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXAMPLES.map(({ Icon, text }, i) => (
            <SectionReveal
              key={text}
              delay={i * 0.06}
              className="flex flex-col gap-4 rounded-card border border-lilac bg-mist p-6"
            >
              <Icon className="h-7 w-7 text-brand" />
              <p className="text-base font-medium leading-snug text-ink">{text}</p>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.2} className="mx-auto mt-10 max-w-prose text-center text-base text-ink/60">
          Estos son solo algunos ejemplos. Si se repite, probablemente se puede automatizar.
        </SectionReveal>
      </Container>
    </section>
  );
}
