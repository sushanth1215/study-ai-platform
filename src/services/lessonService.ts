import { supabase } from './supabase'
import { Lesson, LessonSection } from '@types/index'

export const lessonService = {
  async getLessons(userId: string) {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Lesson[]
  },

  async getLessonById(lessonId: string) {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', lessonId)
      .single()
    
    if (error) throw error
    return data as Lesson
  },

  async createLesson(lesson: Omit<Lesson, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('lessons')
      .insert([lesson])
      .select()
      .single()
    
    if (error) throw error
    return data as Lesson
  },

  async updateLesson(lessonId: string, updates: Partial<Lesson>) {
    const { data, error } = await supabase
      .from('lessons')
      .update(updates)
      .eq('id', lessonId)
      .select()
      .single()
    
    if (error) throw error
    return data as Lesson
  },

  async deleteLesson(lessonId: string) {
    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', lessonId)
    
    if (error) throw error
  },

  async getLessonSections(lessonId: string) {
    const { data, error } = await supabase
      .from('lesson_sections')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('order', { ascending: true })
    
    if (error) throw error
    return data as LessonSection[]
  },

  async updateLessonProgress(lessonId: string, userId: string, progress: number) {
    const { data, error } = await supabase
      .from('learning_progress')
      .upsert(
        {
          lesson_id: lessonId,
          user_id: userId,
          progress_percentage: progress,
          last_accessed: new Date().toISOString(),
        },
        { onConflict: 'lesson_id,user_id' }
      )
      .select()
      .single()
    
    if (error) throw error
    return data
  },
}
