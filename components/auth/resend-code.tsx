"use client";

import { useEffect, useState } from "react";
import { api, ApiError } from "@/lib/client-api";

/** "Send a new code" link with a cooldown that matches the API's rate limit. */
export function ResendCode({
  email,
  purpose,
  onSent,
  onError,
}: {
  email: string;
  purpose: "signup" | "password-reset";
  onSent: () => void;
  onError: (message: string) => void;
}) {
  const [cooldown, setCooldown] = useState(30);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function resend() {
    try {
      await api("/auth/resend-otp", { email, purpose });
      setCooldown(60);
      onSent();
    } catch (err) {
      onError(err instanceof ApiError ? err.message : "Could not send a new code.");
    }
  }

  return (
    <p className="text-center text-sm text-ink-600">
      Didn&apos;t get it? Check spam, or{" "}
      {cooldown > 0 ? (
        <span className="font-semibold text-ink-400">resend in {cooldown}s</span>
      ) : (
        <button type="button" onClick={resend} className="font-bold text-forest-700 hover:underline">
          send a new code
        </button>
      )}
    </p>
  );
}
