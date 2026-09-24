import { useState } from "react";
import { useLetterSession } from "./useLetterSession";
import { SessionSetupScreen } from "./SessionSetupScreen";
import { RoundScreen } from "./RoundScreen";
import { CompletionScreen } from "./CompletionScreen";
import type { LetterCase, SessionMode } from "./types";

type LetterIdentificationGameProps = {
  onExit: () => void;
};

export function LetterIdentificationGame({ onExit }: LetterIdentificationGameProps) {
  const [mode, setMode] = useState<SessionMode>("full");
  const [letterCase, setLetterCase] = useState<LetterCase>("upper");
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

  if (phase === "done") {
    return <CompletionScreen onExit={onExit} />;
  }

  return (
    <SessionSetupScreen
      mode={mode}
      letterCase={letterCase}
      onModeChange={setMode}
      onLetterCaseChange={setLetterCase}
      onPlay={() => startSession(mode, letterCase)}
      onExit={onExit}
    />
  );
}
