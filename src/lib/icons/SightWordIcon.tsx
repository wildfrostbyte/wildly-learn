import { ICON_TEXT_FONT_FAMILY, ICON_TEXT_FONT_SIZE, ICON_TEXT_FONT_WEIGHT } from "./iconTextStyle";

type SightWordIconProps = {
  size?: number;
};

export function SightWordIcon({ size = 48 }: SightWordIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <text
        x="2"
        y="52"
        fontSize={ICON_TEXT_FONT_SIZE}
        fontWeight={ICON_TEXT_FONT_WEIGHT}
        fontFamily={ICON_TEXT_FONT_FAMILY}
        fill="currentColor"
      >
        See
      </text>
      <g
        transform="translate(36, 2) scale(1.25)"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </g>
    </svg>
  );
}
