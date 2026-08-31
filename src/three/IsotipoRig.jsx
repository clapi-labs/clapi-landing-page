import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import IsotipoModel from './IsotipoModel.jsx';

const MAX_YAW = THREE.MathUtils.degToRad(9); // giro izquierda/derecha
const MAX_PITCH = THREE.MathUtils.degToRad(6); // giro arriba/abajo, más sutil
// Leve giro hacia el texto (izquierda) en reposo, no de frente puro. Se
// exporta porque HeroCanvas rota las luces el mismo ángulo — si no, quedan
// pensadas para el objeto de frente y las caras que gira hacia la cámara
// aparecen mal iluminadas.
export const BASE_YAW = -0.28;
const BASE_PITCH = 0.08;
const AUTOROTATE_SPEED = 0.22; // rad/s en mobile (sin cursor)
const DAMPING = 6; // más alto = responde más rápido al cursor

/**
 * Sigue al cursor con una rotación MUY leve (orgánica, no mecánica): se
 * escucha el mousemove de toda la ventana —no solo el canvas— porque el
 * modelo vive en la mitad derecha del hero y debería reaccionar aunque el
 * cursor esté sobre el texto de la izquierda. En touch (sin puntero fino) o
 * con prefers-reduced-motion, en vez de parallax gira solo, lento y continuo.
 */
export default function IsotipoRig({ scale = 1, ...props }) {
  const group = useRef(null);
  const target = useRef({ yaw: BASE_YAW, pitch: BASE_PITCH });

  const hasFinePointer = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
    []
  );
  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    if (!hasFinePointer || reduced) return undefined;

    function handlePointerMove(e) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1..1
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      target.current.yaw = BASE_YAW + nx * MAX_YAW;
      target.current.pitch = BASE_PITCH - ny * MAX_PITCH;
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [hasFinePointer, reduced]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    if (!hasFinePointer && !reduced) {
      // Mobile: autorotate lento y continuo en vez de parallax.
      g.rotation.y += delta * AUTOROTATE_SPEED;
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, BASE_PITCH, DAMPING, delta);
      return;
    }

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, target.current.yaw, DAMPING, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, target.current.pitch, DAMPING, delta);
  });

  return (
    <group ref={group} rotation={[BASE_PITCH, BASE_YAW, 0]} scale={scale}>
      <IsotipoModel {...props} />
    </group>
  );
}
