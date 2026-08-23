import React from 'react';
import { Mic, Volume2, VolumeX, Globe, Search, Grid } from 'lucide-react';

export function Header({
  selectedLanguage,
  onLanguageChange,
  isMuted,
  onToggleMute,
  onOpenSearch,
  onOpenCatalog
}) {
  return (
    <header className="glass-panel app-header">
      <div className="brand-title">
        <div className="brand-icon-wrapper">
          <Mic size={24} />
        </div>
        <div className="brand-text">
          <h1>VoiceCart AI</h1>
          <p>Voice Command Shopping Assistant</p>
        </div>
      </div>

      <div className="header-actions">
        {/* Language selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Globe size={16} color="#94a3b8" />
          <select
            className="lang-select"
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            title="Select Voice Language"
          >
            <option value="en-US">🇺🇸 English</option>
            <option value="es-ES">🇪🇸 Español</option>
            <option value="fr-FR">🇫🇷 Français</option>
            <option value="de-DE">🇩🇪 Deutsch</option>
            <option value="hi-IN">🇮🇳 हिन्दी</option>
          </select>
        </div>

        {/* Voice Audio Feedback Toggle */}
        <button
          className={`toggle-btn ${!isMuted ? 'active' : ''}`}
          onClick={onToggleMute}
          title={isMuted ? 'Unmute Voice Responses' : 'Mute Voice Responses'}
        >
          {!isMuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span>{isMuted ? 'Audio Off' : 'Voice Feedback'}</span>
        </button>

        {/* Catalog Button */}
        <button className="action-btn" onClick={onOpenCatalog} title="Browse Product Catalog">
          <Grid size={16} />
          <span>Catalog</span>
        </button>

        {/* Search & Filter Button */}
        <button className="action-btn" onClick={onOpenSearch} title="Voice Search & Filter">
          <Search size={16} />
          <span>Voice Search</span>
        </button>
      </div>
    </header>
  );
}
