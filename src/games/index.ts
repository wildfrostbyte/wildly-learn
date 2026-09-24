import { Type } from "lucide-react";
import type { GameDefinition } from "../types";
import { LetterIdentificationGame } from "./letter-identification/LetterIdentificationGame";

export const games: GameDefinition[] = [
  {
    id: "letter-identification",
    title: "Letter Identification",
    description: "Listen to a letter and tap the matching card.",
    accentColor: "var(--accent-primary)",
    icon: Type,
    component: LetterIdentificationGame,
  },
];
