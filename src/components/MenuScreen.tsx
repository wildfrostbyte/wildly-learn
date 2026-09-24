import { games } from "../games";
import type { GameId } from "../types";
import { GameCard } from "./GameCard";
import { ThemeToggle } from "./ThemeToggle";
import "./MenuScreen.css";

type MenuScreenProps = {
  onSelectGame: (gameId: GameId) => void;
};

export function MenuScreen({ onSelectGame }: MenuScreenProps) {
  return (
    <div className="menu-screen">
      <div className="menu-screen__top-bar">
        <ThemeToggle />
      </div>
      <div className="menu-screen__grid">
        {games.map((game) => (
          <GameCard key={game.id} game={game} onSelect={() => onSelectGame(game.id)} />
        ))}
      </div>
    </div>
  );
}
