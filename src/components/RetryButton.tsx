import { RotateCcw } from "lucide-react";
import { IconButton } from "./IconButton";

type RetryButtonProps = {
  onClick: () => void;
};

export function RetryButton({ onClick }: RetryButtonProps) {
  return (
    <IconButton onClick={onClick} size="large" ariaLabel="Play again">
      <RotateCcw size={32} />
    </IconButton>
  );
}
