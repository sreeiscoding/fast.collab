"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type DashboardShellProps = {
  children: ReactNode;
};

const sidebarLinks = [
  { label: "Overview", href: "/dashboard" },
  { label: "Projects", href: "/dashboard" },
  { label: "Uploads", href: "/dashboard" },
  { label: "Shared Files", href: "/dashboard" },
  { label: "Team", href: "/team" },
  { label: "Billing", href: "/dashboard" },
];

const teamOptions = ["Studio Team", "Northwind Ops", "Client Review"];

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-canvas">
      <header className="fc-navbar sticky top-0 z-50 w-full">
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button className="fc-button-ghost h-10 w-10 p-0 lg:hidden" type="button">
              <span className="sr-only">Open navigation</span>
              <span className="flex flex-col gap-1.5">
                <span className="h-0.5 w-4 rounded-full bg-foreground" />
                <span className="h-0.5 w-4 rounded-full bg-foreground" />
                <span className="h-0.5 w-4 rounded-full bg-foreground" />
              </span>
            </button>

            <Link className="flex items-center gap-3" href="/">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground shadow-soft">
                FC
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold leading-none text-foreground">FastCollab</p>
                <p className="text-xs text-muted-foreground">Team dashboard</p>
              </div>
            </Link>
          </div>

          <div className="hidden flex-1 justify-center lg:flex">
            <div className="flex w-full max-w-xl items-center rounded-2xl border border-border bg-surface px-4 py-2 shadow-soft">
              <svg aria-hidden="true" className="h-4 w-4 text-muted-foreground" viewBox="0 0 20 20">
                <path
                  d="M8.5 3a5.5 5.5 0 1 0 3.47 9.77l3.63 3.63 1.06-1.06-3.63-3.63A5.5 5.5 0 0 0 8.5 3Zm0 1.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
                  fill="currentColor"
                />
              </svg>
              <input
                className="ml-3 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                placeholder="Search projects, uploads, or teammates"
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button className="fc-button-ghost relative h-10 w-10 p-0" type="button">
              <span className="sr-only">Notifications</span>
              <svg aria-hidden="true" className="h-5 w-5 text-foreground" viewBox="0 0 20 20">
                <path
                  d="M10 2.75a4 4 0 0 0-4 4v1.18c0 .73-.2 1.45-.59 2.07L4.2 12.1a1.5 1.5 0 0 0 1.28 2.27h9.04a1.5 1.5 0 0 0 1.28-2.27l-1.2-2.03A3.98 3.98 0 0 1 14 7.93V6.75a4 4 0 0 0-4-4Zm0 14.5a2.1 2.1 0 0 1-2-1.38h4a2.1 2.1 0 0 1-2 1.38Z"
                  fill="currentColor"
                />
              </svg>
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-surface" />
            </button>

            <div className="hidden items-center gap-3 rounded-2xl border border-border bg-surface px-3 py-2 shadow-soft sm:flex">
              <div className="fc-avatar h-9 w-9 text-xs">MC</div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">Maya Chen</p>
                <p className="truncate text-xs text-muted-foreground">Owner</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden border-r border-border bg-surface lg:block">
          <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col px-5 py-6">
            <div className="rounded-2xl border border-border bg-canvas p-4 shadow-soft">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Team Switcher
              </p>
              <button className="mt-3 flex w-full items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3 text-left shadow-soft transition-all hover:border-border-strong hover:shadow-medium">
                <div>
                  <p className="text-sm font-semibold text-foreground">Studio Team</p>
                  <p className="text-xs text-muted-foreground">9 active collaborators</p>
                </div>
                <svg aria-hidden="true" className="h-4 w-4 text-muted-foreground" viewBox="0 0 20 20">
                  <path d="m5 7 5 6 5-6H5Z" fill="currentColor" />
                </svg>
              </button>
              <div className="mt-3 space-y-2">
                {teamOptions.slice(1).map((team) => (
                  <div
                    key={team}
                    className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {team}
                  </div>
                ))}
              </div>
            </div>

            <nav className="mt-6 space-y-1">
              {sidebarLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.label}
                  className={`rounded-2xl px-4 py-3 text-sm transition-all ${
                    pathname === link.href
                      ? "bg-primary-subtle font-medium text-primary shadow-soft"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto rounded-3xl border border-border bg-gradient-to-br from-primary-subtle/70 via-surface to-accent-subtle/70 p-5 shadow-soft">
              <p className="text-sm font-semibold text-foreground">Quick Upload</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Drop large files, keep everyone aligned, and let auto-expiry handle the cleanup.
              </p>
              <button className="fc-button-primary mt-4 w-full justify-center">Upload New File</button>
            </div>
          </div>
        </aside>

        <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export function DashboardMobileStrip() {
  return (
    <div className="mb-6 flex gap-3 overflow-x-auto pb-1 lg:hidden">
      <button className="flex min-w-[220px] items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3 shadow-soft">
        <div className="text-left">
          <p className="text-sm font-semibold text-foreground">Studio Team</p>
          <p className="text-xs text-muted-foreground">9 active collaborators</p>
        </div>
        <svg aria-hidden="true" className="h-4 w-4 text-muted-foreground" viewBox="0 0 20 20">
          <path d="m5 7 5 6 5-6H5Z" fill="currentColor" />
        </svg>
      </button>
      <button className="fc-button-primary min-w-fit whitespace-nowrap px-4">Quick Upload</button>
    </div>
  );
}
