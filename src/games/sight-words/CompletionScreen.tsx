import { Check, Frown, House, PartyPopper } from "lucide-react";
import { IconButton } from "../../components/IconButton";
import type { Session } from "./types";
import "./CompletionScreen.css";

type CompletionScreenProps = {
  session: Session;
  onExit: () => void;
};

function tierMessage(percent: number): string {
  if (percent >= 90) return "Amazing!";
  if (percent >= 70) return "Great job!";
  return "Nice try!";
}

export function CompletionScreen({ session, onExit }: CompletionScreenProps) {
  const total = session.results.length;
  const correctCount = session.results.filter((result) => result.correct).length;
  const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const recap = [...session.results].sort((a, b) => a.word.localeCompare(b.word));

  return (
    <div className="completion-screen">
      <div className="completion-screen__headline">
        <PartyPopper size={64} color="var(--accent-secondary)" />
        <p className="completion-screen__level">Level {session.level} complete</p>
        <p className="completion-screen__tier">{tierMessage(percent)}</p>
        <p className="completion-screen__score">
          {correctCount} / {total}
        </p>
        <p className="completion-screen__percent">{percent}%</p>
      </div>

      <div className="completion-screen__recap">
        {recap.map((result, index) => (
          <div
            key={result.word}
            className="completion-screen__tile"
            data-correct={result.correct}
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <span className="completion-screen__tile-word">{result.word}</span>
            {result.correct ? <Check size={22} /> : <Frown size={22} />}
          </div>
        ))}
      </div>

      <IconButton onClick={onExit} size="large" variant="primary" ariaLabel="Back to menu">
        <House size={32} />
      </IconButton>
    </div>
  );
}
