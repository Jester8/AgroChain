"use client";

import { useId, useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/format";

const base =
  "h-12 w-full rounded-xl border bg-white px-4 text-[0.97rem] text-ink-900 outline-none transition placeholder:text-ink-400 focus:ring-4";
const ok = "border-ink-900/12 focus:border-forest-700/50 focus:ring-forest-700/10";
const bad = "border-clay-500 focus:border-clay-500 focus:ring-clay-500/15";

type FieldProps = {
  label: string;
  error?: string;
  hint?: React.ReactNode;
  action?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Frame({ id, label, error, hint, action, children }: { id: string } & Omit<FieldProps, "label"> & { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-ink-700">{label}</label>
        {action}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-clay-600">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-sm text-ink-500">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextField({ label, error, hint, action, className, ...props }: FieldProps) {
  const id = useId();
  return (
    <Frame id={id} label={label} error={error} hint={hint} action={action}>
      <input
        id={id}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(base, error ? bad : ok, className)}
        {...props}
      />
    </Frame>
  );
}

export function PasswordField({ label, error, hint, action, showStrength, value, ...props }: FieldProps & { showStrength?: boolean }) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const pw = String(value ?? "");
  const score = [pw.length >= 8, /[A-Z]/.test(pw) && /[a-z]/.test(pw), /\d/.test(pw), /[^A-Za-z0-9]/.test(pw) || pw.length >= 12].filter(Boolean).length;
  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-clay-500", "bg-clay-500", "bg-gold-500", "bg-leaf-500", "bg-forest-600"];

  return (
    <Frame id={id} label={label} error={error} hint={showStrength ? undefined : hint} action={action}>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(base, "pr-12", error ? bad : ok)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-1.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-ink-400 hover:text-ink-900"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      </div>
      {showStrength && pw && !error && (
        <div className="mt-2 flex items-center gap-3">
          <div className="flex flex-1 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors", i < score ? colors[score] : "bg-ink-900/8")} />
            ))}
          </div>
          <span className="w-16 text-right text-xs font-semibold text-ink-500">{labels[pw.length < 8 ? 0 : score]}</span>
        </div>
      )}
    </Frame>
  );
}

/** Nigerian mobile number with a fixed +234 prefix. Accepts 0803… or 803… */
export function PhoneField({ label, error, hint, value, onChange, ...props }: Omit<FieldProps, "onChange" | "value"> & { value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <Frame id={id} label={label} error={error} hint={hint}>
      <div className={cn("flex h-12 overflow-hidden rounded-xl border bg-white transition focus-within:ring-4", error ? bad : ok)}>
        <span className="flex items-center gap-1.5 border-r border-ink-900/10 bg-cream-100 px-3.5 text-[0.95rem] font-semibold text-ink-700">
          +234
        </span>
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="803 123 4567"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d ]/g, "").slice(0, 13))}
          aria-invalid={!!error || undefined}
          className="min-w-0 flex-1 bg-transparent px-3.5 text-[0.97rem] text-ink-900 outline-none placeholder:text-ink-400"
          {...props}
        />
      </div>
    </Frame>
  );
}

export function SelectField({ label, error, options, placeholder, ...props }: { label: string; error?: string; options: readonly string[]; placeholder: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <Frame id={id} label={label} error={error}>
      <select
        id={id}
        aria-invalid={!!error || undefined}
        className={cn(
          base,
          "appearance-none bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7064' stroke-width='2.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")] bg-[position:right_1rem_center] bg-no-repeat pr-10",
          error ? bad : ok,
          !props.value && "text-ink-400",
        )}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink-900">{o}</option>
        ))}
      </select>
    </Frame>
  );
}

export function FormAlert({ children, tone = "error" }: { children: React.ReactNode; tone?: "error" | "success" }) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm font-medium",
        tone === "error" ? "bg-clay-100 text-clay-700" : "bg-leaf-100 text-forest-800",
      )}
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

/** Normalises a Nigerian mobile number to E.164 (+234XXXXXXXXXX), or returns null if invalid. */
export function toE164(raw: string) {
  const digits = raw.replace(/\D/g, "").replace(/^234/, "").replace(/^0/, "");
  return /^[789][01]\d{8}$/.test(digits) ? `+234${digits}` : null;
}
