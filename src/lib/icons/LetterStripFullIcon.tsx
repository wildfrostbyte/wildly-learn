type LetterStripIconProps = {
  size?: number;
};

const TILE_COUNT = 6;
const TILE_SIZE = 12;
const TILE_GAP = 4;
const VIEWBOX_WIDTH = TILE_COUNT * TILE_SIZE + (TILE_COUNT - 1) * TILE_GAP;

export function LetterStripFullIcon({ size = 48 }: LetterStripIconProps) {
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
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
