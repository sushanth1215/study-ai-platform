import { useState } from 'react'

interface TextUploadProps {
  onTextSubmit: (text: string) => void
  loading?: boolean
}

export default function TextUpload({ onTextSubmit, loading = false }: TextUploadProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onTextSubmit(text)
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your notes, article, or any text content here..."
        rows={8}
        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
        disabled={loading}
      />
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {text.length} characters
        </span>
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="px-6 py-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
        >
          {loading ? 'Processing...' : 'Process Text'}
        </button>
      </div>
    </form>
  )
}
