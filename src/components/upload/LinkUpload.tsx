import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface LinkUploadProps {
  onLinkSubmit: (link: string, type: string) => void
  loading?: boolean
}

export default function LinkUpload({ onLinkSubmit, loading = false }: LinkUploadProps) {
  const [link, setLink] = useState('')
  const [linkType, setLinkType] = useState('youtube')
  const [copied, setCopied] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (link.trim()) {
      onLinkSubmit(link, linkType)
      setLink('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Link Type
        </label>
        <select
          value={linkType}
          onChange={(e) => setLinkType(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="youtube">YouTube Video</option>
          <option value="website">Website/Blog</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Paste Link
        </label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder={linkType === 'youtube' ? 'https://youtube.com/watch?v=...' : 'https://example.com/...'}
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading || !link.trim()}
        className="w-full px-4 py-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
      >
        {loading ? 'Processing...' : 'Process Link'}
      </button>
    </form>
  )
}
