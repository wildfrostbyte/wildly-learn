import { Play } from "lucide-react";
import "./PlayButton.css";

type PlayButtonProps = {
  onClick: () => void;
  ariaLabel?: string;
};

export function PlayButton({ onClick, ariaLabel = "Start" }: PlayButtonProps) {
  return (
    <button type="button" className="play-button" onClick={onClick} aria-label={ariaLabel}>
      <Play size={34} fill="currentColor" />
      <span>Play</span>
    </button>
  );
}
