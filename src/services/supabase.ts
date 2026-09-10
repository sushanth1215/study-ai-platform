import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const getAuthSession = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${import.meta.env.VITE_APP_URL}/dashboard`,
    },
  })
  return { data, error }
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}
