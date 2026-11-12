import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = { title: "Set a new password" };

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const { email } = await searchParams;
  return (
    <AuthShell
      title="Set a new password"
      subtitle={
        email ? (
          <>
            If <strong className="font-bold text-ink-900">{email}</strong> has an AgroChain account, we&apos;ve emailed it a 4-digit
            code. Enter it below with your new password.
          </>
        ) : (
          "Enter the code we emailed you and choose a new password."
        )
      }
      image="/img/auth/reset.jpg"
      quote={{ text: "Your record is safe with us, and it always belongs to you.", by: "AgroChain" }}
    >
      <ResetPasswordForm email={email} />
    </AuthShell>
  );
}
