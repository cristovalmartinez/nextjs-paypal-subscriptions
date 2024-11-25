import { ZodError } from "zod"
import type { ApiError } from "@/types"
import { handleApiResponse } from "@/lib/utils"
import { Logger as logger } from "@/lib/logger"

/**
 * Handles API errors, including Zod validation errors.
 *
 * @param {Error} error - The error object.
 * @param {number} [statusCode=400] - HTTP status code.
 * @param {string} [errorMessage="An error occurred"] - Custom error message.
 * @returns {NextResponse} - The formatted error response.
 */
export function handleApiError(
  error: Error,
  statusCode: number = 400,
  errorMessage: string = "An error occurred"
): any {
  // Initialize the API error object
  let apiError: ApiError
  // Determine the error type based on the error instance
  const errorType = error instanceof ZodError ? "VALIDATION_ERROR" : "API_ERROR"

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      location: err.path.join("."),
      message: `${errorMessage} ${err.message}`,
    }))

    apiError = {
      type: errorType,
      details: formattedErrors,
    }

    statusCode = 422
  } else {
    // Handle general API errors
    apiError = {
      type: errorType,
      details: [{ message: `${errorMessage} ${error.message}` }],
    }
  }

  // Log the error details to the console
  logger.error(`${apiError.type}: ${JSON.stringify(apiError.details, null, 2)}`)

  // Return the formatted error response
  return handleApiResponse(statusCode, false, null, apiError)
}

/**
 * Function to handle errors related to missing environment variables
 * @param subject The subject or context of the error
 * @param variableName The name(s) of the missing environment variable
 * @returns Error object with formatted message
 */
export function handleEnvError(subject: string, variableName: string): Error {
  const errorMessage = `${subject.toUpperCase()}: Environment variable '${variableName}' is missing`
  // Log the error
  logger.error(errorMessage)
  // Include additional logic here, such as sending alerts or notifications
  return new Error(errorMessage)
}
