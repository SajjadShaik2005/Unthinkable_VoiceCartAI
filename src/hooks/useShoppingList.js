import { useState, useEffect } from 'react';
import { CATEGORIES } from '../services/catalogData';

const STORAGE_KEY = 'voice_shopping_list_v1';

const INITIAL_ITEMS = [
  {
    id: 'init_1',
    name: 'Organic Honeycrisp Apples',
    quantity: 2,
    unit: 'bag',
    category: CATEGORIES.PRODUCE,
    price: 4.99,
    organic: true,
    completed: false,
    addedAt: new Date().toISOString()
  },
  {
    id: 'init_2',
    name: 'Almond Milk (Unsweetened)',
    quantity: 1,
    unit: 'carton',
    category: CATEGORIES.DAIRY,
    price: 4.49,
    organic: true,
    completed: false,
    addedAt: new Date().toISOString()
  },
  {
    id: 'init_3',
    name: 'Whole Wheat Bread',
    quantity: 1,
    unit: 'loaf',
    category: CATEGORIES.BAKERY,
    price: 3.29,
    organic: false,
    completed: true,
    addedAt: new Date().toISOString()
  }
];

export function useShoppingList() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ITEMS;
    } catch {
      return INITIAL_ITEMS;
    }
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [items]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const addItem = (itemData) => {
    setItems(prev => {
      // Check if item already exists by name
      const existingIdx = prev.findIndex(
        i => i.name.toLowerCase() === itemData.name.toLowerCase() && !i.completed
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + (itemData.quantity || 1)
        };
        addToast(`Updated ${itemData.name} quantity to ${updated[existingIdx].quantity}`);
        return updated;
      } else {
        addToast(`Added ${itemData.name} to ${itemData.category || 'list'}`);
        return [itemData, ...prev];
      }
    });
  };

  const removeItem = (idOrName) => {
    setItems(prev => {
      const itemToRemove = prev.find(
        i => i.id === idOrName || i.name.toLowerCase().includes(String(idOrName).toLowerCase())
      );
      if (itemToRemove) {
        addToast(`Removed ${itemToRemove.name} from list`);
        return prev.filter(i => i.id !== itemToRemove.id);
      }
      addToast(`Item not found on list`, 'warning');
      return prev;
    });
  };

  const toggleComplete = (id) => {
    setItems(prev => prev.map(i => {
      if (i.id === id) {
        const nextState = !i.completed;
        return { ...i, completed: nextState };
      }
      return i;
    }));
  };

  const updateQuantity = (id, delta) => {
    setItems(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const clearList = (type = 'ALL') => {
    if (type === 'COMPLETED') {
      setItems(prev => prev.filter(i => !i.completed));
      addToast('Cleared completed items');
    } else {
      setItems([]);
      addToast('Cleared all items');
    }
  };

  // Calculations
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const activeItemsCount = items.filter(i => !i.completed).reduce((sum, item) => sum + item.quantity, 0);
  const totalEstimatedCost = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return {
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
  };
}
