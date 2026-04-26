import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  footerText: string;
  footerLinkHref: string;
  footerLinkLabel: string;
  children: ReactNode;
};

type AuthAlertProps = {
  tone?: "default" | "error";
  title: string;
  description: string;
};

type SocialButtonProps = {
  label: string;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

type AuthSubmitButtonProps = {
  label: string;
  loadingLabel?: string;
  loading?: boolean;
  disabled?: boolean;
};

export function AuthShell({
  eyebrow,
  title,
  description,
  footerText,
  footerLinkHref,
  footerLinkLabel,
  children,
}: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.14),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(8,145,178,0.12),_transparent_26%)]" />
      <div className="absolute left-1/2 top-16 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <section className="hidden lg:block">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-3 rounded-full border border-border bg-surface/85 px-4 py-2 shadow-soft backdrop-blur">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
                FC
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">FastCollab</p>
                <p className="text-xs text-muted-foreground">Fast team media sharing</p>
              </div>
            </div>

            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-foreground">
              Secure access without the usual friction.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Sign in with magic link or Google and get your team back to sharing files in seconds.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Passwordless email login with a single click",
                "Google sign-in for faster team onboarding",
                "Short, focused flow designed for desktop and mobile",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-primary-subtle ring-4 ring-primary/10" />
                  <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md">
          <div className="rounded-[28px] border border-border/90 bg-surface/95 p-6 shadow-large backdrop-blur sm:p-8">
            <div className="mb-8 text-center sm:text-left">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
                {eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
            </div>

            {children}

            <div className="mt-8 border-t border-border pt-6">
              <p className="text-center text-sm text-muted-foreground sm:text-left">
                {footerText}{" "}
                <Link className="font-medium text-primary transition-colors hover:text-primary/80" href={footerLinkHref}>
                  {footerLinkLabel}
                </Link>
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground sm:justify-start">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success-subtle text-[11px] font-semibold text-success">
                S
              </span>
              Powered by Supabase
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export function AuthAlert({
  tone = "default",
  title,
  description,
}: AuthAlertProps) {
  const styles =
    tone === "error"
      ? "border-error/20 bg-error-subtle text-error"
      : "border-success/20 bg-success-subtle text-success";

  return (
    <div className={`rounded-2xl border px-4 py-3 ${styles}`}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-6">{description}</p>
    </div>
  );
}

export function SocialButton({
  label,
  loading = false,
  onClick,
  disabled = false,
}: SocialButtonProps) {
  return (
    <button
      className="fc-button-secondary h-11 w-full justify-center gap-3 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-soft"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
        <path
          d="M21.8 12.23c0-.72-.06-1.24-.19-1.79H12v3.55h5.65c-.11.88-.69 2.2-1.98 3.09l-.02.12 2.88 2.23.2.02c1.84-1.69 2.89-4.18 2.89-7.22Z"
          fill="#4285F4"
        />
        <path
          d="M12 22c2.76 0 5.08-.91 6.77-2.48l-3.22-2.5c-.86.6-2.01 1.01-3.55 1.01a6.15 6.15 0 0 1-5.82-4.24l-.11.01-3 2.32-.04.1A10.23 10.23 0 0 0 12 22Z"
          fill="#34A853"
        />
        <path
          d="M6.18 13.79A6.34 6.34 0 0 1 5.85 12c0-.62.12-1.22.31-1.79l-.01-.12-3.03-2.35-.1.04A10.06 10.06 0 0 0 2 12c0 1.47.35 2.86 1.02 4.06l3.16-2.27Z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.97c1.94 0 3.24.84 3.99 1.54l2.91-2.84C17.07 2.98 14.76 2 12 2a10.23 10.23 0 0 0-8.98 5.78l3.14 2.43A6.18 6.18 0 0 1 12 5.97Z"
          fill="#EA4335"
        />
      </svg>
      <span>{loading ? "Connecting..." : label}</span>
    </button>
  );
}

export function AuthSubmitButton({
  label,
  loadingLabel = "Sending link...",
  loading = false,
  disabled = false,
}: AuthSubmitButtonProps) {
  return (
    <button
      className="fc-button-primary h-11 w-full justify-center gap-2 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-medium"
      disabled={disabled}
      type="submit"
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/25 border-t-primary-foreground" />
          <span>{loadingLabel}</span>
        </>
      ) : (
        label
      )}
    </button>
  );
}

export function AuthDivider() {
  return (
    <div className="relative py-1">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-surface px-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          or continue with
        </span>
      </div>
    </div>
  );
}
