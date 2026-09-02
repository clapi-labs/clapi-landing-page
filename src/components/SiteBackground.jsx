import { useEffect, useState } from 'react';
import LightPillar from './LightPillar.jsx';

/**
 * En formato retrato el haz cae en buena parte fuera del encuadre y el fondo
 * se queda casi blanco. `glowAmount` es un uniform con su propio efecto en
 * LightPillar, así que subirlo NO recrea el contexto WebGL: solo abre el
 * brillo para que la luz siga leyéndose en pantallas estrechas.
 */
function useIsNarrow() {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return narrow;
}

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
  const narrow = useIsNarrow();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <LightPillar
        topColor="#532CE1"
        bottomColor="#F5F102"
        intensity={1}
        rotationSpeed={0.3}
        glowAmount={narrow ? 0.0055 : 0.002}
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
          ve sucio y distorsionado.

          En móvil va MUCHO más suave (55% → 0 en vez de opaco → 0). Con el
          velo opaco la barra de cristal desenfocaba blanco puro y se leía
          como una tira blanca pegada encima de la página, con un corte duro
          justo donde terminaba; además apagaba el haz en el tercio superior,
          que es casi todo lo que se ve en un móvil sin scrollear. */}
      <div className="absolute inset-x-0 top-0 h-[22vh] bg-gradient-to-b from-canvas/55 via-canvas/20 to-transparent sm:h-[26vh] sm:from-canvas sm:via-canvas/60" />
    </div>
  );
}
