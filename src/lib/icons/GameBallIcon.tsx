const RED = "#ee1515";
const WHITE = "#ffffff";
const OUTLINE = "#1a1a1a";

type GameBallIconProps = {
  size?: number;
};

export function GameBallIcon({ size = 48 }: GameBallIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill={WHITE} stroke={OUTLINE} strokeWidth="3" />
      <path d="M4 32a28 28 0 0 1 56 0z" fill={RED} stroke={OUTLINE} strokeWidth="3" />
      <rect x="4" y="28.5" width="56" height="7" fill={OUTLINE} />
      <circle cx="32" cy="32" r="8" fill={WHITE} stroke={OUTLINE} strokeWidth="3" />
      <circle cx="32" cy="32" r="3" fill={WHITE} stroke={OUTLINE} strokeWidth="1.5" />
    </svg>
  );
}
