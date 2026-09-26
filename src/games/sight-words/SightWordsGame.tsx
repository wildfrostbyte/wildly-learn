import { useState } from "react";
import { useWordSession } from "./useWordSession";
import { LevelSetupScreen } from "./LevelSetupScreen";
import { ReviewScreen } from "./ReviewScreen";
import { RoundScreen } from "./RoundScreen";
import { CompletionScreen } from "./CompletionScreen";
import { primeSpeech } from "../../lib/speech";
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
  } = useWordSession();

  function handleExitSession() {
    exitSession();
    onExit();
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
    return <CompletionScreen session={session} onExit={onExit} />;
  }

  if (localView === "review") {
    return <ReviewScreen words={wordsForLevel(level)} onExit={() => setLocalView("setup")} />;
  }

  return (
    <LevelSetupScreen
      level={level}
      onLevelChange={setLevel}
      onReview={() => setLocalView("review")}
      onPlay={() => {
        primeSpeech();
        startSession(level);
      }}
      onExit={onExit}
    />
  );
}
