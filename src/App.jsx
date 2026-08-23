import React, { useState } from 'react';
import { Header } from './components/Header';
import { VoiceMicBar } from './components/VoiceMicBar';
import { ShoppingList } from './components/ShoppingList';
import { SmartSuggestions } from './components/SmartSuggestions';
import { VoiceSearchFilter } from './components/VoiceSearchFilter';
import { CatalogModal } from './components/CatalogModal';
import { VoiceCheatSheet } from './components/VoiceCheatSheet';
import { SummaryFooter } from './components/SummaryFooter';

import { useShoppingList } from './hooks/useShoppingList';
import { useVoiceAssistant } from './hooks/useVoiceAssistant';

export function App() {
  const {
    items,
    toasts,
    addItem,
    removeItem,
    toggleComplete,
    updateQuantity,
    clearList,
    totalItemsCount,
    activeItemsCount,
    totalEstimatedCost
  } = useShoppingList();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [searchParams, setSearchParams] = useState(null);
  const [substituteTarget, setSubstituteTarget] = useState(null);

  // Command router from Voice Assistant engine
  const handleExecuteCommand = (intent, payload) => {
    if (intent === 'ADD') {
      addItem(payload);
    } else if (intent === 'REMOVE') {
      removeItem(payload);
    } else if (intent === 'CLEAR') {
      clearList(payload);
    }
  };

  const handleSearchResult = (params) => {
    setSearchParams(params);
    setIsSearchOpen(true);
  };

  const handleSubstituteResult = (targetItem) => {
    setSubstituteTarget(targetItem);
  };

  const {
    isListening,
    transcript,
    interimTranscript,
    selectedLanguage,
    setSelectedLanguage,
    isMuted,
    setIsMuted,
    lastParsedAction,
    toggleListening,
    simulateVoiceCommand
  } = useVoiceAssistant({
    onExecuteCommand: handleExecuteCommand,
    onSearchResult: handleSearchResult,
    onSubstituteResult: handleSubstituteResult
  });

  return (
    <div className="app-container">
      {/* Top Navigation Header */}
      <Header
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        onOpenSearch={() => {
          setSearchParams(null);
          setIsSearchOpen(true);
        }}
        onOpenCatalog={() => setIsCatalogOpen(true)}
      />

      {/* Voice Control Center */}
      <VoiceMicBar
        isListening={isListening}
        transcript={transcript}
        interimTranscript={interimTranscript}
        lastParsedAction={lastParsedAction}
        onToggleListening={toggleListening}
        onSimulateCommand={simulateVoiceCommand}
        selectedLanguage={selectedLanguage}
      />

      {/* Multilingual Voice Cheat Sheet */}
      <VoiceCheatSheet onSimulateCommand={simulateVoiceCommand} />

      {/* Main Grid: Shopping List & Smart Suggestions */}
      <div className="main-grid">
        <ShoppingList
          items={items}
          onToggleComplete={toggleComplete}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onClearList={clearList}
          onFindSubstitute={(name) => setSubstituteTarget(name)}
          activeItemsCount={activeItemsCount}
          totalItemsCount={totalItemsCount}
          totalEstimatedCost={totalEstimatedCost}
        />

        <div className="sidebar-column">
          <SmartSuggestions
            currentList={items}
            onAddItem={addItem}
            substituteTarget={substituteTarget}
            onClearSubstituteTarget={() => setSubstituteTarget(null)}
          />
        </div>
      </div>

      {/* Modals */}
      <VoiceSearchFilter
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchParams={searchParams}
        onAddItem={(item) => {
          addItem(item);
          setIsSearchOpen(false);
        }}
      />

      <CatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onAddItem={(item) => {
          addItem(item);
          setIsCatalogOpen(false);
        }}
      />

      {/* Summary Footer & Export Tools */}
      <SummaryFooter items={items} toasts={toasts} />
    </div>
  );
}

export default App;
