// client/src/services/api.ts
// API service for AetherPress client

import type { PromptRequest, PromptResponse } from "../../../shared/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function createDraft(prompt: string): Promise<PromptResponse> {
  const response = await fetch(`${API_BASE_URL}/api/draft`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt } as PromptRequest),
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `Failed to create draft: ${response.statusText}`
    );
  }

  return response.json() as Promise<PromptResponse>;
}
