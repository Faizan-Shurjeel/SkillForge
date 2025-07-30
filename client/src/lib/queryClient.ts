import { QueryClient } from "@tanstack/react-query";

// React Query client instance
export const queryClient = new QueryClient();

// Simple API request helper
export async function apiRequest(
  method: string,
  url: string,
  body?: any,
  headers: Record<string, string> = {}
) {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}
