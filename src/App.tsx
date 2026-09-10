import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAuthStore } from '@store/authStore'
import { supabase } from '@services/supabase'

// Pages
import LandingPage from '@pages/LandingPage'
import LoginPage from '@pages/LoginPage'
import Dashboard from '@pages/Dashboard'
import LessonPage from '@pages/LessonPage'
import CreateLessonPage from '@pages/CreateLessonPage'
import SettingsPage from '@pages/SettingsPage'
import NotFoundPage from '@pages/NotFoundPage'

// Components
import ProtectedRoute from '@components/auth/ProtectedRoute'
import Layout from '@components/layout/Layout'

const queryClient = new QueryClient()

function App() {
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser(session.user)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user)
        } else {
          setUser(null)
        }
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lesson/:lessonId" element={<LessonPage />} />
            <Route path="/create-lesson" element={<CreateLessonPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
