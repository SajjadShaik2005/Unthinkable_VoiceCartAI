import { CATALOG_PRODUCTS, INITIAL_SMART_SUGGESTIONS } from './catalogData';

/**
 * Get low-stock items that the user is likely running low on based on past activity
 */
export function getLowStockAlerts(currentList = []) {
  const currentNames = currentList.map(item => item.name.toLowerCase());
  
  // Filter out items already in the user's active shopping list
  return INITIAL_SMART_SUGGESTIONS.runningLow.filter(
    item => !currentNames.some(cn => cn.includes(item.name.toLowerCase()))
  );
}

/**
 * Get seasonal & on-sale recommendations
 */
export function getSeasonalRecommendations(currentList = []) {
  const currentNames = currentList.map(item => item.name.toLowerCase());

  return INITIAL_SMART_SUGGESTIONS.seasonal.filter(
    item => !currentNames.some(cn => cn.includes(item.name.toLowerCase()))
  );
}

/**
 * Get smart substitutes for a target product or phrase
 */
export function getSubstitutesFor(itemName) {
  if (!itemName) return [];

  const lower = itemName.toLowerCase();
  
  // Direct catalog match lookup
  for (const prod of CATALOG_PRODUCTS) {
    if (prod.name.toLowerCase().includes(lower) || lower.includes(prod.name.toLowerCase())) {
      if (prod.substitutes && prod.substitutes.length > 0) {
        return prod.substitutes.map(subName => {
          const subProd = CATALOG_PRODUCTS.find(p => p.name === subName);
          return {
            name: subName,
            category: subProd ? subProd.category : prod.category,
            price: subProd ? subProd.price : prod.price,
            reason: `Alternative for ${prod.name}`
          };
        });
      }
    }
  }

  // Pre-configured substitutes map lookup
  for (const [key, list] of Object.entries(INITIAL_SMART_SUGGESTIONS.substitutesMap)) {
    if (lower.includes(key)) {
      return list;
    }
  }

  // Default fallback substitute suggestions
  return [
    { name: 'Almond Milk (Unsweetened)', category: 'Dairy & Alternatives', price: 4.49, reason: 'Dairy-free popular substitute' },
    { name: 'Gluten-Free Artisan Bread', category: 'Bakery & Bread', price: 5.49, reason: 'Gluten-free choice' }
  ];
}
