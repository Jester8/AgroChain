import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/components/auth/signin-form";

export const metadata: Metadata = { title: "Sign in" };

const notices: Record<string, string> = {
  verified: "Email verified. Welcome to AgroChain! Please sign in.",
  reset: "Password updated. Sign in with your new password.",
};

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ next?: string; notice?: string }> }) {
  const { next, notice } = await searchParams;
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your AgroChain account."
      image="/img/auth/signin.jpg"
      quote={{ text: "When the buyer can see the record, the conversation about price changes.", by: "The AgroChain promise" }}
    >
      <SignInForm next={next} notice={notice ? notices[notice] : undefined} />
    </AuthShell>
  );
}
