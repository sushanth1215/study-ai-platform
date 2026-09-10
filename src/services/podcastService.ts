import { supabase } from './supabase'
import { Podcast } from '@types/index'

export const podcastService = {
  async getPodcast(lessonId: string) {
    const { data, error } = await supabase
      .from('podcasts')
      .select('*')
      .eq('lesson_id', lessonId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return (data as Podcast) || null
  },

  async createPodcast(podcast: Omit<Podcast, 'id' | 'generated_at'>) {
    const { data, error } = await supabase
      .from('podcasts')
      .insert([{ ...podcast, generated_at: new Date().toISOString() }])
      .select()
      .single()
    
    if (error) throw error
    return data as Podcast
  },

  async uploadAudio(lessonId: string, file: File) {
    const fileName = `${lessonId}/${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage
      .from('podcasts')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      })
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('podcasts')
      .getPublicUrl(fileName)
    
    return publicUrl
  },
}
