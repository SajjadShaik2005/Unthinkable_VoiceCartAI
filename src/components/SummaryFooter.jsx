import React from 'react';
import { Download, Copy, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export function SummaryFooter({ items, toasts }) {
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const exportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `shopping_list_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerConfetti();
  };

  const exportTXT = () => {
    const txtLines = items.map(i => `${i.completed ? '[x]' : '[ ]'} ${i.quantity}x ${i.name} (${i.category}) - $${(i.price * i.quantity).toFixed(2)}`);
    const txtContent = `VOICE COMMAND SHOPPING LIST\nDate: ${new Date().toLocaleDateString()}\n\n` + txtLines.join('\n');
    const dataStr = 'data:text/plain;charset=utf-8,' + encodeURIComponent(txtContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `shopping_list_${new Date().toISOString().slice(0, 10)}.txt`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerConfetti();
  };

  const copyToClipboard = () => {
    const txtLines = items.map(i => `${i.quantity}x ${i.name} - $${(i.price * i.quantity).toFixed(2)}`);
    navigator.clipboard.writeText(txtLines.join('\n'));
    triggerConfetti();
  };

  return (
    <>
      <footer className="glass-panel" style={{ padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Powered by <strong>VoiceCart AI NLP Engine</strong> &bull; Multilingual Web Speech API
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button className="action-btn" onClick={copyToClipboard} title="Copy to Clipboard">
            <Copy size={15} />
            <span>Copy Text</span>
          </button>
          <button className="action-btn" onClick={exportTXT} title="Export TXT File">
            <Download size={15} />
            <span>Export TXT</span>
          </button>
          <button className="action-btn" onClick={exportJSON} style={{ background: 'var(--primary)', color: '#fff' }} title="Export JSON File">
            <Sparkles size={15} />
            <span>Export JSON</span>
          </button>
        </div>
      </footer>

      {/* Render Floating Toasts */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className="toast">
            <Check size={16} color="var(--accent-emerald)" />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </>
  );
}
