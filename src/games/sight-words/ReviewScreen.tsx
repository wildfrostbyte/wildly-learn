import { ArrowLeft } from "lucide-react";
import { IconButton } from "../../components/IconButton";
import { ThemeToggle } from "../../components/ThemeToggle";
import { speakWord } from "../../lib/speech";
import { WordGrid } from "./WordGrid";
import type { SightWord } from "./types";
import "../../styles/review-screen.css";

type ReviewScreenProps = {
  words: SightWord[];
  onExit: () => void;
};

export function ReviewScreen({ words, onExit }: ReviewScreenProps) {
  return (
    <div className="review-screen">
      <div className="review-screen__top-bar">
        <IconButton onClick={onExit} ariaLabel="Back to level setup">
          <ArrowLeft size={22} />
        </IconButton>
        <ThemeToggle />
      </div>

      <div className="review-screen__grid-area">
        <WordGrid words={words} mode="review" onSelect={(word) => speakWord(word.text.toLowerCase())} />
      </div>
    </div>
  );
}
