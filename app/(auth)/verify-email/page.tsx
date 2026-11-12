import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { VerifyEmailForm } from "@/components/auth/verify-email-form";

export const metadata: Metadata = { title: "Verify your email" };

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ email?: string; next?: string }> }) {
  const { email, next } = await searchParams;
  if (!email) redirect("/signin");
  return (
    <AuthShell
      title="Check your email"
      subtitle={
        <>
          We sent a 4-digit code to <strong className="font-bold text-ink-900">{email}</strong>. Enter it below to verify your account.
          The code expires in 10 minutes.
        </>
      }
      image="/img/auth/reset.jpg"
      quote={{ text: "One verified record, trusted from the farm gate to the market.", by: "AgroChain" }}
    >
      <VerifyEmailForm email={email} next={next} />
    </AuthShell>
  );
}
