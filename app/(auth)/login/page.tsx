"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  AuthAlert,
  AuthDivider,
  AuthShell,
  AuthSubmitButton,
  SocialButton,
} from "@/src/components/auth/auth-shell";

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "Enter your work email and we will send a secure sign-in link instantly.",
  );

  function handleMagicLinkSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("Magic link sent. Redirecting you to the workspace preview...");

    window.setTimeout(() => {
      router.push("/dashboard");
    }, 900);
  }

  function handleGoogleLogin() {
    setIsGoogleLoading(true);
    setStatusMessage("Connecting your Google account...");

    window.setTimeout(() => {
      router.push("/dashboard");
    }, 900);
  }

  return (
    <AuthShell
      description="Use your email for a secure magic link or continue with Google. No password required."
      eyebrow="Login"
      footerLinkHref="/signup"
      footerLinkLabel="Create an account"
      footerText="New to FastCollab?"
      title="Welcome back"
    >
      <div className="space-y-5">
        <AuthAlert
          title="Minimal friction by design"
          description={statusMessage}
        />

        <form className="space-y-4" onSubmit={handleMagicLinkSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Work email
            </label>
            <input
              autoComplete="email"
              className="fc-input"
              id="email"
              name="email"
              placeholder="you@company.com"
              type="email"
            />
          </div>

          <AuthSubmitButton
            disabled={isSubmitting || isGoogleLoading}
            label="Send magic link"
            loading={isSubmitting}
          />
        </form>

        <AuthDivider />

        <SocialButton
          disabled={isSubmitting || isGoogleLoading}
          label="Continue with Google"
          loading={isGoogleLoading}
          onClick={handleGoogleLogin}
        />

        <div className="rounded-2xl border border-border bg-muted/70 px-4 py-3 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Example error state</p>
          <p className="mt-1 leading-6">
            If something goes wrong, show an inline alert like:{" "}
            <span className="text-error">
              We couldn&apos;t send your magic link. Please try again in a moment.
            </span>
          </p>
        </div>

        <p className="text-center text-xs leading-6 text-muted-foreground sm:text-left">
          By continuing, you agree to FastCollab&apos;s{" "}
          <Link className="text-foreground underline decoration-border-strong underline-offset-4" href="/terms">
            Terms
          </Link>{" "}
          and{" "}
          <Link className="text-foreground underline decoration-border-strong underline-offset-4" href="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </AuthShell>
  );
}
