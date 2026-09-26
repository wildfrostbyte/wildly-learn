type LetterSpeakerIconProps = {
  size?: number;
};

export function LetterSpeakerIcon({ size = 48 }: LetterSpeakerIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <text
        x="3"
        y="55"
        fontSize="49"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fill="currentColor"
      >
        A
      </text>
      <text
        x="38"
        y="55"
        fontSize="36"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fill="currentColor"
      >
        z
      </text>
      <g
        transform="translate(32, 3) scale(1.2)"
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
