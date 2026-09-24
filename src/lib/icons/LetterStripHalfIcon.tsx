type LetterStripIconProps = {
  size?: number;
};

const TILE_COUNT = 6;
const TILE_SIZE = 12;
const TILE_GAP = 4;
const VIEWBOX_WIDTH = TILE_COUNT * TILE_SIZE + (TILE_COUNT - 1) * TILE_GAP;
const FILLED_TILE_COUNT = TILE_COUNT / 2;

export function LetterStripHalfIcon({ size = 48 }: LetterStripIconProps) {
  return (
    <svg
      width={size}
      height={(size * TILE_SIZE) / VIEWBOX_WIDTH}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${TILE_SIZE}`}
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: TILE_COUNT }, (_, index) => (
        <rect
          key={index}
          x={index * (TILE_SIZE + TILE_GAP)}
          y={0}
          width={TILE_SIZE}
          height={TILE_SIZE}
          rx={3}
          fill={index < FILLED_TILE_COUNT ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.5}
          opacity={index < FILLED_TILE_COUNT ? 1 : 0.5}
        />
      ))}
    </svg>
  );
}
