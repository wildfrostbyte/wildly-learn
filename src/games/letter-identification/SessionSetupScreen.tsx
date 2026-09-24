import { House, Play } from "lucide-react";
import { IconButton } from "../../components/IconButton";
import { ThemeToggle } from "../../components/ThemeToggle";
import { LetterStripFullIcon } from "../../lib/icons/LetterStripFullIcon";
import { LetterStripHalfIcon } from "../../lib/icons/LetterStripHalfIcon";
import type { LetterCase, SessionMode } from "./types";
import "./SessionSetupScreen.css";

type SessionSetupScreenProps = {
  mode: SessionMode;
  letterCase: LetterCase;
  onModeChange: (mode: SessionMode) => void;
  onLetterCaseChange: (letterCase: LetterCase) => void;
  onPlay: () => void;
  onExit: () => void;
};

export function SessionSetupScreen({
  mode,
  letterCase,
  onModeChange,
  onLetterCaseChange,
  onPlay,
  onExit,
}: SessionSetupScreenProps) {
  return (
    <div className="session-setup">
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
            aria-label="Full alphabet"
          >
            <LetterStripFullIcon size={72} />
          </button>
          <button
            type="button"
            className="mode-picker__option"
            data-selected={mode === "half"}
            onClick={() => onModeChange("half")}
            aria-label="Half alphabet"
          >
            <LetterStripHalfIcon size={72} />
          </button>
        </div>

        <div className="case-toggle">
          <button
            type="button"
            className="case-toggle__half"
            data-selected={letterCase === "upper"}
            onClick={() => onLetterCaseChange("upper")}
            aria-label="Uppercase letters"
          >
            A
          </button>
          <button
            type="button"
            className="case-toggle__half"
            data-selected={letterCase === "lower"}
            onClick={() => onLetterCaseChange("lower")}
            aria-label="Lowercase letters"
          >
            a
          </button>
        </div>
      </div>

      <div className="session-setup__play">
        <IconButton onClick={onPlay} size="large" variant="primary" ariaLabel="Start">
          <Play size={36} fill="currentColor" />
        </IconButton>
      </div>
    </div>
  );
}
