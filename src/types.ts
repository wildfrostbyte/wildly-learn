export type GameId = "letter-identification" | "sight-words" | "numbers";

export type GameDefinition = {
  id: GameId;
  title: string;
  description: string;
  accentColor: string;
  accentContrast: string;
  icon: React.ComponentType<{ size?: number }>;
  component: React.ComponentType<{ onExit: () => void }>;
};

export type Screen = { view: "menu" } | { view: "game"; gameId: GameId };

export type ThemeName = "light" | "dark";
