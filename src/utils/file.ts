/**
 * File handling utilities
 */

export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || ''
}

export const getFileType = (file: File): string => {
  const ext = getFileExtension(file.name).toLowerCase()

  if (['pdf'].includes(ext)) return 'pdf'
  if (['mp3', 'wav', 'm4a', 'flac', 'ogg'].includes(ext)) return 'audio'
  if (['mp4', 'webm', 'mov', 'avi'].includes(ext)) return 'video'
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image'
  if (['doc', 'docx', 'txt', 'rtf'].includes(ext)) return 'document'
  if (['xls', 'xlsx', 'csv'].includes(ext)) return 'spreadsheet'
  if (['ppt', 'pptx'].includes(ext)) return 'presentation'

  return 'unknown'
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

export const isValidPdf = (file: File): boolean => {
  return file.type === 'application/pdf' && getFileExtension(file.name).toLowerCase() === 'pdf'
}

export const isValidAudio = (file: File): boolean => {
  const validTypes = [
    'audio/mpeg',
    'audio/wav',
    'audio/m4a',
    'audio/flac',
    'audio/ogg',
  ]
  return validTypes.includes(file.type)
}

export const isValidImage = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  return validTypes.includes(file.type)
}

export const readFileAsDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsText(file)
  })
}
