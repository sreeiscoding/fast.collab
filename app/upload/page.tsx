import {
  DashboardMobileStrip,
  DashboardShell,
} from "@/src/components/dashboard/dashboard-shell";
import { UploadExperiencePage } from "@/src/components/upload/upload-experience";

export default function UploadPage() {
  return (
    <DashboardShell>
      <DashboardMobileStrip />
      <UploadExperiencePage />
    </DashboardShell>
  );
}
