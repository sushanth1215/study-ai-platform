/**
 * Error handling utilities
 */

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 400
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}

export const handleApiError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error
  }

  if (error instanceof Error) {
    // Handle Supabase errors
    if ('status' in error) {
      const status = (error as any).status
      if (status === 401) {
        return new AppError('AUTH_ERROR', 'Unauthorized. Please log in again.', 401)
      }
      if (status === 403) {
        return new AppError('FORBIDDEN', 'You do not have permission to access this resource.', 403)
      }
      if (status === 404) {
        return new AppError('NOT_FOUND', 'Resource not found.', 404)
      }
      if (status >= 500) {
        return new AppError('SERVER_ERROR', 'Server error. Please try again later.', 500)
      }
    }

    return new AppError('ERROR', error.message)
  }

  return new AppError('ERROR', 'An unexpected error occurred')
}

export const showErrorToast = (error: unknown): void => {
  const message = getErrorMessage(error)
  // TODO: Implement toast notification
  console.error('Error:', message)
}

export const showSuccessToast = (message: string): void => {
  // TODO: Implement toast notification
  console.log('Success:', message)
}
