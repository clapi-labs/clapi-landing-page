/**
 * Tira de "gradual blur" pegada justo debajo del navbar — la misma técnica
 * del componente GradualBlur (varias capas de backdrop-filter apiladas,
 * cada una recortada con mask-image a una franja horizontal y con más
 * blur cuanto más cerca está del borde): el contenido de la sección se va
 * desenfocando progresivamente al "chocar" con el cristal del navbar, en
 * vez de cortarse de golpe contra un bloque de blur plano.
 *
 * Aquí está fijada (no depende de scroll/hover): vive pegada al borde
 * inferior del header fijo, con blur máximo arriba (donde toca el navbar)
 * y transparente abajo (donde ya no debe tocar el contenido).
 */
const DIV_COUNT = 6;
const STRENGTH = 0.5;

function buildLayers() {
  const increment = 100 / DIV_COUNT;
  const layers = [];

  for (let i = 1; i <= DIV_COUNT; i++) {
    const progress = i / DIV_COUNT;
    const blurRem = 0.0625 * (progress * DIV_COUNT + 1) * STRENGTH;

    const p1 = Math.round((increment * i - increment) * 10) / 10;
    const p2 = Math.round(increment * i * 10) / 10;
    const p3 = Math.round((increment * i + increment) * 10) / 10;
    const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

    let gradient = `transparent ${p1}%, black ${p2}%`;
    if (p3 <= 100) gradient += `, black ${p3}%`;
    if (p4 <= 100) gradient += `, transparent ${p4}%`;

    layers.push({ key: i, gradient, blurRem });
  }

  return layers;
}

const LAYERS = buildLayers();

export default function GradualBlurEdge({ top, height = '5rem' }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 z-40" style={{ top, height }} aria-hidden="true">
      <div className="relative h-full w-full" style={{ isolation: 'isolate' }}>
        {LAYERS.map(({ key, gradient, blurRem }) => (
          <div
            key={key}
            className="absolute inset-0"
            style={{
              maskImage: `linear-gradient(to top, ${gradient})`,
              WebkitMaskImage: `linear-gradient(to top, ${gradient})`,
              backdropFilter: `blur(${blurRem.toFixed(3)}rem)`,
              WebkitBackdropFilter: `blur(${blurRem.toFixed(3)}rem)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
