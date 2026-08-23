import React, { useState } from 'react';
import { ItemCard } from './ItemCard';
import { ShoppingBag, CheckCircle2, Trash2, ChevronDown, ChevronUp, DollarSign } from 'lucide-react';

export function ShoppingList({
  items,
  onToggleComplete,
  onUpdateQuantity,
  onRemoveItem,
  onClearList,
  onFindSubstitute,
  activeItemsCount,
  totalItemsCount,
  totalEstimatedCost
}) {
  const [showCompleted, setShowCompleted] = useState(true);

  // Group active items by category
  const activeItems = items.filter(i => !i.completed);
  const completedItems = items.filter(i => i.completed);

  const categorizedActiveItems = activeItems.reduce((acc, item) => {
    const cat = item.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="glass-panel shopping-section">
      <div className="section-header">
        <div className="section-title">
          <ShoppingBag size={22} color="var(--primary)" />
          <span>My Shopping List</span>
          <span className="item-count-badge">
            {activeItemsCount} {activeItemsCount === 1 ? 'item' : 'items'} needed
          </span>
        </div>

        {items.length > 0 && (
          <button
            className="action-btn"
            onClick={() => onClearList('ALL')}
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', color: 'var(--accent-rose)' }}
          >
            <Trash2 size={14} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Budget Summary Banner */}
      <div className="budget-summary">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-emerald)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <DollarSign size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Total</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
              ${totalEstimatedCost.toFixed(2)}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Items</div>
          <div style={{ fontSize: '1rem', fontWeight: 700 }}>
            {totalItemsCount} ({completedItems.length} checked)
          </div>
        </div>
      </div>

      {/* Active Items Grouped by Category */}
      {Object.keys(categorizedActiveItems).length === 0 && completedItems.length === 0 ? (
        <div style={{
          padding: '3rem 1.5rem',
          textAlign: 'center',
          color: 'var(--text-muted)'
        }}>
          <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
          <h3 style={{ color: 'var(--text-main)', marginBottom: '0.4rem' }}>Your shopping list is empty</h3>
          <p style={{ fontSize: '0.88rem' }}>
            Tap the mic button above and say <strong>"Add 2 gallons of milk"</strong> to get started!
          </p>
        </div>
      ) : (
        <div style={{ marginTop: '0.5rem' }}>
          {Object.entries(categorizedActiveItems).map(([category, catItems]) => (
            <div key={category} className="category-group">
              <div className="category-header">
                <span>{category} ({catItems.length})</span>
                <span>Subtotal: ${catItems.reduce((s, i) => s + (i.price * i.quantity), 0).toFixed(2)}</span>
              </div>
              <div className="items-grid">
                {catItems.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onToggleComplete={onToggleComplete}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemoveItem={onRemoveItem}
                    onFindSubstitute={onFindSubstitute}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Completed Items Collapsible Section */}
          {completedItems.length > 0 && (
            <div style={{ marginTop: '1.5rem', borderTop: '1px dashed var(--border-glass)', paddingTop: '1rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  padding: '0.4rem 0',
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
                onClick={() => setShowCompleted(!showCompleted)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-emerald)" />
                  <span>Purchased / Checked Items ({completedItems.length})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClearList('COMPLETED');
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-dim)',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    Clear Checked
                  </button>
                  {showCompleted ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {showCompleted && (
                <div className="items-grid" style={{ marginTop: '0.75rem' }}>
                  {completedItems.map(item => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onToggleComplete={onToggleComplete}
                      onUpdateQuantity={onUpdateQuantity}
                      onRemoveItem={onRemoveItem}
                      onFindSubstitute={onFindSubstitute}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
