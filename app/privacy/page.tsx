import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="fc-shell">
      <section className="container py-16 md:py-24">
        <article className="mx-auto max-w-3xl rounded-[32px] border border-border bg-surface p-8 shadow-medium md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Privacy Policy</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            How FastCollab handles your data.
          </h1>
          <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
            <p>We collect account and workspace data necessary to provide team collaboration features.</p>
            <p>Temporary file metadata is used for sharing, expiry controls, and activity visibility.</p>
            <p>Billing information is processed by Stripe through secure customer portal workflows.</p>
            <p>You can request account data review or deletion through our contact channel.</p>
          </div>
          <div className="mt-8">
            <Link className="fc-button-secondary" href="/contact">Privacy requests</Link>
          </div>
        </article>
      </section>
    </main>
  );
}

