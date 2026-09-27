const PREFERRED_VOICE_NAME_PATTERNS = [/natural/i, /online/i, /google/i];

// No gender field on SpeechSynthesisVoice, so match known female voice names instead.
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

// Prefers higher-quality network voices (Edge "Natural", Chrome "Google") over local ones.
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

// A local voice (e.g. Windows' Zira/David) — offline, so it can't glitch like network voices.
function pickFallbackVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const candidates = englishOrAll(voices);
  const localVoices = candidates.filter((voice) => voice.localService);
  const pool = localVoices.length > 0 ? localVoices : candidates;

  const femaleLocal = pool.filter((voice) => matchesAny(voice.name, FEMALE_VOICE_NAME_PATTERNS));
  return femaleLocal[0] ?? pool[0] ?? null;
}

function resolveVoices() {
  const voices = window.speechSynthesis.getVoices();
  /*
   * iOS can return an empty list once, then never fire voiceschanged again.
   * Don't cache null here, or a later real list would never get picked up.
   */
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

// Also fires on our own cancel() — ignore those or every interrupt retries with fallback.
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
    // Defer a sec — Chromium can drop/garble a speak() issued right after cancel().
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
