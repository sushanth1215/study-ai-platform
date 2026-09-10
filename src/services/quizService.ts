import { supabase } from './supabase'
import { Quiz, QuizQuestion, QuizAttempt } from '@types/index'

export const quizService = {
  async getQuiz(lessonId: string) {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('lesson_id', lessonId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return (data as Quiz) || null
  },

  async getQuizQuestions(quizId: string) {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('quiz_id', quizId)
      .order('order', { ascending: true })
    
    if (error) throw error
    return data as QuizQuestion[]
  },

  async createQuiz(quiz: Omit<Quiz, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('quizzes')
      .insert([quiz])
      .select()
      .single()
    
    if (error) throw error
    return data as Quiz
  },

  async submitQuizAttempt(attempt: Omit<QuizAttempt, 'id' | 'completed_at'>) {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert([{ ...attempt, completed_at: new Date().toISOString() }])
      .select()
      .single()
    
    if (error) throw error
    return data as QuizAttempt
  },

  async getQuizAttempts(userId: string, quizId: string) {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .eq('quiz_id', quizId)
      .order('completed_at', { ascending: false })
    
    if (error) throw error
    return data as QuizAttempt[]
  },
}
