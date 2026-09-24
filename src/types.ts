export type GameId = "letter-identification";

export type GameDefinition = {
  id: GameId;
  title: string;
  description: string;
  accentColor: string;
  icon: React.ComponentType<{ size?: number }>;
  component: React.ComponentType<{ onExit: () => void }>;
};

export type Screen = { view: "menu" } | { view: "game"; gameId: GameId };

export type ThemeName = "light" | "dark";
