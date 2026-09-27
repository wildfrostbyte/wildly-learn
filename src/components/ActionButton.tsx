import type { ReactNode } from "react";
import "./ActionButton.css";

type ActionButtonProps = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  ariaLabel?: string;
  variant?: "primary" | "secondary";
};

export function ActionButton({
  icon,
  label,
  onClick,
  ariaLabel,
  variant = "secondary",
}: ActionButtonProps) {
  return (
    <button
      type="button"
      className={`action-button action-button--${variant}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
