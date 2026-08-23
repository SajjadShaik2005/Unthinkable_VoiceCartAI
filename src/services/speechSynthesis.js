// Speech Synthesis Service (Audio feedback for voice assistant actions)

let isMuted = false;
let currentLanguage = 'en-US';

export const setTTSMuted = (muted) => {
  isMuted = muted;
};

export const setTTSLanguage = (langCode) => {
  currentLanguage = langCode;
};

export const speakResponse = (text) => {
  if (isMuted || !('speechSynthesis' in window)) {
    return;
  }

  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLanguage;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Pick appropriate voice if available
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(currentLanguage.slice(0, 2)));
    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
  }
};
