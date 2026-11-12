"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Building2, ShoppingBasket, Sprout, Truck } from "lucide-react";
import { FormAlert, PasswordField, PhoneField, SelectField, TextField, toE164 } from "./fields";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { api, ApiError } from "@/lib/client-api";
import { nigerianStates, roles, type Role } from "@/lib/site";
import { cn } from "@/lib/format";

const roleIcons: Record<Role, React.ComponentType<{ className?: string }>> = {
  farmer: Sprout,
  cooperative: Building2,
  buyer: ShoppingBasket,
  aggregator: Truck,
};

const commonCrops = [
  "Cassava", "Yam", "Maize", "Rice", "Sorghum", "Millet", "Cowpea (beans)", "Soybeans", "Groundnut",
  "Sesame", "Tomatoes", "Pepper", "Onions", "Ginger", "Cocoa", "Oil palm", "Plantain", "Cashew", "Irish potato",
];

type Field =
  | "firstName" | "lastName" | "email" | "phone" | "dateOfBirth" | "password"
  | "state" | "lga" | "farmName" | "farmSize" | "primaryCrop" | "terms";
type Errors = Partial<Record<Field, string>>;

const today = new Date().toISOString().slice(0, 10);

export function SignUpForm({ initialRole }: { initialRole?: Role }) {
  const router = useRouter();
  const [role, setRole] = useState<Role>(initialRole ?? "farmer");
  const [v, setV] = useState({
    firstName: "", lastName: "", email: "", phone: "", dateOfBirth: "", password: "",
    state: "", lga: "", farmName: "", farmSize: "", primaryCrop: "", terms: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const hasFarm = role === "farmer" || role === "cooperative";

  /** Updates a field and clears its error as soon as the person edits it. */
  function set<K extends keyof typeof v>(key: K, value: (typeof v)[K]) {
    setV((s) => ({ ...s, [key]: value }));
    if (errors[key as Field]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!v.firstName.trim()) e.firstName = "Enter your first name.";
    if (!v.lastName.trim()) e.lastName = "Enter your last name.";
    if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = "Enter a valid email address.";
    if (!toE164(v.phone)) e.phone = "Enter a valid Nigerian number, e.g. 0803 123 4567.";
    if (!v.dateOfBirth || v.dateOfBirth >= today) e.dateOfBirth = "Enter your date of birth.";
    if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v.password)) e.password = "Use at least 8 characters, with a letter and a number.";
    if (!v.state) e.state = "Choose your state.";
    if (hasFarm) {
      if (!v.lga.trim()) e.lga = "Enter your LGA.";
      if (!v.farmName.trim()) e.farmName = role === "cooperative" ? "Enter your cooperative's name." : "Enter your farm's name.";
      if (!(Number(v.farmSize) > 0)) e.farmSize = "Enter your farm size in hectares.";
      if (!v.primaryCrop.trim()) e.primaryCrop = "Enter your main crop.";
    }
    if (!v.terms) e.terms = "Please accept the terms to continue.";
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setFormError("");
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    const email = v.email.trim().toLowerCase();
    // The API rejects unknown fields, so only send farm details for farm roles.
    const payload = {
      role,
      firstName: v.firstName.trim(),
      lastName: v.lastName.trim(),
      email,
      phone: toE164(v.phone),
      dateOfBirth: v.dateOfBirth,
      password: v.password,
      state: v.state,
      ...(v.lga.trim() && { lga: v.lga.trim() }),
      ...(hasFarm && {
        farmName: v.farmName.trim(),
        farmSizeHectares: Number(v.farmSize),
        primaryCrop: v.primaryCrop.trim(),
      }),
    };

    setLoading(true);
    try {
      await api("/auth/signup", payload);
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setErrors({ email: "This email is already registered." });
        setFormError("An account with this email already exists. Try signing in instead.");
      } else {
        setFormError(err instanceof ApiError ? err.message : "Could not create your account.");
      }
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {formError && <FormAlert>{formError}</FormAlert>}

      <fieldset>
        <legend className="mb-2.5 text-sm font-semibold text-ink-700">I am joining as a…</legend>
        <div className="grid grid-cols-2 gap-2.5">
          {roles.map((r) => {
            const Icon = roleIcons[r.value];
            const active = role === r.value;
            return (
              <label
                key={r.value}
                className={cn(
                  "relative flex cursor-pointer flex-col rounded-2xl border bg-white p-4 transition",
                  active ? "border-forest-700 ring-4 ring-forest-700/10" : "border-ink-900/10 hover:border-ink-900/25",
                )}
              >
                <input type="radio" name="role" value={r.value} checked={active} onChange={() => setRole(r.value)} className="sr-only" />
                <Icon className={cn("size-5", active ? "text-forest-700" : "text-ink-400")} />
                <span className="mt-3 font-bold text-ink-900">{r.label}</span>
                <span className="mt-0.5 text-xs leading-snug text-ink-500">{r.hint}</span>
                {active && <span className="absolute right-3 top-3 size-2.5 rounded-full bg-gold-500" />}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="First name" autoComplete="given-name" value={v.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="Chiamaka" error={errors.firstName} />
        <TextField label="Last name" autoComplete="family-name" value={v.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Okafor" error={errors.lastName} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Email address" type="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" error={errors.email} />
        <PhoneField label="Phone number" value={v.phone} onChange={(val) => set("phone", val)} error={errors.phone} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Date of birth" type="date" autoComplete="bday" max={today} value={v.dateOfBirth} onChange={(e) => set("dateOfBirth", e.target.value)} error={errors.dateOfBirth} />
        <SelectField
          label={hasFarm ? "State your farm is in" : "State you operate in"}
          placeholder="Select a state"
          options={nigerianStates}
          value={v.state}
          onChange={(e) => set("state", e.target.value)}
          error={errors.state}
        />
      </div>

      <AnimatePresence initial={false}>
        {hasFarm && (
          <motion.fieldset
            key="farm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <legend className="sr-only">{role === "cooperative" ? "Your cooperative" : "Your farm"}</legend>
            <div className="space-y-5 rounded-2xl border border-ink-900/8 bg-cream-100/70 p-4 sm:p-5">
              <p aria-hidden className="text-sm font-bold text-forest-800">{role === "cooperative" ? "Your cooperative" : "Your farm"}</p>
              <TextField
                label={role === "cooperative" ? "Cooperative name" : "Farm name"}
                value={v.farmName}
                onChange={(e) => set("farmName", e.target.value)}
                placeholder={role === "cooperative" ? "Tiv Yam Growers Cooperative" : "Green Valley Farm"}
                error={errors.farmName}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField label="LGA" value={v.lga} onChange={(e) => set("lga", e.target.value)} placeholder="Makurdi" error={errors.lga} />
                <TextField
                  label="Farm size (hectares)"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.1"
                  value={v.farmSize}
                  onChange={(e) => set("farmSize", e.target.value)}
                  placeholder="2.5"
                  error={errors.farmSize}
                  hint="1 hectare is about 2.5 acres, or roughly two football pitches."
                />
              </div>
              <TextField
                label="Main crop"
                list="agc-crops"
                value={v.primaryCrop}
                onChange={(e) => set("primaryCrop", e.target.value)}
                placeholder="Start typing, e.g. Cassava"
                error={errors.primaryCrop}
              />
              <datalist id="agc-crops">
                {commonCrops.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </motion.fieldset>
        )}
      </AnimatePresence>

      <PasswordField label="Create a password" autoComplete="new-password" value={v.password} onChange={(e) => set("password", e.target.value)} showStrength error={errors.password} />

      <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-600">
        <input type="checkbox" checked={v.terms} onChange={(e) => set("terms", e.target.checked)} className="mt-0.5 size-4 shrink-0 accent-forest-700" />
        <span>
          I agree to AgroChain&apos;s terms and privacy policy. My farm data stays mine and is only shared with my permission.
          {errors.terms && <span className="mt-1 block font-medium text-clay-600">{errors.terms}</span>}
        </span>
      </label>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? <Spinner /> : <>Create my account <ArrowRight className="size-5" /></>}
      </Button>
      <p className="text-center text-sm text-ink-600">
        Already have an account?{" "}
        <Link href="/signin" className="font-bold text-forest-700 hover:underline">Sign in</Link>
      </p>
    </form>
  );
}
