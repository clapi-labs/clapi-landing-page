import { motion } from 'framer-motion';
import Button from '../components/Button.jsx';
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
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <Container className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 w-full max-w-2xl shrink-0 lg:w-auto"
        >
          {/* `whitespace-nowrap`: el titular está pensado como tres líneas
              exactas, así que ninguna palabra debe partirse por su cuenta al
              estrecharse la columna. */}
          <motion.h1
            variants={item}
            className="whitespace-nowrap text-[38px] font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl md:text-[56px] lg:text-[64px] xl:text-[76px]"
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
          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">
            Ayudamos a empresas y profesionales de manera personalizada a automatizar procesos
            para potenciarlos.
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="#contacto" className="!text-sm">Conversemos →</Button>
            <a
              href="#servicios"
              className="text-sm font-semibold text-ink underline decoration-ink/30 decoration-2 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
            >
              Ver servicios ↓
            </a>
          </motion.div>
        </motion.div>

        <div className="relative h-[42vh] w-full sm:h-[50vh] lg:h-[80vh] lg:flex-1" aria-hidden="true">
          <HeroCanvas />
        </div>
      </Container>
    </section>
  );
}
