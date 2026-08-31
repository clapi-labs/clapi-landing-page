import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button.jsx';
import GlareHover from './GlareHover.jsx';
import GooeyNav from './GooeyNav.jsx';
import GlassSurface from './GlassSurface.jsx';
import { SHELL_PADDING } from './Container.jsx';
import logoDark from '../assets/logotipo-dark.png';

const BAR_HEIGHT = 80; // barra completa, arriba del todo
const DOCK_HEIGHT = 64; // dock encogido, ya scrolleando
// Mismo lenguaje de esquinas que el resto de la UI: `rounded-card` es 20px
// para tarjetas; el dock es una superficie mayor, así que escala a 24 — igual
// que un ícono de app y su UI comparten curvatura sin ser el mismo número.
const DOCK_RADIUS = 24;

/*
 * Una sola duración y una sola curva para TODO lo que se mueve al pasar a
 * dock: ancho, alto, radio, sombra y logo. Antes el wrapper usaba el
 * `ease-out` de Tailwind y el cristal su propia cubic-bezier — dos curvas
 * distintas para partes del mismo gesto, que es lo que hacía que el ancho y
 * el alto llegaran desacompasados y se sintiera raro. Debe ir en index.css
 * también (la transición de GlassSurface).
 */
const DOCK_MOTION = 'duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]';

const LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#por-que-clapi', label: 'Por qué Clapi' },
  { href: '#casos', label: 'Casos de éxito' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloquea el scroll del body mientras el panel mobile está abierto.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/*
        Filtro "gooey" sobre el canal alfa: el blur difumina las partículas y
        el feColorMatrix multiplica su alfa (×19, offset −9) para volver a
        endurecer los bordes, de modo que las gotas cercanas se funden entre
        sí. Sobre alfa y no sobre color porque el navbar es translúcido — ver
        la nota en index.css.
      */}
      <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden="true" focusable="false">
        <filter id="clapi-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
          />
        </filter>
      </svg>

      {/*
        El encogido a dock se hace con max-width en vez de con un transform:
        `max-w-full` → `max-w-shell` interpola bien porcentaje contra px, y así
        el contenido interior se re-maqueta de verdad (el cristal, la sombra y
        el radio siguen al elemento) en lugar de deformarse por escala.

        Ya encogido usa el MISMO `max-w-shell` + padding que `Container`, así
        que el borde exterior del dock cae exactamente sobre el borde del
        contenido de abajo — no es un ancho propio del navbar. Full width, por
        tanto, solo existe arriba del todo y solo para la barra.
      */}
      <div
        className={`mx-auto w-full transition-[max-width,padding] ${DOCK_MOTION} ${
          scrolled ? `max-w-shell ${SHELL_PADDING} pt-3` : 'max-w-full px-0 pt-0'
        }`}
      >
        {/*
          Arriba del todo la barra va COMPLETAMENTE plana: ni sombra propia ni
          las que trae GlassSurface (de ahí `glass-surface--flat`). Cualquier
          sombra ahí dibuja una línea que separa el navbar del contenido, y la
          idea es justo la contraria: que al inicio se funda con la página y
          solo destaque cuando el scroll lo convierte en dock.
        */}
        <div
          className={`relative transition-[box-shadow,border-radius] ${DOCK_MOTION} ${
            scrolled ? 'shadow-[0_22px_50px_-22px_rgba(13,11,20,0.45)]' : 'shadow-none'
          }`}
          style={{ borderRadius: scrolled ? DOCK_RADIUS : 0 }}
        >
          <GlassSurface
            width="100%"
            height={scrolled ? DOCK_HEIGHT : BAR_HEIGHT}
            borderRadius={scrolled ? DOCK_RADIUS : 0}
            backgroundOpacity={scrolled ? 0.2 : 0.1}
            saturation={scrolled ? 1.4 : 1.2}
            className={`navbar-liquid-glass ${scrolled ? '' : 'glass-surface--flat'}`}
          >
            {/*
              Sin scroll usa el mismo ancho y padding que `Container`, para que
              el logo caiga exactamente sobre la vertical del titular del hero.
              Ya como dock ese margen lo pone el wrapper de fuera, así que aquí
              solo queda el aire mínimo del propio dock.
            */}
            <div
              className={`mx-auto grid h-full w-full grid-cols-[auto_1fr_auto] items-center transition-[max-width,padding] ${DOCK_MOTION} ${
                scrolled ? 'max-w-none px-5' : `max-w-shell ${SHELL_PADDING}`
              }`}
            >
              <a href="#top" className="relative z-10 shrink-0 justify-self-start" aria-label="Clapi — inicio">
                <GlareHover
                  glareColor="#ffffff"
                  glareOpacity={0.6}
                  glareAngle={-45}
                  glareSize={220}
                  transitionDuration={600}
                  borderRadius="0px"
                >
                  <img
                    src={logoDark}
                    alt="Clapi"
                    className={`w-auto transition-[height] ${DOCK_MOTION} ${scrolled ? 'h-7' : 'h-8'}`}
                  />
                </GlareHover>
              </a>

              {/* `initialActiveIndex={-1}`: sin píldora al cargar. GooeyNav
                  la exige para posicionar el efecto, pero arrancar con
                  "Servicios" marcado sugeriría que estás en esa sección. El
                  componente ya tolera un índice fuera de rango. */}
              <div className="clapi-gooey-nav relative hidden justify-self-center lg:block">
                <GooeyNav
                  items={LINKS.map((link) => ({ label: link.label, href: link.href }))}
                  particleCount={15}
                  particleDistances={[90, 10]}
                  particleR={100}
                  initialActiveIndex={-1}
                  animationTime={600}
                  timeVariance={300}
                  colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                />
              </div>

              <div className="relative z-10 flex items-center gap-3 justify-self-end">
                <div className="hidden sm:block">
                  <Button href="#contacto" className="!px-5 !py-2.5 !text-sm">
                    Conversemos →
                  </Button>
                </div>

                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
                  aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  <BurgerIcon open={menuOpen} />
                </button>
              </div>
            </div>
          </GlassSurface>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-50 flex w-[82%] max-w-sm flex-col gap-8 bg-white px-8 py-8 shadow-2xl lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between">
                <img src={logoDark} alt="Clapi" className="h-6 w-auto" />
                <button
                  type="button"
                  aria-label="Cerrar menú"
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  onClick={() => setMenuOpen(false)}
                >
                  <BurgerIcon open />
                </button>
              </div>

              <nav className="flex flex-col gap-6" aria-label="Navegación móvil">
                {LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-xl font-semibold text-ink"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <Button href="#contacto" className="mt-auto justify-center" onClick={() => setMenuOpen(false)}>
                Conversemos →
              </Button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function BurgerIcon({ open }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <motion.line
        x1="2" y1="6" x2="18" y2="6" stroke="#0D0B14" strokeWidth="1.6" strokeLinecap="round"
        animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
        style={{ transformOrigin: '10px 6px' }}
      />
      <motion.line
        x1="2" y1="14" x2="18" y2="14" stroke="#0D0B14" strokeWidth="1.6" strokeLinecap="round"
        animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }}
        style={{ transformOrigin: '10px 14px' }}
      />
    </svg>
  );
}
