import React, { useState, useEffect } from 'react';
import { X, Search, Filter, Plus, Leaf } from 'lucide-react';
import { CATALOG_PRODUCTS, CATEGORIES } from '../services/catalogData';

export function VoiceSearchFilter({
  isOpen,
  onClose,
  searchParams,
  onAddItem
}) {
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(50);
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    if (searchParams) {
      if (searchParams.query) setQuery(searchParams.query);
      if (searchParams.maxPrice) setMaxPrice(searchParams.maxPrice);
      if (searchParams.isOrganic !== undefined) setOnlyOrganic(searchParams.isOrganic);
    }
  }, [searchParams]);

  if (!isOpen) return null;

  // Filter Catalog
  const filteredProducts = CATALOG_PRODUCTS.filter(p => {
    // Query search
    if (query && !p.name.toLowerCase().includes(query.toLowerCase()) && !p.category.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    // Price filter
    if (p.price > maxPrice) return false;
    // Organic filter
    if (onlyOrganic && !p.organic) return false;
    // Category filter
    if (selectedCategory !== 'ALL' && p.category !== selectedCategory) return false;

    return true;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', fontWeight: 700 }}>
            <Search size={22} color="var(--primary)" />
            <span>Voice-Activated Product Search & Filter</span>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Filters Box */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid var(--border-glass)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}>
          {/* Search Query Input */}
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="sim-input"
              style={{ width: '100%', paddingLeft: '2.4rem' }}
              placeholder="Search products (e.g. 'organic apples')..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Price Range Slider & Organic Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Max Price Filter: <strong style={{ color: 'var(--accent-emerald)' }}>${maxPrice}</strong>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
            </div>

            <button
              className={`toggle-btn ${onlyOrganic ? 'active' : ''}`}
              onClick={() => setOnlyOrganic(!onlyOrganic)}
              style={{ fontSize: '0.8rem' }}
            >
              <Leaf size={14} color={onlyOrganic ? '#34d399' : undefined} />
              <span>Organic Only</span>
            </button>
          </div>

          {/* Category Quick Chips */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
            <button
              className={`sug-tab ${selectedCategory === 'ALL' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('ALL')}
            >
              All Categories
            </button>
            {Object.values(CATEGORIES).map(cat => (
              <button
                key={cat}
                className={`sug-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
                style={{ whiteSpace: 'nowrap' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          Found <strong>{filteredProducts.length}</strong> matching products
        </div>

        {/* Results List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dim)' }}>
              No products found matching filters. Try adjusting price range or query.
            </div>
          ) : (
            filteredProducts.map(prod => (
              <div key={prod.id} className="suggestion-item">
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>{prod.name}</span>
                    {prod.organic && (
                      <span className="tag-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
                        Organic
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {prod.category} &bull; ${prod.price} / {prod.unit}
                  </div>
                </div>
                <button
                  className="sug-add-btn"
                  onClick={() => {
                    onAddItem({
                      id: 'search_' + Date.now() + prod.id,
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
