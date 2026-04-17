const stats = [
  { label: "Active projects", value: "12", tone: "text-foreground", meta: "+3 this week" },
  { label: "Files expiring soon", value: "27", tone: "text-warning", meta: "Next 24 hours" },
  { label: "Uploads in progress", value: "4", tone: "text-primary", meta: "2 live right now" },
  { label: "Team response rate", value: "98%", tone: "text-success", meta: "Realtime sync healthy" },
];

const projects = [
  {
    name: "Spring Campaign Launch",
    team: "Marketing Studio",
    progress: 78,
    uploads: "14 files",
    expiry: "3 assets expire in 2 days",
    live: true,
  },
  {
    name: "Investor Demo Edit",
    team: "Product Ops",
    progress: 54,
    uploads: "7 files",
    expiry: "1 asset expires in 18 hours",
    live: false,
  },
  {
    name: "Client Review Package",
    team: "External Share",
    progress: 91,
    uploads: "22 files",
    expiry: "5 assets expire in 5 days",
    live: true,
  },
];

const uploads = [
  {
    name: "Campaign_Master_v12.mp4",
    size: "4.8 GB",
    status: "Uploading",
    statusTone: "fc-badge-neutral",
    progress: 76,
    expiry: "Expires in 6d 18h",
  },
  {
    name: "Launch_Selects_Press.zip",
    size: "1.3 GB",
    status: "Shared",
    statusTone: "fc-badge-success",
    progress: 100,
    expiry: "Expires in 2d 04h",
  },
  {
    name: "Storyboard_Review_03.pdf",
    size: "42 MB",
    status: "Needs review",
    statusTone: "fc-badge-warning",
    progress: 100,
    expiry: "Expires in 14h",
  },
  {
    name: "Raw_Footage_Selects.tar",
    size: "8.2 GB",
    status: "Queued",
    statusTone: "fc-badge-neutral",
    progress: 28,
    expiry: "Expires in 6d 23h",
  },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="fc-card-elevated overflow-hidden">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-success/15 bg-success-subtle px-3 py-1 text-xs font-medium text-success">
                <span className="h-2 w-2 rounded-full bg-success" />
                Realtime sync active
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Keep uploads moving and expiry visible.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                FastCollab gives your team one calm surface for active projects, short-lived assets, and live upload activity.
              </p>
            </div>

            <Link className="fc-button-primary h-11 whitespace-nowrap px-5" href="/upload">
              Quick Upload
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {stat.label}
                </p>
                <p className={`mt-3 text-3xl font-semibold tracking-tight ${stat.tone}`}>{stat.value}</p>
                <p className="mt-2 text-xs text-muted-foreground">{stat.meta}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="fc-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Live Signals
              </p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Team pulse</h2>
            </div>
            <span className="fc-badge-success">Now</span>
          </div>

          <div className="space-y-3">
            {[
              "Maya started uploading a 4.8 GB campaign master",
              "Jordan opened Client Review Package",
              "2 assets enter expiry window in under 24 hours",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-muted/70 px-4 py-3 text-sm text-muted-foreground">
                {item}
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-canvas p-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Response health
            </p>
            <div className="mt-4 fc-progress">
              <div className="fc-progress-bar w-[98%] bg-gradient-to-r from-success to-accent" />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>Realtime delivery</span>
              <span>98%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.2fr_0.8fr]">
        <div className="fc-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Active Projects
              </p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Projects in motion</h2>
            </div>
            <button className="fc-button-ghost h-9 px-3 text-xs">View all</button>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.name}
                className="rounded-[24px] border border-border bg-surface p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-border-strong hover:shadow-medium"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{project.team}</p>
                  </div>
                  {project.live ? <span className="fc-badge-success">Live</span> : <span className="fc-badge-neutral">Steady</span>}
                </div>

                <div className="mt-5 fc-progress">
                  <div className="fc-progress-bar bg-gradient-to-r from-primary to-accent" style={{ width: `${project.progress}%` }} />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{project.uploads}</span>
                  <span>{project.progress}% complete</span>
                </div>

                <div className="mt-5 rounded-2xl bg-muted/70 px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-warning">Expiry watch</p>
                  <p className="mt-2 text-sm text-muted-foreground">{project.expiry}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fc-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Expiry Countdown
              </p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Most urgent assets</h2>
            </div>
            <span className="fc-badge-warning">Attention</span>
          </div>

          <div className="mt-6 space-y-4">
            {[
              ["Storyboard_Review_03.pdf", "14 hours left", "bg-error"],
              ["Investor_Demo_Audio.wav", "22 hours left", "bg-warning"],
              ["Launch_Selects_Press.zip", "2 days left", "bg-primary"],
            ].map(([name, countdown, tone]) => (
              <div key={name} className="rounded-2xl border border-border bg-surface px-4 py-4 shadow-soft">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Auto-delete enabled</p>
                  </div>
                  <div className="text-right">
                    <div className={`ml-auto h-2.5 w-2.5 rounded-full ${tone}`} />
                    <p className="mt-2 text-sm font-medium text-foreground">{countdown}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fc-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Recent Uploads
            </p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Fresh activity across the team</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-success" />
              2 uploads live
            </span>
            <Link className="fc-button-secondary h-10 px-4" href="/upload">
              Upload file
            </Link>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[24px] border border-border">
          <div className="hidden grid-cols-[minmax(0,1.3fr)_120px_140px_120px_150px] gap-4 bg-muted/60 px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground md:grid">
            <span>File</span>
            <span>Size</span>
            <span>Status</span>
            <span>Progress</span>
            <span>Expiry</span>
          </div>

          <div className="divide-y divide-border">
            {uploads.map((upload) => (
              <div
                key={upload.name}
                className="grid gap-4 px-5 py-4 transition-colors hover:bg-muted/50 md:grid-cols-[minmax(0,1.3fr)_120px_140px_120px_150px] md:items-center"
              >
                <div>
                  <p className="truncate text-sm font-semibold text-foreground">{upload.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground md:hidden">{upload.size}</p>
                </div>
                <p className="hidden text-sm text-muted-foreground md:block">{upload.size}</p>
                <div>
                  <span className={upload.statusTone}>{upload.status}</span>
                </div>
                <div>
                  <div className="fc-progress h-2.5">
                    <div className="fc-progress-bar bg-gradient-to-r from-primary to-accent" style={{ width: `${upload.progress}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{upload.progress}%</p>
                </div>
                <p className="text-sm text-muted-foreground">{upload.expiry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function DashboardOverviewSkeleton() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="fc-card-elevated space-y-6">
          <div className="fc-skeleton h-7 w-36" />
          <div className="fc-skeleton h-12 w-full max-w-xl" />
          <div className="fc-skeleton h-5 w-full max-w-2xl" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
                <div className="fc-skeleton h-3 w-24" />
                <div className="fc-skeleton mt-4 h-8 w-16" />
                <div className="fc-skeleton mt-3 h-3 w-20" />
              </div>
            ))}
          </div>
        </div>

        <div className="fc-card space-y-4">
          <div className="fc-skeleton h-7 w-32" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="fc-skeleton h-16 w-full" />
            ))}
          </div>
          <div className="fc-skeleton h-24 w-full" />
        </div>
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.2fr_0.8fr]">
        <div className="fc-card">
          <div className="fc-skeleton h-7 w-40" />
          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-[24px] border border-border bg-surface p-5 shadow-soft">
                <div className="fc-skeleton h-6 w-36" />
                <div className="fc-skeleton mt-3 h-4 w-24" />
                <div className="fc-skeleton mt-6 h-2.5 w-full" />
                <div className="fc-skeleton mt-5 h-16 w-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="fc-card">
          <div className="fc-skeleton h-7 w-36" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="fc-skeleton h-20 w-full" />
            ))}
          </div>
        </div>
      </section>

      <section className="fc-card">
        <div className="fc-skeleton h-7 w-44" />
        <div className="mt-6 space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="fc-skeleton h-20 w-full" />
          ))}
        </div>
      </section>
    </div>
  );
}
import Link from "next/link";
