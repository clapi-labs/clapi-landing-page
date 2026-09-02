import Hero from '../sections/Hero.jsx';
import Audiences from '../sections/Audiences.jsx';
import Tailored from '../sections/Tailored.jsx';
import Platforms from '../sections/Platforms.jsx';
import Infrastructure from '../sections/Infrastructure.jsx';
import Evolves from '../sections/Evolves.jsx';
import Team from '../sections/Team.jsx';
import FinalCTA from '../sections/FinalCTA.jsx';
import usePageMeta from '../hooks/usePageMeta.js';

/**
 * La home es un recorrido, no un catálogo: cada bloque responde a la
 * siguiente pregunta que le surge al visitante.
 *
 *   ¿esto es para mí?      → Audiences
 *   ¿cómo trabajan?        → Tailored (personalización + proceso)
 *   ¿hasta dónde llegan?   → Platforms
 *   ¿son confiables?       → Infrastructure
 *   ¿y después de entregar? → Evolves
 *   ¿quiénes son?          → Team
 *   listo, ¿qué hago?      → FinalCTA
 *
 * Los fondos alternan transparente / `bg-mist` para dar ritmo. Los tramos
 * "blancos" se dejan SIN fondo propio a propósito: ahí es donde se ve el haz
 * de luz global de SiteBackground, que es la firma visual del sitio — un
 * blanco sólido lo taparía por completo.
 */
export default function Home() {
  usePageMeta(
    'Clapi — Automatizamos lo repetitivo para que te enfoques en lo que importa',
    'Agencia de automatizaciones personalizadas para empresas y profesionales. Soluciones a medida que funcionan desde el día uno.'
  );

  return (
    <>
      <Hero />
      <Audiences />
      <Tailored />
      <Platforms />
      <Infrastructure />
      <Evolves />
      <Team />
      <FinalCTA />
    </>
  );
}
