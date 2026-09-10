/**
 * Storage utilities
 */

const STORAGE_PREFIX = 'studyflow_'

export const setItem = (key: string, value: any): void => {
  try {
    localStorage.setItem(
      `${STORAGE_PREFIX}${key}`,
      JSON.stringify(value)
    )
  } catch (error) {
    console.error('Storage error:', error)
  }
}

export const getItem = (key: string): any => {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error('Storage error:', error)
    return null
  }
}

export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`)
  } catch (error) {
    console.error('Storage error:', error)
  }
}

export const clearStorage = (): void => {
  try {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith(STORAGE_PREFIX)
    )
    keys.forEach((key) => localStorage.removeItem(key))
  } catch (error) {
    console.error('Storage error:', error)
  }
}

export const setUserPreferences = (preferences: any): void => {
  setItem('user_preferences', preferences)
}

export const getUserPreferences = (): any => {
  return getItem('user_preferences') || {}
}

export const setTheme = (theme: 'light' | 'dark'): void => {
  setItem('theme', theme)
}

export const getTheme = (): 'light' | 'dark' => {
  return getItem('theme') || 'light'
}
