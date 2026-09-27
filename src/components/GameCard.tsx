import type { GameDefinition } from "../types";
import "./GameCard.css";

type GameCardProps = {
  game: GameDefinition;
  onSelect: () => void;
};

export function GameCard({ game, onSelect }: GameCardProps) {
  const Icon = game.icon;
  return (
    <button
      type="button"
      className="game-card"
      style={{ background: game.accentColor, color: game.accentContrast }}
      onClick={onSelect}
    >
      <Icon size={56} />
      <span className="game-card__label">{game.title}</span>
    </button>
  );
}
