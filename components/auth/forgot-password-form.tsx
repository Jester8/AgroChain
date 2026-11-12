"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormAlert, TextField } from "./fields";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { api, ApiError } from "@/lib/client-api";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const address = email.trim().toLowerCase();
    try {
      await api("/auth/forgot-password", { email: address });
      router.push(`/reset-password?email=${encodeURIComponent(address)}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {error && <FormAlert>{error}</FormAlert>}
      <TextField label="Email address" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      <Button type="submit" size="lg" className="w-full" disabled={loading || !email}>
        {loading ? <Spinner /> : "Send reset code"}
      </Button>
      <p className="text-center text-sm text-ink-600">
        Remembered it?{" "}
        <Link href="/signin" className="font-bold text-forest-700 hover:underline">Sign in</Link>
      </p>
    </form>
  );
}
