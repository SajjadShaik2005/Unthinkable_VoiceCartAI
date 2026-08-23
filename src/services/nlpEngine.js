import { CATALOG_PRODUCTS, CATEGORIES } from './catalogData';

// Map spelled out numbers across languages to integers
const NUMBER_WORDS = {
  'one': 1, 'a': 1, 'an': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
  'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10, 'dozen': 12,
  'un': 1, 'une': 1, 'deux': 2, 'trois': 3, 'quatre': 4, 'cinq': 5,
  'uno': 1, 'dos': 2, 'tres': 3, 'cuatro': 4, 'cinco': 5,
  'ein': 1, 'zwei': 2, 'drei': 3, 'vier': 4, 'fünf': 5,
  'ek': 1, 'do': 2, 'teen': 3
};

// Unit keywords
const UNITS = ['bottle', 'bottles', 'bag', 'bags', 'pack', 'packs', 'box', 'boxes', 'carton', 'cartons', 'gal', 'gallon', 'kg', 'lb', 'lbs', 'bunch', 'bunches', 'tub', 'tubs', 'jar', 'jars', 'loaf', 'loaves'];

/**
 * Main NLP Voice Command Parser
 */
export function parseVoiceCommand(text, currentLang = 'en-US') {
  if (!text || typeof text !== 'string') {
    return { intent: 'UNKNOWN', confidence: 0, text: '' };
  }

  const rawText = text.trim();
  const lowerText = rawText.toLowerCase();

  // 1. Detect Price Filters (e.g. "under $5", "under 5 dollars", "less than $10", "below 5$")
  let maxPrice = null;
  const priceRegex = /(?:under|less than|below|baixo de|menos de|sous|unter|costing under|\$)\s*(\d+(?:\.\d+)?)\s*(?:dollars|\$|\u20ac)?/i;
  const priceMatch = lowerText.match(priceRegex);
  if (priceMatch && priceMatch[1]) {
    maxPrice = parseFloat(priceMatch[1]);
  }

  // 2. Check for Organic preference tag
  const isOrganicRequested = lowerText.includes('organic') || lowerText.includes('biologique') || lowerText.includes('orgánico');

  // 3. Detect CLEAR Intent
  if (/clear (all|completed|list)|delete all|empty list|limpiar lista|effacer la liste/i.test(lowerText)) {
    return {
      intent: 'CLEAR',
      target: lowerText.includes('completed') ? 'COMPLETED' : 'ALL',
      rawText
    };
  }

  // 4. Detect SUBSTITUTE / ALTERNATIVE Intent
  if (/substitute|alternative|replace|sustituto|remplacer|ersatz/i.test(lowerText)) {
    const itemMatch = lowerText.replace(/.*(?:substitute|alternative|replace|sustituto|remplacer|for|por|pour)\s+/i, '').trim();
    return {
      intent: 'SUBSTITUTE',
      itemName: itemMatch || 'milk',
      rawText
    };
  }

  // 5. Detect REMOVE Intent
  const removeRegex = /(?:remove|delete|drop|eliminate|quitar|eliminar|supprimer|entfernen|हताएं)\s+(?:from my list\s+)?(.+)/i;
  if (removeRegex.test(lowerText)) {
    const match = lowerText.match(removeRegex);
    let targetItem = match ? match[1].replace(/from my list|from list|de mi lista|de la liste/gi, '').trim() : '';
    return {
      intent: 'REMOVE',
      itemName: targetItem,
      rawText
    };
  }

  // 6. Detect SEARCH / FIND Intent
  const searchRegex = /(?:find|search|show|look for|buscar|chercher|suchen|खोजें)\s+(.+)/i;
  if (searchRegex.test(lowerText) && !lowerText.startsWith('add') && !lowerText.startsWith('buy')) {
    const match = lowerText.match(searchRegex);
    let query = match ? match[1].trim() : '';
    return {
      intent: 'SEARCH',
      query,
      maxPrice,
      isOrganic: isOrganicRequested,
      rawText
    };
  }

  // 7. Default or ADD Intent parsing
  // Extract Quantity & Unit
  let quantity = 1;
  let unit = 'pcs';
  let cleanText = lowerText
    .replace(/(?:add|i need|i want to buy|buy|put|please add|añadir|necesito|comprar|ajouter|achete|füge|ich brauche|जोड़ें)\s+/gi, '')
    .replace(/(?:to my list|to list|on my list|in my cart|a mi lista|à ma liste)/gi, '')
    .trim();

  // Extract explicit numeric digits e.g. "2 bottles of milk"
  const qtyDigitMatch = cleanText.match(/^(\d+)\s*(.*)/);
  if (qtyDigitMatch) {
    quantity = parseInt(qtyDigitMatch[1], 10);
    cleanText = qtyDigitMatch[2].trim();
  } else {
    // Check spelled out number words e.g. "two bottles"
    const words = cleanText.split(' ');
    if (words.length > 0 && NUMBER_WORDS[words[0]]) {
      quantity = NUMBER_WORDS[words[0]];
      cleanText = words.slice(1).join(' ').trim();
    }
  }

  // Check for unit words e.g. "bottles of milk" -> unit = 'bottles', cleanText = 'milk'
  const unitMatch = cleanText.match(new RegExp(`^(?:of\\s+)?(${UNITS.join('|')})\\s+(?:of\\s+)?(.+)`, 'i'));
  if (unitMatch) {
    unit = unitMatch[1];
    cleanText = unitMatch[2].trim();
  }

  // Clean price phrase from item name if present
  cleanText = cleanText.replace(/under \$?\d+(?:\.\d+)?(?: dollars)?/gi, '').trim();

  // Standardize Product Name & Auto-Categorize
  const matchedProduct = findBestCatalogMatch(cleanText);
  const category = matchedProduct ? matchedProduct.category : autoCategorizeItem(cleanText);
  const price = matchedProduct ? matchedProduct.price : (maxPrice || estimateDefaultPrice(category));
  const finalName = matchedProduct ? matchedProduct.name : capitalizeFirstLetter(cleanText);

  return {
    intent: 'ADD',
    item: {
      id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: finalName,
      quantity,
      unit,
      category,
      price,
      maxPrice,
      organic: isOrganicRequested || (matchedProduct ? matchedProduct.organic : false),
      completed: false,
      addedAt: new Date().toISOString()
    },
    rawText
  };
}

/**
 * Fuzzy search match catalog items
 */
function findBestCatalogMatch(query) {
  if (!query) return null;
  const q = query.toLowerCase();
  
  // Exact or includes match
  for (const prod of CATALOG_PRODUCTS) {
    const prodName = prod.name.toLowerCase();
    if (prodName === q || prodName.includes(q) || q.includes(prodName)) {
      return prod;
    }
  }
  return null;
}

/**
 * Heuristic Auto Categorizer
 */
export function autoCategorizeItem(name) {
  const n = name.toLowerCase();

  if (/milk|cheese|yogurt|butter|cream|dairy|leche|lait|käse/i.test(n)) return CATEGORIES.DAIRY;
  if (/apple|banana|strawberry|berry|spinach|avocado|tomato|fruit|vegetable|produce|manzana|pomme|apfel/i.test(n)) return CATEGORIES.PRODUCE;
  if (/bread|croissant|baguette|sourdough|bakery|pan|brot|pain/i.test(n)) return CATEGORIES.BAKERY;
  if (/water|juice|coffee|tea|soda|drink|beverage|boisson|wasser|café/i.test(n)) return CATEGORIES.BEVERAGES;
  if (/chip|nut|almond|chocolate|candy|snack|cookie/i.test(n)) return CATEGORIES.SNACKS;
  if (/oil|rice|pasta|sauce|sugar|flour|salt|pepper|honey|pantry/i.test(n)) return CATEGORIES.PANTRY;
  if (/chicken|beef|salmon|fish|turkey|steak|pork|meat|seafood/i.test(n)) return CATEGORIES.MEAT;
  if (/soap|towel|paper|cleaner|detergent|household/i.test(n)) return CATEGORIES.HOUSEHOLD;

  return CATEGORIES.PANTRY; // fallback
}

function estimateDefaultPrice(category) {
  switch (category) {
    case CATEGORIES.MEAT: return 9.99;
    case CATEGORIES.HOUSEHOLD: return 5.99;
    case CATEGORIES.DAIRY: return 4.29;
    case CATEGORIES.BEVERAGES: return 3.99;
    case CATEGORIES.PRODUCE: return 3.49;
    case CATEGORIES.SNACKS: return 3.29;
    default: return 2.99;
  }
}

function capitalizeFirstLetter(str) {
  if (!str) return 'Item';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
