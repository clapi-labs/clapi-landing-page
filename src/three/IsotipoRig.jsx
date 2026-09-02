import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
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
const DRAG_YAW_SENSITIVITY = 0.012; // rad por px de arrastre horizontal
const DRAG_PITCH_SENSITIVITY = 0.008; // rad por px de arrastre vertical
const DRAG_PITCH_LIMIT = THREE.MathUtils.degToRad(35); // tope respecto a BASE_PITCH

/**
 * Sigue al cursor con una rotación MUY leve (orgánica, no mecánica): se
 * escucha el mousemove de toda la ventana —no solo el canvas— porque el
 * modelo vive en la mitad derecha del hero y debería reaccionar aunque el
 * cursor esté sobre el texto de la izquierda.
 *
 * Solo en MÓVIL (por ancho de viewport, no por tipo de puntero — una tablet
 * táctil no tiene puntero fino pero tampoco debe girar sola) el modelo gira
 * solo cuando nadie lo toca, y se puede arrastrar con el dedo para girarlo a
 * mano: mientras dura el toque se suelta el auto-rotate y el giro sigue el
 * dedo 1:1; al soltar, retoma el giro automático justo donde quedó.
 */
export default function IsotipoRig({ scale = 1, ...props }) {
  const group = useRef(null);
  const target = useRef({ yaw: BASE_YAW, pitch: BASE_PITCH });
  const dragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  const hasFinePointer = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
    []
  );
  const isMobile = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
    []
  );
  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    if (!hasFinePointer || isMobile || reduced) return undefined;

    function handlePointerMove(e) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1..1
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      target.current.yaw = BASE_YAW + nx * MAX_YAW;
      target.current.pitch = BASE_PITCH - ny * MAX_PITCH;
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [hasFinePointer, isMobile, reduced]);

  useEffect(() => {
    if (!isMobile || reduced) return undefined;
    const canvasEl = gl.domElement;

    function handlePointerDown(e) {
      if (e.pointerType !== 'touch') return;
      dragging.current = true;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      canvasEl.setPointerCapture(e.pointerId);
    }
    function handlePointerMoveDrag(e) {
      if (!dragging.current) return;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      target.current.yaw += dx * DRAG_YAW_SENSITIVITY;
      target.current.pitch = THREE.MathUtils.clamp(
        target.current.pitch + dy * DRAG_PITCH_SENSITIVITY,
        BASE_PITCH - DRAG_PITCH_LIMIT,
        BASE_PITCH + DRAG_PITCH_LIMIT
      );
    }
    function handlePointerUp(e) {
      dragging.current = false;
      if (canvasEl.hasPointerCapture?.(e.pointerId)) canvasEl.releasePointerCapture(e.pointerId);
    }

    canvasEl.style.touchAction = 'none';
    canvasEl.addEventListener('pointerdown', handlePointerDown);
    canvasEl.addEventListener('pointermove', handlePointerMoveDrag);
    canvasEl.addEventListener('pointerup', handlePointerUp);
    canvasEl.addEventListener('pointercancel', handlePointerUp);

    return () => {
      canvasEl.style.touchAction = '';
      canvasEl.removeEventListener('pointerdown', handlePointerDown);
      canvasEl.removeEventListener('pointermove', handlePointerMoveDrag);
      canvasEl.removeEventListener('pointerup', handlePointerUp);
      canvasEl.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isMobile, reduced, gl]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    if (isMobile && !reduced) {
      if (dragging.current) {
        // Control manual: sigue el dedo directo, sin damping.
        g.rotation.y = target.current.yaw;
        g.rotation.x = target.current.pitch;
      } else {
        // Sin tocar: autorotate lento y continuo, retomado justo donde el
        // arrastre lo dejó (`target` se mantiene sincronizado con `g` abajo).
        g.rotation.y += delta * AUTOROTATE_SPEED;
        g.rotation.x = THREE.MathUtils.damp(g.rotation.x, BASE_PITCH, DAMPING, delta);
        target.current.yaw = g.rotation.y;
        target.current.pitch = g.rotation.x;
      }
      return;
    }

    if (hasFinePointer && !reduced) {
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, target.current.yaw, DAMPING, delta);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, target.current.pitch, DAMPING, delta);
    }
    // Tablet sin puntero fino, o prefers-reduced-motion: se queda quieto en
    // su pose base, sin parallax ni autorotate.
  });

  return (
    <group ref={group} rotation={[BASE_PITCH, BASE_YAW, 0]} scale={scale}>
      <IsotipoModel {...props} />
    </group>
  );
}
