import { useEffect, useState } from "react";
import { House, Volume2 } from "lucide-react";
import { AnswerFeedback } from "../../components/AnswerFeedback";
import { IconButton } from "../../components/IconButton";
import { ThemeToggle } from "../../components/ThemeToggle";
import { speakLetterName } from "../../lib/speech";
import { AnswerGrid } from "./AnswerGrid";
import { phoneticFor } from "./letters";
import type { RoundOutcome } from "../../lib/quiz";
import type { Letter, LetterCase } from "./types";
import "../../styles/round-screen.css";

type RoundScreenProps = {
  target: Letter;
  options: Letter[];
  letterCase: LetterCase;
  roundOutcome: RoundOutcome;
  onSelect: (letter: Letter) => void;
  onExit: () => void;
};

export function RoundScreen({
  target,
  options,
  letterCase,
  roundOutcome,
  onSelect,
  onExit,
}: RoundScreenProps) {
  const [selectedChar, setSelectedChar] = useState<string | null>(null);
  const [spokenTarget, setSpokenTarget] = useState(target);

  if (target !== spokenTarget) {
    setSpokenTarget(target);
    setSelectedChar(null);
  }

  useEffect(() => {
    speakLetterName(phoneticFor(target.char));
  }, [target]);

  function handleSelect(letter: Letter) {
    setSelectedChar(letter.char);
    onSelect(letter);
  }

  return (
    <div className="round-screen">
      <div className="round-screen__top-bar">
        <IconButton onClick={onExit} ariaLabel="Exit to menu">
          <House size={22} />
        </IconButton>
        <div className="round-screen__top-bar-right">
          <ThemeToggle />
          <IconButton onClick={() => speakLetterName(phoneticFor(target.char))} ariaLabel="Repeat letter">
            <Volume2 size={22} />
          </IconButton>
        </div>
      </div>

      <div className="round-screen__grid-area">
        <AnswerGrid
          options={options}
          letterCase={letterCase}
          mode="quiz"
          selectedChar={selectedChar}
          correctChar={target.char}
          roundOutcome={roundOutcome}
          onSelect={handleSelect}
        />
      </div>

      {roundOutcome && <AnswerFeedback outcome={roundOutcome} />}
    </div>
  );
}
