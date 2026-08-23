import React from 'react';
import { Check, Trash2, Plus, Minus, Leaf, Tag, RefreshCw } from 'lucide-react';

export function ItemCard({
  item,
  onToggleComplete,
  onUpdateQuantity,
  onRemoveItem,
  onFindSubstitute
}) {
  return (
    <div className={`item-card ${item.completed ? 'completed' : ''}`}>
      <div className="item-left">
        <div
          className={`check-checkbox ${item.completed ? 'checked' : ''}`}
          onClick={() => onToggleComplete(item.id)}
          title={item.completed ? 'Mark as Uncompleted' : 'Mark as Completed'}
        >
          {item.completed && <Check size={14} strokeWidth={3} />}
        </div>

        <div className="item-info">
          <span className="item-name">{item.name}</span>
          <div className="item-meta">
            <span>{item.quantity} {item.unit || 'pcs'}</span>
            {item.organic && (
              <span className="tag-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                <Leaf size={10} style={{ display: 'inline', marginRight: '2px' }} /> Organic
              </span>
            )}
            {item.maxPrice && (
              <span className="tag-badge">
                <Tag size={10} style={{ display: 'inline', marginRight: '2px' }} /> &lt; ${item.maxPrice}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="item-right">
        {/* Quantity adjustment buttons */}
        <div className="qty-controls">
          <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, -1)} title="Decrease quantity">
            <Minus size={14} />
          </button>
          <span className="qty-val">{item.quantity}</span>
          <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, 1)} title="Increase quantity">
            <Plus size={14} />
          </button>
        </div>

        {/* Total price for this item line */}
        <div className="item-price">
          ${(item.price * item.quantity).toFixed(2)}
        </div>

        {/* Find Substitute button */}
        <button
          className="delete-btn"
          onClick={() => onFindSubstitute(item.name)}
          title="Find smart substitutes for this item"
          style={{ color: '#a5b4fc' }}
        >
          <RefreshCw size={15} />
        </button>

        {/* Delete item button */}
        <button
          className="delete-btn"
          onClick={() => onRemoveItem(item.id)}
          title="Delete item"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
