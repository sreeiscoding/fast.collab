import {
  DashboardMobileStrip,
  DashboardShell,
} from "@/src/components/dashboard/dashboard-shell";
import { SettingsPage } from "@/src/components/settings/settings-page";

export default function SettingsRoute() {
  return (
    <DashboardShell>
      <DashboardMobileStrip />
      <SettingsPage />
    </DashboardShell>
  );
}
