import { games } from "../games";
import type { GameId } from "../types";
import { GameCard } from "./GameCard";
import { ThemeToggle } from "./ThemeToggle";
import { GameBallIcon } from "../lib/icons/GameBallIcon";
import { WildTreeIcon } from "../lib/icons/WildTreeIcon";
import { useTheme } from "../context/useTheme";
import "./MenuScreen.css";

type MenuScreenProps = {
  onSelectGame: (gameId: GameId) => void;
};

export function MenuScreen({ onSelectGame }: MenuScreenProps) {
  const { theme } = useTheme();

  return (
    <div className="menu-screen">
      <div className="menu-screen__top-bar">
        <ThemeToggle />
      </div>
      <h1 className="menu-screen__title">
        {theme === "dark" ? <WildTreeIcon /> : <GameBallIcon />}
        <span>Wildly Learning</span>
      </h1>
      <div className="menu-screen__grid">
        {games.map((game) => (
          <GameCard key={game.id} game={game} onSelect={() => onSelectGame(game.id)} />
        ))}
      </div>
    </div>
  );
}
