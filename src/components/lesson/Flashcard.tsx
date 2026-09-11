import { useState } from 'react'
import { RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'

interface FlashcardProps {
  front: string
  back: string
  index: number
  total: number
  onKnow: () => void
  onDontKnow: () => void
  onPrevious: () => void
  onNext: () => void
}

export default function Flashcard({
  front,
  back,
  index,
  total,
  onKnow,
  onDontKnow,
  onPrevious,
  onNext,
}: FlashcardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="text-center text-sm text-slate-600 dark:text-slate-400">
        Card {index + 1} of {total}
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="min-h-64 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 flex items-center justify-center cursor-pointer hover:shadow-lg transition-all"
      >
        <div className="text-center">
          {!flipped ? (
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Question</p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">{front}</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-6">Tap to reveal answer</p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Answer</p>
              <p className="text-xl font-medium text-sky-600 dark:text-sky-400">{back}</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-6">Tap to flip back</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      {flipped && (
        <div className="flex gap-3">
          <button
            onClick={onDontKnow}
            className="flex-1 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            Don't Know
          </button>
          <button
            onClick={onKnow}
            className="flex-1 px-4 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 rounded-lg font-medium hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            Know It
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrevious}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => setFlipped(false)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <RotateCcw size={20} />
        </button>
        <button
          onClick={onNext}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}
