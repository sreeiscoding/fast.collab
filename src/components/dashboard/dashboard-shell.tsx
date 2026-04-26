"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useTeam } from "@/src/context/TeamContext";

type DashboardShellProps = {
  children: ReactNode;
};

type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  time: string;
  tone: "default" | "warning" | "success";
  read: boolean;
  href: string;
  teamId: string;
};

const sidebarLinks = [
  { label: "Overview", href: "/dashboard", icon: "overview" },
  { label: "Projects", href: "/projects", icon: "projects" },
  { label: "Uploads", href: "/upload", icon: "uploads" },
  { label: "Shared Files", href: "/files", icon: "files" },
  { label: "Team", href: "/team", icon: "team" },
  { label: "Billing", href: "/pricing", icon: "billing" },
  { label: "Settings", href: "/settings", icon: "settings" },
];

const teamOptions = [
  { id: "team-1", name: "Studio Team", meta: "9 active collaborators" },
  { id: "team-2", name: "Northwind Ops", meta: "5 active collaborators" },
  { id: "team-3", name: "Client Review", meta: "3 active collaborators" },
];

const searchableItems = [
  { id: "proj-1", type: "project", name: "Q4 Product Launch", meta: "5 team members", teamId: "team-1" },
  { id: "proj-2", type: "project", name: "Client Website Redesign", meta: "3 team members", teamId: "team-2" },
  { id: "proj-3", type: "project", name: "Internal Review Campaign", meta: "2 team members", teamId: "team-3" },
  { id: "upload-1", type: "upload", name: "Campaign_Master_v12.mp4", meta: "uploaded by Maya Chen", teamId: "team-1" },
  { id: "upload-2", type: "upload", name: "Launch_Selects_Press.zip", meta: "uploaded by Jordan Rivera", teamId: "team-2" },
  { id: "upload-3", type: "upload", name: "Hero_Stills_Final_Selects.png", meta: "uploaded by Amina Yusuf", teamId: "team-1" },
  { id: "upload-4", type: "upload", name: "Q4_Strategic_Plan.pdf", meta: "uploaded by Noah Ellis", teamId: "team-3" },
  { id: "teammate-1", type: "teammate", name: "Maya Chen", meta: "Designer", teamId: "team-1" },
  { id: "teammate-2", type: "teammate", name: "Jordan Rivera", meta: "Project Manager", teamId: "team-2" },
  { id: "teammate-3", type: "teammate", name: "Amina Yusuf", meta: "Lead Developer", teamId: "team-1" },
  { id: "teammate-4", type: "teammate", name: "Noah Ellis", meta: "QA Engineer", teamId: "team-3" },
];

const initialNotifications: NotificationItem[] = [
  {
    id: "upload-1",
    title: "Amina uploaded Product_Reel.mp4",
    detail: "Upload completed and ready to share with the client team.",
    time: "2 mins ago",
    tone: "success",
    read: false,
    href: "/files",
    teamId: "team-1",
  },
  {
    id: "expiry-1",
    title: "Launch_Selects_Press.zip expires in 2 days",
    detail: "Consider extending expiry if external stakeholders still need access.",
    time: "17 mins ago",
    tone: "warning",
    read: false,
    href: "/files",
    teamId: "team-2",
  },
  {
    id: "invite-1",
    title: "Jordan invited Noah Ellis to Studio Team",
    detail: "Pending invite sent to noah@clientco.com.",
    time: "1 hour ago",
    tone: "default",
    read: true,
    href: "/team",
    teamId: "team-1",
  },
  {
    id: "project-1",
    title: "Spring Campaign Launch reached 78% complete",
    detail: "Recent upload batch pushed project progress forward.",
    time: "3 hours ago",
    tone: "default",
    read: true,
    href: "/projects",
    teamId: "team-1",
  },
  {
    id: "upload-2",
    title: "Strategic Plan doc shared in Northwind Ops",
    detail: "Noah Ellis shared Q4_Strategic_Plan.pdf with the team.",
    time: "5 hours ago",
    tone: "success",
    read: true,
    href: "/files",
    teamId: "team-2",
  },
  {
    id: "project-2",
    title: "Client Review project approved",
    detail: "All stakeholders have signed off on the final deliverables.",
    time: "1 day ago",
    tone: "success",
    read: true,
    href: "/projects",
    teamId: "team-3",
  },
];

type IconName = (typeof sidebarLinks)[number]["icon"];

function NavIcon({ className, name }: { className?: string; name: IconName }) {
  if (name === "overview") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
        <path
          d="M3.75 5.25A1.5 1.5 0 0 1 5.25 3.75h3.5a1.5 1.5 0 0 1 1.5 1.5v3.5a1.5 1.5 0 0 1-1.5 1.5h-3.5a1.5 1.5 0 0 1-1.5-1.5v-3.5Zm6 0a1.5 1.5 0 0 1 1.5-1.5h3.5a1.5 1.5 0 0 1 1.5 1.5v9.5a1.5 1.5 0 0 1-1.5 1.5h-3.5a1.5 1.5 0 0 1-1.5-1.5v-9.5Zm-6 6a1.5 1.5 0 0 1 1.5-1.5h3.5a1.5 1.5 0 0 1 1.5 1.5v3.5a1.5 1.5 0 0 1-1.5 1.5h-3.5a1.5 1.5 0 0 1-1.5-1.5v-3.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "projects") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
        <path
          d="M3.5 5.5A1.75 1.75 0 0 1 5.25 3.75h4.06c.46 0 .9.18 1.23.51l.7.7c.33.33.77.51 1.23.51h2.28A1.75 1.75 0 0 1 16.5 7.22v7.53a1.75 1.75 0 0 1-1.75 1.75H5.25A1.75 1.75 0 0 1 3.5 14.75V5.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "uploads") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
        <path
          d="M10 3.25a.75.75 0 0 1 .75.75v7.19l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 1.06-1.06l2.22 2.22V4a.75.75 0 0 1 .75-.75Zm-5 10a.75.75 0 0 1 .75.75v.75h8.5V14a.75.75 0 0 1 1.5 0v1a1.25 1.25 0 0 1-1.25 1.25h-9A1.25 1.25 0 0 1 4.25 15v-1a.75.75 0 0 1 .75-.75Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "files") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
        <path
          d="M5.25 3.75A1.75 1.75 0 0 0 3.5 5.5v9a1.75 1.75 0 0 0 1.75 1.75h9a1.75 1.75 0 0 0 1.75-1.75v-6.4a1.75 1.75 0 0 0-.51-1.24L13.14 4.5a1.75 1.75 0 0 0-1.24-.51H5.25Zm5.5 1.56V7a1 1 0 0 0 1 1h1.69l-2.69-2.69Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "team") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
        <path
          d="M10 4.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5Zm-5 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm10 0a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM2.75 14c0-1.24 1.01-2.25 2.25-2.25h1.1c.79 0 1.53.41 1.94 1.08l.27.43h3.38l.27-.43a2.29 2.29 0 0 1 1.94-1.08H15c1.24 0 2.25 1.01 2.25 2.25v1a.75.75 0 0 1-.75.75H3.5a.75.75 0 0 1-.75-.75v-1Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "billing") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
        <path
          d="M4.5 4.25A1.75 1.75 0 0 0 2.75 6v8A1.75 1.75 0 0 0 4.5 15.75h11A1.75 1.75 0 0 0 17.25 14V6A1.75 1.75 0 0 0 15.5 4.25h-11Zm-.25 3h11.5v1.5H4.25v-1.5Zm0 3h4.5v1.5h-4.5v-1.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20">
      <path
        d="M10 3a2 2 0 0 1 2 2v.3a4.75 4.75 0 0 1 1.3.74l.22-.13a2 2 0 1 1 2 3.46l-.22.13a4.75 4.75 0 0 1 0 1.5l.22.13a2 2 0 1 1-2 3.46l-.22-.13a4.75 4.75 0 0 1-1.3.74V15a2 2 0 1 1-4 0v-.3a4.75 4.75 0 0 1-1.3-.74l-.22.13a2 2 0 1 1-2-3.46l.22-.13a4.75 4.75 0 0 1 0-1.5l-.22-.13a2 2 0 1 1 2-3.46l.22.13A4.75 4.75 0 0 1 8 5.3V5a2 2 0 0 1 2-2Zm0 4.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const { activeTeamId, setActiveTeamId, teams } = useTeam();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read && notification.teamId === activeTeamId).length,
    [notifications, activeTeamId],
  );

  const visibleNotifications = useMemo(() => {
    let result = notifications.filter((notification) => notification.teamId === activeTeamId);
    if (!showUnreadOnly) return result;
    return result.filter((notification) => !notification.read);
  }, [notifications, showUnreadOnly, activeTeamId]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return searchableItems
      .filter((item) => item.teamId === activeTeamId)
      .filter((item) =>
        item.name.toLowerCase().includes(query) ||
        item.meta.toLowerCase().includes(query)
      );
  }, [searchQuery, activeTeamId]);

  function handleMarkAllRead() {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, read: true })),
    );
  }

  function handleToggleRead(id: string) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: !notification.read }
          : notification,
      ),
    );
  }

  useEffect(() => {
    if (!notificationsOpen && !mobileNavOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setNotificationsOpen(false);
        setMobileNavOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileNavOpen, notificationsOpen]);

  return (
    <div className="min-h-screen bg-canvas">
      {mobileNavOpen ? (
        <div className="fixed inset-0 z-[70] bg-slate-950/35 backdrop-blur-sm lg:hidden">
          <div className="absolute left-4 right-4 top-20 rounded-[28px] border border-border bg-surface p-4 shadow-large">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">Navigation</p>
                <p className="text-xs text-muted-foreground">FastCollab workspace</p>
              </div>
              <button className="fc-button-ghost h-10 w-10 p-0" onClick={() => setMobileNavOpen(false)} type="button">
                <span className="sr-only">Close navigation</span>
                <svg aria-hidden="true" className="h-5 w-5 text-foreground" viewBox="0 0 20 20">
                  <path
                    d="m5.28 6.34 1.06-1.06L10 8.94l3.66-3.66 1.06 1.06L11.06 10l3.66 3.66-1.06 1.06L10 11.06l-3.66 3.66-1.06-1.06L8.94 10 5.28 6.34Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-4 grid gap-2">
              {sidebarLinks.map((link) => (
                <Link
                  className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all ${
                    pathname === link.href
                      ? "bg-primary-subtle font-medium text-primary shadow-soft"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  href={link.href}
                  key={link.label}
                  onClick={() => setMobileNavOpen(false)}
                >
                  <NavIcon className="h-4 w-4 shrink-0" name={link.icon} />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {notificationsOpen ? (
        <div className="fixed inset-0 z-[75] bg-slate-950/25 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={() => setNotificationsOpen(false)}
            role="button"
            tabIndex={-1}
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-[430px] border-l border-border bg-surface shadow-large">
            <div className="flex h-full flex-col">
              <div className="border-b border-border px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
                      Notifications
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-foreground">
                      Recent activity and alerts
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {unreadCount} unread across uploads, expiry, and team actions.
                    </p>
                  </div>
                  <button
                    className="fc-button-ghost h-10 w-10 p-0"
                    onClick={() => setNotificationsOpen(false)}
                    type="button"
                  >
                    <span className="sr-only">Close notifications</span>
                    <svg aria-hidden="true" className="h-5 w-5 text-foreground" viewBox="0 0 20 20">
                      <path
                        d="m5.28 6.34 1.06-1.06L10 8.94l3.66-3.66 1.06 1.06L11.06 10l3.66 3.66-1.06 1.06L10 11.06l-3.66 3.66-1.06-1.06L8.94 10 5.28 6.34Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button
                    className={`rounded-xl px-3 py-2 text-sm transition-all ${
                      !showUnreadOnly
                        ? "bg-primary-subtle font-medium text-primary"
                        : "bg-canvas text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setShowUnreadOnly(false)}
                    type="button"
                  >
                    All
                  </button>
                  <button
                    className={`rounded-xl px-3 py-2 text-sm transition-all ${
                      showUnreadOnly
                        ? "bg-primary-subtle font-medium text-primary"
                        : "bg-canvas text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setShowUnreadOnly(true)}
                    type="button"
                  >
                    Unread
                  </button>
                  <button
                    className="fc-button-ghost ml-auto h-9 px-3 text-xs"
                    onClick={handleMarkAllRead}
                    type="button"
                  >
                    Mark all as read
                  </button>
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-5">
                {visibleNotifications.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-2xl border px-4 py-4 shadow-soft transition-all ${
                      item.read
                        ? "border-border bg-canvas"
                        : "border-primary/20 bg-surface-raised"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-1 h-2.5 w-2.5 rounded-full ${
                            item.tone === "success"
                              ? "bg-success"
                              : item.tone === "warning"
                                ? "bg-warning"
                                : "bg-primary"
                          }`}
                        />
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.title}</p>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                        </div>
                      </div>
                      {!item.read ? <span className="fc-badge-success">New</span> : null}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                      <div className="flex items-center gap-2">
                        <button
                          className="fc-button-ghost h-8 px-3 text-xs"
                          onClick={() => handleToggleRead(item.id)}
                          type="button"
                        >
                          {item.read ? "Mark unread" : "Mark read"}
                        </button>
                        <Link
                          className="fc-button-secondary h-8 px-3 text-xs"
                          href={item.href}
                          onClick={() => setNotificationsOpen(false)}
                        >
                          Open
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

                {visibleNotifications.length === 0 ? (
                  <div className="fc-empty-state">
                    <p className="text-sm font-semibold text-foreground">All caught up</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      No unread alerts right now. New events will show here in realtime.
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="border-t border-border p-5">
                <div className="grid grid-cols-3 gap-2">
                  <Link className="fc-button-ghost h-10 justify-center text-xs" href="/files" onClick={() => setNotificationsOpen(false)}>
                    Files
                  </Link>
                  <Link className="fc-button-ghost h-10 justify-center text-xs" href="/team" onClick={() => setNotificationsOpen(false)}>
                    Team
                  </Link>
                  <Link className="fc-button-primary h-10 justify-center text-xs" href="/upload" onClick={() => setNotificationsOpen(false)}>
                    Upload
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      ) : null}

      <header className="fc-navbar sticky top-0 z-50 w-full">
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button className="fc-button-ghost h-10 w-10 p-0 lg:hidden" onClick={() => setMobileNavOpen(true)} type="button">
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
            <div className="relative w-full max-w-xl">
              <div className="flex w-full items-center rounded-2xl border border-border bg-surface px-4 py-2 shadow-soft">
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
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchActive(true);
                  }}
                  onFocus={() => setIsSearchActive(true)}
                  onBlur={() => setTimeout(() => setIsSearchActive(false), 200)}
                />
              </div>

              {isSearchActive && searchQuery.trim() && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-border bg-surface shadow-lg">
                  <div className="max-h-80 overflow-y-auto py-1">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => {
                          setSearchQuery("");
                          setIsSearchActive(false);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors duration-150 hover:bg-muted hover:text-foreground"
                        type="button"
                      >
                        {result.type === "project" && (
                          <div className="h-8 w-8 shrink-0 rounded-lg bg-primary-subtle flex items-center justify-center">
                            <svg aria-hidden="true" className="h-4 w-4 text-primary" viewBox="0 0 20 20">
                              <path d="M3.5 5.5A1.75 1.75 0 0 1 5.25 3.75h4.06c.46 0 .9.18 1.23.51l.7.7c.33.33.77.51 1.23.51h2.28A1.75 1.75 0 0 1 16.5 7.22v7.53a1.75 1.75 0 0 1-1.75 1.75H5.25A1.75 1.75 0 0 1 3.5 14.75V5.5Z" fill="currentColor" />
                            </svg>
                          </div>
                        )}
                        {result.type === "upload" && (
                          <div className="h-8 w-8 shrink-0 rounded-lg bg-accent-subtle flex items-center justify-center">
                            <svg aria-hidden="true" className="h-4 w-4 text-accent" viewBox="0 0 20 20">
                              <path d="M10 3.25a.75.75 0 0 1 .75.75v7.19l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 1.06-1.06l2.22 2.22V4a.75.75 0 0 1 .75-.75Z" fill="currentColor" />
                            </svg>
                          </div>
                        )}
                        {result.type === "teammate" && (
                          <div className="h-8 w-8 shrink-0 rounded-lg bg-success-subtle flex items-center justify-center">
                            <svg aria-hidden="true" className="h-4 w-4 text-success" viewBox="0 0 20 20">
                              <path d="M10 4.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5Zm-5 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm10 0a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM2.75 14c0-1.24 1.01-2.25 2.25-2.25h1.1c.79 0 1.53.41 1.94 1.08l.27.43h3.38l.27-.43a2.29 2.29 0 0 1 1.94-1.08H15c1.24 0 2.25 1.01 2.25 2.25v1a.75.75 0 0 1-.75.75H3.5a.75.75 0 0 1-.75-.75v-1Z" fill="currentColor" />
                            </svg>
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-foreground">{result.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{result.meta}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isSearchActive && searchQuery.trim() && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-border bg-surface shadow-lg p-4">
                  <p className="text-center text-sm text-muted-foreground">No results found for &quot;{searchQuery}&quot;</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="fc-button-ghost relative h-10 w-10 p-0"
              onClick={() => {
                setMobileNavOpen(false);
                setNotificationsOpen(true);
              }}
              type="button"
            >
              <span className="sr-only">Notifications</span>
              <svg aria-hidden="true" className="h-5 w-5 text-foreground" viewBox="0 0 20 20">
                <path
                  d="M10 2.75a4 4 0 0 0-4 4v1.18c0 .73-.2 1.45-.59 2.07L4.2 12.1a1.5 1.5 0 0 0 1.28 2.27h9.04a1.5 1.5 0 0 0 1.28-2.27l-1.2-2.03A3.98 3.98 0 0 1 14 7.93V6.75a4 4 0 0 0-4-4Zm0 14.5a2.1 2.1 0 0 1-2-1.38h4a2.1 2.1 0 0 1-2 1.38Z"
                  fill="currentColor"
                />
              </svg>
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-surface" />
              {unreadCount > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {unreadCount}
                </span>
              ) : null}
            </button>

            <Link className="hidden items-center gap-3 rounded-2xl border border-border bg-surface px-3 py-2 shadow-soft sm:flex" href="/settings">
              <div className="fc-avatar h-9 w-9 text-xs">MC</div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">Maya Chen</p>
                <p className="truncate text-xs text-muted-foreground">Owner</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden border-r border-border bg-surface lg:block">
          <div className="fc-scrollbar-none sticky top-16 flex h-[calc(100vh-4rem)] flex-col overflow-y-auto px-5 py-6">
            <div className="rounded-2xl border border-border bg-canvas p-4 shadow-soft">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 20 20">
                  <path
                    d="M10 3a2.5 2.5 0 0 1 2.5 2.5v.43a5.5 5.5 0 0 1 1.42.82l.37-.21a2 2 0 1 1 2 3.46l-.37.22c.07.34.08.69.03 1.03l.34.2a2 2 0 1 1-2 3.46l-.35-.2a5.5 5.5 0 0 1-1.44.82v.47a2.5 2.5 0 1 1-5 0v-.47a5.5 5.5 0 0 1-1.44-.83l-.35.2a2 2 0 0 1-2-3.45l.34-.2a5.5 5.5 0 0 1 .03-1.03l-.37-.22a2 2 0 0 1 2-3.46l.37.2a5.5 5.5 0 0 1 1.42-.81V5.5A2.5 2.5 0 0 1 10 3Zm0 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
                    fill="currentColor"
                  />
                </svg>
                Team Switcher
              </p>
              <div className="mt-3 space-y-2">
                {teams.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => setActiveTeamId(team.id)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left shadow-soft transition-all ${
                      activeTeamId === team.id
                        ? "border-primary bg-primary-subtle shadow-medium"
                        : "border-transparent bg-canvas/70 hover:border-border hover:bg-surface"
                    }`}
                    type="button"
                  >
                    <div>
                      <p className={`text-sm font-semibold ${activeTeamId === team.id ? "text-primary" : "text-foreground"}`}>
                        {team.name}
                      </p>
                      <p className={`text-xs ${activeTeamId === team.id ? "text-primary/70" : "text-muted-foreground"}`}>
                        {team.meta}
                      </p>
                    </div>
                    {activeTeamId === team.id ? (
                      <svg aria-hidden="true" className="h-5 w-5 text-primary" viewBox="0 0 20 20">
                        <path
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-success/70" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <nav className="mt-6 rounded-2xl border border-border bg-canvas p-2 shadow-soft">
              <p className="px-2 pb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Workspace
              </p>
              <div className="space-y-1">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      href={link.href}
                      key={link.label}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                        isActive
                          ? "bg-primary-subtle text-primary shadow-soft"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                          isActive
                            ? "bg-primary/12 text-primary"
                            : "bg-surface text-muted-foreground group-hover:bg-surface-raised group-hover:text-foreground"
                        }`}
                      >
                        <NavIcon className="h-4 w-4" name={link.icon} />
                      </span>
                      <span className={`flex-1 text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
                        {link.label}
                      </span>
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-all ${
                          isActive ? "bg-primary" : "bg-border group-hover:bg-border-strong"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="mt-auto rounded-3xl border border-border bg-gradient-to-br from-primary-subtle/70 via-surface to-accent-subtle/70 p-5 shadow-soft">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <svg aria-hidden="true" className="h-4 w-4 text-primary" viewBox="0 0 20 20">
                  <path
                    d="M10 3.25a.75.75 0 0 1 .75.75v7.19l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 1.06-1.06l2.22 2.22V4a.75.75 0 0 1 .75-.75Z"
                    fill="currentColor"
                  />
                </svg>
                Quick Upload
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Drop large files, keep everyone aligned, and let auto-expiry handle the cleanup.
              </p>
              <Link className="fc-button-primary mt-4 w-full justify-center" href="/upload">
                Upload New File
              </Link>
            </div>
          </div>
        </aside>

        <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export function DashboardMobileStrip() {
  const { activeTeamId, setActiveTeamId, teams } = useTeam();
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const activeTeam = teams.find((team) => team.id === activeTeamId) ?? teams[0];

  return (
    <div className="mb-6 space-y-2 lg:hidden">
      <div className="flex gap-3 overflow-x-auto pb-1">
        <button
          className="flex min-w-[220px] items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3 text-left shadow-soft"
          onClick={() => setSwitcherOpen((current) => !current)}
          type="button"
        >
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">{activeTeam.name}</p>
            <p className="text-xs text-muted-foreground">{activeTeam.meta}</p>
          </div>
          <svg aria-hidden="true" className="h-4 w-4 text-muted-foreground" viewBox="0 0 20 20">
            <path d="m5 7 5 6 5-6H5Z" fill="currentColor" />
          </svg>
        </button>
        <Link className="fc-button-primary inline-flex min-w-fit items-center gap-2 whitespace-nowrap px-4" href="/upload">
          <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20">
            <path
              d="M10 3.25a.75.75 0 0 1 .75.75v7.19l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 1.06-1.06l2.22 2.22V4a.75.75 0 0 1 .75-.75Z"
              fill="currentColor"
            />
          </svg>
          Quick Upload
        </Link>
      </div>

      {switcherOpen ? (
        <div className="rounded-2xl border border-border bg-surface p-2 shadow-soft">
          <div className="space-y-1">
            {teams.map((team) => (
              <button
                key={team.id}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-all ${
                  activeTeamId === team.id
                    ? "bg-primary-subtle text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => {
                  setActiveTeamId(team.id);
                  setSwitcherOpen(false);
                }}
                type="button"
              >
                <div>
                  <p className="text-sm font-medium">{team.name}</p>
                  <p className="text-xs opacity-80">{team.meta}</p>
                </div>
                {activeTeamId === team.id ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
