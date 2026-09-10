import { supabase } from './supabase'
import { ChatMessage } from '@types/index'

export const chatService = {
  async getChatMessages(lessonId: string, limit: number = 50) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return (data as ChatMessage[]).reverse()
  },

  async sendMessage(message: Omit<ChatMessage, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([{ ...message, created_at: new Date().toISOString() }])
      .select()
      .single()
    
    if (error) throw error
    return data as ChatMessage
  },
}
