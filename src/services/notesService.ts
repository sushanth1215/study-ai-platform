import { supabase } from './supabase'
import { Notes } from '@types/index'

export const notesService = {
  async getNotes(lessonId: string, style?: string) {
    let query = supabase
      .from('notes')
      .select('*')
      .eq('lesson_id', lessonId)
    
    if (style) {
      query = query.eq('style', style)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data as Notes[]
  },

  async getNotesByStyle(lessonId: string, style: 'detailed' | 'professor' | 'short' | 'exam') {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('lesson_id', lessonId)
      .eq('style', style)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return (data as Notes) || null
  },

  async createNotes(notes: Omit<Notes, 'id' | 'generated_at'>) {
    const { data, error } = await supabase
      .from('notes')
      .insert([{ ...notes, generated_at: new Date().toISOString() }])
      .select()
      .single()
    
    if (error) throw error
    return data as Notes
  },

  async updateNotes(notesId: string, updates: Partial<Notes>) {
    const { data, error } = await supabase
      .from('notes')
      .update(updates)
      .eq('id', notesId)
      .select()
      .single()
    
    if (error) throw error
    return data as Notes
  },
}
