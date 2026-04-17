import {
  DashboardMobileStrip,
  DashboardShell,
} from "@/src/components/dashboard/dashboard-shell";
import { DashboardOverviewSkeleton } from "@/src/components/dashboard/dashboard-overview";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardMobileStrip />
      <DashboardOverviewSkeleton />
    </DashboardShell>
  );
}
