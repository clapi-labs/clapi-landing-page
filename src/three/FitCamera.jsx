import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { ISOTIPO_BOUNDS } from './isotipoShapes.js';

/**
 * Encuadra la cámara por ajuste de frustum en vez de una distancia fija.
 *
 * Con una distancia fija, el objeto se recorta en cuanto el contenedor del
 * canvas no tiene el aspect ratio que se tuvo en mente al elegirla — es
 * literalmente lo que pasaba aquí: a fov 32 y z 3.4 el semi-alto del frustum
 * es ~0.97, pero el isotipo escalado (halfHeight 0.52 × scale 2.35 ≈ 1.23) ya
 * es más alto que eso, así que se recortaba arriba y abajo sin importar el
 * tamaño del contenedor.
 *
 * En su lugar se calcula la distancia que necesita CADA eje para que el
 * objeto quepa en `fillFraction` del encuadre, y se usa la mayor — así nunca
 * se recorta, sea cual sea el aspect ratio del contenedor (columna angosta en
 * mobile, cuadrado en desktop, lo que sea).
 */
export default function FitCamera({ scale, fillFraction = 0.62, yOffset = 0.15 }) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  useEffect(() => {
    const halfW = ISOTIPO_BOUNDS.halfWidth * scale;
    const halfH = ISOTIPO_BOUNDS.halfHeight * scale;
    const aspect = size.width / size.height;

    const vFov = (camera.fov * Math.PI) / 180;
    const tanHalfV = Math.tan(vFov / 2);
    const distForHeight = halfH / fillFraction / tanHalfV;
    const distForWidth = halfW / fillFraction / (tanHalfV * aspect);
    const distance = Math.max(distForHeight, distForWidth);

    camera.position.set(0, yOffset, distance);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, size, scale, fillFraction, yOffset]);

  return null;
}
