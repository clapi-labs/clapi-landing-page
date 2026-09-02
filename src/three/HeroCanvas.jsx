import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import IsotipoRig from './IsotipoRig.jsx';
import FitCamera from './FitCamera.jsx';

const SCALE = 2.35;
const Y_OFFSET = -0.08; // nudge del objeto respecto al centro del canvas

/*
 * ── Dónde va la luz, y por qué ────────────────────────────────────────────
 *
 * Un brillo especular solo se VE si el rayo rebota hacia la cámara, así que
 * la posición correcta no depende del objeto sino del par cámara-superficie.
 * Antes las luces se rotaban junto al isotipo (BASE_YAW) para "mantenerlas en
 * su sitio relativo", y eso justamente las alejaba del ángulo que devuelve
 * luz al espectador. Aquí se colocan en espacio de mundo y se calcula:
 *
 *   La cara frontal, con el isotipo girado BASE_YAW = -0.28 rad, tiene normal
 *   N ≈ (-0.276, 0, 0.961). La cámara mira desde +Z, o sea V ≈ (0, 0, 1).
 *   El reflejo llega al ojo cuando L ≈ 2(N·V)N − V ≈ (-0.53, 0, 0.85):
 *   delante y a la IZQUIERDA. Se le añade algo de altura para que lea como
 *   luz cenital de estudio sin perder el rebote.
 */
const KEY_LIGHT_POSITION = [-3.2, 2.1, 5.1];

// Contraluces de marca: detrás y a los lados, para que el canto atrape color
// en vez de un blanco de estudio plano. Van opuestas entre sí para que cada
// borde del isotipo reciba una u otra.
const RIM_LIGHT_YELLOW_POSITION = [3.4, 2.2, -2.2];
const RIM_LIGHT_PURPLE_POSITION = [-3.2, -1.6, -2.4];

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
  // En móvil el dpr real suele ser 3; a 2 el isotipo se renderiza a cuatro
  // veces los píxeles de un dpr 1, y con clearcoat + sheen + envMap eso pesa.
  // A 1.5 la diferencia no se aprecia en una pantalla de 6" pero el coste por
  // frame se reduce casi a la mitad.
  const maxDpr =
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches ? 1.5 : 2;

  return (
    <Canvas
      shadows
      dpr={[1, maxDpr]}
      camera={{ fov: 32, position: [0, Y_OFFSET, 6] }}
      gl={{ toneMapping: THREE.NeutralToneMapping, toneMappingExposure: 0.92 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <FitCamera scale={SCALE} fillFraction={0.78} yOffset={Y_OFFSET} />

      {/* Ambiente bajo a propósito: el "brillo" no es más luz, es CONTRASTE.
          Con ambiente alto la cara difusa se satura y el especular se pierde
          dentro de ella; dejando la base oscura, el destello destaca. */}
      <ambientLight intensity={0.16} />
      <directionalLight position={KEY_LIGHT_POSITION} intensity={2.2} />
      {/* Rim lights de marca: pegadas al borde y detrás del objeto, para que el
          canto de silicona atrape color en vez de un blanco de estudio plano. */}
      <pointLight position={RIM_LIGHT_YELLOW_POSITION} color="#F5F102" intensity={4.5} />
      <pointLight position={RIM_LIGHT_PURPLE_POSITION} color="#9B7CFF" intensity={3.6} />

      <Suspense fallback={null}>
        <IsotipoRig glbUrl={glbUrl} scale={SCALE} position={[0, Y_OFFSET, 0]} />
        {/* El clearcoat necesita algo que reflejar: sin envMap el material
            solo tiene el punto de brillo de cada foco y se ve plástico mate.
            Subirlo es lo que más aporta al aspecto "brillante". */}
        <Environment preset="studio" environmentIntensity={0.38} />
      </Suspense>
    </Canvas>
  );
}
