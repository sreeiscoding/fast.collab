"use client";

import {
  DashboardMobileStrip,
  DashboardShell,
} from "@/src/components/dashboard/dashboard-shell";
import Link from "next/link";
import { useAppData } from "@/src/context/AppDataContext";
import { useTeam } from "@/src/context/TeamContext";

export default function ProjectsPage() {
  const { projects } = useAppData();
  const { activeTeamId } = useTeam();
  const teamProjects = projects.filter((project) => project.teamId === activeTeamId);

  return (
    <DashboardShell>
      <DashboardMobileStrip />
      <div className="space-y-6 lg:space-y-8">
        <section className="fc-card-elevated">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Projects</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Active workspaces for ongoing delivery.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                Track project-level collaboration, move into uploads or shared files, and keep every active initiative one click away.
              </p>
            </div>
            <Link className="fc-button-primary h-11 px-5" href="/upload">
              Create project flow
            </Link>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-3">
          {teamProjects.map((project) => (
            <div key={project.id} className="fc-card fc-interactive-surface">
              <p className="text-sm font-semibold text-foreground">{project.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{project.team}</p>
              <span className="fc-badge-success mt-4 inline-flex">{project.status}</span>
              <Link className="fc-button-secondary mt-6 w-full justify-center" href={project.route}>
                Open project
              </Link>
            </div>
          ))}
        </section>
      </div>
    </DashboardShell>
  );
}
