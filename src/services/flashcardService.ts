import { supabase } from './supabase'
import { Flashcard, FlashcardDeck } from '@types/index'

export const flashcardService = {
  async getDeck(lessonId: string, mode?: string) {
    let query = supabase
      .from('flashcard_decks')
      .select('*')
      .eq('lesson_id', lessonId)
    
    if (mode) {
      query = query.eq('mode', mode)
    }
    
    const { data, error } = await query.single()
    if (error && error.code !== 'PGRST116') throw error
    return (data as FlashcardDeck) || null
  },

  async getCards(deckId: string) {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('deck_id', deckId)
      .order('last_reviewed', { ascending: false })
    
    if (error) throw error
    return data as Flashcard[]
  },

  async createDeck(deck: Omit<FlashcardDeck, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('flashcard_decks')
      .insert([deck])
      .select()
      .single()
    
    if (error) throw error
    return data as FlashcardDeck
  },

  async updateCardStatus(cardId: string, known: boolean, reviewCount: number) {
    const { data, error } = await supabase
      .from('flashcards')
      .update({
        known,
        review_count: reviewCount,
        last_reviewed: new Date().toISOString(),
      })
      .eq('id', cardId)
      .select()
      .single()
    
    if (error) throw error
    return data as Flashcard
  },
}
