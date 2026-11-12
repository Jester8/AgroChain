"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormAlert } from "./fields";
import { CodeInput } from "./code-input";
import { ResendCode } from "./resend-code";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { api, ApiError, saveTokens } from "@/lib/client-api";

const LENGTH = 4;

export function VerifyEmailForm({ email, next }: { email: string; next?: string }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const destination = next?.startsWith("/") && !next.startsWith("//") ? next : "/marketplace?welcome=1";

  async function submit(value = code) {
    if (value.length !== LENGTH || loading) return;
    setError("");
    setInfo("");
    setLoading(true);
    try {
      const tokens = await api<{ accessToken: string; refreshToken: string }>("/auth/confirm", { email, code: value });
      saveTokens(tokens);
      router.push(destination);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not verify that code.");
      setCode("");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="space-y-6"
    >
      {error && <FormAlert>{error}</FormAlert>}
      {info && <FormAlert tone="success">{info}</FormAlert>}
      <CodeInput length={LENGTH} value={code} onChange={setCode} onComplete={submit} autoFocus />
      <Button type="submit" size="lg" className="w-full" disabled={loading || code.length !== LENGTH}>
        {loading ? <Spinner /> : "Verify email"}
      </Button>
      <ResendCode
        email={email}
        purpose="signup"
        onSent={() => {
          setError("");
          setInfo("A new code is on its way.");
        }}
        onError={setError}
      />
    </form>
  );
}
