/**
 * Botón pill. Dos variantes:
 *  - primary: fondo morado, hover amarillo (comportamiento por defecto pedido
 *    en el brief).
 *  - onDark: pensado para el CTA final sobre fondo morado oscuro — ya nace
 *    amarillo, así que en vez de "hover amarillo" (que sería invisible)
 *    oscurece y levanta un poco.
 */
const VARIANTS = {
  primary: 'bg-brand text-white hover:bg-accent hover:text-ink',
  onDark: 'bg-accent text-ink hover:bg-white',
};

export default function Button({
  as: Tag = 'a',
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  return (
    <Tag
      className={`inline-flex items-center gap-2 rounded-pill px-8 py-4 text-base font-semibold
        transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0
        ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
