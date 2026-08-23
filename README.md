# 🎙️ VoiceCart AI - Voice Command Shopping Assistant

**VoiceCart AI** is an intelligent, voice-activated shopping list manager with real-time natural language processing (NLP), product & seasonal suggestions, smart substitute discovery, budget estimation, and multilingual Web Speech API integration.

---

## ⚡ Brief Write-Up of Approach 

> **Problem-Solving & Architectural Approach**
>
> To deliver a seamless voice-first shopping assistant without external server delays, i have built a client-side architecture combining browser **Web Speech API**, custom multi-lingual **NLP Engine**, and local reactive state management.
>
> 1. **Voice Recognition & Audio Feedback**: We wrapped Web Speech API with fallback simulation tools to guarantee 100% usability across all browsers. Speech synthesis (`window.speechSynthesis`) provides real-time spoken confirmations.
> 2. **NLP Engine**: A lightweight entity/intent extractor parses natural commands (e.g. *"Add 2 bottles of almond milk under $5"*), automatically extracting action, quantity, units, max price caps, organic preferences, and categories.
> 3. **Smart Suggestions**: Designed a tri-modal engine predicting low-stock items based on consumption cadence, highlighting seasonal produce discounts, and providing alternative substitutes (e.g. almond milk for dairy).
> 4. **Modern UI & UX**: Built with glassmorphism, animated microphone audio waveforms, budget subtotal calculations, category grouping, and JSON/TXT export options.

---

## ✨ Key Features

1. **Multilingual Voice Commands**:
   - Add/Remove/Search/Clear actions supported in English (🇺🇸), Spanish (🇪🇸), French (🇫🇷), German (🇩🇪), and Hindi (🇮🇳).
   - Real-time Speech Synthesis (TTS) spoken confirmations.
   - Interactive visual microphone wave animation.
   - Fallback voice simulator input & quick command chips.

2. **Smart Natural Language Processing (NLP)**:
   - Recognizes complex phrases like *"I need 3 organic honeycrisp apples"*, *"Add 2 bottles of water under $5"*, *"Remove milk"*, *"Find toothpaste under $5"*.
   - Auto-categorizes items into Dairy, Produce, Bakery, Beverages, Pantry, Meat, Snacks, Household.

3. **Smart Product Suggestions & Substitutes**:
   - **Low-Stock Predictor**: Recommends items you buy frequently before you run out.
   - **Seasonal Deals**: Highlights seasonal items with active discounts.
   - **Smart Substitutes**: 1-click alternative suggestions (e.g., plant-based milk alternatives).

4. **Shopping List & Budget Management**:
   - Real-time subtotal cost estimation.
   - Category group accordions.
   - Check off purchased items with celebratory confetti animations.
   - Export shopping lists as JSON or TXT.

5. **Voice-Activated Search & Filtering**:
   - Filter catalog items by max price slider ($1 - $50), organic tag, or category.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will run at `http://localhost:5173`.

### Production Build
```bash
npm run build
```

The compiled production bundle will be generated in the `dist/` directory.

---

## 🌐 Deployment Instructions

### Deploy to Vercel / Netlify
1. Connect your GitHub repository to Vercel or Netlify.
2. Set Build Command to: `npm run build`
3. Set Output Directory to: `dist`

### Deploy to AWS S3 / CloudFront
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```
