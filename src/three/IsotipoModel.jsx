import { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { VIOLET_BODY, YELLOW_BAND, YELLOW_TIP, roundedShape } from './isotipoShapes.js';

const COLOR_VIOLET = '#532CE1';
const COLOR_YELLOW = '#F5F102';

const DEPTH = 0.3;
// El PNG real (favicon) redondea la punta y las puntas de la cinta amarilla
// casi a cápsula, mientras el cuerpo violeta (piezas más grandes, lados más
// largos) se ve con un fileteado más discreto — roundedShape ya reproduce
// eso solo, porque clampa el radio a la mitad del lado más corto: subir el
// radio de 0.035 hace que las piezas pequeñas (lados ~0.1-0.2) topen ese
// clamp y se redondeen del todo, mientras el cuerpo violeta (lados ~0.3-0.5)
// se queda con una fracción menor, sin volverse una mancha.
const CORNER = 0.075;

const EXTRUDE_SETTINGS = {
  depth: DEPTH,
  bevelEnabled: true,
  bevelThickness: 0.016,
  bevelSize: 0.014,
  bevelSegments: 4,
  curveSegments: 14,
};

function buildPieceGeometry(points) {
  const geo = new THREE.ExtrudeGeometry(roundedShape(points, CORNER), EXTRUDE_SETTINGS);
  // La extrusión crece en +Z desde el plano del perfil; centrarla para que
  // las tres piezas queden coplanares y el grupo rote sobre su propio centro.
  geo.translate(0, 0, -DEPTH / 2);
  return geo;
}

// Silicona/vidrio: clearcoat al máximo pero con su propia rugosidad (el
// brillo se ve "gordo" y suave en vez de un punto láser de plástico duro), un
// `sheen` sutil para el aterciopelado de silicona en los cantos rasantes, y
// más envMap para que la piel del material reciba y devuelva luz.
function brandMaterial(color) {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.34,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.26,
    envMapIntensity: 1.25,
    sheen: 0.6,
    sheenRoughness: 0.55,
    sheenColor: new THREE.Color(color).lerp(new THREE.Color('#ffffff'), 0.5),
  });
}

/**
 * Isotipo CLAPI en 3D, construido en el navegador a partir de la silueta real
 * de la marca (ver isotipoShapes.js) — nada de asset externo que cargar.
 *
 * Preparado para sustituirse por un modelo .glb: si se pasa `glbUrl`, se
 * carga y renderiza ese modelo en su lugar; si no, se usa esta geometría
 * procedural (ya validada contra el PNG oficial del isotipo, colores de
 * marca exactos). Para activarlo: <IsotipoModel glbUrl="/models/isotipo.glb" />.
 */
export default function IsotipoModel({ glbUrl, ...props }) {
  if (glbUrl) return <GltfIsotipo url={glbUrl} {...props} />;
  return <ProceduralIsotipo {...props} />;
}

function GltfIsotipo({ url, ...props }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} {...props} />;
}

function ProceduralIsotipo(props) {
  const matViolet = useMemo(() => brandMaterial(COLOR_VIOLET), []);
  const matYellow = useMemo(() => brandMaterial(COLOR_YELLOW), []);

  const violetGeo = useMemo(() => buildPieceGeometry(VIOLET_BODY), []);
  const bandGeo = useMemo(() => buildPieceGeometry(YELLOW_BAND), []);
  const tipGeo = useMemo(() => buildPieceGeometry(YELLOW_TIP), []);

  return (
    <group {...props}>
      <mesh geometry={violetGeo} material={matViolet} castShadow receiveShadow />
      <mesh geometry={bandGeo} material={matYellow} castShadow receiveShadow />
      <mesh geometry={tipGeo} material={matYellow} castShadow receiveShadow />
    </group>
  );
}
