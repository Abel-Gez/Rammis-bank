// lib/api.ts

let inMemoryAccessToken: string | null = null;

export const API_URL =
  (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000") + "/api";

/**
 * Set access token in memory (called after login or refresh)
 */
export function setAccessToken(token: string | null) {
  inMemoryAccessToken = token;
}

/**
 * Clear the access token (used on logout)
 */
export function clearAccessToken() {
  inMemoryAccessToken = null;
}

/**
 * Refresh the access token using the HttpOnly refresh cookie.
 * Django must return a JSON body with the new `access` token.
 */
async function refreshAccessToken(): Promise<string> {
  const res = await fetch(`${API_URL}/auth/jwt/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // include cookies for refresh
  });

  if (!res.ok) {
    inMemoryAccessToken = null;
    throw new Error("Unable to refresh token");
  }

  const data = await res.json();
  if (!data.access) {
    throw new Error("No access token returned from refresh endpoint");
  }

  inMemoryAccessToken = data.access;
  return data.access;
}

/**
 * Universal API fetch wrapper.
 * Automatically attaches Authorization header and refreshes tokens on 401.
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  let access = inMemoryAccessToken;

  // If no token, try to refresh
  if (!access) {
    try {
      access = await refreshAccessToken();
    } catch {
      throw new Error("Not authenticated — please log in again.");
    }
  }

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    Authorization: `Bearer ${access}`,
  };

  let res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include", // include refresh cookies for safety
  });

  // If token expired or invalid, attempt refresh once
  if (res.status === 401) {
    try {
      access = await refreshAccessToken();
      const retryHeaders = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        Authorization: `Bearer ${access}`,
      };
      res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: retryHeaders,
        credentials: "include",
      });
    } catch {
      inMemoryAccessToken = null;
      throw new Error("Session expired. Please log in again.");
    }
  }

  return res;
}
