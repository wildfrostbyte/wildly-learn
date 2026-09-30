import type { NumberItem, RoundOutcome } from "./types";
import "./AnswerGrid.css";

type AnswerGridProps = {
  options: NumberItem[];
  mode: "review" | "quiz";
  onSelect: (item: NumberItem) => void;
  selectedValue?: number | null;
  correctValue?: number;
  roundOutcome?: RoundOutcome;
};

export function AnswerGrid({
  options,
  mode,
  onSelect,
  selectedValue = null,
  correctValue,
  roundOutcome = null,
}: AnswerGridProps) {
  return (
    <div className="answer-grid" data-mode={mode} data-count={options.length}>
      {options.map((option) => {
        if (mode === "review") {
          return (
            <button
              key={option.value}
              type="button"
              className="number-card"
              onClick={() => onSelect(option)}
            >
              {option.value}
            </button>
          );
        }

        const isSelected = option.value === selectedValue;
        const isRevealedCorrect =
          !isSelected && roundOutcome === "incorrect" && option.value === correctValue;
        const cardState = isSelected ? roundOutcome : isRevealedCorrect ? "correct" : null;
        return (
          <button
            key={option.value}
            type="button"
            className="number-card"
            data-state={cardState}
            data-reveal={isRevealedCorrect || undefined}
            disabled={roundOutcome !== null}
            onClick={() => onSelect(option)}
          >
            {option.value}
          </button>
        );
      })}
    </div>
  );
}
