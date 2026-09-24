import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { MenuScreen } from "./components/MenuScreen";
import { games } from "./games";
import type { Screen } from "./types";

function App() {
  const [screen, setScreen] = useState<Screen>({ view: "menu" });

  return (
    <ThemeProvider>
      {screen.view === "menu" ? (
        <MenuScreen onSelectGame={(gameId) => setScreen({ view: "game", gameId })} />
      ) : (
        (() => {
          const game = games.find((candidate) => candidate.id === screen.gameId);
          if (!game) return null;
          const GameComponent = game.component;
          return <GameComponent onExit={() => setScreen({ view: "menu" })} />;
        })()
      )}
    </ThemeProvider>
  );
}

export default App;
