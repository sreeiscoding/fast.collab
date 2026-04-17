"use client";

import Link from "next/link";
import { AuthAlert, AuthShell } from "@/src/components/auth/auth-shell";

export default function LoginError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <AuthShell
      description="Something interrupted the login flow, but your account is safe."
      eyebrow="Error"
      footerLinkHref="/signup"
      footerLinkLabel="Create an account"
      footerText="Need a fresh start?"
      title="We hit a snag"
    >
      <div className="space-y-5">
        <AuthAlert
          tone="error"
          title="Unable to complete sign-in"
          description={error.message || "Please try again or switch to Google sign-in."}
        />

        <button
          className="fc-button-primary h-11 w-full justify-center"
          onClick={reset}
          type="button"
        >
          Try again
        </button>

        <Link className="fc-button-secondary h-11 w-full justify-center" href="/signup">
          Go to signup
        </Link>
      </div>
    </AuthShell>
  );
}
