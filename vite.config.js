import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages sirve los project pages bajo /<repo>/, no en la raíz del
// dominio — sin `base` los assets y las rutas de react-router (que usa
// `import.meta.env.BASE_URL` como basename, ver App.jsx) se resolverían
// contra "/" y todo devolvería 404. En dev sigue siendo "/" porque Vite solo
// aplica `base` al build de producción.
export default defineConfig({
  base: process.env.GH_PAGES ? '/clapi-landing-page/' : '/',
  plugins: [react()],
});
