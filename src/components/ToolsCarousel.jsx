import './ToolsCarousel.css';

/*
 * Herramientas e IAs que Clapi integra. Son wordmarks tipográficos, no los
 * logos oficiales: usar las marcas reales exige sus archivos y respetar las
 * guías de cada una, así que hasta tener esos assets se muestran como texto
 * monocromo — que además es justo lo que pide el diseño (nada compitiendo
 * con el morado y el amarillo de la paleta).
 */
export const DEFAULT_TOOLS = [
  'Claude',
  'OpenAI',
  'LiveKit',
  'AWS',
  'Google Cloud',
  'n8n',
  'Make',
  'Zapier',
  'WhatsApp Business',
  'Telegram',
];

/**
 * Banda de logos en loop infinito, lenta y sin controles (decorativa).
 *
 * Reutilizable: acepta su propia lista, velocidad y separación, así que
 * sirve igual en la home que en /servicios o /nosotros.
 *
 * `items` se renderiza DOS veces a propósito — el CSS desplaza la pista
 * -50%, que es exactamente el ancho de una copia, y por eso el loop no tiene
 * salto. Si se renderizara una sola vez, al reiniciar aparecería un hueco.
 *
 * CUIDADO al reusarlo: la pista mide `max-content` (miles de px). Dentro de
 * un grid o flex hay que darle al contenedor un track `minmax(0, 1fr)`
 * (`grid-cols-*` de Tailwind) o `min-w-0`; con un track `auto` la pista
 * dimensiona la columna y desborda la página a lo ancho.
 */
export default function ToolsCarousel({
  items = DEFAULT_TOOLS,
  duration = 36,
  gap = '4rem',
  className = '',
}) {
  const group = (
    <div className="tools-carousel__group" aria-hidden="true">
      {items.map((name) => (
        <span
          key={name}
          className="select-none whitespace-nowrap text-xl font-bold tracking-tight text-ink/30 sm:text-2xl"
        >
          {name}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`tools-carousel ${className}`}
      style={{ '--tc-duration': `${duration}s`, '--tc-gap': gap }}
    >
      {/* La lista real para lectores de pantalla va una sola vez y oculta:
          las dos copias visibles son duplicados decorativos. */}
      <ul className="sr-only">
        {items.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <div className="tools-carousel__track">
        {group}
        {group}
      </div>
    </div>
  );
}
