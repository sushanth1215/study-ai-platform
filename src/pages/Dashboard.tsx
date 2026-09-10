import { useState, useEffect } from 'react'
import { useAuthStore } from '@store/authStore'
import { useLessonStore } from '@store/lessonStore'
import { lessonService } from '@services/lessonService'
import { folderService } from '@services/folderService'
import { FolderPlus, BookOpen, Clock, MoreVertical } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuthStore()
  const { lessons, folders, setLessons, setFolders } = useLessonStore()
  const [loading, setLoading] = useState(true)
  const [recentLessons, setRecentLessons] = useState<any[]>([])

  useEffect(() => {
    if (!user) return

    const fetchData = async () => {
      try {
        const [lessonsData, foldersData] = await Promise.all([
          lessonService.getLessons(user.id),
          folderService.getFolders(user.id),
        ])
        setLessons(lessonsData)
        setFolders(foldersData)
        setRecentLessons(lessonsData.slice(0, 5))
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, setLessons, setFolders])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          {getGreeting()} 👋
        </h1>
        <p className="text-slate-600 dark:text-slate-400">Ready to continue learning?</p>
      </div>

      {/* Create Lesson CTA */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Start Your Learning Journey</h2>
        <p className="text-sky-100 mb-4">Upload any study material and let AI create a complete learning experience</p>
        <button className="px-6 py-3 bg-white text-sky-600 hover:bg-sky-50 rounded-lg font-semibold transition-colors">
          + Create Lesson
        </button>
      </div>

      {/* Continue Learning */}
      {recentLessons.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Continue Learning</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {recentLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-sky-500" size={24} />
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{lesson.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{lesson.source_type}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                    <MoreVertical size={20} className="text-slate-400" />
                  </button>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Progress</span>
                    <span className="text-sm font-bold text-sky-600">{lesson.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-sky-500 h-2 rounded-full transition-all"
                      style={{ width: `${lesson.progress}%` }}
                    ></div>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-colors">
                  Continue Learning
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Folders */}
      {folders.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">My Folders</h2>
            <button className="flex items-center gap-2 px-4 py-2 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg transition-colors">
              <FolderPlus size={20} />
              New Folder
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">📁</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 dark:text-white truncate">{folder.name}</h3>
                    {folder.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{folder.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {lessons.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No lessons yet</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Upload your first study material to get started</p>
          <button className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-colors">
            Upload Now
          </button>
        </div>
      )}
    </div>
  )
}
