// client/src/services/api.ts
// API service for AetherPress client

import type { PromptRequest, PromptResponse } from "../../../shared/types";
import { withRetry } from "../utils/retry";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Custom error messages for different scenarios
const ERROR_MESSAGES = {
  NETWORK:
    "Unable to connect to the server. Please check your internet connection and try again.",
  SERVER: "The server encountered an error. Please try again in a few moments.",
  TIMEOUT: "The request took too long to complete. Please try again.",
  INVALID_PROMPT:
    "Please provide a valid prompt. It should not be empty or contain only spaces.",
  DEFAULT: "Something went wrong. Please try again.",
  PDF_GENERATION: "Failed to generate PDF. Please try again.",
};

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }

  static getErrorMessage(status: number, defaultMessage: string): string {
    switch (status) {
      case 0: // Network error
        return ERROR_MESSAGES.NETWORK;
      case 408: // Timeout
        return ERROR_MESSAGES.TIMEOUT;
      case 400: // Bad request
        return ERROR_MESSAGES.INVALID_PROMPT;
      case 500: // Server error
        return ERROR_MESSAGES.SERVER;
      default:
        return defaultMessage || ERROR_MESSAGES.DEFAULT;
    }
  }
}

export async function createDraft(prompt: string): Promise<PromptResponse> {
  return withRetry(
    async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/draft`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt } as PromptRequest),
          // Add timeout
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });

        if (!response.ok) {
          throw new ApiError(
            response.status,
            ApiError.getErrorMessage(response.status, response.statusText)
          );
        }

        return response.json() as Promise<PromptResponse>;
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }
        if (error instanceof DOMException && error.name === "AbortError") {
          throw new ApiError(408, ERROR_MESSAGES.TIMEOUT);
        }
        // Handle network errors (like when server is down)
        throw new ApiError(0, ERROR_MESSAGES.NETWORK);
      }
    },
    { maxAttempts: 3, delayMs: 1000, backoff: true }
  );
}
