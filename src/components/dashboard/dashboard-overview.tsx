"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useAppData } from "@/src/context/AppDataContext";
import { useTeam } from "@/src/context/TeamContext";

export function DashboardOverview() {
  const { activeTeamId } = useTeam();
  const { files, notifications, projects, uploads } = useAppData();

  const teamFiles = useMemo(
    () => files.filter((file) => file.teamId === activeTeamId),
    [activeTeamId, files],
  );
  const teamProjects = useMemo(
    () => projects.filter((project) => project.teamId === activeTeamId),
    [activeTeamId, projects],
  );
  const teamUploads = useMemo(
    () => uploads.filter((upload) => upload.teamId === activeTeamId),
    [activeTeamId, uploads],
  );
  const teamNotifications = useMemo(
    () => notifications.filter((notification) => notification.teamId === activeTeamId),
    [activeTeamId, notifications],
  );

  const expiringSoonCount = teamFiles.filter((file) => file.daysRemaining <= 1).length;
  const uploadsInProgressCount = teamUploads.filter((upload) => upload.status === "uploading").length;

  const stats = [
    { label: "Active projects", value: String(teamProjects.length), tone: "text-foreground", meta: "Across current team" },
    { label: "Files expiring soon", value: String(expiringSoonCount), tone: "text-warning", meta: "Next 24 hours" },
    { label: "Uploads in progress", value: String(uploadsInProgressCount), tone: "text-primary", meta: "Live transfer queue" },
    { label: "Team response rate", value: "98%", tone: "text-success", meta: "Realtime sync healthy" },
  ];

  const recentUploads = teamUploads.slice(0, 4).map((upload) => ({
    name: upload.name,
    size: upload.size,
    status: upload.status === "success" ? "Shared" : upload.status === "error" ? "Needs review" : "Uploading",
    statusTone:
      upload.status === "success"
        ? "fc-badge-success"
        : upload.status === "error"
          ? "fc-badge-warning"
          : "fc-badge-neutral",
    progress: upload.progress,
    expiry: "Expires in 7 days",
  }));

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

            <Link className="fc-button-primary inline-flex h-11 items-center gap-2 whitespace-nowrap px-5" href="/upload">
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20">
                <path
                  d="M10 3.25a.75.75 0 0 1 .75.75v7.19l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 1.06-1.06l2.22 2.22V4a.75.75 0 0 1 .75-.75Z"
                  fill="currentColor"
                />
              </svg>
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
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 20 20">
                  <path
                    d="M3.75 10a6.25 6.25 0 1 1 12.5 0A6.25 6.25 0 0 1 3.75 10Zm7-3a.75.75 0 0 0-1.5 0v3.4c0 .2.08.39.22.53l1.9 1.9a.75.75 0 0 0 1.06-1.06l-1.68-1.67V7Z"
                    fill="currentColor"
                  />
                </svg>
                Live Signals
              </p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Team pulse</h2>
            </div>
            <span className="fc-badge-success">Now</span>
          </div>

          <div className="space-y-3">
            {teamNotifications.slice(0, 3).map((item) => (
              <div key={item.id} className="rounded-2xl bg-muted/70 px-4 py-3 text-sm text-muted-foreground">
                {item.title}
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
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 20 20">
                  <path
                    d="M4.5 4.25A1.75 1.75 0 0 0 2.75 6v8A1.75 1.75 0 0 0 4.5 15.75h11A1.75 1.75 0 0 0 17.25 14V6A1.75 1.75 0 0 0 15.5 4.25h-11Zm1 3h9v1.5h-9v-1.5Zm0 3h6v1.5h-6v-1.5Z"
                    fill="currentColor"
                  />
                </svg>
                Active Projects
              </p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Projects in motion</h2>
            </div>
            <Link className="fc-button-ghost h-9 px-3 text-xs" href="/projects">
              View all
            </Link>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            {teamProjects.map((project) => (
              <div
                key={project.id}
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
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 20 20">
                  <path
                    d="M10 3.5a6.5 6.5 0 1 0 6.5 6.5A6.5 6.5 0 0 0 10 3.5Zm.75 3.25a.75.75 0 0 0-1.5 0v3.56c0 .2.08.39.22.53l2 2a.75.75 0 0 0 1.06-1.06l-1.78-1.78V6.75Z"
                    fill="currentColor"
                  />
                </svg>
                Expiry Countdown
              </p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Most urgent assets</h2>
            </div>
            <span className="fc-badge-warning">Attention</span>
          </div>

          <div className="mt-6 space-y-4">
            {teamFiles
              .slice()
              .sort((a, b) => a.daysRemaining - b.daysRemaining)
              .slice(0, 3)
              .map((file) => {
                const tone =
                  file.daysRemaining <= 1
                    ? "bg-error"
                    : file.daysRemaining <= 2
                      ? "bg-warning"
                      : "bg-primary";
                const countdown =
                  file.daysRemaining === 0
                    ? "Under 24 hours left"
                    : `${file.daysRemaining} day${file.daysRemaining > 1 ? "s" : ""} left`;
                return (
                  <div key={file.id} className="rounded-2xl border border-border bg-surface px-4 py-4 shadow-soft">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{file.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">Auto-delete enabled</p>
                      </div>
                      <div className="text-right">
                        <div className={`ml-auto h-2.5 w-2.5 rounded-full ${tone}`} />
                        <p className="mt-2 text-sm font-medium text-foreground">{countdown}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <section className="fc-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 20 20">
                <path
                  d="M4.5 4.25A1.75 1.75 0 0 0 2.75 6v8A1.75 1.75 0 0 0 4.5 15.75h11A1.75 1.75 0 0 0 17.25 14V6A1.75 1.75 0 0 0 15.5 4.25h-11Zm1 2.75h9v6h-9v-6Z"
                  fill="currentColor"
                />
              </svg>
              Recent Uploads
            </p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Fresh activity across the team</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-success" />
              {uploadsInProgressCount} uploads live
            </span>
            <Link className="fc-button-secondary inline-flex h-10 items-center gap-2 px-4" href="/upload">
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20">
                <path
                  d="M10 3.25a.75.75 0 0 1 .75.75v7.19l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 1.06-1.06l2.22 2.22V4a.75.75 0 0 1 .75-.75Z"
                  fill="currentColor"
                />
              </svg>
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
            {recentUploads.map((upload) => (
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
