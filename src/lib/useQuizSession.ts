import { useCallback, useEffect, useState } from "react";
import { getOptionCountForRound } from "./quiz";
import type { RoundOutcome } from "./quiz";

const CORRECT_FEEDBACK_DELAY_MS = 1400;
const INCORRECT_FEEDBACK_DELAY_MS = 2200;

export type QuizSession<Item, Settings> = {
  settings: Settings;
  order: Item[];
  currentRound: number;
  results: { item: Item; correct: boolean }[];
};

export type QuizRules<Item, Settings> = {
  buildOrder: (settings: Settings) => Item[];
  buildOptions: (pool: Item[], target: Item, optionCount: number, settings: Settings) => Item[];
};

function optionsForRound<Item, Settings>(
  session: QuizSession<Item, Settings>,
  roundIndex: number,
  buildOptions: QuizRules<Item, Settings>["buildOptions"],
): Item[] {
  const target = session.order[roundIndex];
  return buildOptions(session.order, target, getOptionCountForRound(roundIndex + 1), session.settings);
}

// Pass module-level rules: new function identities every render would reset the hook's callbacks.
export function useQuizSession<Item, Settings>({ buildOrder, buildOptions }: QuizRules<Item, Settings>) {
  const [phase, setPhase] = useState<"setup" | "playing" | "done">("setup");
  const [session, setSession] = useState<QuizSession<Item, Settings> | null>(null);
  const [currentOptions, setCurrentOptions] = useState<Item[]>([]);
  const [roundOutcome, setRoundOutcome] = useState<RoundOutcome>(null);

  const startSession = useCallback(
    (settings: Settings) => {
      const newSession = { settings, order: buildOrder(settings), currentRound: 0, results: [] };
      setSession(newSession);
      setCurrentOptions(optionsForRound(newSession, 0, buildOptions));
      setRoundOutcome(null);
      setPhase("playing");
    },
    [buildOrder, buildOptions],
  );

  const exitSession = useCallback(() => {
    setSession(null);
    setRoundOutcome(null);
    setPhase("setup");
  }, []);

  const currentTarget = session ? session.order[session.currentRound] : null;

  const submitAnswer = useCallback(
    (selected: Item) => {
      if (!session || !currentTarget || roundOutcome) return;
      // Options are drawn from session.order itself, so identity comparison is exact.
      const correct = selected === currentTarget;
      setSession({
        ...session,
        results: [...session.results, { item: currentTarget, correct }],
      });
      setRoundOutcome(correct ? "correct" : "incorrect");
    },
    [session, currentTarget, roundOutcome],
  );

  useEffect(() => {
    if (!roundOutcome || !session) return;
    const delay =
      roundOutcome === "incorrect" ? INCORRECT_FEEDBACK_DELAY_MS : CORRECT_FEEDBACK_DELAY_MS;
    const timer = setTimeout(() => {
      const nextRound = session.currentRound + 1;
      if (nextRound >= session.order.length) {
        setPhase("done");
      } else {
        const advancedSession = { ...session, currentRound: nextRound };
        setSession(advancedSession);
        setCurrentOptions(optionsForRound(advancedSession, nextRound, buildOptions));
      }
      setRoundOutcome(null);
    }, delay);
    return () => clearTimeout(timer);
  }, [roundOutcome, session, buildOptions]);

  return {
    phase,
    session,
    currentTarget,
    currentOptions,
    roundOutcome,
    startSession,
    submitAnswer,
    exitSession,
  };
}
