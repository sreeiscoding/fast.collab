export default function CookiesPage() {
  return (
    <main className="fc-shell">
      <section className="container py-16 md:py-24">
        <article className="mx-auto max-w-3xl rounded-[32px] border border-border bg-surface p-8 shadow-medium md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Cookie Policy</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Cookie and local storage usage.
          </h1>
          <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
            <p>FastCollab uses local storage for client-side workspace preferences and session UX state.</p>
            <p>We use functional cookies and storage entries to preserve theme, team selection, and app continuity.</p>
            <p>Disabling storage may impact expected app behavior and personalized dashboard features.</p>
          </div>
        </article>
      </section>
    </main>
  );
}

