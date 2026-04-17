import Link from "next/link";
import {
  AuthAlert,
  AuthDivider,
  AuthShell,
  AuthSubmitButton,
  SocialButton,
} from "@/src/components/auth/auth-shell";

export default function LoginPage() {
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
          description="Enter your work email and we’ll send a secure sign-in link instantly."
        />

        <form className="space-y-4">
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

          <AuthSubmitButton label="Send magic link" />
        </form>

        <AuthDivider />

        <SocialButton label="Continue with Google" />

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
          <Link className="text-foreground underline decoration-border-strong underline-offset-4" href="/">
            Terms
          </Link>{" "}
          and{" "}
          <Link className="text-foreground underline decoration-border-strong underline-offset-4" href="/">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </AuthShell>
  );
}
