import { useEffect, useState } from "react";
import { House, Volume2 } from "lucide-react";
import { AnswerFeedback } from "../../components/AnswerFeedback";
import { IconButton } from "../../components/IconButton";
import { ThemeToggle } from "../../components/ThemeToggle";
import { speakNumber } from "../../lib/speech";
import { AnswerGrid } from "./AnswerGrid";
import type { NumberItem, RoundOutcome } from "./types";
import "./RoundScreen.css";

type RoundScreenProps = {
  target: NumberItem;
  options: NumberItem[];
  roundOutcome: RoundOutcome;
  onSelect: (item: NumberItem) => void;
  onExit: () => void;
};

export function RoundScreen({
  target,
  options,
  roundOutcome,
  onSelect,
  onExit,
}: RoundScreenProps) {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [spokenTarget, setSpokenTarget] = useState(target);

  if (target !== spokenTarget) {
    setSpokenTarget(target);
    setSelectedValue(null);
  }

  useEffect(() => {
    speakNumber(String(target.value));
  }, [target]);

  function handleSelect(item: NumberItem) {
    setSelectedValue(item.value);
    onSelect(item);
  }

  return (
    <div className="round-screen">
      <div className="round-screen__top-bar">
        <IconButton onClick={onExit} ariaLabel="Exit to menu">
          <House size={22} />
        </IconButton>
        <div className="round-screen__top-bar-right">
          <ThemeToggle />
          <IconButton onClick={() => speakNumber(String(target.value))} ariaLabel="Repeat number">
            <Volume2 size={22} />
          </IconButton>
        </div>
      </div>

      <div className="round-screen__grid-area">
        <AnswerGrid
          options={options}
          mode="quiz"
          selectedValue={selectedValue}
          correctValue={target.value}
          roundOutcome={roundOutcome}
          onSelect={handleSelect}
        />
      </div>

      {roundOutcome && <AnswerFeedback outcome={roundOutcome} />}
    </div>
  );
}
