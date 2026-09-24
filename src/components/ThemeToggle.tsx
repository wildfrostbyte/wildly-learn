import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/useTheme";
import { IconButton } from "./IconButton";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton onClick={toggleTheme} ariaLabel="Toggle light and dark theme">
      {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
    </IconButton>
  );
}
