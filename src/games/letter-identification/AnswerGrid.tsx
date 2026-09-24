import type { Letter, LetterCase, RoundOutcome } from "./types";
import { toDisplayChar } from "./letters";
import "./AnswerGrid.css";

type AnswerGridProps = {
  options: Letter[];
  letterCase: LetterCase;
  selectedChar: string | null;
  roundOutcome: RoundOutcome;
  onSelect: (letter: Letter) => void;
};

export function AnswerGrid({
  options,
  letterCase,
  selectedChar,
  roundOutcome,
  onSelect,
}: AnswerGridProps) {
  return (
    <div className="answer-grid" data-count={options.length}>
      {options.map((option) => {
        const isSelected = option.char === selectedChar;
        const cardState = isSelected ? roundOutcome : null;
        return (
          <button
            key={option.char}
            type="button"
            className="letter-card"
            data-state={cardState}
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
