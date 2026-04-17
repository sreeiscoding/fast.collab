import {
  DashboardMobileStrip,
  DashboardShell,
} from "@/src/components/dashboard/dashboard-shell";
import { TeamManagement } from "@/src/components/team/team-management";

export default function TeamPage() {
  return (
    <DashboardShell>
      <DashboardMobileStrip />
      <TeamManagement />
    </DashboardShell>
  );
}
