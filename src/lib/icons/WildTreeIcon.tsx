const FOREST_GREEN = "#154734";
const FOREST_GREEN_LIGHT = "#1f5c44";
const GOLD = "#eaaa00";

type WildTreeIconProps = {
  size?: number;
};

export function WildTreeIcon({ size = 48 }: WildTreeIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <g fill={FOREST_GREEN_LIGHT} stroke={GOLD} strokeWidth="2" strokeLinejoin="round">
        <polygon points="18,16 11,28 25,28" />
        <polygon points="18,24 9,38 27,38" />
        <rect x="15" y="38" width="6" height="8" rx="1" />
      </g>
      <g fill={FOREST_GREEN} stroke={GOLD} strokeWidth="2" strokeLinejoin="round">
        <polygon points="40,6 30,22 50,22" />
        <polygon points="40,16 27,34 53,34" />
        <polygon points="40,28 24,48 56,48" />
        <rect x="36" y="48" width="8" height="10" rx="1" />
      </g>
    </svg>
  );
}
