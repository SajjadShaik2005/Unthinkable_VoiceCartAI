import React, { useState } from 'react';
import { HelpCircle, Play, ChevronDown, ChevronUp } from 'lucide-react';

const MULTILINGUAL_COMMANDS = [
  {
    lang: 'English 🇺🇸',
    examples: [
      { text: 'Add 2 bottles of almond milk under $5', desc: 'Adds quantity, product, max price filter' },
      { text: 'I need 3 organic honeycrisp apples', desc: 'Adds organic tagged produce' },
      { text: 'Remove bread from my list', desc: 'Deletes item from shopping list' },
      { text: 'Find organic apples under $5', desc: 'Opens voice search with filters' },
      { text: 'Suggest substitute for milk', desc: 'Displays dairy-free smart substitutes' },
      { text: 'Clear completed items', desc: 'Removes checked items' }
    ]
  },
  {
    lang: 'Spanish 🇪🇸',
    examples: [
      { text: 'Añadir 2 botellas de leche', desc: 'Adds 2 bottles of milk in Spanish' },
      { text: 'Necesito 3 manzanas', desc: 'Adds 3 apples in Spanish' },
      { text: 'Eliminar leche', desc: 'Removes milk' }
    ]
  },
  {
    lang: 'French 🇫🇷',
    examples: [
      { text: 'Ajouter 2 bouteilles de lait', desc: 'Adds 2 bottles of milk in French' },
      { text: 'J\'ai besoin de pommes', desc: 'Adds apples in French' }
    ]
  },
  {
    lang: 'German 🇩🇪',
    examples: [
      { text: 'Füge 2 Milch hinzu', desc: 'Adds 2 milk in German' },
      { text: 'Ich brauche Äpfel', desc: 'Adds apples in German' }
    ]
  },
  {
    lang: 'Hindi 🇮🇳',
    examples: [
      { text: 'दूध जोड़ें', desc: 'Adds milk in Hindi' },
      { text: 'मुझे 2 सेब चाहिए', desc: 'Adds 2 apples in Hindi' }
    ]
  }
];

export function VoiceCheatSheet({ onSimulateCommand }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLangIdx, setActiveLangIdx] = useState(0);

  return (
    <div className="glass-panel" style={{ padding: '1.25rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem' }}>
          <HelpCircle size={18} color="var(--accent-cyan)" />
          <span>Voice Commands Cheat Sheet & Examples</span>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>

      {isOpen && (
        <div style={{ marginTop: '1rem' }}>
          {/* Language selector chips */}
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', overflowX: 'auto' }}>
            {MULTILINGUAL_COMMANDS.map((item, idx) => (
              <button
                key={idx}
                className={`sug-tab ${activeLangIdx === idx ? 'active' : ''}`}
                onClick={() => setActiveLangIdx(idx)}
              >
                {item.lang}
              </button>
            ))}
          </div>

          {/* Example List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {MULTILINGUAL_COMMANDS[activeLangIdx].examples.map((ex, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(0, 0, 0, 0.25)',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#fff' }}>"{ex.text}"</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{ex.desc}</div>
                </div>
                <button
                  className="sug-add-btn"
                  onClick={() => onSimulateCommand(ex.text)}
                  title="Test command"
                >
                  <Play size={12} /> Test
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
