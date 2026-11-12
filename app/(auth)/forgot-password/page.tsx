import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot your password?"
      subtitle="No problem. Enter the email you signed up with and we'll send you a 4-digit code to set a new one."
      image="/img/auth/reset.jpg"
      quote={{ text: "Your record is safe with us, and it always belongs to you.", by: "AgroChain" }}
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
