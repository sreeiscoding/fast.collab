import Link from "next/link";
import {
  AuthAlert,
  AuthDivider,
  AuthShell,
  AuthSubmitButton,
  SocialButton,
} from "@/src/components/auth/auth-shell";

export default function SignupPage() {
  return (
    <AuthShell
      description="Create your FastCollab account in seconds and invite your team when you&apos;re in."
      eyebrow="Signup"
      footerLinkHref="/login"
      footerLinkLabel="Sign in instead"
      footerText="Already have an account?"
      title="Start free"
    >
      <div className="space-y-5">
        <AuthAlert
          title="Fast onboarding"
          description="Your first workspace can be ready before your magic link even leaves the inbox."
        />

        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="full-name">
              Full name
            </label>
            <input
              autoComplete="name"
              className="fc-input"
              id="full-name"
              name="full-name"
              placeholder="Maya Chen"
              type="text"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="signup-email">
              Work email
            </label>
            <input
              autoComplete="email"
              className="fc-input"
              id="signup-email"
              name="signup-email"
              placeholder="maya@company.com"
              type="email"
            />
          </div>

          <AuthSubmitButton label="Create account with magic link" loadingLabel="Creating account..." />
        </form>

        <AuthDivider />

        <SocialButton label="Sign up with Google" />

        <div className="rounded-2xl border border-border bg-muted/70 px-4 py-3 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Example success state</p>
          <p className="mt-1 leading-6">
            After submit, replace the form notice with:{" "}
            <span className="text-success">
              Check your inbox. Your sign-in link is on the way.
            </span>
          </p>
        </div>

        <p className="text-center text-xs leading-6 text-muted-foreground sm:text-left">
          Your first login can create a workspace automatically and connect teammates later through Supabase invites.
          <Link className="ml-1 text-foreground underline decoration-border-strong underline-offset-4" href="/">
            Learn more
          </Link>
          .
        </p>
      </div>
    </AuthShell>
  );
}
