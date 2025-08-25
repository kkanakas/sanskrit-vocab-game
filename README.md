# Sanskrit Vocab Game

An 11-level vocabulary game for learning Sanskrit. Each level contains 50 words. You must score at least 80% to unlock the next level. Words are shown in Sanskrit (Devanagari), and the app uses your browser's Text-to-Speech to pronounce them.

Features
- 11 levels (0–10), 50 words each
- Level gating (>=80% to pass)
- Web Speech API TTS (auto and on-demand play)
- Progress bar, recent answers review
- LocalStorage progress persistence

Requirements
- Node.js 18+
- A modern browser with SpeechSynthesis (Chrome, Edge, Safari)

Start the game
1. Install dependencies (first time only)
   npm install

2. Start the dev server (foreground)
   npm run dev
   Then open the printed URL (usually http://localhost:5173) in your browser and allow audio.

3. Optional — run in the background
   nohup npm run dev > dev.log 2>&1 &
   tail -f dev.log   # follow logs
   pkill -f "vite"   # stop the server (or kill <PID>)

Production build (optional)
- Build optimized assets
   npm run build
- Preview the production build locally
   npm run preview
   Open the printed URL in your browser.

Notes
- TTS: Sanskrit-specific voices are rare. The app picks a Hindi/Indic voice if available; otherwise it falls back to your system’s default TTS.
- Dataset: Level 0 is curated. Levels 1–10 are scaffolded with repeat placeholders so you can play immediately. Replace entries in src/data/levels.ts with your own curated sets to practice.
- Answer checking is case-insensitive and strips non-letters (so “Water” and “water!” both match “water”).

Customize
- Add or edit items in src/data/levels.ts. Each level requires exactly 50 items.
- Styling is in src/styles.css.

License
MIT
