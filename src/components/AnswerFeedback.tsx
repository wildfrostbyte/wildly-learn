import { useEffect } from "react";
import { Check, X } from "lucide-react";
import { playCorrectTone, playIncorrectTone } from "../lib/tones";
import "./AnswerFeedback.css";

type AnswerFeedbackProps = {
  outcome: "correct" | "incorrect";
};

export function AnswerFeedback({ outcome }: AnswerFeedbackProps) {
  useEffect(() => {
    if (outcome === "correct") playCorrectTone();
    else playIncorrectTone();
  }, [outcome]);

  return (
    <div className="answer-feedback" data-state={outcome}>
      <span className="answer-feedback__badge">
        {outcome === "correct" ? <Check size={72} strokeWidth={3} /> : <X size={72} strokeWidth={3} />}
      </span>
    </div>
  );
}
