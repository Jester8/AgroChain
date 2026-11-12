"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { FormAlert, PasswordField, TextField } from "./fields";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { api, ApiError, saveTokens, type SessionUser } from "@/lib/client-api";

type LoginResponse = { user: SessionUser; accessToken: string; refreshToken: string };

export function SignInForm({ next, notice }: { next?: string; notice?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Only allow same-site redirects.
  const destination = next?.startsWith("/") && !next.startsWith("//") ? next : "/marketplace";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const address = email.trim().toLowerCase();
    try {
      const { accessToken, refreshToken } = await api<LoginResponse>("/auth/login", { email: address, password });
      saveTokens({ accessToken, refreshToken });
      router.push(destination);
    } catch (err) {
      if (err instanceof ApiError && err.status === 403) {
        // Correct password but email not verified yet: send a fresh code and go verify.
        await api("/auth/resend-otp", { email: address, purpose: "signup" }).catch(() => {});
        router.push(`/verify-email?email=${encodeURIComponent(address)}&next=${encodeURIComponent(destination)}`);
        return;
      }
      setError(err instanceof ApiError ? err.message : "Could not sign you in.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {notice && <FormAlert tone="success">{notice}</FormAlert>}
      {error && <FormAlert>{error}</FormAlert>}
      <TextField
        label="Email address"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      <PasswordField
        label="Password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        action={
          <Link href="/forgot-password" className="text-sm font-semibold text-forest-700 hover:underline">
            Forgot password?
          </Link>
        }
      />
      <Button type="submit" size="lg" className="w-full" disabled={loading || !email || !password}>
        {loading ? <Spinner /> : <>Sign in <ArrowRight className="size-5" /></>}
      </Button>
      <p className="text-center text-sm text-ink-600">
        New to AgroChain?{" "}
        <Link href="/signup" className="font-bold text-forest-700 hover:underline">Create a free account</Link>
      </p>
    </form>
  );
}
