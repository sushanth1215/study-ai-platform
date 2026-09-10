// User Types
export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  created_at: string
}

// Folder Types
export interface Folder {
  id: string
  user_id: string
  name: string
  description?: string
  created_at: string
  updated_at: string
}

// Lesson Types
export interface Lesson {
  id: string
  user_id: string
  folder_id?: string
  title: string
  description?: string
  source_type: 'pdf' | 'audio' | 'video' | 'youtube' | 'website' | 'image' | 'text'
  source_url?: string
  content?: string
  learning_path?: LessonSection[]
  progress: number
  created_at: string
  updated_at: string
}

// Lesson Section / Topic
export interface LessonSection {
  id: string
  lesson_id: string
  title: string
  description: string
  content: string
  order: number
  completed: boolean
  estimated_time?: number
}

// Notes Types
export interface Notes {
  id: string
  lesson_id: string
  style: 'detailed' | 'professor' | 'short' | 'exam'
  content: string
  generated_at: string
}

// Quiz Types
export interface Quiz {
  id: string
  lesson_id: string
  title: string
  questions: QuizQuestion[]
  created_at: string
}

export interface QuizQuestion {
  id: string
  quiz_id: string
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'short_answer' | 'long_answer' | 'code_write' | 'code_debug' | 'predict_output' | 'code_complete' | 'arrange_code'
  question: string
  options?: string[]
  correct_answer?: string
  explanation?: string
  code_context?: string
  order: number
}

export interface QuizAttempt {
  id: string
  quiz_id: string
  user_id: string
  score: number
  total_questions: number
  answers: { question_id: string; answer: string; correct: boolean }[]
  completed_at: string
}

// Flashcard Types
export interface FlashcardDeck {
  id: string
  lesson_id: string
  mode: 'detailed' | 'revision' | 'exam'
  cards: Flashcard[]
  created_at: string
}

export interface Flashcard {
  id: string
  deck_id: string
  front: string
  back: string
  known: boolean
  review_count: number
  last_reviewed?: string
}

// Podcast Types
export interface Podcast {
  id: string
  lesson_id: string
  title: string
  audio_url: string
  duration: number
  transcript?: string
  generated_at: string
}

// Progress Types
export interface LearningProgress {
  id: string
  user_id: string
  lesson_id: string
  progress_percentage: number
  sections_completed: number
  quiz_best_score?: number
  flashcard_mastery?: number
  last_accessed: string
}

// Usage Types
export interface UsageData {
  id: string
  user_id: string
  free_sources_used: number
  subscription_status: 'free' | 'premium' | 'pro'
  total_sources_created: number
  last_updated: string
}

// Chat Types
export interface ChatMessage {
  id: string
  lesson_id: string
  user_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}
