import { House, PartyPopper } from "lucide-react";
import { IconButton } from "../../components/IconButton";
import "./CompletionScreen.css";

type CompletionScreenProps = {
  onExit: () => void;
};

export function CompletionScreen({ onExit }: CompletionScreenProps) {
  return (
    <div className="completion-screen">
      <PartyPopper size={96} color="var(--accent-secondary)" />
      <IconButton onClick={onExit} size="large" variant="primary" ariaLabel="Back to menu">
        <House size={32} />
      </IconButton>
    </div>
  );
}
