// lib/auth.ts
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

/** Perform login request */
export async function login(username: string, password: string) {
  const res = await fetch("http://127.0.0.1:8000/api/auth/jwt/login/", {
    method: "POST",
    credentials: "include", // allows refresh token cookie
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = await res.json();

  // Save access token in memory
  setAccessToken(data.access);

  return data;
}
