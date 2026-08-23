// Pre-populated product catalog with realistic shopping metadata, categories, prices & substitutes

export const CATEGORIES = {
  DAIRY: 'Dairy & Alternatives',
  PRODUCE: 'Fresh Produce',
  BAKERY: 'Bakery & Bread',
  BEVERAGES: 'Beverages',
  SNACKS: 'Snacks & Sweets',
  PANTRY: 'Pantry & Staples',
  MEAT: 'Meat & Seafood',
  HOUSEHOLD: 'Household & Cleaning',
  FROZEN: 'Frozen Foods'
};

export const CATALOG_PRODUCTS = [
  // Dairy & Alternatives
  { id: 'p1', name: 'Whole Milk', category: CATEGORIES.DAIRY, price: 3.99, unit: 'gal', organic: false, substitutes: ['Almond Milk', 'Oat Milk', 'Soy Milk'] },
  { id: 'p2', name: 'Almond Milk (Unsweetened)', category: CATEGORIES.DAIRY, price: 4.49, unit: 'carton', organic: true, substitutes: ['Oat Milk', 'Whole Milk'] },
  { id: 'p3', name: 'Greek Yogurt (Vanilla)', category: CATEGORIES.DAIRY, price: 5.29, unit: 'tub', organic: true, substitutes: ['Coconut Yogurt', 'Cottage Cheese'] },
  { id: 'p4', name: 'Cheddar Cheese Block', category: CATEGORIES.DAIRY, price: 4.19, unit: 'pack', organic: false, substitutes: ['Vegan Cheese', 'Swiss Cheese'] },
  { id: 'p5', name: 'Salted Butter', category: CATEGORIES.DAIRY, price: 3.79, unit: 'pack', organic: false, substitutes: ['Olive Oil Butter', 'Ghee'] },

  // Produce
  { id: 'p6', name: 'Organic Honeycrisp Apples', category: CATEGORIES.PRODUCE, price: 4.99, unit: 'bag', organic: true, seasonal: 'Fall', substitutes: ['Fuji Apples', 'Organic Pears'] },
  { id: 'p7', name: 'Bananas', category: CATEGORIES.PRODUCE, price: 1.49, unit: 'bunch', organic: false, substitutes: ['Plantains', 'Apples'] },
  { id: 'p8', name: 'Fresh Strawberries', category: CATEGORIES.PRODUCE, price: 3.99, unit: 'pack', organic: true, seasonal: 'Summer', onSale: true, substitutes: ['Blueberries', 'Raspberries'] },
  { id: 'p9', name: 'Avocados', category: CATEGORIES.PRODUCE, price: 3.49, unit: 'mesh bag', organic: true, substitutes: ['Guacamole', 'Hummus'] },
  { id: 'p10', name: 'Baby Spinach', category: CATEGORIES.PRODUCE, price: 2.99, unit: 'tub', organic: true, substitutes: ['Kale', 'Arugula'] },
  { id: 'p11', name: 'Sweet Tomatoes', category: CATEGORIES.PRODUCE, price: 2.79, unit: 'pack', organic: false, seasonal: 'Summer', substitutes: ['Cherry Tomatoes'] },

  // Bakery
  { id: 'p12', name: 'Whole Wheat Bread', category: CATEGORIES.BAKERY, price: 3.29, unit: 'loaf', organic: false, substitutes: ['Multigrain Bread', 'Gluten-Free Bread'] },
  { id: 'p13', name: 'Artisan Sourdough', category: CATEGORIES.BAKERY, price: 4.99, unit: 'loaf', organic: true, substitutes: ['French Baguette'] },
  { id: 'p14', name: 'Butter Croissants', category: CATEGORIES.BAKERY, price: 3.89, unit: '4-pack', organic: false, substitutes: ['Brioche Buns'] },

  // Beverages
  { id: 'p15', name: 'Natural Spring Water', category: CATEGORIES.BEVERAGES, price: 4.99, unit: '24-pack', organic: false, substitutes: ['Sparkling Water'] },
  { id: 'p16', name: 'Cold Brew Coffee', category: CATEGORIES.BEVERAGES, price: 5.49, unit: 'bottle', organic: true, substitutes: ['Matcha Tea', 'Iced Black Tea'] },
  { id: 'p17', name: '100% Orange Juice', category: CATEGORIES.BEVERAGES, price: 3.79, unit: 'bottle', organic: false, substitutes: ['Grapefruit Juice', 'Apple Juice'] },

  // Pantry
  { id: 'p18', name: 'Extra Virgin Olive Oil', category: CATEGORIES.PANTRY, price: 8.99, unit: 'bottle', organic: true, substitutes: ['Avocado Oil', 'Coconut Oil'] },
  { id: 'p19', name: 'Organic Brown Rice', category: CATEGORIES.PANTRY, price: 2.99, unit: 'bag', organic: true, substitutes: ['Quinoa', 'Jasmine Rice'] },
  { id: 'p20', name: 'Penne Pasta', category: CATEGORIES.PANTRY, price: 1.89, unit: 'box', organic: false, substitutes: ['Chickpea Pasta', 'Whole Wheat Pasta'] },
  { id: 'p21', name: 'Tomato Basil Pasta Sauce', category: CATEGORIES.PANTRY, price: 3.49, unit: 'jar', organic: true, substitutes: ['Marinara Sauce'] },

  // Snacks & Sweets
  { id: 'p22', name: 'Dark Chocolate 70%', category: CATEGORIES.SNACKS, price: 2.99, unit: 'bar', organic: true, onSale: true, substitutes: ['Milk Chocolate', 'Dried Fruit'] },
  { id: 'p23', name: 'Roasted Almonds', category: CATEGORIES.SNACKS, price: 6.49, unit: 'bag', organic: true, substitutes: ['Cashews', 'Mixed Nuts'] },
  { id: 'p24', name: 'Organic Tortilla Chips', category: CATEGORIES.SNACKS, price: 3.29, unit: 'bag', organic: true, substitutes: ['Pita Chips', 'Potato Chips'] },

  // Meat & Seafood
  { id: 'p25', name: 'Organic Chicken Breast', category: CATEGORIES.MEAT, price: 9.99, unit: 'pack', organic: true, substitutes: ['Tofu', 'Turkey Breast'] },
  { id: 'p26', name: 'Wild Atlantic Salmon', category: CATEGORIES.MEAT, price: 12.99, unit: 'fillet', organic: true, seasonal: 'Spring', substitutes: ['Cod Fillet', 'Trout'] },

  // Household
  { id: 'p27', name: 'Eco Paper Towels', category: CATEGORIES.HOUSEHOLD, price: 6.99, unit: '6-pack', organic: false, substitutes: ['Microfiber Cloths'] },
  { id: 'p28', name: 'Natural Dish Soap', category: CATEGORIES.HOUSEHOLD, price: 3.49, unit: 'bottle', organic: true, substitutes: ['All-Purpose Cleaner'] }
];

// Usage history & low-stock predictions simulation data
export const INITIAL_SMART_SUGGESTIONS = {
  runningLow: [
    { name: 'Whole Wheat Bread', lastPurchasedDaysAgo: 5, category: CATEGORIES.BAKERY, price: 3.29, reason: 'You usually buy this every 5 days' },
    { name: 'Whole Milk', lastPurchasedDaysAgo: 6, category: CATEGORIES.DAIRY, price: 3.99, reason: 'Running low based on your weekly routine' },
    { name: 'Natural Spring Water', lastPurchasedDaysAgo: 8, category: CATEGORIES.BEVERAGES, price: 4.99, reason: 'Low supply detected' }
  ],
  seasonal: [
    { name: 'Fresh Strawberries', season: 'Summer Special', category: CATEGORIES.PRODUCE, price: 3.99, discount: '20% OFF', organic: true },
    { name: 'Organic Honeycrisp Apples', season: 'Fall Harvest', category: CATEGORIES.PRODUCE, price: 4.99, organic: true },
    { name: 'Wild Atlantic Salmon', season: 'Fresh Catch', category: CATEGORIES.MEAT, price: 12.99 }
  ],
  substitutesMap: {
    'milk': [{ name: 'Almond Milk (Unsweetened)', category: CATEGORIES.DAIRY, price: 4.49, reason: 'Plant-based healthier alternative' }, { name: 'Oat Milk', category: CATEGORIES.DAIRY, price: 4.29, reason: 'Creamy dairy-free choice' }],
    'bread': [{ name: 'Gluten-Free Artisan Bread', category: CATEGORIES.BAKERY, price: 5.49, reason: 'Gluten-free option' }],
    'sugar': [{ name: 'Organic Raw Honey', category: CATEGORIES.PANTRY, price: 6.99, reason: 'Natural sweetener' }],
    'butter': [{ name: 'Extra Virgin Olive Oil Butter', category: CATEGORIES.DAIRY, price: 4.29, reason: 'Lower saturated fat' }],
    'pasta': [{ name: 'Chickpea Protein Pasta', category: CATEGORIES.PANTRY, price: 3.99, reason: 'High protein & fiber' }]
  }
};
