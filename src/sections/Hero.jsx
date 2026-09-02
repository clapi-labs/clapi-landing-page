import { motion } from 'framer-motion';
import SpecularButton from '../components/SpecularButton.jsx';
import Container from '../components/Container.jsx';
import HeroCanvas from '../three/HeroCanvas.jsx';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  // El padding superior en móvil no es estético: el header es `fixed` y mide
  // 80px, así que sin él el titular queda por debajo de la barra. En lg el
  // hero recupera el centrado vertical puro.
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pb-12 pt-28 lg:py-0"
    >
      <Container className="flex flex-col items-center gap-6 text-center sm:gap-10 lg:flex-row lg:gap-16 lg:text-left">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 w-full max-w-2xl shrink-0 lg:w-auto"
        >
          {/*
            `whitespace-nowrap` mantiene las tres líneas exactas del titular,
            pero eso solo es viable si la palabra más larga SIEMPRE cabe: por
            debajo de sm el tamaño fijo desbordaba el viewport y aparecía
            scroll horizontal. De ahí el clamp — "AUTOMATIZA" ocupa unos 6,5em,
            así que 12vw la mantiene dentro del ancho menos el padding. El tope
            del clamp coincide con `sm:text-5xl` para que el salto de escala
            sea continuo.
          */}
          <motion.h1
            variants={item}
            className="whitespace-nowrap text-[clamp(1.75rem,12vw,3rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl md:text-[56px] lg:text-[64px] xl:text-[76px]"
          >
            Automatiza
            <br />
            Ahorra
            <br />
            <span className="text-brand">Y avanza</span>
          </motion.h1>

          {/* El párrafo es lo que fija el ancho de la columna de texto (es más
              ancho que el titular), así que este valor es el que reparte el
              espacio entre texto y modelo. */}
          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/80 sm:mt-6 sm:text-lg lg:mx-0"
          >
            Ayudamos a empresas y profesionales de manera personalizada a automatizar procesos
            para potenciarlos.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:mt-7 lg:justify-start"
          >
            {/* Prueba de SpecularButton: sin relleno, solo el filo, igual que
                el ejemplo original. Lo único que cambia respecto a él son los
                colores, y no por gusto: allí el filo es blanco sobre fondo
                oscuro, y aquí el lienzo es claro — un filo blanco sería
                literalmente invisible. Así que el anillo base va en lila y el
                destello que lo recorre en el morado de marca.
                `radius` alto se recorta solo a alto/2, o sea píldora. */}
            <SpecularButton
              as="a"
              href="#contacto"
              size="md"
              radius={999}
              tintOpacity={0}
              blur={0}
              textColor="#532CE1"
              baseColor="#8C6FE0"
              lineColor="#532CE1"
              intensity={1}
              shineSize={10}
              shineFade={40}
              thickness={1.5}
              borderWidth={1.6}
              speed={0.35}
              followMouse
              proximity={250}
              autoAnimate={false}
              className="clapi-specular-cta"
            >
              Conversemos →
            </SpecularButton>
            <a
              href="#servicios"
              className="text-sm font-semibold text-ink underline decoration-ink/30 decoration-2 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
            >
              Ver servicios ↓
            </a>
          </motion.div>
        </motion.div>

        <div className="relative h-[34vh] w-full sm:h-[44vh] lg:h-[80vh] lg:flex-1" aria-hidden="true">
          <HeroCanvas />
        </div>
      </Container>
    </section>
  );
}
