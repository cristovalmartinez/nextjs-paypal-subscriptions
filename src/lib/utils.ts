import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextResponse } from "next/server"
import type { ApiResponse, ApiError } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatErrorMessage = (error: any) => {
  let errorMsg = error.message || "Something went wrong!. Please try again"
  if ("errors" in error && Array.isArray(error["errors"])) {
    const obj = error.errors[0]
    if (obj.errorType === "Unauthorized") {
      errorMsg = "You are not authorized to access this."
    }
    if (obj.errorType === "DynamoDB:ConditionalCheckFailedException") {
      errorMsg = "Duplication error. Please add unique facilities."
    } else {
      errorMsg = obj.message
    }
  }

  if (!window.navigator.onLine || error?.message?.includes("NetworkOffline")) {
    errorMsg = "Please check your internet connection first"
  }

  if (error instanceof Error) {
    errorMsg = error.message
  }

  return errorMsg
}

/**
 * Function to handle a standardized API response.
 *
 * @param {number} statusCode - The HTTP status code of the response.
 * @param {boolean} success - Indicates whether the request was successful.
 * @param {T | null} data - Optional. The payload data to be included in the response.
 * @param {ApiError | null} error - Optional. An object representing the error information if the request failed.
 * @returns {ApiResponse<T>} - A standardized API response object.
 */
export function handleApiResponse<T>(
  statusCode: number,
  success: boolean,
  data: T | null,
  error: ApiError | null
): ApiResponse<T> {
  return NextResponse.json(
    {
      status: statusCode,
      success,
      data,
      error,
    },
    { status: statusCode }
  ) as unknown as ApiResponse<T>
}
