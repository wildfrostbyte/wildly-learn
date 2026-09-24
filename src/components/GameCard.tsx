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
      style={{ background: game.accentColor }}
      onClick={onSelect}
      aria-label={game.title}
    >
      <Icon size={64} />
    </button>
  );
}
