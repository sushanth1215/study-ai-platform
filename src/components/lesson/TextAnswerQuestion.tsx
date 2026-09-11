import { useState } from 'react'
import { Volume2, Copy, Check } from 'lucide-react'

interface TextAnswerQuestionProps {
  question: string
  onSubmit: (answer: string) => void
  feedback?: string
  submitted?: boolean
  loading?: boolean
}

export default function TextAnswerQuestion({
  question,
  onSubmit,
  feedback,
  submitted = false,
  loading = false,
}: TextAnswerQuestionProps) {
  const [answer, setAnswer] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = () => {
    if (answer.trim() && !submitted) {
      onSubmit(answer)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(answer)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{question}</h3>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here..."
        rows={6}
        disabled={submitted}
        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none disabled:opacity-50"
      />

      {feedback && submitted && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">Feedback:</p>
          <p className="text-sm text-blue-700 dark:text-blue-300">{feedback}</p>
        </div>
      )}

      <div className="flex gap-3">
        {submitted && (
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
            {copied ? 'Copied' : 'Copy Answer'}
          </button>
        )}
        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={!answer.trim() || loading}
            className="flex-1 px-4 py-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            {loading ? 'Evaluating...' : 'Submit Answer'}
          </button>
        )}
      </div>
    </div>
  )
}
