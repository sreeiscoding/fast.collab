import {
  DashboardMobileStrip,
  DashboardShell,
} from "@/src/components/dashboard/dashboard-shell";
import { FileBrowser } from "@/src/components/files/file-browser";

export default function FilesPage() {
  return (
    <DashboardShell>
      <DashboardMobileStrip />
      <FileBrowser />
    </DashboardShell>
  );
}
