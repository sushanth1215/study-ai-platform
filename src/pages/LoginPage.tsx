import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { signInWithGoogle } from '@services/supabase'
import { Chrome } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signInWithGoogle()
      if (error) {
        console.error('Login error:', error)
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">StudyFlow</h1>
          <p className="text-slate-600 dark:text-slate-400">AI-Powered Learning Platform</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Welcome Back</h2>
          
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-colors"
          >
            <Chrome size={20} />
            Continue with Google
          </button>

          <p className="text-center text-slate-600 dark:text-slate-400 mt-6 text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
