// lib/api.ts

let inMemoryAccessToken: string | null = null;

export const API_URL =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") + "/api";

async function refreshAccessToken(): Promise<string> {
  const res = await fetch(`${API_URL}/auth/jwt/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // send refresh cookie
  });

  if (!res.ok) {
    inMemoryAccessToken = null;
    throw new Error("Unable to refresh token");
  }

  const data = await res.json();
  if (!data.access) throw new Error("No access token returned");

  inMemoryAccessToken = data.access;
  return data.access;
}

/**
 * apiFetch: wrapper for fetch that:
 * 1. ensures an access token is available (refresh via cookie if needed)
 * 2. attaches Authorization header
 * 3. retries once after refresh if 401
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  let access = inMemoryAccessToken;

  // If no access token yet, fetch a new one using refresh cookie
  if (!access) {
    try {
      access = await refreshAccessToken();
    } catch {
      throw new Error("Not authenticated");
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
    credentials: "include", // so cookies are sent
  });

  if (res.status === 401) {
    try {
      access = await refreshAccessToken();
      const headers2 = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        Authorization: `Bearer ${access}`,
      };
      res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: headers2,
        credentials: "include",
      });
    } catch {
      inMemoryAccessToken = null;
      throw new Error("Session expired. Please log in again.");
    }
  }

  return res;
}

// Optional: helper to clear memory token (logout)
export function clearAccessToken() {
  inMemoryAccessToken = null;
}
