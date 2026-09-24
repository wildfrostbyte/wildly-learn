import { createContext } from "react";
import type { ThemeName } from "../types";

export type ThemeContextValue = {
  theme: ThemeName;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
