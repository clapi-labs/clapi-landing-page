import LightPillar from './LightPillar.jsx';

/**
 * Fondo único para todo el sitio, no por sección.
 *
 * Va `fixed` a propósito: al no scrollear con el contenido, el haz atraviesa
 * la página entera como una sola pieza de luz en vez de repetirse o cortarse
 * en cada sección. Vive en `-z-10`, que pinta por encima del fondo del canvas
 * (el `bg-canvas` del body) pero por debajo de todo el contenido — por eso las
 * secciones NO deben llevar `bg-canvas` propio, o lo taparían.
 *
 * Se usa el componente tal cual está pensado: UN haz ocupando todo el
 * contenedor, con su propia `pillarRotation` para la diagonal. Trocearlo en
 * bandas estrechas y lavados sueltos rompía el efecto — el degradado del
 * pilar necesita el alto completo para leerse como un rayo.
 *
 * Dos desviaciones deliberadas respecto al demo del componente:
 *  - `lightMode`: el demo asume fondo oscuro. Aquí el sitio es claro, y este
 *    modo mezcla el haz hacia blanco en vez de hacia negro.
 *  - `mixBlendMode="normal"` en vez de `screen`: sobre un fondo claro,
 *    `screen` empuja todo a blanco y el haz desaparece por completo.
 */
export default function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <LightPillar
        topColor="#532CE1"
        bottomColor="#F5F102"
        intensity={1}
        rotationSpeed={0.3}
        glowAmount={0.002}
        pillarWidth={3}
        pillarHeight={0.4}
        noiseIntensity={0.5}
        pillarRotation={25}
        interactive={false}
        mixBlendMode="normal"
        quality="high"
        renderScale={0.7}
        lightMode
      />

      {/* Velo superior: baja el color justo en la franja del navbar, para que
          el cristal no tenga que desenfocar color saturado — que es cuando se
          ve sucio y distorsionado. */}
      <div className="absolute inset-x-0 top-0 h-[26vh] bg-gradient-to-b from-canvas via-canvas/60 to-transparent" />
    </div>
  );
}
