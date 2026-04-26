"use client";

import { useMemo, useState } from "react";
import { useAppData } from "@/src/context/AppDataContext";
import { useTeam } from "@/src/context/TeamContext";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Editor" | "Viewer";
  status: "Active" | "Invited";
  initials: string;
  lastActive: string;
};

const roles: TeamMember["role"][] = ["Owner", "Editor", "Viewer"];

const roleDetails: Record<TeamMember["role"], string> = {
  Owner: "Full control over billing, members, and workspace settings.",
  Editor: "Can upload, organize, and collaborate on shared media.",
  Viewer: "Can review and download shared files without editing.",
};

type RolePickerTarget =
  | { scope: "invite" }
  | { scope: "member"; memberId: string };

export function TeamManagement() {
  const { activeTeamId } = useTeam();
  const { inviteMember, members: allMembers, removeMember, updateMemberRole } = useAppData();
  const members = allMembers.filter((member) => member.teamId === activeTeamId);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamMember["role"]>("Viewer");
  const [rolePickerTarget, setRolePickerTarget] = useState<RolePickerTarget | null>(null);
  const [statusMessage, setStatusMessage] = useState("Role changes sync live across the workspace.");

  const summary = useMemo(() => {
    const owners = members.filter((member) => member.role === "Owner").length;
    const editors = members.filter((member) => member.role === "Editor").length;
    const viewers = members.filter((member) => member.role === "Viewer").length;

    return { owners, editors, viewers };
  }, [members]);

  const inviteDisabled = inviteEmail.trim().length === 0;

  function handleRoleChange(memberId: string, role: TeamMember["role"]) {
    updateMemberRole(activeTeamId, memberId, role);
    const memberName = members.find((member) => member.id === memberId)?.name ?? "Member";
    setStatusMessage(`${memberName} role updated to ${role}.`);
  }

  function handleRemove(memberId: string) {
    removeMember(activeTeamId, memberId);
    setStatusMessage("Member access removed.");
  }

  function handleInviteSubmit() {
    if (!inviteEmail.trim()) return;

    const email = inviteEmail.trim();
    inviteMember(activeTeamId, email, inviteRole);

    setInviteEmail("");
    setInviteRole("Viewer");
    setInviteOpen(false);
    setStatusMessage(`Invite sent to ${email}.`);
  }

  function handleExportList() {
    const rows = [
      ["Name", "Email", "Role", "Status", "Last active"].join(","),
      ...members.map((member) =>
        [member.name, member.email, member.role, member.status, member.lastActive].join(","),
      ),
    ].join("\n");

    const blob = new Blob([rows], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "fastcollab-team-members.csv";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setStatusMessage("Member list exported.");
  }

  function handleEdit(member: TeamMember) {
    setInviteEmail(member.email);
    setInviteRole(member.role);
    setInviteOpen(true);
    setStatusMessage(`Editing permissions for ${member.name}.`);
  }

  function handleOpenRolePicker(target: RolePickerTarget) {
    setRolePickerTarget(target);
  }

  function handleSelectRole(role: TeamMember["role"]) {
    if (!rolePickerTarget) return;

    if (rolePickerTarget.scope === "invite") {
      setInviteRole(role);
      setStatusMessage(`Invite role set to ${role}.`);
      setRolePickerTarget(null);
      return;
    }

    handleRoleChange(rolePickerTarget.memberId, role);
    setRolePickerTarget(null);
  }

  const activeRole =
    rolePickerTarget?.scope === "invite"
      ? inviteRole
      : members.find((member) => member.id === rolePickerTarget?.memberId)?.role ?? "Viewer";

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
                "Change permissions inline with the role drawer in the member table.",
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

            <div className="mt-4 rounded-2xl border border-success/20 bg-success-subtle px-4 py-3 text-sm text-success">
              {statusMessage}
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
              <button className="fc-button-secondary h-10 px-4" onClick={handleExportList} type="button">
                Export list
              </button>
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
                    <div>
                      <button
                        aria-expanded={
                          rolePickerTarget?.scope === "member" &&
                          rolePickerTarget.memberId === member.id
                        }
                        aria-haspopup="dialog"
                        className="fc-input h-10 items-center justify-between"
                        onClick={() => handleOpenRolePicker({ scope: "member", memberId: member.id })}
                        type="button"
                      >
                        <span className="text-sm text-foreground">{member.role}</span>
                        <svg
                          aria-hidden="true"
                          className="h-4 w-4 text-muted-foreground"
                          viewBox="0 0 20 20"
                        >
                          <path d="m5 7 5 6 5-6H5Z" fill="currentColor" />
                        </svg>
                      </button>
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
                    <button
                      className="fc-button-ghost h-9 px-3 text-xs"
                      onClick={() => handleEdit(member)}
                      type="button"
                    >
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
                <label className="text-sm font-medium text-foreground" htmlFor="invite-role-trigger">
                  Role assignment
                </label>
                <button
                  aria-expanded={rolePickerTarget?.scope === "invite"}
                  aria-haspopup="dialog"
                  className="fc-input items-center justify-between"
                  id="invite-role-trigger"
                  onClick={() => handleOpenRolePicker({ scope: "invite" })}
                  type="button"
                >
                  <span className="text-sm text-foreground">{inviteRole}</span>
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 text-muted-foreground"
                    viewBox="0 0 20 20"
                  >
                    <path d="m5 7 5 6 5-6H5Z" fill="currentColor" />
                  </svg>
                </button>
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

      {rolePickerTarget ? (
        <div className="fixed inset-0 z-[70] bg-slate-950/35 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={() => setRolePickerTarget(null)}
            role="button"
            tabIndex={-1}
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-[430px] border-l border-border bg-surface shadow-large">
            <div className="flex h-full flex-col">
              <div className="border-b border-border px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Role Picker</p>
                    <h2 className="mt-2 text-xl font-semibold text-foreground">
                      Select access level
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Choose how much control this member should have in FastCollab.
                    </p>
                  </div>
                  <button
                    className="fc-button-ghost h-10 w-10 p-0"
                    onClick={() => setRolePickerTarget(null)}
                    type="button"
                  >
                    <span className="sr-only">Close role picker</span>
                    <svg aria-hidden="true" className="h-5 w-5 text-foreground" viewBox="0 0 20 20">
                      <path
                        d="m5.28 6.34 1.06-1.06L10 8.94l3.66-3.66 1.06 1.06L11.06 10l3.66 3.66-1.06 1.06L10 11.06l-3.66 3.66-1.06-1.06L8.94 10 5.28 6.34Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-5">
                {roles.map((role) => {
                  const isActive = activeRole === role;
                  return (
                    <button
                      key={role}
                      className={`w-full rounded-2xl border px-4 py-4 text-left transition-all ${
                        isActive
                          ? "border-primary/30 bg-primary-subtle shadow-soft"
                          : "border-border bg-canvas hover:border-border-strong hover:bg-surface"
                      }`}
                      onClick={() => handleSelectRole(role)}
                      type="button"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className={`text-sm font-semibold ${isActive ? "text-primary" : "text-foreground"}`}>
                            {role}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            {roleDetails[role]}
                          </p>
                        </div>
                        {isActive ? <span className="fc-badge-success">Current</span> : null}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
