import type { RoundOutcome, SightWord } from "./types";
import "./WordGrid.css";

type WordGridProps = {
  words: SightWord[];
  mode: "review" | "quiz";
  onSelect: (word: SightWord) => void;
  selectedText?: string | null;
  correctText?: string;
  roundOutcome?: RoundOutcome;
};

export function WordGrid({
  words,
  mode,
  onSelect,
  selectedText = null,
  correctText,
  roundOutcome = null,
}: WordGridProps) {
  return (
    <div className="word-grid" data-mode={mode} data-count={words.length}>
      {words.map((word) => {
        if (mode === "review") {
          return (
            <button
              key={word.text}
              type="button"
              className="word-card"
              onClick={() => onSelect(word)}
            >
              {word.text}
            </button>
          );
        }

        const isSelected = word.text === selectedText;
        const isRevealedCorrect =
          !isSelected && roundOutcome === "incorrect" && word.text === correctText;
        const cardState = isSelected ? roundOutcome : isRevealedCorrect ? "correct" : null;
        return (
          <button
            key={word.text}
            type="button"
            className="word-card"
            data-state={cardState}
            data-reveal={isRevealedCorrect || undefined}
            disabled={roundOutcome !== null}
            onClick={() => onSelect(word)}
          >
            {word.text}
          </button>
        );
      })}
    </div>
  );
}
