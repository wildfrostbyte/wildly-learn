let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  audioContext ??= new AudioContext();
  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }
  return audioContext;
}

function playTone(frequencies: number[], durationSeconds: number) {
  const context = getAudioContext();
  const startTime = context.currentTime;
  const stepDuration = durationSeconds / frequencies.length;

  frequencies.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    const noteStart = startTime + index * stepDuration;
    const noteEnd = noteStart + stepDuration;

    gain.gain.setValueAtTime(0, noteStart);
    gain.gain.linearRampToValueAtTime(0.2, noteStart + 0.02);
    gain.gain.linearRampToValueAtTime(0, noteEnd);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(noteStart);
    oscillator.stop(noteEnd);
  });
}

export function playCorrectTone() {
  playTone([523.25, 659.25, 783.99], 0.35);
}

export function playIncorrectTone() {
  playTone([349.23, 293.66], 0.4);
}
