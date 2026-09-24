import { useCallback, useEffect, useState } from "react";
import {
  buildRoundOptions,
  buildSessionOrder,
  getOptionCountForRound,
} from "./sessionLogic";
import type {
  Letter,
  LetterCase,
  RoundOutcome,
  Session,
  SessionMode,
} from "./types";

const FEEDBACK_DELAY_MS = 1400;

export type SessionPhase = "setup" | "playing" | "done";

function optionsForRound(session: Session, roundIndex: number): Letter[] {
  const target = session.order[roundIndex];
  const optionCount = getOptionCountForRound(roundIndex + 1);
  return buildRoundOptions(session.order, target, optionCount, session.letterCase);
}

export function useLetterSession() {
  const [phase, setPhase] = useState<SessionPhase>("setup");
  const [session, setSession] = useState<Session | null>(null);
  const [currentOptions, setCurrentOptions] = useState<Letter[]>([]);
  const [roundOutcome, setRoundOutcome] = useState<RoundOutcome>(null);

  const startSession = useCallback(
    (mode: SessionMode, letterCase: LetterCase) => {
      const newSession: Session = {
        mode,
        letterCase,
        order: buildSessionOrder(mode),
        currentRound: 0,
        results: [],
      };
      setSession(newSession);
      setCurrentOptions(optionsForRound(newSession, 0));
      setRoundOutcome(null);
      setPhase("playing");
    },
    [],
  );

  const exitSession = useCallback(() => {
    setSession(null);
    setRoundOutcome(null);
    setPhase("setup");
  }, []);

  const currentTarget = session ? session.order[session.currentRound] : null;

  const submitAnswer = useCallback(
    (selected: Letter) => {
      if (!session || !currentTarget || roundOutcome) return;
      const correct = selected.char === currentTarget.char;
      setSession({
        ...session,
        results: [...session.results, { letter: currentTarget.char, correct }],
      });
      setRoundOutcome(correct ? "correct" : "incorrect");
    },
    [session, currentTarget, roundOutcome],
  );

  useEffect(() => {
    if (!roundOutcome || !session) return;
    const timer = setTimeout(() => {
      const nextRound = session.currentRound + 1;
      if (nextRound >= session.order.length) {
        setPhase("done");
      } else {
        const advancedSession = { ...session, currentRound: nextRound };
        setSession(advancedSession);
        setCurrentOptions(optionsForRound(advancedSession, nextRound));
      }
      setRoundOutcome(null);
    }, FEEDBACK_DELAY_MS);
    return () => clearTimeout(timer);
  }, [roundOutcome, session]);

  return {
    phase,
    session,
    currentTarget,
    currentOptions,
    roundOutcome,
    roundNumber: session ? session.currentRound + 1 : 0,
    totalRounds: session ? session.order.length : 0,
    startSession,
    submitAnswer,
    exitSession,
  };
}
