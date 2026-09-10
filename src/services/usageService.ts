import { supabase } from './supabase'
import { UsageData } from '@types/index'

export const usageService = {
  async getUsage(userId: string) {
    const { data, error } = await supabase
      .from('usage')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return (data as UsageData) || null
  },

  async initializeUsage(userId: string) {
    const { data, error } = await supabase
      .from('usage')
      .insert([{
        user_id: userId,
        free_sources_used: 0,
        subscription_status: 'free',
        total_sources_created: 0,
        last_updated: new Date().toISOString(),
      }])
      .select()
      .single()
    
    if (error) throw error
    return data as UsageData
  },

  async incrementSourceUsage(userId: string) {
    const current = await this.getUsage(userId)
    if (!current) {
      await this.initializeUsage(userId)
    }
    
    const { data, error } = await supabase
      .from('usage')
      .update({
        free_sources_used: (current?.free_sources_used || 0) + 1,
        total_sources_created: (current?.total_sources_created || 0) + 1,
        last_updated: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data as UsageData
  },

  async canCreateMoreSources(userId: string): Promise<boolean> {
    const usage = await this.getUsage(userId)
    if (!usage) return true // First time user
    return usage.free_sources_used < 2 || usage.subscription_status !== 'free'
  },
}
