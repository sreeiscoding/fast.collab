import { AuthDivider, AuthShell } from "@/src/components/auth/auth-shell";

export default function LoginLoading() {
  return (
    <AuthShell
      description="Preparing your secure sign-in experience."
      eyebrow="Loading"
      footerLinkHref="/signup"
      footerLinkLabel="Create an account"
      footerText="New to FastCollab?"
      title="Just a second"
    >
      <div className="space-y-5">
        <div className="fc-skeleton h-16 w-full" />
        <div className="fc-skeleton h-11 w-full" />
        <div className="fc-skeleton h-11 w-full" />
        <AuthDivider />
        <div className="fc-skeleton h-11 w-full" />
      </div>
    </AuthShell>
  );
}
