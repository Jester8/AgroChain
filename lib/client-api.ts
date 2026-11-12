/**
 * Browser-side client for the AgroChain API (github.com/Jester8/Agrochain-backend).
 * Auth uses the API's bearer tokens: a short-lived access token plus a rotating
 * refresh token, the same scheme the mobile app uses.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

const ACCESS_KEY = "agc_access";
const REFRESH_KEY = "agc_refresh";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export type SessionUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  isVerified: boolean;
  role: "farmer" | "cooperative" | "buyer" | "aggregator";
  state: string | null;
};

type Tokens = { accessToken: string; refreshToken: string };

/* ------------------------------------------------------------ token store */
// localStorage can throw (private mode, blocked storage), so every access is guarded.

function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function saveTokens({ accessToken, refreshToken }: Tokens) {
  try {
    localStorage.setItem(ACCESS_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
  } catch {
    // Session just won't survive a reload.
  }
}

export function clearTokens() {
  try {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  } catch {
    // ignore
  }
}

export const hasSession = () => !!read(REFRESH_KEY);

/* ---------------------------------------------------------------- request */

function messageFrom(data: unknown, status: number) {
  const m = (data as { message?: string | string[] })?.message;
  if (Array.isArray(m)) return m[0] ?? "Please check your details and try again.";
  if (typeof m === "string" && status !== 401) return m;
  if (status === 401) return typeof m === "string" && m !== "Unauthorized" ? m : "Please sign in to continue.";
  if (status === 429) return "Too many attempts. Please wait a minute and try again.";
  return "Something went wrong. Please try again.";
}

async function request<T>(path: string, init: RequestInit & { json?: unknown; token?: string | null }): Promise<T> {
  if (!API_URL) throw new ApiError("We can't reach AgroChain right now. Please try again shortly.", 0);

  const headers: Record<string, string> = {};
  if (init.json !== undefined) headers["Content-Type"] = "application/json";
  if (init.token) headers.Authorization = `Bearer ${init.token}`;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: init.method ?? (init.json !== undefined ? "POST" : "GET"),
      headers,
      body: init.json !== undefined ? JSON.stringify(init.json) : undefined,
    });
  } catch {
    throw new ApiError("Network error. Check your connection and try again.", 0);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(messageFrom(data, res.status), res.status);
  return data as T;
}

/** Public (unauthenticated) call. Sends a JSON body as POST when one is given. */
export function api<T = unknown>(path: string, body?: unknown) {
  return request<T>(path, { json: body });
}

let refreshing: Promise<boolean> | null = null;

/** Exchanges the refresh token for a new pair. Concurrent callers share one request. */
function refresh(): Promise<boolean> {
  refreshing ??= (async () => {
    const refreshToken = read(REFRESH_KEY);
    if (!refreshToken) return false;
    try {
      saveTokens(await request<Tokens>("/auth/refresh", { json: { refreshToken } }));
      return true;
    } catch {
      clearTokens();
      return false;
    } finally {
      refreshing = null;
    }
  })();
  return refreshing;
}

/** Authenticated call. Refreshes an expired access token once, then retries. */
export async function authApi<T = unknown>(path: string, body?: unknown): Promise<T> {
  if (!hasSession()) throw new ApiError("Please sign in to continue.", 401);
  try {
    return await request<T>(path, { json: body, token: read(ACCESS_KEY) });
  } catch (err) {
    if (!(err instanceof ApiError) || err.status !== 401) throw err;
    if (!(await refresh())) throw new ApiError("Your session has expired. Please sign in again.", 401);
    return request<T>(path, { json: body, token: read(ACCESS_KEY) });
  }
}

export async function signOut() {
  const refreshToken = read(REFRESH_KEY);
  clearTokens();
  if (refreshToken) await api("/auth/logout", { refreshToken }).catch(() => {});
}
