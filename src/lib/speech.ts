export function speakLetterName(letterName: string) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(letterName);
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}
