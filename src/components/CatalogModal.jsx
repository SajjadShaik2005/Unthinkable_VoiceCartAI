import React, { useState } from 'react';
import { X, Grid, Plus, Search } from 'lucide-react';
import { CATALOG_PRODUCTS, CATEGORIES } from '../services/catalogData';

export function CatalogModal({ isOpen, onClose, onAddItem }) {
  const [selectedCat, setSelectedCat] = useState(CATEGORIES.DAIRY);
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const products = CATALOG_PRODUCTS.filter(p => {
    const matchCat = selectedCat === 'ALL' || p.category === selectedCat;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>
            <Grid size={22} color="var(--primary)" />
            <span>Product Catalog</span>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search inside catalog */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="sim-input"
            style={{ width: '100%', paddingLeft: '2.4rem' }}
            placeholder="Search catalog products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories Bar */}
        <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
          <button
            className={`sug-tab ${selectedCat === 'ALL' ? 'active' : ''}`}
            onClick={() => setSelectedCat('ALL')}
          >
            All
          </button>
          {Object.values(CATEGORIES).map(cat => (
            <button
              key={cat}
              className={`sug-tab ${selectedCat === cat ? 'active' : ''}`}
              onClick={() => setSelectedCat(cat)}
              style={{ whiteSpace: 'nowrap' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Items Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
          {products.map(prod => (
            <div key={prod.id} className="suggestion-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{prod.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{prod.category}</div>
                </div>
                <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', fontSize: '0.9rem' }}>
                  ${prod.price}
                </div>
              </div>

              <button
                className="sug-add-btn"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  onAddItem({
                    id: 'cat_' + Date.now() + prod.id,
                    name: prod.name,
                    quantity: 1,
                    unit: prod.unit,
                    category: prod.category,
                    price: prod.price,
                    organic: prod.organic,
                    completed: false
                  });
                }}
              >
                <Plus size={14} /> Add to List
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
