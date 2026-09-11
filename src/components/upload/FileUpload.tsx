import { useState } from 'react'
import { Upload, X, Loader } from 'lucide-react'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSize?: number
  loading?: boolean
}

export default function FileUpload({
  onFileSelect,
  accept = '.pdf',
  maxSize = 50,
  loading = false,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const validateFile = (file: File): boolean => {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return false
    }
    return true
  }

  const handleDrop = (e: React.DragEvent) => {
    handleDrag(e)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (validateFile(file)) {
        setError(null)
        onFileSelect(file)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (validateFile(file)) {
        setError(null)
        onFileSelect(file)
      }
    }
  }

  return (
    <div>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20'
            : 'border-slate-300 dark:border-slate-600 hover:border-sky-400'
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          disabled={loading}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className="cursor-pointer">
          {loading ? (
            <>
              <Loader className="w-12 h-12 text-sky-500 mx-auto mb-3 animate-spin" />
              <p className="text-slate-600 dark:text-slate-400">Processing...</p>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 text-sky-500 mx-auto mb-3" />
              <p className="text-lg font-medium text-slate-900 dark:text-white mb-1">
                Drag and drop your file here
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                or click to browse
              </p>
            </>
          )}
        </label>
      </div>
      {error && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
          <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}
