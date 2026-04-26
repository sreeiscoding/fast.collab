import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="fc-shell">
      <section className="container py-16 md:py-24">
        <article className="mx-auto max-w-3xl rounded-[32px] border border-border bg-surface p-8 shadow-medium md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Terms of Service</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Usage terms for FastCollab.
          </h1>
          <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
            <p>FastCollab is intended for professional team media collaboration and temporary sharing workflows.</p>
            <p>Account owners are responsible for workspace permissions, member invites, and uploaded content.</p>
            <p>Service plans, limits, and billing are governed by selected pricing tiers and Stripe billing terms.</p>
            <p>Violation of lawful usage requirements can result in suspended workspace access.</p>
          </div>
          <div className="mt-8">
            <Link className="fc-button-secondary" href="/contact">Contact legal</Link>
          </div>
        </article>
      </section>
    </main>
  );
}

