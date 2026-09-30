import { ArrowLeft } from "lucide-react";
import { IconButton } from "../../components/IconButton";
import { ThemeToggle } from "../../components/ThemeToggle";
import { speakLetterName } from "../../lib/speech";
import { AnswerGrid } from "./AnswerGrid";
import { ALPHABET, phoneticFor } from "./letters";
import type { LetterCase } from "./types";
import "../../styles/review-screen.css";

type ReviewScreenProps = {
  letterCase: LetterCase;
  onExit: () => void;
};

export function ReviewScreen({ letterCase, onExit }: ReviewScreenProps) {
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
          options={ALPHABET}
          letterCase={letterCase}
          mode="review"
          onSelect={(letter) => speakLetterName(phoneticFor(letter.char))}
        />
      </div>
    </div>
  );
}
