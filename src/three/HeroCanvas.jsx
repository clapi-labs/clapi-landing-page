import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import IsotipoRig, { BASE_YAW } from './IsotipoRig.jsx';
import FitCamera from './FitCamera.jsx';

const SCALE = 2.35;
const Y_OFFSET = -0.08; // nudge del objeto respecto al centro del canvas

// Las luces viven en el espacio del mundo, no dentro de IsotipoRig, así que
// no giran solas con el objeto. Se definieron mirando al isotipo de frente;
// para que sigan cayendo en el mismo sitio relativo ahora que reposa girado
// BASE_YAW, se rota su posición ese mismo ángulo alrededor de Y en vez de
// tener dos números mágicos separados que hay que re-cuadrar a mano cada vez
// que cambie el giro de reposo.
function rotateAroundY([x, y, z], angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos + z * sin, y, -x * sin + z * cos];
}

// Arriba-derecha, más fuerte.
const KEY_LIGHT_POSITION = rotateAroundY([2.6, 5, 1.4], BASE_YAW);
const RIM_LIGHT_YELLOW_POSITION = rotateAroundY([-2.6, 0.4, -1.8], BASE_YAW);
const RIM_LIGHT_PURPLE_POSITION = rotateAroundY([2.8, -0.4, -1.6], BASE_YAW);

/**
 * Canvas del isotipo en el hero. Dos cosas dan el volumen "de producto" que
 * pedías (encuadre + brillos), cada una por un mecanismo distinto:
 *
 *  - El encuadre es `FitCamera`: calcula la distancia de la cámara a partir
 *    del tamaño real del contenedor en vez de una distancia fija — con una
 *    fija el objeto se recortaba (su medio-alto ya escalado es mayor que el
 *    medio-alto del frustum a esa distancia, sin importar el contenedor).
 *  - El brillo sobre las caras viene del ENTORNO (`Environment`), no de las
 *    luces: un material físico con clearcoat necesita algo que reflejar —
 *    sin envMap solo tiene el punto de brillo de cada foco y se ve plano de
 *    plástico mate.
 *
 * Sin sombra de contacto: el isotipo flota limpio sobre la sección, sin
 * ningún halo ni sombra proyectada abajo.
 */
export default function HeroCanvas({ glbUrl }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 32, position: [0, Y_OFFSET, 6] }}
      gl={{ toneMapping: THREE.NeutralToneMapping, toneMappingExposure: 0.92 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <FitCamera scale={SCALE} fillFraction={0.78} yOffset={Y_OFFSET} />

      <ambientLight intensity={0.26} />
      <directionalLight position={KEY_LIGHT_POSITION} intensity={1.9} />
      {/* Rim lights de marca: pegadas al borde y detrás del objeto, para que el
          canto de silicona atrape color en vez de un blanco de estudio plano. */}
      <pointLight position={RIM_LIGHT_YELLOW_POSITION} color="#F5F102" intensity={4.5} />
      <pointLight position={RIM_LIGHT_PURPLE_POSITION} color="#9B7CFF" intensity={3.6} />

      <Suspense fallback={null}>
        <IsotipoRig glbUrl={glbUrl} scale={SCALE} position={[0, Y_OFFSET, 0]} />
        <Environment preset="studio" environmentIntensity={0.32} />
      </Suspense>
    </Canvas>
  );
}
