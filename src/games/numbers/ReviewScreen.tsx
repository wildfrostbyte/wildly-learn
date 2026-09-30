import { ArrowLeft } from "lucide-react";
import { IconButton } from "../../components/IconButton";
import { ThemeToggle } from "../../components/ThemeToggle";
import { speakNumber } from "../../lib/speech";
import { AnswerGrid } from "./AnswerGrid";
import { NUMBERS } from "./numbers";
import "./ReviewScreen.css";

type ReviewScreenProps = {
  onExit: () => void;
};

export function ReviewScreen({ onExit }: ReviewScreenProps) {
  return (
    <div className="review-screen">
      <div className="review-screen__top-bar">
        <IconButton onClick={onExit} ariaLabel="Back to setup">
          <ArrowLeft size={22} />
        </IconButton>
        <ThemeToggle />
      </div>

      <div className="review-screen__grid-area">
        <AnswerGrid
          options={NUMBERS}
          mode="review"
          onSelect={(item) => speakNumber(String(item.value))}
        />
      </div>
    </div>
  );
}
