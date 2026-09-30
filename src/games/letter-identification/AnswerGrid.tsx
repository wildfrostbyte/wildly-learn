import type { RoundOutcome } from "../../lib/quiz";
import type { Letter, LetterCase } from "./types";
import { toDisplayChar } from "./letters";
import "../../styles/answer-grid.css";

type AnswerGridProps = {
  options: Letter[];
  letterCase: LetterCase;
  mode: "review" | "quiz";
  onSelect: (letter: Letter) => void;
  selectedChar?: string | null;
  correctChar?: string;
  roundOutcome?: RoundOutcome;
};

export function AnswerGrid({
  options,
  letterCase,
  mode,
  onSelect,
  selectedChar = null,
  correctChar,
  roundOutcome = null,
}: AnswerGridProps) {
  return (
    <div className="answer-grid" data-mode={mode} data-count={options.length}>
      {options.map((option) => {
        if (mode === "review") {
          return (
            <button
              key={option.char}
              type="button"
              className="answer-card"
              onClick={() => onSelect(option)}
            >
              {toDisplayChar(option.char, letterCase)}
            </button>
          );
        }

        const isSelected = option.char === selectedChar;
        const isRevealedCorrect =
          !isSelected && roundOutcome === "incorrect" && option.char === correctChar;
        const cardState = isSelected ? roundOutcome : isRevealedCorrect ? "correct" : null;
        return (
          <button
            key={option.char}
            type="button"
            className="answer-card"
            data-state={cardState}
            data-reveal={isRevealedCorrect || undefined}
            disabled={roundOutcome !== null}
            onClick={() => onSelect(option)}
          >
            {toDisplayChar(option.char, letterCase)}
          </button>
        );
      })}
    </div>
  );
}
