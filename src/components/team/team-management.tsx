"use client";

import { useMemo, useState } from "react";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Editor" | "Viewer";
  status: "Active" | "Invited";
  initials: string;
  lastActive: string;
};

const initialMembers: TeamMember[] = [
  {
    id: "maya-chen",
    name: "Maya Chen",
    email: "maya@fastcollab.com",
    role: "Owner",
    status: "Active",
    initials: "MC",
    lastActive: "Online now",
  },
  {
    id: "jordan-rivera",
    name: "Jordan Rivera",
    email: "jordan@fastcollab.com",
    role: "Editor",
    status: "Active",
    initials: "JR",
    lastActive: "8 mins ago",
  },
  {
    id: "amina-yusuf",
    name: "Amina Yusuf",
    email: "amina@fastcollab.com",
    role: "Editor",
    status: "Active",
    initials: "AY",
    lastActive: "23 mins ago",
  },
  {
    id: "noah-ellis",
    name: "Noah Ellis",
    email: "noah@clientco.com",
    role: "Viewer",
    status: "Invited",
    initials: "NE",
    lastActive: "Invite pending",
  },
];

const roles: TeamMember["role"][] = ["Owner", "Editor", "Viewer"];

export function TeamManagement() {
  const [members, setMembers] = useState(initialMembers);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamMember["role"]>("Viewer");

  const summary = useMemo(() => {
    const owners = members.filter((member) => member.role === "Owner").length;
    const editors = members.filter((member) => member.role === "Editor").length;
    const viewers = members.filter((member) => member.role === "Viewer").length;

    return { owners, editors, viewers };
  }, [members]);

  const inviteDisabled = inviteEmail.trim().length === 0;

  function handleRoleChange(memberId: string, role: TeamMember["role"]) {
    setMembers((current) =>
      current.map((member) => (member.id === memberId ? { ...member, role } : member)),
    );
  }

  function handleRemove(memberId: string) {
    setMembers((current) => current.filter((member) => member.id !== memberId));
  }

  function handleInviteSubmit() {
    if (!inviteEmail.trim()) return;

    const email = inviteEmail.trim();
    const name = email.split("@")[0].replace(/[._-]+/g, " ");
    const initials = name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");

    setMembers((current) => [
      {
        id: email.toLowerCase(),
        name: name.replace(/\b\w/g, (char) => char.toUpperCase()),
        email,
        role: inviteRole,
        status: "Invited",
        initials: initials || "TM",
        lastActive: "Invite sent now",
      },
      ...current,
    ]);

    setInviteEmail("");
    setInviteRole("Viewer");
    setInviteOpen(false);
  }

  return (
    <>
      <div className="space-y-6 lg:space-y-8">
        <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="fc-card-elevated">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-success/15 bg-success-subtle px-3 py-1 text-xs font-medium text-success">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  Team access synced live
                </div>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  Manage members, invites, and permissions.
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                  Keep your workspace secure with clear roles, quick invites, and calm control over who can upload, edit, and view.
                </p>
              </div>

              <button className="fc-button-primary h-11 whitespace-nowrap px-5" onClick={() => setInviteOpen(true)} type="button">
                Invite member
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Owners
                </p>
                <p className="mt-3 text-3xl font-semibold text-foreground">{summary.owners}</p>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Editors
                </p>
                <p className="mt-3 text-3xl font-semibold text-primary">{summary.editors}</p>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Viewers
                </p>
                <p className="mt-3 text-3xl font-semibold text-warning">{summary.viewers}</p>
              </div>
            </div>
          </div>

          <div className="fc-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Interaction Guide
                </p>
                <h2 className="mt-2 text-xl font-semibold text-foreground">Fast control surface</h2>
              </div>
              <span className="fc-badge-success">Realtime</span>
            </div>

            <div className="mt-6 space-y-3">
              {[
                "Invite new teammates with email and assign a role before sending.",
                "Change permissions inline with the role dropdown in the member table.",
                "Remove access instantly without leaving the page.",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-muted/70 px-4 py-3 text-sm leading-6 text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-canvas p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Pending invites</p>
                <span className="fc-badge-warning">
                  {members.filter((member) => member.status === "Invited").length}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Invites appear immediately in the member list with a visible pending state, so owners can track access at a glance.
              </p>
            </div>
          </div>
        </section>

        <section className="fc-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Member List
              </p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Workspace members</h2>
            </div>

            <div className="flex items-center gap-2">
              <button className="fc-button-secondary h-10 px-4">Export list</button>
              <button className="fc-button-primary h-10 px-4" onClick={() => setInviteOpen(true)} type="button">
                Invite member
              </button>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-[24px] border border-border">
            <div className="hidden grid-cols-[minmax(0,1.4fr)_160px_140px_160px_120px] gap-4 bg-muted/60 px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground lg:grid">
              <span>Member</span>
              <span>Role</span>
              <span>Status</span>
              <span>Last active</span>
              <span>Actions</span>
            </div>

            <div className="divide-y divide-border">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="grid gap-4 px-5 py-4 transition-colors hover:bg-muted/50 lg:grid-cols-[minmax(0,1.4fr)_160px_140px_160px_120px] lg:items-center"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="fc-avatar h-11 w-11 shrink-0 text-sm">{member.initials}</div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{member.name}</p>
                      <p className="truncate text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2 lg:space-y-0">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground lg:hidden">
                      Role
                    </p>
                    <div className="relative">
                      <select
                        className="fc-input h-10 appearance-none pr-10"
                        onChange={(event) =>
                          handleRoleChange(member.id, event.target.value as TeamMember["role"])
                        }
                        value={member.role}
                      >
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                      <svg
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                        viewBox="0 0 20 20"
                      >
                        <path d="m5 7 5 6 5-6H5Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-2 lg:space-y-0">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground lg:hidden">
                      Status
                    </p>
                    <span className={member.status === "Active" ? "fc-badge-success" : "fc-badge-warning"}>
                      {member.status}
                    </span>
                  </div>

                  <div className="space-y-2 lg:space-y-0">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground lg:hidden">
                      Last active
                    </p>
                    <p className="text-sm text-muted-foreground">{member.lastActive}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="fc-button-ghost h-9 px-3 text-xs" type="button">
                      Edit
                    </button>
                    <button
                      className="fc-button-danger h-9 px-3 text-xs"
                      onClick={() => handleRemove(member.id)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {inviteOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[28px] border border-border bg-surface p-6 shadow-large sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
                  Invite Modal
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">Invite team member</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Send an email invite, assign access up front, and keep onboarding friction low.
                </p>
              </div>

              <button className="fc-button-ghost h-10 w-10 p-0" onClick={() => setInviteOpen(false)} type="button">
                <span className="sr-only">Close invite modal</span>
                <svg aria-hidden="true" className="h-5 w-5 text-foreground" viewBox="0 0 20 20">
                  <path
                    d="m5.28 6.34 1.06-1.06L10 8.94l3.66-3.66 1.06 1.06L11.06 10l3.66 3.66-1.06 1.06L10 11.06l-3.66 3.66-1.06-1.06L8.94 10 5.28 6.34Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="invite-email">
                  Email address
                </label>
                <input
                  className="fc-input"
                  id="invite-email"
                  onChange={(event) => setInviteEmail(event.target.value)}
                  placeholder="teammate@company.com"
                  type="email"
                  value={inviteEmail}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="invite-role">
                  Role assignment
                </label>
                <div className="relative">
                  <select
                    className="fc-input appearance-none pr-10"
                    id="invite-role"
                    onChange={(event) => setInviteRole(event.target.value as TeamMember["role"])}
                    value={inviteRole}
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    viewBox="0 0 20 20"
                  >
                    <path d="m5 7 5 6 5-6H5Z" fill="currentColor" />
                  </svg>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-muted/60 px-4 py-3">
                <p className="text-sm font-semibold text-foreground">Interaction notes</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Owners can manage billing and permissions, Editors can upload and organize files, and Viewers can review shared content without editing access.
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button className="fc-button-secondary h-11 px-5" onClick={() => setInviteOpen(false)} type="button">
                Cancel
              </button>
              <button
                className="fc-button-primary h-11 px-5"
                disabled={inviteDisabled}
                onClick={handleInviteSubmit}
                type="button"
              >
                Send invite
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
