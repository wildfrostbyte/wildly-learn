import { useState } from "react";
import { useQuizSession } from "../../lib/useQuizSession";
import { wordQuizRules } from "./sessionLogic";
import { LevelSetupScreen } from "./LevelSetupScreen";
import { ReviewScreen } from "./ReviewScreen";
import { RoundScreen } from "./RoundScreen";
import { CompletionScreen } from "./CompletionScreen";
import { primeSpeech } from "../../lib/speech";
import { primeTones } from "../../lib/tones";
import { wordsForLevel } from "./words";
import type { Level } from "./types";

type SightWordsGameProps = {
  onExit: () => void;
};

export function SightWordsGame({ onExit }: SightWordsGameProps) {
  const [level, setLevel] = useState<Level>(1);
  const [localView, setLocalView] = useState<"setup" | "review">("setup");
  const {
    phase,
    session,
    currentTarget,
    currentOptions,
    roundOutcome,
    startSession,
    submitAnswer,
    exitSession,
  } = useQuizSession(wordQuizRules);

  function handleExitSession() {
    exitSession();
    onExit();
  }

  function handlePlay() {
    primeSpeech();
    primeTones();
    startSession({ level });
  }

  if (phase === "playing" && session && currentTarget) {
    return (
      <RoundScreen
        target={currentTarget}
        options={currentOptions}
        roundOutcome={roundOutcome}
        onSelect={submitAnswer}
        onExit={handleExitSession}
      />
    );
  }

  if (phase === "done" && session) {
    return <CompletionScreen session={session} onRetry={handlePlay} onExit={onExit} />;
  }

  if (localView === "review") {
    return <ReviewScreen words={wordsForLevel(level)} onExit={() => setLocalView("setup")} />;
  }

  return (
    <LevelSetupScreen
      level={level}
      onLevelChange={setLevel}
      onReview={() => setLocalView("review")}
      onPlay={handlePlay}
      onExit={onExit}
    />
  );
}
