import { House, Play, Volume2 } from "lucide-react";
import { ActionButton } from "../../components/ActionButton";
import { IconButton } from "../../components/IconButton";
import { ThemeToggle } from "../../components/ThemeToggle";
import { LetterStripFullIcon } from "../../lib/icons/LetterStripFullIcon";
import { LetterStripHalfIcon } from "../../lib/icons/LetterStripHalfIcon";
import type { SessionMode } from "./types";
import "./SessionSetupScreen.css";

type SessionSetupScreenProps = {
  mode: SessionMode;
  onModeChange: (mode: SessionMode) => void;
  onReview: () => void;
  onPlay: () => void;
  onExit: () => void;
};

export function SessionSetupScreen({
  mode,
  onModeChange,
  onReview,
  onPlay,
  onExit,
}: SessionSetupScreenProps) {
  return (
    <div className="session-setup session-setup--numbers">
      <div className="session-setup__top-bar">
        <IconButton onClick={onExit} ariaLabel="Exit to menu">
          <House size={22} />
        </IconButton>
        <ThemeToggle />
      </div>

      <div className="session-setup__controls">
        <div className="mode-picker">
          <button
            type="button"
            className="mode-picker__option"
            data-selected={mode === "full"}
            onClick={() => onModeChange("full")}
            aria-label="All numbers, 0 to 20"
          >
            <LetterStripFullIcon size={72} />
          </button>
          <button
            type="button"
            className="mode-picker__option"
            data-selected={mode === "half"}
            onClick={() => onModeChange("half")}
            aria-label="Half the numbers"
          >
            <LetterStripHalfIcon size={72} />
          </button>
        </div>
      </div>

      <div className="session-setup__actions">
        <ActionButton
          icon={<Volume2 />}
          label="Listen"
          onClick={onReview}
          ariaLabel="Listen to numbers"
        />
        <ActionButton
          variant="primary"
          icon={<Play fill="currentColor" />}
          label="Play"
          onClick={onPlay}
        />
      </div>
    </div>
  );
}
