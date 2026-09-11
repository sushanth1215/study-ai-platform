import { AlertCircle, CheckCircle, Info, X } from 'lucide-react'

type AlertType = 'error' | 'success' | 'info' | 'warning'

interface AlertProps {
  type: AlertType
  title: string
  message?: string
  onClose?: () => void
}

const iconMap = {
  error: AlertCircle,
  success: CheckCircle,
  info: Info,
  warning: AlertCircle,
}

const colorMap = {
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-700 dark:text-red-300',
    icon: 'text-red-500',
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-700 dark:text-green-300',
    icon: 'text-green-500',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-300',
    icon: 'text-blue-500',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    text: 'text-yellow-700 dark:text-yellow-300',
    icon: 'text-yellow-500',
  },
}

export default function Alert({
  type,
  title,
  message,
  onClose,
}: AlertProps) {
  const Icon = iconMap[type]
  const colors = colorMap[type]

  return (
    <div className={`p-4 rounded-lg border ${colors.bg} ${colors.border} flex items-start gap-3`}>
      <Icon className={`w-5 h-5 ${colors.icon} flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        <h4 className={`font-semibold ${colors.text}`}>{title}</h4>
        {message && <p className={`text-sm ${colors.text} mt-1`}>{message}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 ${colors.text} hover:opacity-70 transition-opacity`}
        >
          <X size={20} />
        </button>
      )}
    </div>
  )
}
