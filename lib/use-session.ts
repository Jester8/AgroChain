"use client";

import { useEffect, useState } from "react";
import { authApi, hasSession, signOut as endSession, type SessionUser } from "./client-api";

/** Loads the signed-in user, if any. Returns undefined while loading, null when signed out. */
export function useSession() {
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    // No stored session: skip the network call entirely.
    const load = hasSession() ? authApi<SessionUser>("/auth/me") : Promise.reject();
    load.then((u) => !cancelled && setUser(u)).catch(() => !cancelled && setUser(null));
    return () => {
      cancelled = true;
    };
  }, []);

  async function signOut() {
    await endSession();
    setUser(null);
    window.location.assign("/");
  }

  return { user, signOut };
}
