import { useAuthStore } from '@store/authStore'
import { usageService } from '@services/usageService'
import { useEffect, useState } from 'react'
import { Moon, Sun, User } from 'lucide-react'

export default function Header() {
  const { user } = useAuthStore()
  const [freeSourcesRemaining, setFreeSourcesRemaining] = useState(2)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (!user) return

    const fetchUsage = async () => {
      try {
        const canCreate = await usageService.canCreateMoreSources(user.id)
        const usage = await usageService.getUsage(user.id)
        if (usage) {
          setFreeSourcesRemaining(Math.max(0, 2 - usage.free_sources_used))
        }
      } catch (error) {
        console.error('Error fetching usage:', error)
      }
    }

    fetchUsage()
  }, [user])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          {freeSourcesRemaining > 0 && (
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-sky-600 dark:text-sky-400">{freeSourcesRemaining}</span> free learning sources remaining
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            {theme === 'light' ? (
              <Moon size={20} className="text-slate-600 dark:text-slate-400" />
            ) : (
              <Sun size={20} className="text-slate-600 dark:text-slate-400" />
            )}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <User size={20} className="text-slate-600 dark:text-slate-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {user?.email?.split('@')[0]}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
