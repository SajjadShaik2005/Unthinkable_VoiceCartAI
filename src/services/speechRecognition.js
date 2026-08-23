// Web Speech API Voice Recognition Service

let recognition = null;

export function isSpeechSupported() {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

export function createSpeechRecognizer({ onResult, onError, onEnd, lang = 'en-US' }) {
  if (!isSpeechSupported()) {
    console.warn('Web Speech API is not supported in this browser.');
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = lang;

  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    if (onResult) {
      onResult({
        final: finalTranscript.trim(),
        interim: interimTranscript.trim()
      });
    }
  };

  recognition.onerror = (event) => {
    console.warn('Speech Recognition Error:', event.error);
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  return recognition;
}

export function startListening(recognizer, lang = 'en-US') {
  if (!recognizer) return;
  try {
    recognizer.lang = lang;
    recognizer.start();
  } catch (err) {
    console.warn('Error starting speech recognizer:', err);
  }
}

export function stopListening(recognizer) {
  if (!recognizer) return;
  try {
    recognizer.stop();
  } catch (err) {
    console.warn('Error stopping speech recognizer:', err);
  }
}
