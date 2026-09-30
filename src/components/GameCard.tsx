import type { GameDefinition } from "../types";
import "./GameCard.css";

type GameCardProps = {
  game: GameDefinition;
  onSelect: () => void;
};

export function GameCard({ game, onSelect }: GameCardProps) {
  const Icon = game.icon;
  const descriptionId = `${game.id}-description`;
  return (
    <button
      type="button"
      className="game-card"
      style={{ background: game.accentColor, color: game.accentContrast }}
      onClick={onSelect}
      aria-describedby={descriptionId}
    >
      <Icon size={56} />
      <span className="game-card__label">{game.title}</span>
      <span id={descriptionId} className="sr-only" aria-hidden="true">
        {game.description}
      </span>
    </button>
  );
}
