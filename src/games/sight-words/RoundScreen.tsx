import { useEffect, useState } from "react";
import { Check, Frown, House, Volume2 } from "lucide-react";
import { IconButton } from "../../components/IconButton";
import { ThemeToggle } from "../../components/ThemeToggle";
import { speakWord } from "../../lib/speech";
import { playCorrectTone, playIncorrectTone } from "../../lib/tones";
import { WordGrid } from "./WordGrid";
import type { RoundOutcome, SightWord } from "./types";
import "./RoundScreen.css";

type RoundScreenProps = {
  target: SightWord;
  options: SightWord[];
  roundOutcome: RoundOutcome;
  onSelect: (word: SightWord) => void;
  onExit: () => void;
};

export function RoundScreen({ target, options, roundOutcome, onSelect, onExit }: RoundScreenProps) {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [spokenTarget, setSpokenTarget] = useState(target);

  if (target !== spokenTarget) {
    setSpokenTarget(target);
    setSelectedText(null);
  }

  useEffect(() => {
    // iOS announces "capital X" for a bare uppercase letter (e.g. "I") — speak lowercase.
    speakWord(target.text.toLowerCase());
  }, [target]);

  useEffect(() => {
    if (roundOutcome === "correct") playCorrectTone();
    if (roundOutcome === "incorrect") playIncorrectTone();
  }, [roundOutcome]);

  function handleSelect(word: SightWord) {
    setSelectedText(word.text);
    onSelect(word);
  }

  return (
    <div className="round-screen">
      <div className="round-screen__top-bar">
        <IconButton onClick={onExit} ariaLabel="Exit to menu">
          <House size={22} />
        </IconButton>
        <div className="round-screen__top-bar-right">
          <ThemeToggle />
          <IconButton onClick={() => speakWord(target.text.toLowerCase())} ariaLabel="Repeat word">
            <Volume2 size={22} />
          </IconButton>
        </div>
      </div>

      <div className="round-screen__grid-area">
        <WordGrid
          words={options}
          mode="quiz"
          selectedText={selectedText}
          correctText={target.text}
          roundOutcome={roundOutcome}
          onSelect={handleSelect}
        />
      </div>

      {roundOutcome && (
        <div className="round-screen__feedback" data-state={roundOutcome}>
          {roundOutcome === "correct" ? <Check size={88} /> : <Frown size={88} />}
        </div>
      )}
    </div>
  );
}
