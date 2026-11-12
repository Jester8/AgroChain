"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormAlert, PasswordField } from "./fields";
import { CodeInput } from "./code-input";
import { ResendCode } from "./resend-code";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { api, ApiError } from "@/lib/client-api";

const LENGTH = 4;
const passwordOk = (p: string) => /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(p);

export function ResetPasswordForm({ email }: { email?: string }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  // Kept once the code is verified: codes are single-use, so a retry (e.g. after a
  // network blip) must reuse this token rather than re-submit the code.
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  if (!email) {
    return (
      <FormAlert>
        We need your email to reset your password.{" "}
        <Link href="/forgot-password" className="font-bold underline">Start again</Link>.
      </FormAlert>
    );
  }

  const mismatch = confirm.length > 0 && confirm !== password;
  const ready = (resetToken || code.length === LENGTH) && passwordOk(password) && confirm === password;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready) return;
    setError("");
    setInfo("");
    setLoading(true);
    try {
      let token = resetToken;
      if (!token) {
        token = (await api<{ resetToken: string }>("/auth/verify-reset-otp", { email, code })).resetToken;
        setResetToken(token);
      }
      await api("/auth/reset-password", { resetToken: token, newPassword: password });
      router.push("/signin?notice=reset");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not reset your password.");
      if (!resetToken) setCode("");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {error && <FormAlert>{error}</FormAlert>}
      {info && <FormAlert tone="success">{info}</FormAlert>}
      {!resetToken && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-ink-700">Code from your email</p>
          <CodeInput length={LENGTH} value={code} onChange={setCode} autoFocus />
          <ResendCode
            email={email}
            purpose="password-reset"
            onSent={() => {
              setError("");
              setInfo("A new code is on its way.");
            }}
            onError={setError}
          />
        </div>
      )}
      <PasswordField
        label="New password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showStrength
        hint="At least 8 characters, with a letter and a number."
      />
      <PasswordField
        label="Confirm new password"
        autoComplete="new-password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={mismatch ? "Passwords don't match." : undefined}
      />
      <Button type="submit" size="lg" className="w-full" disabled={loading || !ready}>
        {loading ? <Spinner /> : "Update password"}
      </Button>
    </form>
  );
}
