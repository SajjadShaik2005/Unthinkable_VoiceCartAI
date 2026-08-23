import React, { useState } from 'react';
import { Mic, MicOff, Send, Sparkles } from 'lucide-react';

export function VoiceMicBar({
  isListening,
  transcript,
  interimTranscript,
  lastParsedAction,
  onToggleListening,
  onSimulateCommand,
  selectedLanguage
}) {
  const [inputText, setInputText] = useState('');

  const handleSimSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSimulateCommand(inputText.trim());
      setInputText('');
    }
  };

  const samplePrompts = [
    'Add 2 bottles of almond milk under $5',
    'I need 3 organic honeycrisp apples',
    'Find toothpaste under $5',
    'Substitute for whole milk',
    'Clear completed items'
  ];

  return (
    <div className="glass-panel mic-bar-container">
      {/* Microphone Button with Pulse Animations */}
      <div className={`mic-button-wrapper ${isListening ? 'is-listening' : ''}`}>
        <div className="mic-pulse-ring"></div>
        <button
          className={`mic-button ${isListening ? 'is-listening' : ''}`}
          onClick={onToggleListening}
          title={isListening ? 'Click to Stop Listening' : 'Click to Speak Voice Command'}
        >
          {isListening ? <Mic size={36} /> : <MicOff size={34} />}
        </button>
      </div>

      {/* Dynamic Waveform Visualizer */}
      <div className={`waveform-bars ${isListening ? 'is-listening' : ''}`}>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
      </div>

      {/* Recognized Transcript Display */}
      <div className="transcript-display">
        {transcript || interimTranscript ? (
          <span style={{ color: '#f8fafc' }}>
            "{transcript || interimTranscript}"
          </span>
        ) : (
          <span className="transcript-placeholder">
            {isListening
              ? 'Listening... Speak your command now (e.g., "Add 2 bottles of water")'
              : 'Tap microphone or type a command below to manage your list'}
          </span>
        )}
      </div>

      {/* Real-time Parsed Action Feedback */}
      {lastParsedAction && (
        <div style={{
          marginTop: '0.6rem',
          fontSize: '0.8rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(99, 102, 241, 0.15)',
          color: '#a5b4fc',
          padding: '0.25rem 0.75rem',
          borderRadius: '12px',
          border: '1px solid rgba(99, 102, 241, 0.3)'
        }}>
          <Sparkles size={12} />
          <span>
            Action Detected: <strong>{lastParsedAction.intent}</strong>
            {lastParsedAction.item ? ` — ${lastParsedAction.item.quantity} ${lastParsedAction.item.name}` : ''}
          </span>
        </div>
      )}

      {/* Voice Simulator Input Bar (Fallback & Quick Testing) */}
      <form onSubmit={handleSimSubmit} className="voice-sim-box">
        <input
          type="text"
          className="sim-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Type a voice command (e.g., "Add 2 loaves of sourdough bread")...`}
        />
        <button type="submit" className="action-btn" style={{ background: 'var(--primary)', color: '#fff' }}>
          <Send size={16} />
          <span>Execute</span>
        </button>
      </form>

      {/* Sample Voice Command Quick Chips */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.4rem',
        marginTop: '0.85rem',
        justifyContent: 'center'
      }}>
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSimulateCommand(prompt)}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              padding: '0.25rem 0.65rem',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            "{prompt}"
          </button>
        ))}
      </div>
    </div>
  );
}
