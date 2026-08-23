import { useState, useEffect, useRef } from 'react';
import { isSpeechSupported, createSpeechRecognizer, startListening, stopListening } from '../services/speechRecognition';
import { parseVoiceCommand } from '../services/nlpEngine';
import { speakResponse, setTTSMuted, setTTSLanguage } from '../services/speechSynthesis';

export function useVoiceAssistant({ onExecuteCommand, onSearchResult, onSubstituteResult }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [isMuted, setIsMuted] = useState(false);
  const [lastParsedAction, setLastParsedAction] = useState(null);

  const recognizerRef = useRef(null);

  useEffect(() => {
    setTTSMuted(isMuted);
  }, [isMuted]);

  useEffect(() => {
    setTTSLanguage(selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    if (!isSpeechSupported()) return;

    recognizerRef.current = createSpeechRecognizer({
      lang: selectedLanguage,
      onResult: ({ final, interim }) => {
        setInterimTranscript(interim);
        if (final) {
          setTranscript(final);
          processCommand(final);
        }
      },
      onError: (err) => {
        console.warn('Speech Rec Error:', err);
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      }
    });

    return () => {
      stopListening(recognizerRef.current);
    };
  }, [selectedLanguage]);

  const processCommand = (text) => {
    if (!text || text.trim().length === 0) return;

    const result = parseVoiceCommand(text, selectedLanguage);
    setLastParsedAction(result);

    switch (result.intent) {
      case 'ADD':
        if (onExecuteCommand) {
          onExecuteCommand('ADD', result.item);
          speakResponse(`Added ${result.item.quantity} ${result.item.name} to your ${result.item.category} list`);
        }
        break;

      case 'REMOVE':
        if (onExecuteCommand) {
          onExecuteCommand('REMOVE', result.itemName);
          speakResponse(`Removed ${result.itemName} from your shopping list`);
        }
        break;

      case 'CLEAR':
        if (onExecuteCommand) {
          onExecuteCommand('CLEAR', result.target);
          speakResponse(`Cleared ${result.target === 'COMPLETED' ? 'completed' : 'all'} items from your list`);
        }
        break;

      case 'SEARCH':
        if (onSearchResult) {
          onSearchResult(result);
          speakResponse(`Searching for ${result.query || 'items'}`);
        }
        break;

      case 'SUBSTITUTE':
        if (onSubstituteResult) {
          onSubstituteResult(result.itemName);
          speakResponse(`Finding smart substitutes for ${result.itemName}`);
        }
        break;

      default:
        speakResponse(`I heard ${text}. Try saying add milk or find organic apples`);
        break;
    }
  };

  const toggleListening = () => {
    if (!isSpeechSupported()) {
      alert('Web Speech API is not supported in this browser. Please use Chrome/Edge or the manual voice command input bar below.');
      return;
    }

    if (isListening) {
      stopListening(recognizerRef.current);
      setIsListening(false);
    } else {
      setTranscript('');
      setInterimTranscript('');
      startListening(recognizerRef.current, selectedLanguage);
      setIsListening(true);
    }
  };

  const simulateVoiceCommand = (text) => {
    setTranscript(text);
    setInterimTranscript('');
    processCommand(text);
  };

  return {
    isListening,
    transcript,
    interimTranscript,
    selectedLanguage,
    setSelectedLanguage,
    isMuted,
    setIsMuted,
    lastParsedAction,
    toggleListening,
    simulateVoiceCommand,
    isSupported: isSpeechSupported()
  };
}
