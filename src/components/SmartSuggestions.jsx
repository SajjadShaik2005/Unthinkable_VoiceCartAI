import React, { useState } from 'react';
import { Sparkles, Plus, Clock, Sun, RefreshCw } from 'lucide-react';
import { getLowStockAlerts, getSeasonalRecommendations, getSubstitutesFor } from '../services/recommendationEngine';

export function SmartSuggestions({
  currentList,
  onAddItem,
  substituteTarget,
  onClearSubstituteTarget
}) {
  const [activeTab, setActiveTab] = useState(substituteTarget ? 'substitutes' : 'lowStock');

  const lowStockItems = getLowStockAlerts(currentList);
  const seasonalItems = getSeasonalRecommendations(currentList);
  const substituteItems = substituteTarget ? getSubstitutesFor(substituteTarget) : [];

  return (
    <div className="glass-panel suggestions-card">
      <div className="card-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} color="var(--accent-amber)" />
          <span>Smart AI Suggestions</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="suggestion-tabs">
        <button
          className={`sug-tab ${activeTab === 'lowStock' ? 'active' : ''}`}
          onClick={() => setActiveTab('lowStock')}
        >
          Running Low ({lowStockItems.length})
        </button>
        <button
          className={`sug-tab ${activeTab === 'seasonal' ? 'active' : ''}`}
          onClick={() => setActiveTab('seasonal')}
        >
          Seasonal Deals
        </button>
        <button
          className={`sug-tab ${activeTab === 'substitutes' ? 'active' : ''}`}
          onClick={() => setActiveTab('substitutes')}
        >
          Substitutes
        </button>
      </div>

      {/* Tab 1: Low Stock Alerts */}
      {activeTab === 'lowStock' && (
        <div>
          {lowStockItems.length === 0 ? (
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
              All predicted items are already on your list!
            </div>
          ) : (
            lowStockItems.map((item, idx) => (
              <div key={idx} className="suggestion-item">
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={11} /> {item.reason}
                  </div>
                </div>
                <button
                  className="sug-add-btn"
                  onClick={() => onAddItem({
                    id: 'sug_' + Date.now() + idx,
                    name: item.name,
                    quantity: 1,
                    unit: 'pcs',
                    category: item.category,
                    price: item.price,
                    completed: false
                  })}
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Seasonal Specials */}
      {activeTab === 'seasonal' && (
        <div>
          {seasonalItems.map((item, idx) => (
            <div key={idx} className="suggestion-item">
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>{item.name}</span>
                  {item.discount && (
                    <span className="tag-badge" style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#f43f5e' }}>
                      {item.discount}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Sun size={11} color="var(--accent-amber)" /> {item.season} &bull; ${item.price}
                </div>
              </div>
              <button
                className="sug-add-btn"
                onClick={() => onAddItem({
                  id: 'seas_' + Date.now() + idx,
                  name: item.name,
                  quantity: 1,
                  unit: 'pack',
                  category: item.category,
                  price: item.price,
                  organic: item.organic || false,
                  completed: false
                })}
              >
                <Plus size={14} /> Add
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Smart Substitutes */}
      {activeTab === 'substitutes' && (
        <div>
          {substituteTarget && (
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>Alternatives for <strong>"{substituteTarget}"</strong>:</span>
              <button
                onClick={onClearSubstituteTarget}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.75rem', marginLeft: 'auto' }}
              >
                Reset
              </button>
            </div>
          )}

          {substituteItems.length === 0 ? (
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
              Click the <RefreshCw size={12} /> icon on any shopping item to see smart alternatives.
            </div>
          ) : (
            substituteItems.map((item, idx) => (
              <div key={idx} className="suggestion-item">
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {item.reason} &bull; ${item.price}
                  </div>
                </div>
                <button
                  className="sug-add-btn"
                  onClick={() => onAddItem({
                    id: 'sub_' + Date.now() + idx,
                    name: item.name,
                    quantity: 1,
                    unit: 'pcs',
                    category: item.category,
                    price: item.price,
                    completed: false
                  })}
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
