import Link from "next/link";

export default function SecurityPage() {
  return (
    <main className="fc-shell">
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-border bg-surface p-8 shadow-medium md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Security</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Security-first collaboration for temporary sharing.
          </h1>
          <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
            <p>Role-based access controls with Owner, Editor, and Viewer permissions.</p>
            <p>Temporary file lifecycle with expiry visibility and cleanup workflows.</p>
            <p>Dedicated billing and account controls through Stripe and auth settings.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="fc-button-secondary" href="/privacy">Read Privacy Policy</Link>
            <Link className="fc-button-primary" href="/contact">Report a security concern</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

