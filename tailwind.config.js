/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#532CE1',
        'brand-dark': '#3D1FA8',
        accent: '#F5F102',
        ink: '#0D0B14',
        lilac: '#EDE6FF',
        mist: '#F7F7F7',
        canvas: '#F6F5F7',
      },
      fontFamily: {
        sans: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        // `shell` es el ancho compartido por el navbar y TODAS las secciones
        // (via components/Container.jsx). Un solo número para que el logo de
        // la barra y el titular de abajo caigan sobre la misma vertical, y
        // para que el dock —al encogerse con el scroll— caiga exactamente
        // sobre el ancho del contenido en lugar de inventarse el suyo.
        shell: '1380px',
        container: '1280px',
        prose: '600px',
      },
      // Mismo lenguaje de esquinas que el isotipo: piezas pequeñas casi
      // cápsula (botones → pill) y superficies grandes con un fileteado
      // discreto pero perceptible (tarjetas → card), nunca esquina viva —
      // así todo el sitio "rima" con la marca, como el ícono de una app y su
      // propia UI comparten curvatura.
      borderRadius: {
        card: '20px',
        pill: '50px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.06)',
      },
      spacing: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
};
