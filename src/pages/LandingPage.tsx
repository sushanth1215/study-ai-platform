import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { ArrowRight, BookOpen, Brain, Zap } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Upload Anything',
      description: 'PDF, audio, images, websites, YouTube links, and more',
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Understands',
      description: 'Advanced AI analyzes and structures your material',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Learn Everything',
      description: 'Get lessons, notes, quizzes, flashcards, and podcasts',
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">StudyFlow</h1>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Turn Anything You Study Into<br />
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              An AI-Powered Learning Experience
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Upload notes, PDFs, audio, videos, or links. Learn, revise, practice, and test yourself in one place.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-semibold text-lg transition-colors"
          >
            Start Learning Free
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800"
            >
              <div className="text-sky-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-8 border border-slate-200 dark:border-slate-800">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8 text-center">
            How It Works
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              'Upload',
              'AI Processes',
              'Learn',
              'Notes',
              'Quiz',
              'Flashcards',
              'Podcast',
            ].map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="px-4 py-2 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full font-medium whitespace-nowrap">
                  {step}
                </div>
                {index < 6 && <div className="mx-3 text-sky-500">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-sky-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg mb-8 text-sky-100">
            Get 2 free learning sources with full access to all features
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-white text-sky-500 hover:bg-slate-100 rounded-lg font-semibold text-lg transition-colors"
          >
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  )
}
