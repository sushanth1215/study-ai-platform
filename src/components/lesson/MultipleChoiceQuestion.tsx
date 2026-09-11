import { useState } from 'react'
import { Check, X } from 'lucide-react'

interface MultipleChoiceQuestionProps {
  question: string
  options: string[]
  onSubmit: (answer: string) => void
  correctAnswer?: string
  explanation?: string
  submitted?: boolean
  loading?: boolean
}

export default function MultipleChoiceQuestion({
  question,
  options,
  onSubmit,
  correctAnswer,
  explanation,
  submitted = false,
  loading = false,
}: MultipleChoiceQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleSubmit = () => {
    if (selectedAnswer && !submitted) {
      onSubmit(selectedAnswer)
    }
  }

  const isCorrect = selectedAnswer === correctAnswer

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{question}</h3>

      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option
          const isCorrectOption = option === correctAnswer
          const showResult = submitted && isSelected
          const showCorrectOption = submitted && isCorrectOption && !isSelected

          return (
            <button
              key={index}
              onClick={() => !submitted && setSelectedAnswer(option)}
              disabled={submitted}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                isSelected
                  ? showResult
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-sky-500 bg-sky-50 dark:bg-sky-900/20'
                  : showCorrectOption
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-slate-300 dark:border-slate-600 hover:border-sky-400 dark:hover:border-sky-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {showResult && (
                  <div className={isCorrect ? 'text-green-500' : 'text-red-500'}>
                    {isCorrect ? <Check size={24} /> : <X size={24} />}
                  </div>
                )}
                {showCorrectOption && <Check size={24} className="text-green-500" />}
              </div>
            </button>
          )
        })}
      </div>

      {explanation && submitted && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">{explanation}</p>
        </div>
      )}

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer || loading}
          className="w-full px-4 py-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
        >
          {loading ? 'Checking...' : 'Submit Answer'}
        </button>
      )}
    </div>
  )
}
