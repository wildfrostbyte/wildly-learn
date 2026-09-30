import { useState } from "react";
import { useQuizSession } from "../../lib/useQuizSession";
import { numberQuizRules } from "./sessionLogic";
import { SessionSetupScreen } from "./SessionSetupScreen";
import { ReviewScreen } from "./ReviewScreen";
import { RoundScreen } from "./RoundScreen";
import { CompletionScreen } from "./CompletionScreen";
import { primeSpeech } from "../../lib/speech";
import { primeTones } from "../../lib/tones";
import type { SessionMode } from "./types";

type NumbersGameProps = {
  onExit: () => void;
};

export function NumbersGame({ onExit }: NumbersGameProps) {
  const [mode, setMode] = useState<SessionMode>("half");
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
  } = useQuizSession(numberQuizRules);

  function handleExitSession() {
    exitSession();
    onExit();
  }

  function handlePlay() {
    primeSpeech();
    primeTones();
    startSession({ mode });
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
    return <ReviewScreen onExit={() => setLocalView("setup")} />;
  }

  return (
    <SessionSetupScreen
      mode={mode}
      onModeChange={setMode}
      onReview={() => setLocalView("review")}
      onPlay={handlePlay}
      onExit={onExit}
    />
  );
}
