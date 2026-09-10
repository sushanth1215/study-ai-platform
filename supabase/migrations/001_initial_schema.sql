-- Users and Authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Folders for organizing lessons
CREATE TABLE IF NOT EXISTS folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lessons/Learning materials
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  source_type VARCHAR(50) NOT NULL, -- pdf, audio, video, youtube, website, image, text
  source_url TEXT,
  content TEXT, -- Original content extracted
  learning_path JSONB, -- Structured learning path
  progress INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Individual lesson sections/topics
CREATE TABLE IF NOT EXISTS lesson_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  "order" INT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  estimated_time INT, -- in minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notes with different styles
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  style VARCHAR(50) NOT NULL, -- detailed, professor, short, exam
  content TEXT NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quizzes
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz questions
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- multiple_choice, true_false, fill_blank, short_answer, long_answer, code_write, code_debug, predict_output, code_complete, arrange_code
  question TEXT NOT NULL,
  options JSONB, -- Array of options for multiple choice
  correct_answer TEXT,
  explanation TEXT,
  code_context TEXT,
  "order" INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz attempts/results
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score INT,
  total_questions INT,
  answers JSONB, -- Array of {question_id, answer, correct}
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Flashcard decks
CREATE TABLE IF NOT EXISTS flashcard_decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  mode VARCHAR(50) NOT NULL, -- detailed, revision, exam
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Individual flashcards
CREATE TABLE IF NOT EXISTS flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID NOT NULL REFERENCES flashcard_decks(id) ON DELETE CASCADE,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  known BOOLEAN DEFAULT FALSE,
  review_count INT DEFAULT 0,
  last_reviewed TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Podcasts
CREATE TABLE IF NOT EXISTS podcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  audio_url TEXT NOT NULL,
  duration INT, -- in seconds
  transcript TEXT,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learning progress tracking
CREATE TABLE IF NOT EXISTS learning_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  progress_percentage INT DEFAULT 0,
  sections_completed INT DEFAULT 0,
  quiz_best_score INT,
  flashcard_mastery INT,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Chat messages for lesson Q&A
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL, -- user, assistant
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usage tracking for free tier
CREATE TABLE IF NOT EXISTS usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  free_sources_used INT DEFAULT 0,
  subscription_status VARCHAR(50) DEFAULT 'free', -- free, premium, pro
  total_sources_created INT DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_folders_user_id ON folders(user_id);
CREATE INDEX idx_lessons_user_id ON lessons(user_id);
CREATE INDEX idx_lessons_folder_id ON lessons(folder_id);
CREATE INDEX idx_lesson_sections_lesson_id ON lesson_sections(lesson_id);
CREATE INDEX idx_notes_lesson_id ON notes(lesson_id);
CREATE INDEX idx_quizzes_lesson_id ON quizzes(lesson_id);
CREATE INDEX idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);
CREATE INDEX idx_flashcard_decks_lesson_id ON flashcard_decks(lesson_id);
CREATE INDEX idx_flashcards_deck_id ON flashcards(deck_id);
CREATE INDEX idx_podcasts_lesson_id ON podcasts(lesson_id);
CREATE INDEX idx_learning_progress_user_id ON learning_progress(user_id);
CREATE INDEX idx_chat_messages_lesson_id ON chat_messages(lesson_id);
CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);

-- Row Level Security Policies
-- Users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Folders table
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own folders" ON folders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create folders" ON folders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own folders" ON folders
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own folders" ON folders
  FOR DELETE USING (auth.uid() = user_id);

-- Lessons table
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own lessons" ON lessons
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create lessons" ON lessons
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own lessons" ON lessons
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own lessons" ON lessons
  FOR DELETE USING (auth.uid() = user_id);

-- Lesson sections table
ALTER TABLE lesson_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read lesson sections of their lessons" ON lesson_sections
  FOR SELECT USING (
    lesson_id IN (
      SELECT id FROM lessons WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create lesson sections" ON lesson_sections
  FOR INSERT WITH CHECK (
    lesson_id IN (
      SELECT id FROM lessons WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update lesson sections" ON lesson_sections
  FOR UPDATE USING (
    lesson_id IN (
      SELECT id FROM lessons WHERE user_id = auth.uid()
    )
  );

-- Notes table
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read notes of their lessons" ON notes
  FOR SELECT USING (
    lesson_id IN (
      SELECT id FROM lessons WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create notes" ON notes
  FOR INSERT WITH CHECK (
    lesson_id IN (
      SELECT id FROM lessons WHERE user_id = auth.uid()
    )
  );

-- Quizzes table
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read quizzes of their lessons" ON quizzes
  FOR SELECT USING (
    lesson_id IN (
      SELECT id FROM lessons WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create quizzes" ON quizzes
  FOR INSERT WITH CHECK (
    lesson_id IN (
      SELECT id FROM lessons WHERE user_id = auth.uid()
    )
  );

-- Quiz questions table
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read quiz questions" ON quiz_questions
  FOR SELECT USING (
    quiz_id IN (
      SELECT id FROM quizzes WHERE lesson_id IN (
        SELECT id FROM lessons WHERE user_id = auth.uid()
      )
    )
  );

-- Quiz attempts table
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own quiz attempts" ON quiz_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create quiz attempts" ON quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Flashcard decks table
ALTER TABLE flashcard_decks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read flashcard decks of their lessons" ON flashcard_decks
  FOR SELECT USING (
    lesson_id IN (
      SELECT id FROM lessons WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create flashcard decks" ON flashcard_decks
  FOR INSERT WITH CHECK (
    lesson_id IN (
      SELECT id FROM lessons WHERE user_id = auth.uid()
    )
  );

-- Flashcards table
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read flashcards" ON flashcards
  FOR SELECT USING (
    deck_id IN (
      SELECT id FROM flashcard_decks WHERE lesson_id IN (
        SELECT id FROM lessons WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can update flashcard status" ON flashcards
  FOR UPDATE USING (
    deck_id IN (
      SELECT id FROM flashcard_decks WHERE lesson_id IN (
        SELECT id FROM lessons WHERE user_id = auth.uid()
      )
    )
  );

-- Podcasts table
ALTER TABLE podcasts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read podcasts of their lessons" ON podcasts
  FOR SELECT USING (
    lesson_id IN (
      SELECT id FROM lessons WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create podcasts" ON podcasts
  FOR INSERT WITH CHECK (
    lesson_id IN (
      SELECT id FROM lessons WHERE user_id = auth.uid()
    )
  );

-- Learning progress table
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own progress" ON learning_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create progress records" ON learning_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON learning_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Chat messages table
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read chat messages of their lessons" ON chat_messages
  FOR SELECT USING (
    lesson_id IN (
      SELECT id FROM lessons WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create chat messages" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Usage table
ALTER TABLE usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own usage" ON usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own usage" ON usage
  FOR UPDATE USING (auth.uid() = user_id);
