/**
 * Retry Utility for AetherPress
 *
 * This utility provides a robust retry mechanism for handling transient failures
 * in operations like API calls and PDF generation.
 */

/**
 * Configuration options for the retry mechanism
 */
type RetryConfig = {
  /** Maximum number of retry attempts (default: 3) */
  maxAttempts?: number;
  /** Delay between retry attempts in milliseconds (default: 1000) */
  delayMs?: number;
  /** Whether to use exponential backoff for delays (default: true) */
  backoff?: boolean;
};

/**
 * Executes a function with automatic retry capability
 *
 * Features:
 * - Configurable max attempts
 * - Configurable delay between attempts
 * - Optional exponential backoff
 * - Preserves error stack traces
 *
 * @param fn - The async function to execute with retries
 * @param config - Configuration options for the retry mechanism
 * @returns A Promise that resolves with the result of the function
 * @throws The last error encountered after all retry attempts fail
 *
 * @example
 * ```typescript
 * const result = await withRetry(
 *   async () => {
 *     // Your async operation here
 *   },
 *   { maxAttempts: 3, delayMs: 1000, backoff: true }
 * );
 * ```
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = {}
): Promise<T> {
  const { maxAttempts = 3, delayMs = 1000, backoff = true } = config;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      // TypeScript requires us to narrow down the type
      const error = err instanceof Error ? err : new Error(String(err));

      if (attempt === maxAttempts) {
        throw error;
      }

      // Wait before retrying, with exponential backoff if enabled
      const delay = backoff ? delayMs * Math.pow(2, attempt - 1) : delayMs;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // This line should never be reached due to the throw in the loop,
  // but TypeScript needs it for type safety
  throw new Error("Retry loop completed without resolution");
}
