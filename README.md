# StudyFlow - AI-Powered Learning Platform

An intelligent learning platform that transforms any study material into a personalized learning experience with AI-generated lessons, notes, quizzes, flashcards, and educational podcasts.

## Features

- 📚 **Multiple Upload Formats**: PDF, audio, video, YouTube links, websites, handwritten notes, images, and text
- 🤖 **AI-Powered Content Understanding**: Automatically understands and structures your learning material
- 📖 **Smart Learning Paths**: AI generates logical, concept-based learning sequences
- 📝 **Multiple Note Styles**: Detailed, Professor, Short, and Exam notes
- 🧠 **Adaptive Quizzes**: Multiple question types with AI-powered evaluation
- 🎴 **Smart Flashcards**: Three flashcard modes with progress tracking
- 🎙️ **AI Educational Podcast**: Conversational AI-generated audio lessons
- 💬 **Lesson Chat**: Ask AI questions about your material
- 📊 **Progress Tracking**: Detailed progress at multiple levels
- 🗂️ **Folder Organization**: Organize lessons into unlimited folders
- 🌙 **Light/Dark Mode**: Beautiful, responsive UI in both themes
- 🔐 **Secure Authentication**: Google Sign-In via Supabase
- 💰 **Free Tier**: 2 free learning sources with full features

## Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: OpenAI API, Anthropic Claude
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Routing**: React Router
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Google OAuth credentials
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sushanth1215/study-ai-platform.git
cd study-ai-platform
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` from `.env.example`:
```bash
cp .env.example .env.local
```

4. Fill in your environment variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_OPENAI_API_KEY=your_openai_key
```

5. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/        # Reusable React components
├── pages/            # Page components
├── services/         # API services and external integrations
├── store/            # Zustand state management
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── styles/           # Global styles
├── App.tsx           # Main App component
└── main.tsx          # Entry point
```

## Development

### Running the App
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## Database Schema

Key tables:
- `users` - User profiles
- `folders` - User folders
- `lessons` - Learning materials
- `lesson_sections` - Individual lesson topics
- `notes` - Generated notes
- `quizzes` - Quiz sessions
- `quiz_questions` - Individual quiz questions
- `flashcard_decks` - Flashcard collections
- `flashcards` - Individual flashcards
- `usage` - Track free source usage

## Security

- All user data is protected with Supabase Row Level Security (RLS)
- File uploads are stored securely and require authentication
- API keys are server-side only
- No secrets are exposed in client code

## Pricing

- **Free Tier**: 2 free learning sources with full features
- **Paid Tiers**: Coming soon (subscription model)

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please read CONTRIBUTING.md for guidelines.

## Support

For issues and questions, please open an issue on GitHub.
