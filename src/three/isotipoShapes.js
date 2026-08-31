import * as THREE from 'three';

/*
  ── Isotipo CLAPI: geometría fuente ─────────────────────────────────────────

  Tres piezas coplanares: el cuerpo violeta en "L", la cinta amarilla superior
  y la punta amarilla inferior.

  Estos vértices se extrajeron de diseño/Isotipo.png ajustando una recta por
  mínimos cuadrados a cada lado del contorno real e intersecando lados
  consecutivos — son las esquinas geométricas exactas del isotipo (verificado
  rasterizando estos polígonos contra la máscara del PNG: IoU 0.983; el resto
  es el redondeo de esquinas, que aquí aplica roundedShape más abajo).

  Coordenadas centradas en el bounding box del isotipo, altura total = 1.
*/
export const VIOLET_BODY = [
  [-0.1254, 0.1291],
  [-0.1254, -0.2081],
  [0.1758, -0.4084],
  [-0.0017, -0.5186],
  [-0.4108, -0.2507],
  [-0.4099, 0.314],
];

export const YELLOW_BAND = [
  [0.4115, 0.2172],
  [0.4115, 0.0152],
  [0.1943, 0.0152],
  [-0.3228, 0.3475],
  [-0.0498, 0.5215],
];

export const YELLOW_TIP = [
  [0.4115, -0.1498],
  [0.4115, -0.255],
  [0.2288, -0.3717],
  [0.0408, -0.2535],
  [0.1978, -0.1513],
];

/*
  Filete clásico en cada vértice: se retrocede una distancia t = r/tan(θ/2)
  por ambos lados y se une con una cuadrática cuyo control es el vértice
  original. t se recorta a la mitad del lado más corto para que dos esquinas
  contiguas nunca se solapen.
*/
export function roundedShape(points, radius) {
  const v = points.map(([x, y]) => new THREE.Vector2(x, y));
  const n = v.length;
  const shape = new THREE.Shape();

  for (let i = 0; i < n; i++) {
    const cur = v[i];
    const d1 = v[(i - 1 + n) % n].clone().sub(cur);
    const d2 = v[(i + 1) % n].clone().sub(cur);
    const l1 = d1.length();
    const l2 = d2.length();
    d1.divideScalar(l1);
    d2.divideScalar(l2);

    const theta = Math.acos(THREE.MathUtils.clamp(d1.dot(d2), -1, 1));
    const t = Math.min(radius / Math.tan(theta / 2), l1 * 0.5, l2 * 0.5);

    const a = cur.clone().addScaledVector(d1, t);
    const b = cur.clone().addScaledVector(d2, t);

    if (i === 0) shape.moveTo(a.x, a.y);
    else shape.lineTo(a.x, a.y);
    shape.quadraticCurveTo(cur.x, cur.y, b.x, b.y);
  }

  shape.closePath();
  return shape;
}

export const ISOTIPO_BOUNDS = {
  halfWidth: 0.4115,
  halfHeight: 0.5215,
};
