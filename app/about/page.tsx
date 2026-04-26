import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="fc-shell">
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-border bg-surface p-8 shadow-medium md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">About FastCollab</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Built for teams sharing large media fast.
          </h1>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            FastCollab helps production, marketing, and client teams upload large files, collaborate with roles, and keep sharing temporary by default with 7-day expiry.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="fc-button-primary" href="/signup">Start Free</Link>
            <Link className="fc-button-secondary" href="/contact">Contact Sales</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

