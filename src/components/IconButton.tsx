import type { ReactNode } from "react";
import "./IconButton.css";

type IconButtonSize = "medium" | "large";

type IconButtonProps = {
  onClick: () => void;
  children: ReactNode;
  size?: IconButtonSize;
  variant?: "surface" | "primary";
  ariaLabel: string;
};

export function IconButton({
  onClick,
  children,
  size = "medium",
  variant = "surface",
  ariaLabel,
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={`icon-button icon-button--${size} icon-button--${variant}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
