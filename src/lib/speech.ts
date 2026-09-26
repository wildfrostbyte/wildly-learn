const PREFERRED_VOICE_NAME_PATTERNS = [/natural/i, /online/i, /google/i];

// The Web Speech API exposes no gender field, so this matches known female voice names
// across Chromium's common sources (Windows SAPI/Edge neural voices, Chrome's Google voices).
const FEMALE_VOICE_NAME_PATTERNS = [
  /female/i,
  /\b(aria|ava|jenny|emma|zira|samantha|victoria|susan|linda|hazel|michelle|karen|moira|tessa|fiona|kate|serena|heera)\b/i,
];

let preferredVoice: SpeechSynthesisVoice | null | undefined;
let fallbackVoice: SpeechSynthesisVoice | null | undefined;

function matchesAny(name: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(name));
}

function englishOrAll(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  const englishVoices = voices.filter((voice) => voice.lang.startsWith("en"));
  return englishVoices.length > 0 ? englishVoices : voices;
}

// Prefers higher-quality network/neural voices (Edge's "Online (Natural)" voices,
// Chrome's "Google" voices), which sound much better but can glitch on short utterances.
function pickPreferredVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const candidates = englishOrAll(voices);
  const femaleCandidates = candidates.filter((voice) => matchesAny(voice.name, FEMALE_VOICE_NAME_PATTERNS));
  const pool = femaleCandidates.length > 0 ? femaleCandidates : candidates;

  for (const pattern of PREFERRED_VOICE_NAME_PATTERNS) {
    const match = pool.find((voice) => pattern.test(voice.name));
    if (match) return match;
  }

  return pool[0] ?? null;
}

// A local (on-device) voice, e.g. Windows' bundled "Microsoft Zira/David Desktop" — always
// available offline in both Chrome and Edge, with no network round-trip to glitch on.
function pickFallbackVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const candidates = englishOrAll(voices);
  const localVoices = candidates.filter((voice) => voice.localService);
  const pool = localVoices.length > 0 ? localVoices : candidates;

  const femaleLocal = pool.filter((voice) => matchesAny(voice.name, FEMALE_VOICE_NAME_PATTERNS));
  return femaleLocal[0] ?? pool[0] ?? null;
}

function resolveVoices() {
  const voices = window.speechSynthesis.getVoices();
  // iOS Safari commonly returns an empty list on the first call and its
  // voiceschanged event is unreliable — don't cache a null result from an
  // empty list, or a real voice list arriving later would never get picked up.
  if (voices.length === 0) return;
  preferredVoice = pickPreferredVoice(voices);
  fallbackVoice = pickFallbackVoice(voices);
}

window.speechSynthesis.addEventListener("voiceschanged", resolveVoices);

function getPreferredVoice(): SpeechSynthesisVoice | null {
  if (preferredVoice === undefined) resolveVoices();
  return preferredVoice ?? null;
}

function getFallbackVoice(): SpeechSynthesisVoice | null {
  if (fallbackVoice === undefined) resolveVoices();
  return fallbackVoice ?? null;
}

// Fires for a deliberate cancel()/interrupt too, not just real failures — those must be
// ignored, or every intentional interruption would trigger a fallback-voice retry.
const IGNORED_ERROR_TYPES = new Set(["canceled", "interrupted"]);

function speakWithVoice(
  text: string,
  voice: SpeechSynthesisVoice | null,
  onError?: (event: SpeechSynthesisErrorEvent) => void,
) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  }
  if (onError) {
    utterance.onerror = onError;
  }
  window.speechSynthesis.speak(utterance);
}

function speakNow(text: string) {
  const voice = getPreferredVoice();
  const fallback = getFallbackVoice();
  const canFallBack = fallback !== null && fallback !== voice;
  speakWithVoice(
    text,
    voice,
    canFallBack
      ? (event) => {
          if (IGNORED_ERROR_TYPES.has(event.error)) return;
          speakWithVoice(text, fallback);
        }
      : undefined,
  );
}

let pendingSpeakTimeout: ReturnType<typeof setTimeout> | null = null;

export function speakLetterName(letterName: string) {
  if (pendingSpeakTimeout !== null) {
    clearTimeout(pendingSpeakTimeout);
    pendingSpeakTimeout = null;
  }

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    // Chromium can drop or garble a speak() called in the same tick as a preceding
    // cancel(), especially with network voices — deferring a tick avoids that race.
    pendingSpeakTimeout = setTimeout(() => {
      pendingSpeakTimeout = null;
      speakNow(letterName);
    }, 50);
  } else {
    speakNow(letterName);
  }
}

export const speakWord = speakLetterName;

export function primeSpeech() {
  const utterance = new SpeechSynthesisUtterance(" ");
  utterance.volume = 0;
  window.speechSynthesis.speak(utterance);
}
