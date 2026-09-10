import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { LayoutDashboard, BookOpen, FolderOpen, Plus, Settings, LogOut } from 'lucide-react'

const menuItems = [
  { label: 'Home', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'My Lessons', icon: BookOpen, href: '/lessons' },
  { label: 'Folders', icon: FolderOpen, href: '/folders' },
  { label: 'Create Lesson', icon: Plus, href: '/create-lesson', highlight: true },
]

const bottomItems = [
  { label: 'Settings', icon: Settings, href: '/settings' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuthStore()

  const handleLogout = async () => {
    logout()
    navigate('/')
  }

  return (
    <div className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">StudyFlow</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
              } ${
                item.highlight ? 'bg-sky-500 text-white hover:bg-sky-600' : ''
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Bottom Items */}
      <div className="px-4 py-4 space-y-2 border-t border-slate-200 dark:border-slate-700">
        {bottomItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          )
        })}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
