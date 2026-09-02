import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button.jsx';
import GlareHover from './GlareHover.jsx';
import GooeyNav from './GooeyNav.jsx';
import StaggeredMenu from './StaggeredMenu.jsx';
import GlassSurface from './GlassSurface.jsx';
import { SHELL_PADDING } from './Container.jsx';
import { useChat } from '../context/ChatContext.jsx';
import logoDark from '../assets/logotipo-dark.png';

// Barra fija, sin animación de encogido al hacer scroll: siempre el mismo
// aspecto, a lo ancho y plana — no la píldora flotante que había en el
// estado "scrolled" antes. El cristal queda siempre puesto pero atenuado,
// para que se sienta como parte de la página y no como una tarjeta suelta
// encima de ella.
const NAV_HEIGHT = 80;

const LINKS = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/precios', label: 'Precios' },
  { href: '/nosotros', label: 'Nosotros' },
];

// El menú móvil añade el CTA como un ítem más: StaggeredMenu no admite
// contenido suelto en el panel, y el drawer anterior sí llevaba el botón.
// `link: '#chat'` es un valor sentinel interceptado por `handleNavClick` para
// abrir el chat en vez de navegar — StaggeredMenu solo sabe renderizar <a>.
const MENU_ITEMS = [
  ...LINKS.map((link) => ({ label: link.label, ariaLabel: `Ir a ${link.label}`, link: link.href })),
  { label: 'Hablemos', ariaLabel: 'Abrir el chat de Clapi', link: '#chat' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { openChat } = useChat();
  // El logo navega a "/" pero no pasa por el onClick de GooeyNav (no es uno
  // de sus <a>), así que la píldora de la última sección visitada se quedaba
  // marcada. `cleared` fuerza a -1 en cuanto la ruta es home.
  const onHome = location.pathname === '/';

  // Delegación de click a nivel de contenedor: GooeyNav y StaggeredMenu
  // renderizan <a> normales (no se tocan sus internals) — aquí se intercepta
  // el click ANTES de que el navegador siga el href, para convertir rutas
  // internas en navegación SPA y el sentinel '#chat' en apertura del panel.
  function handleNavClick(e) {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href === '#chat') {
      e.preventDefault();
      openChat();
    } else if (href && href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
    }
  }

  // Bloquea el scroll del body mientras el panel mobile está abierto.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50" onClick={handleNavClick}>
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
        Barra plana a lo ancho, pegada arriba del todo — sin radio, sin
        sombra, sin margen. El cristal se nota por el desenfoque/saturación
        del fondo, no por una forma flotando encima de la página.
      */}
      <GlassSurface
        width="100%"
        height={NAV_HEIGHT}
        borderRadius={0}
        backgroundOpacity={0.08}
        saturation={1.15}
        className="navbar-liquid-glass glass-surface--flat"
      >
        <div className={`mx-auto grid h-full w-full max-w-shell grid-cols-[auto_1fr] items-center ${SHELL_PADDING}`}>
          {/* Logo + secciones agrupados a la izquierda, en vez de logo | nav
              centrado | CTA: la nav ya no necesita el centro del viewport
              para leerse, y así queda todo el peso de marca y navegación del
              mismo lado. */}
          <div className="flex items-center gap-8 justify-self-start">
            <a href="/" className="relative z-10 shrink-0" aria-label="Clapi — inicio">
              <GlareHover
                glareColor="#ffffff"
                glareOpacity={0.6}
                glareAngle={-45}
                glareSize={220}
                transitionDuration={600}
                borderRadius="0px"
              >
                <img src={logoDark} alt="Clapi" className="h-8 w-auto" />
              </GlareHover>
            </a>

            {/* `initialActiveIndex={-1}`: sin píldora al cargar. GooeyNav la
                exige para posicionar el efecto, pero arrancar con "Servicios"
                marcado sugeriría que estás en esa sección. El componente ya
                tolera un índice fuera de rango. */}
            <div className="clapi-gooey-nav relative hidden lg:block">
              <GooeyNav
                items={LINKS.map((link) => ({ label: link.label, href: link.href }))}
                particleCount={15}
                particleDistances={[90, 10]}
                particleR={100}
                initialActiveIndex={-1}
                cleared={onHome}
                animationTime={600}
                timeVariance={300}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
              />
            </div>
          </div>

          {/* Por debajo de lg el botón de menú lo aporta StaggeredMenu
              (abajo), que se posiciona por su cuenta sobre esta barra. */}
          <div className="relative z-10 hidden items-center gap-3 justify-self-end sm:flex">
            {/* Mismo GlareHover que el logo, mismos valores, solo el color
                cambia a amarillo de marca — pedido tal cual para el CTA. Se
                fija el morado en el propio hover de Button (que por defecto
                pinta de amarillo sólido): un brillo amarillo sobre un fondo
                ya amarillo no tiene contraste y el barrido no se alcanza a
                ver, así que el morado fijo es el lienzo que lo hace visible. */}
            <GlareHover
              glareColor="#F5F102"
              glareOpacity={0.6}
              glareAngle={-45}
              glareSize={220}
              transitionDuration={600}
              borderRadius="50px"
            >
              <Button
                as="button"
                type="button"
                onClick={openChat}
                className="!px-5 !py-2.5 !text-sm hover:!bg-brand hover:!text-white"
              >
                Hablemos →
              </Button>
            </GlareHover>
          </div>
        </div>
      </GlassSurface>

      {/*
        Menú lateral solo en móvil. Sustituye al panel que había antes: aporta
        su propio botón (se posiciona sobre la barra de cristal) y su propio
        panel a pantalla completa, así que aquí solo se envuelve en `lg:hidden`
        y se le pasa el mismo array de secciones que usa el nav de escritorio.
      */}
      <div className="lg:hidden">
        <StaggeredMenu
          position="right"
          isFixed
          items={MENU_ITEMS}
          displaySocials={false}
          displayItemNumbering
          colors={['#EDE6FF', '#532CE1']}
          accentColor="#532CE1"
          menuButtonColor="#0D0B14"
          openMenuButtonColor="#0D0B14"
          changeMenuColorOnOpen={false}
          logoUrl={logoDark}
          onMenuOpen={() => setMenuOpen(true)}
          onMenuClose={() => setMenuOpen(false)}
        />
      </div>
    </header>
  );
}
