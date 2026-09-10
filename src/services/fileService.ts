import { supabase } from './supabase'

export const fileService = {
  async uploadFile(bucket: string, file: File, path: string) {
    const fileName = `${path}/${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      })
    
    if (error) throw error
    return fileName
  },

  async getFileUrl(bucket: string, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    
    return data.publicUrl
  },

  async deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])
    
    if (error) throw error
  },

  async getSignedUrl(bucket: string, path: string, expiresIn: number = 3600) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn)
    
    if (error) throw error
    return data.signedUrl
  },
}
