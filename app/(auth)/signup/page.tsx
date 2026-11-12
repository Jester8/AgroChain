import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/auth/signup-form";
import { roles, type Role } from "@/lib/site";

export const metadata: Metadata = { title: "Create your account" };

export default async function SignUpPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const { role } = await searchParams;
  const initialRole = roles.find((r) => r.value === role)?.value as Role | undefined;
  return (
    <AuthShell
      wide
      title="Create your free account"
      subtitle="Join the farmers, cooperatives and buyers building a fairer market. It takes about two minutes."
      image="/img/auth/signup.jpg"
      quote={{ text: "Your harvest, proven. Your price, fair.", by: "Free for farmers. Always." }}
    >
      <SignUpForm initialRole={initialRole} />
    </AuthShell>
  );
}
