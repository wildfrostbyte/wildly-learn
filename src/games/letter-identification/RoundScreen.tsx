import { useEffect, useState } from "react";
import { Check, Heart, House, Volume2 } from "lucide-react";
import { IconButton } from "../../components/IconButton";
import { ThemeToggle } from "../../components/ThemeToggle";
import { speakLetterName } from "../../lib/speech";
import { playCorrectTone, playIncorrectTone } from "../../lib/tones";
import { AnswerGrid } from "./AnswerGrid";
import type { Letter, LetterCase, RoundOutcome } from "./types";
import "./RoundScreen.css";

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
    speakLetterName(target.char);
  }, [target]);

  useEffect(() => {
    if (roundOutcome === "correct") playCorrectTone();
    if (roundOutcome === "incorrect") playIncorrectTone();
  }, [roundOutcome]);

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
          <IconButton onClick={() => speakLetterName(target.char)} ariaLabel="Repeat letter">
            <Volume2 size={22} />
          </IconButton>
        </div>
      </div>

      <div className="round-screen__grid-area">
        <AnswerGrid
          options={options}
          letterCase={letterCase}
          selectedChar={selectedChar}
          roundOutcome={roundOutcome}
          onSelect={handleSelect}
        />
      </div>

      {roundOutcome && (
        <div className="round-screen__feedback" data-state={roundOutcome}>
          {roundOutcome === "correct" ? <Check size={64} /> : <Heart size={64} />}
        </div>
      )}
    </div>
  );
}
