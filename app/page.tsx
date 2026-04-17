const features = [
  {
    title: "Fast uploads",
    description:
      "Upload large media files with smooth progress tracking, resumable flows, and a clean workspace that stays out of the way.",
    stat: "Up to 5 GB",
  },
  {
    title: "Built for teams",
    description:
      "Keep reviews, approvals, and file handoffs in one shared place with clear access controls for owners, editors, and viewers.",
    stat: "Role-based",
  },
  {
    title: "Auto-expiry by default",
    description:
      "Every shared asset can expire automatically after 7 days, so your team keeps moving without accumulating stale files.",
    stat: "7-day cleanup",
  },
];

const steps = [
  {
    step: "01",
    title: "Upload instantly",
    description:
      "Drop media into a focused upload flow with live progress and zero clutter.",
  },
  {
    step: "02",
    title: "Share with your team",
    description:
      "Invite collaborators, assign roles, and keep every file in the right workspace.",
  },
  {
    step: "03",
    title: "Let expiry handle cleanup",
    description:
      "Links and files automatically expire after 7 days, reducing manual admin work.",
  },
];

const testimonials = [
  {
    quote:
      "FastCollab replaced three clunky tools for our production team. Uploads feel instant, and the 7-day expiry keeps our workspace clean.",
    name: "Maya Chen",
    role: "Operations Lead, FrameNorth",
  },
  {
    quote:
      "The product feels unusually calm. Our editors can send big files fast, clients get what they need, and nothing lingers longer than it should.",
    name: "Jordan Rivera",
    role: "Creative Director, Hollow & Pine",
  },
  {
    quote:
      "We needed secure temporary sharing without enterprise bloat. FastCollab hit that sweet spot on day one.",
    name: "Amina Yusuf",
    role: "Founder, Motion Harbor",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$12",
    description: "For lean teams moving quickly.",
    features: ["3 team members", "250 GB transfer/month", "7-day auto-expiry", "Basic analytics"],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Growth",
    price: "$39",
    description: "For fast-moving teams sharing daily.",
    features: ["15 team members", "2 TB transfer/month", "Priority uploads", "Advanced permissions"],
    cta: "Upload Now",
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    description: "For larger orgs with heavier workflows.",
    features: ["Unlimited members", "Custom storage limits", "Dedicated support", "Security reviews"],
    cta: "Talk to Sales",
    featured: false,
  },
];

export default function HomePage() {
  return (
    <main className="fc-shell overflow-x-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(8,145,178,0.16),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.94),_rgba(248,250,252,0.72))]" />

      <header className="fc-navbar sticky top-0 z-50 w-full">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground shadow-soft">
              FC
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">FastCollab</p>
              <p className="text-xs text-muted-foreground">Temporary media sharing</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#features">
              Features
            </a>
            <a className="transition-colors hover:text-foreground" href="#how-it-works">
              How it works
            </a>
            <a className="transition-colors hover:text-foreground" href="#pricing">
              Pricing
            </a>
            <a className="transition-colors hover:text-foreground" href="#testimonials">
              Reviews
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link className="fc-button-ghost hidden sm:inline-flex" href="/login">
              Sign in
            </Link>
            <Link className="fc-button-primary shadow-soft" href="/signup">
              Start Free
            </Link>
          </div>
        </div>
      </header>

      <section className="container relative pb-20 pt-14 md:pb-24 md:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-soft backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-success" />
              Premium team sharing for modern workflows
            </div>

            <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
              Fast team media sharing.
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Auto-deletes in 7 days.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              FastCollab helps teams upload, organize, and share large media files without friction. Keep delivery fast, collaboration clean, and storage temporary by default.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="fc-button-primary h-12 px-6 text-sm shadow-medium transition-transform duration-200 hover:-translate-y-0.5"
                href="/signup"
              >
                Start Free
              </Link>
              <Link
                className="fc-button-secondary h-12 px-6 text-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-soft"
                href="/dashboard"
              >
                Upload Now
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Regional pricing support
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success" />
                Built for teams
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-accent/15 blur-3xl" />
            <div className="fc-card-elevated relative overflow-hidden rounded-[28px] border-white/60 bg-white/90 p-0 backdrop-blur dark:border-border dark:bg-surface">
              <div className="border-b border-border/70 px-5 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="fc-avatar h-10 w-10 text-sm">FC</div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">FastCollab Dashboard</p>
                      <p className="text-xs text-muted-foreground">Team media workspace</p>
                    </div>
                  </div>
                  <span className="fc-badge-success">Live</span>
                </div>
              </div>

              <div className="space-y-5 p-5">
                <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
                  <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                          Upload Queue
                        </p>
                        <p className="mt-2 text-sm font-semibold text-foreground">
                          Campaign_Video_Final.mp4
                        </p>
                      </div>
                      <span className="fc-badge-neutral">4.8 GB</span>
                    </div>
                    <div className="mt-4 fc-progress">
                      <div className="fc-progress-bar w-[76%] bg-gradient-to-r from-primary to-accent" />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Uploading</span>
                      <span>76%</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      Team
                    </p>
                    <div className="mt-4 flex -space-x-2">
                      {["MC", "JR", "AY", "+3"].map((member) => (
                        <div
                          key={member}
                          className="fc-avatar h-10 w-10 border-2 border-surface text-xs shadow-sm"
                        >
                          {member}
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      9 collaborators active this week.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                        Shared Files
                      </p>
                      <p className="mt-2 text-sm font-semibold text-foreground">
                        Expiring automatically in 7 days
                      </p>
                    </div>
                    <button className="fc-button-ghost h-9 px-3 text-xs">View all</button>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      ["Product_Teaser.mov", "Ready", "2.1 GB"],
                      ["Client_Review_Frame.zip", "Shared", "842 MB"],
                      ["Launch_Photos_Selects.rar", "Pending", "1.4 GB"],
                    ].map(([name, state, size]) => (
                      <div
                        key={name}
                        className="flex items-center justify-between rounded-2xl border border-border/80 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-soft"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">{name}</p>
                          <p className="text-xs text-muted-foreground">Auto-delete enabled</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="fc-badge-neutral">{state}</span>
                          <span className="text-xs text-muted-foreground">{size}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="container py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
            Core Features
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Designed for speed, clarity, and short-lived sharing
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Every interaction is tuned to feel light, responsive, and easy for teams under pressure.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="fc-card group transition-all duration-200 hover:-translate-y-1 hover:border-border-strong hover:shadow-medium"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-subtle to-accent-subtle text-sm font-semibold text-primary transition-transform duration-200 group-hover:scale-105">
                {feature.stat}
              </div>
              <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-8 md:py-12">
        <div className="fc-section overflow-hidden">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                Dashboard Preview
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                A workspace that feels premium before your team learns a single thing
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                FastCollab keeps uploads, collaborators, and temporary access in one focused surface. No clutter, no buried actions, no messy file trails.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Large upload progress with smooth visual feedback",
                  "Team roles and access controls built into the flow",
                  "Temporary sharing states surfaced clearly at a glance",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 rounded-full bg-primary-subtle ring-4 ring-primary/10" />
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-primary/10 via-white to-accent/10 blur-2xl" />
              <div className="relative rounded-[32px] border border-border bg-surface p-4 shadow-large">
                <div className="rounded-[24px] border border-border bg-canvas p-4">
                  <div className="grid gap-4 xl:grid-cols-[240px_1fr]">
                    <aside className="rounded-[20px] border border-border bg-surface p-4">
                      <div className="flex items-center gap-3">
                        <div className="fc-avatar h-11 w-11 text-sm">FC</div>
                        <div>
                          <p className="text-sm font-semibold">Studio Team</p>
                          <p className="text-xs text-muted-foreground">9 active members</p>
                        </div>
                      </div>
                      <div className="mt-6 space-y-2">
                        {["Overview", "Uploads", "Shared Files", "Members", "Billing"].map((item, index) => (
                          <div
                            key={item}
                            className={`rounded-xl px-3 py-2 text-sm transition-colors ${
                              index === 1
                                ? "bg-primary-subtle font-medium text-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </aside>

                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-3">
                        {[
                          ["Uploads today", "184", "text-primary"],
                          ["Files expiring soon", "27", "text-warning"],
                          ["Share success rate", "99.2%", "text-success"],
                        ].map(([label, value, color]) => (
                          <div key={label} className="rounded-[20px] border border-border bg-surface p-4">
                            <p className="text-xs text-muted-foreground">{label}</p>
                            <p className={`mt-3 text-2xl font-semibold ${color}`}>{value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-[20px] border border-border bg-surface p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold">Recent activity</p>
                            <p className="text-xs text-muted-foreground">
                              Real-time upload and sharing events
                            </p>
                          </div>
                          <span className="fc-badge-neutral">Updated now</span>
                        </div>
                        <div className="mt-4 space-y-3">
                          {[
                            ["Amina uploaded Product_Reel.mp4", "2 mins ago"],
                            ["Maya shared Launch_Selects.zip with clients", "7 mins ago"],
                            ["Jordan changed Gallery Access to Viewer", "16 mins ago"],
                          ].map(([event, time]) => (
                            <div
                              key={event}
                              className="flex items-center justify-between rounded-2xl bg-canvas px-4 py-3"
                            >
                              <p className="text-sm text-foreground">{event}</p>
                              <p className="text-xs text-muted-foreground">{time}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="container py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
            How It Works
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Three steps from upload to expiry
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="fc-card relative overflow-hidden">
              <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-primary/5 blur-2xl" />
              <p className="text-sm font-semibold text-primary">{item.step}</p>
              <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="container py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
            Pricing Preview
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Simple plans for teams shipping media fast
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Clear pricing, regional currency support, and room to scale when the workflow gets heavier.
          </p>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[28px] border p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-medium ${
                plan.featured
                  ? "border-primary/30 bg-gradient-to-b from-primary-subtle/60 to-surface"
                  : "border-border bg-surface"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                </div>
                {plan.featured ? <span className="fc-badge-success">Popular</span> : null}
              </div>
              <div className="mt-8 flex items-end gap-2">
                <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
                {plan.price !== "Custom" ? (
                  <span className="pb-1 text-sm text-muted-foreground">/ month</span>
                ) : null}
              </div>
              <div className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <button
                className={`mt-8 w-full ${
                  plan.featured ? "fc-button-primary" : "fc-button-secondary"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials" className="container py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
            Testimonials
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Trusted by teams that move fast
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="fc-card transition-all duration-200 hover:-translate-y-1 hover:border-border-strong hover:shadow-medium"
            >
              <p className="text-base leading-7 text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="fc-avatar h-11 w-11 text-sm">
                  {testimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-16 pt-4 md:pb-24">
        <div className="rounded-[32px] border border-border bg-gradient-to-br from-surface via-surface to-primary-subtle/40 px-6 py-8 shadow-medium md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
                Ready to move faster?
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Bring your team&apos;s media workflow into one fast, temporary workspace.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="fc-button-primary h-12 px-6 shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
                href="/signup"
              >
                Start Free
              </Link>
              <Link
                className="fc-button-secondary h-12 px-6 transition-transform duration-200 hover:-translate-y-0.5"
                href="/dashboard"
              >
                Upload Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-surface/80">
        <div className="container grid gap-10 py-10 md:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground shadow-soft">
                FC
              </div>
              <div>
                <p className="text-sm font-semibold">FastCollab</p>
                <p className="text-xs text-muted-foreground">
                  Fast team media sharing. Auto-deletes in 7 days.
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              A premium SaaS workflow for temporary media sharing, secure collaboration, and fast delivery across modern teams.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Product</p>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <a className="block transition-colors hover:text-foreground" href="#features">
                Features
              </a>
              <a className="block transition-colors hover:text-foreground" href="#pricing">
                Pricing
              </a>
              <a className="block transition-colors hover:text-foreground" href="#how-it-works">
                How it works
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold">Company</p>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <Link className="block transition-colors hover:text-foreground" href="/">
                About
              </Link>
              <Link className="block transition-colors hover:text-foreground" href="/">
                Security
              </Link>
              <Link className="block transition-colors hover:text-foreground" href="/">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold">Legal</p>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <Link className="block transition-colors hover:text-foreground" href="/">
                Privacy
              </Link>
              <Link className="block transition-colors hover:text-foreground" href="/">
                Terms
              </Link>
              <Link className="block transition-colors hover:text-foreground" href="/">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
import Link from "next/link";
