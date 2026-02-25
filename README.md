# KSL Translator MVP

A web-based Kenyan Sign Language (KSL) text-to-sign translator that converts typed English sentences into a sequence of KSL video clips.

## Features

- **Text-to-Sign Translation**: Enter English text and get corresponding KSL video clips
- **50-Word Vocabulary**: Includes greetings, questions, verbs, people pronouns, time expressions, and common objects
- **Sequential Video Playback**: Plays KSL videos one after another for complete phrase translation
- **Mobile-First Design**: Fully responsive interface works seamlessly on mobile, tablet, and desktop
- **Clean UI**: Intuitive interface with real-time feedback on translations

## Project Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage with main translation UI
│   └── globals.css        # Global styles and Tailwind directives
├── components/
│   └── VideoPlayer.tsx    # Video playback component for sequential clips
├── lib/
│   └── vocabulary.ts      # KSL vocabulary database and translation logic
└── types/
    └── index.ts           # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Type an English sentence in the text box
2. Click "Translate" or press Ctrl+Enter
3. The video player will display KSL videos for each recognized word
4. Use Play/Pause and Reset buttons to control playback
5. Words not in the vocabulary will be displayed in a message

## Supported Vocabulary

### Greetings & Basics (10)
hello, thank you, please, sorry, yes, no, good morning, good afternoon, good evening, goodbye

### Questions (8)
what, where, when, why, who, how, how much, how many

### Common Verbs (12)
want, need, have, go, come, eat, drink, sleep, help, understand, learn, work

### People (6)
I, you, he, she, we, they

### Time (6)
now, later, today, tomorrow, yesterday, always

### Common Objects (8)
water, food, house, car, phone, book, money, clothes

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run generate:videos` - Generate 50 placeholder MP4 clips

### Technologies

- **Next.js 14** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management

## Video Handling

Currently uses placeholder video paths. To integrate real KSL videos:

1. Create a `public/videos/` directory
2. Add video files for each word (e.g., `hello.mp4`, `thank-you.mp4`)
3. The app will automatically pull the correct videos based on the vocabulary mapping

You can auto-generate local placeholder clips by running:

```bash
npm run generate:videos
```

## Phase 1 Deliverables

✅ Working Next.js app with TypeScript
✅ Homepage with text input, translate button, and video container
✅ VideoPlayer component with sequential playback
✅ Responsive mobile-first CSS
✅ 50-word KSL vocabulary database
✅ Word-by-word translation logic

## Future Phases

- Phase 2: Advanced NLP processing
- Phase 3: Real KSL video integration
- Phase 4: User accounts and translation history
- Phase 5: Real-time video translation

## License

MIT
