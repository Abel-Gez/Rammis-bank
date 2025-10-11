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
  const isFormDataBody = typeof FormData !== "undefined" && options.body instanceof FormData;

  const buildHeaders = (token: string | null) => {
    const headers = new Headers(options.headers as HeadersInit | undefined);

    if (isFormDataBody) {
      if (headers.has("Content-Type")) {
        headers.delete("Content-Type");
      }
    } else if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  };

  // If no token, try to refresh
  if (!access) {
    try {
      access = await refreshAccessToken();
    } catch {
      throw new Error("Not authenticated — please log in again.");
    }
  }

  let res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: buildHeaders(access),
    credentials: "include", // include refresh cookies for safety
  });

  // If token expired or invalid, attempt refresh once
  if (res.status === 401) {
    try {
      access = await refreshAccessToken();
      res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: buildHeaders(access),
        credentials: "include",
      });
    } catch {
      inMemoryAccessToken = null;
      throw new Error("Session expired. Please log in again.");
    }
  }

  return res;
}
