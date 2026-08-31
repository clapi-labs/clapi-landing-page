/**
 * Contenedor compartido por el navbar y todas las secciones. Es la ÚNICA
 * definición del margen lateral del sitio: si el navbar usara sus propios
 * valores, el logo y el contenido de abajo no caerían sobre la misma
 * vertical, que es justo lo que se quiere evitar.
 *
 * Se exportan también las clases sueltas (`SHELL_PADDING`) para el caso del
 * navbar, que necesita el mismo padding pero dentro de su propia superficie
 * de cristal en vez de un `<Container>` completo.
 */
export const SHELL_PADDING = 'px-6 md:px-10 xl:px-14';

export default function Container({ as: Tag = 'div', className = '', children }) {
  return (
    <Tag className={`mx-auto w-full max-w-shell ${SHELL_PADDING} ${className}`}>
      {children}
    </Tag>
  );
}
