import { House, Play, Star, Volume2 } from "lucide-react";
import { ActionButton } from "../../components/ActionButton";
import { IconButton } from "../../components/IconButton";
import { ThemeToggle } from "../../components/ThemeToggle";
import { LEVELS } from "./words";
import type { Level } from "./types";
import "./LevelSetupScreen.css";

type LevelSetupScreenProps = {
  level: Level;
  onLevelChange: (level: Level) => void;
  onReview: () => void;
  onPlay: () => void;
  onExit: () => void;
};

export function LevelSetupScreen({
  level,
  onLevelChange,
  onReview,
  onPlay,
  onExit,
}: LevelSetupScreenProps) {
  return (
    <div className="level-setup">
      <div className="level-setup__top-bar">
        <IconButton onClick={onExit} ariaLabel="Exit to menu">
          <House size={22} />
        </IconButton>
        <ThemeToggle />
      </div>

      <div className="level-setup__controls">
        <h2 className="level-setup__heading">Choose a Level</h2>

        <div className="level-picker">
          {LEVELS.map((option, index) => (
            <button
              key={option}
              type="button"
              className="level-tile"
              data-level={option}
              data-selected={level === option}
              style={{ animationDelay: `${index * 60}ms` }}
              onClick={() => onLevelChange(option)}
              aria-label={`Level ${option}`}
            >
              <Star className="level-tile__star" size={16} fill="currentColor" />
              <span className="level-tile__number">{option}</span>
            </button>
          ))}
        </div>

        <div className="level-setup__actions">
          <ActionButton
            icon={<Volume2 />}
            label="Listen"
            onClick={onReview}
            ariaLabel="Listen to words"
          />
          <ActionButton
            variant="primary"
            icon={<Play fill="currentColor" />}
            label="Play"
            onClick={onPlay}
          />
        </div>
      </div>
    </div>
  );
}
