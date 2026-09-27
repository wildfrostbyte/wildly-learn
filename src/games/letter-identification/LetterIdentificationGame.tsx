import { useState } from "react";
import { useLetterSession } from "./useLetterSession";
import { SessionSetupScreen } from "./SessionSetupScreen";
import { ReviewScreen } from "./ReviewScreen";
import { RoundScreen } from "./RoundScreen";
import { CompletionScreen } from "./CompletionScreen";
import { primeSpeech } from "../../lib/speech";
import { primeTones } from "../../lib/tones";
import type { LetterCase, SessionMode } from "./types";

type LetterIdentificationGameProps = {
  onExit: () => void;
};

export function LetterIdentificationGame({ onExit }: LetterIdentificationGameProps) {
  const [mode, setMode] = useState<SessionMode>("half");
  const [letterCase, setLetterCase] = useState<LetterCase>("upper");
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
  } = useLetterSession();

  function handleExitSession() {
    exitSession();
    onExit();
  }

  function handlePlay() {
    primeSpeech();
    primeTones();
    startSession(mode, letterCase);
  }

  if (phase === "playing" && session && currentTarget) {
    return (
      <RoundScreen
        target={currentTarget}
        options={currentOptions}
        letterCase={session.letterCase}
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
    return <ReviewScreen letterCase={letterCase} onExit={() => setLocalView("setup")} />;
  }

  return (
    <SessionSetupScreen
      mode={mode}
      letterCase={letterCase}
      onModeChange={setMode}
      onLetterCaseChange={setLetterCase}
      onReview={() => setLocalView("review")}
      onPlay={handlePlay}
      onExit={onExit}
    />
  );
}
