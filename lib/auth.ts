// lib/auth.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

let ACCESS_TOKEN: string | null = null;

/** Set in-memory access token (short-lived) */
export function setAccessToken(token: string | null) {
  ACCESS_TOKEN = token;
}

/** Read in-memory access token */
export function getAccessToken(): string | null {
  return ACCESS_TOKEN;
}

/** Clear token (on logout) */
export function clearAccessToken() {
  ACCESS_TOKEN = null;
}

/** Helper to build auth header if access token exists */
function authHeader(): Record<string, string> {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

type LoginResponse = {
  access: string;
  username?: string;
  role?: string;
  [key: string]: any;
};

/**
 * Perform login request.
 * Verifies profile immediately to ensure backend and frontend session are in sync.
 */
export async function login(
  username: string,
  password: string,
  remember?: boolean
): Promise<LoginResponse> {
  const body: any = { username, password };
  if (typeof remember !== "undefined") body.remember = remember;

  const res = await fetch(`${API_BASE}/api/auth/jwt/login/`, {
    method: "POST",
    credentials: "include", // allow refresh token cookie
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let errText = "Login failed";
    try {
      const errJson = await res.json();
      errText = errJson.detail || errJson.error || JSON.stringify(errJson);
    } catch {
      errText = res.statusText || errText;
    }
    throw new Error(errText);
  }

  const data = await res.json();
  if (!data?.access) throw new Error("Login succeeded but no access token returned by server.");

  // Store access token in memory
  setAccessToken(data.access);

  // Immediately verify profile (ensures dashboard knows who’s logged in)
  const profile = await verifySession();

  return { ...data, profile };
}

/**
 * Attempt to verify session using access token.
 * If access is invalid, try refreshing once via cookie.
 */
export async function verifySession(): Promise<any> {
  const profileRes = await fetch(`${API_BASE}/api/auth/me/`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json", ...authHeader() },
  });

  // If token expired, attempt refresh
  if (profileRes.status === 401) {
    const refreshed = await tryRefreshToken();
    if (!refreshed) throw new Error("Session expired, please log in again.");

    // Retry after refresh
    const retryRes = await fetch(`${API_BASE}/api/auth/me/`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json", ...authHeader() },
    });

    if (!retryRes.ok) throw new Error("Failed to verify refreshed session.");
    return await retryRes.json();
  }

  if (!profileRes.ok) {
    const errText = await profileRes.text();
    throw new Error(`Profile fetch failed: ${errText}`);
  }

  return profileRes.json();
}

/** Try to refresh the access token using the HttpOnly cookie */
async function tryRefreshToken(): Promise<boolean> {
  const res = await fetch(`${API_BASE}/api/auth/jwt/refresh/`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) return false;
  const data = await res.json();
  if (!data.access) return false;

  setAccessToken(data.access);
  return true;
}

/** Logout: clear refresh cookie and in-memory access token */
export async function logout(): Promise<void> {
  try {
    await fetch(`${API_BASE}/api/auth/logout/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
    });
  } catch (err) {
    console.warn("Logout request failed:", err);
  } finally {
    clearAccessToken();
  }
}

/** Fetch current user profile using access token (and cookies) */
export async function fetchProfile(): Promise<any> {
  const res = await fetch(`${API_BASE}/api/auth/me/`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(getAccessToken() ? { Authorization: `Bearer ${getAccessToken()}` } : {}),
    },
  });

  if (!res.ok) {
    let errText = "Failed to fetch profile";
    try {
      const j = await res.json();
      errText = j.detail || JSON.stringify(j);
    } catch { }
    throw new Error(errText);
  }

  return res.json();
}
