"use client";

import { useMemo, useState } from "react";

type UploadState = "idle" | "uploading" | "success" | "error";

type UploadItem = {
  id: string;
  name: string;
  type: string;
  size: string;
  duration: string;
  resolution: string;
  status: UploadState;
  progress: number;
  speed: string;
  estimate: string;
};

const initialUploads: UploadItem[] = [
  {
    id: "campaign-reel",
    name: "Campaign_Reel_Master_v12.mp4",
    type: "Video / MP4",
    size: "4.8 GB",
    duration: "03:42",
    resolution: "3840 x 2160",
    status: "uploading",
    progress: 76,
    speed: "12.4 MB/s",
    estimate: "2m 18s remaining",
  },
  {
    id: "launch-cut",
    name: "Launch_Cutdown_ClientReview.mov",
    type: "Video / MOV",
    size: "2.1 GB",
    duration: "01:28",
    resolution: "1920 x 1080",
    status: "success",
    progress: 100,
    speed: "Completed",
    estimate: "Ready to share",
  },
  {
    id: "raw-footage",
    name: "Raw_Footage_Selects_AudioSync.mp4",
    type: "Video / MP4",
    size: "8.2 GB",
    duration: "12:13",
    resolution: "4096 x 2160",
    status: "error",
    progress: 34,
    speed: "Connection interrupted",
    estimate: "Retry upload",
  },
];

function statusBadgeClass(status: UploadState) {
  if (status === "success") return "fc-badge-success";
  if (status === "error") return "fc-badge-error";
  if (status === "uploading") return "fc-badge-warning";
  return "fc-badge-neutral";
}

function statusLabel(status: UploadState) {
  if (status === "success") return "Success";
  if (status === "error") return "Error";
  if (status === "uploading") return "Uploading";
  return "Idle";
}

type UploadSurfaceProps = {
  compact?: boolean;
  onClose?: () => void;
};

function UploadSurface({ compact = false, onClose }: UploadSurfaceProps) {
  const [dragging, setDragging] = useState(false);
  const [uploads, setUploads] = useState(initialUploads);

  const activeUpload = useMemo(
    () => uploads.find((item) => item.status === "uploading") ?? uploads[0],
    [uploads],
  );

  function addDemoUpload() {
    setUploads((current) => [
      {
        id: `new-${current.length + 1}`,
        name: "Fresh_Upload_Demo_Sequence.mp4",
        type: "Video / MP4",
        size: "6.4 GB",
        duration: "05:21",
        resolution: "3840 x 2160",
        status: "uploading",
        progress: 12,
        speed: "9.8 MB/s",
        estimate: "8m 42s remaining",
      },
      ...current,
    ]);
  }

  return (
    <div
      className={`rounded-[32px] border border-border bg-surface shadow-large ${
        compact
          ? "fc-scrollbar-none max-h-[calc(100dvh-2rem)] overflow-y-auto p-5 sm:p-6"
          : "p-6 sm:p-8"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
            {compact ? "Upload Modal" : "Large File Upload"}
          </p>
          <h2 className={`${compact ? "mt-2 text-2xl" : "mt-3 text-3xl"} font-semibold tracking-tight text-foreground`}>
            Upload large video files without friction.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Drag files in, watch real-time progress, and keep metadata, speed, and status visible from the same calm surface.
          </p>
        </div>

        {onClose ? (
          <button className="fc-button-ghost h-10 w-10 p-0" onClick={onClose} type="button">
            <span className="sr-only">Close upload modal</span>
            <svg aria-hidden="true" className="h-5 w-5 text-foreground" viewBox="0 0 20 20">
              <path
                d="m5.28 6.34 1.06-1.06L10 8.94l3.66-3.66 1.06 1.06L11.06 10l3.66 3.66-1.06 1.06L10 11.06l-3.66 3.66-1.06-1.06L8.94 10 5.28 6.34Z"
                fill="currentColor"
              />
            </svg>
          </button>
        ) : null}
      </div>

      <div className={`mt-8 grid gap-6 ${compact ? "" : "xl:grid-cols-[1.05fr_0.95fr]"}`}>
        <div className="space-y-6">
          <button
            className={`group flex w-full flex-col items-center justify-center rounded-[28px] border-2 border-dashed px-6 py-10 text-center transition-all duration-200 ${
              dragging
                ? "border-primary bg-primary-subtle/50 shadow-medium"
                : "border-border bg-canvas hover:border-border-strong hover:shadow-soft"
            }`}
            onBlur={() => setDragging(false)}
            onClick={addDemoUpload}
            onDragEnter={() => setDragging(true)}
            onDragLeave={() => setDragging(false)}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              addDemoUpload();
            }}
            type="button"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-subtle to-accent-subtle text-primary shadow-soft transition-transform duration-200 group-hover:scale-105">
              <svg aria-hidden="true" className="h-7 w-7" viewBox="0 0 24 24">
                <path
                  d="M12 4.75 7.75 9h2.75v5.75h3V9h2.75L12 4.75Zm-6.5 11.5h13v3H5.5v-3Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h3 className="mt-5 text-xl font-semibold text-foreground">
              {dragging ? "Drop to begin upload" : "Drag and drop large video files"}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
              Supports large `.mp4`, `.mov`, and production review exports. Click to simulate a file selection in this UI mock.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="fc-tag">Large video support</span>
              <span className="fc-tag">Realtime progress</span>
              <span className="fc-tag">Metadata preview</span>
            </div>
          </button>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                State
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className={statusBadgeClass(activeUpload.status)}>{statusLabel(activeUpload.status)}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Speed
              </p>
              <p className="mt-3 text-2xl font-semibold text-primary">{activeUpload.speed}</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Progress
              </p>
              <p className="mt-3 text-2xl font-semibold text-foreground">{activeUpload.progress}%</p>
            </div>
          </div>

          <div className="rounded-[28px] border border-border bg-canvas p-5 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Active transfer
                </p>
                <p className="mt-2 text-base font-semibold text-foreground">{activeUpload.name}</p>
              </div>
              <span className={statusBadgeClass(activeUpload.status)}>{statusLabel(activeUpload.status)}</span>
            </div>

            <div className="mt-5 fc-progress h-3">
              <div
                className={`fc-progress-bar transition-all duration-500 ${
                  activeUpload.status === "error"
                    ? "bg-error"
                    : "bg-gradient-to-r from-primary via-accent to-success"
                }`}
                style={{ width: `${activeUpload.progress}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
              <span>{activeUpload.speed}</span>
              <span>{activeUpload.estimate}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-border bg-surface p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  File preview metadata
                </p>
                <h3 className="mt-2 text-xl font-semibold text-foreground">Upload queue</h3>
              </div>
              <span className="fc-badge-success">Live</span>
            </div>

            <div className="mt-5 space-y-4">
              {uploads.map((upload) => (
                <div
                  key={upload.id}
                  className="rounded-2xl border border-border bg-canvas p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{upload.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{upload.type}</p>
                    </div>
                    <span className={statusBadgeClass(upload.status)}>{statusLabel(upload.status)}</span>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.14em]">Size</p>
                      <p className="mt-1 font-medium text-foreground">{upload.size}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.14em]">Duration</p>
                      <p className="mt-1 font-medium text-foreground">{upload.duration}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.14em]">Resolution</p>
                      <p className="mt-1 font-medium text-foreground">{upload.resolution}</p>
                    </div>
                  </div>

                  <div className="mt-4 fc-progress h-2.5">
                    <div
                      className={`fc-progress-bar transition-all duration-500 ${
                        upload.status === "error"
                          ? "bg-error"
                          : upload.status === "success"
                            ? "bg-success"
                            : "bg-gradient-to-r from-primary to-accent"
                      }`}
                      style={{ width: `${upload.progress}%` }}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{upload.speed}</span>
                    <span>{upload.estimate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-border bg-gradient-to-br from-primary-subtle/40 via-surface to-accent-subtle/50 p-5 shadow-soft">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
              Upload states
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["Idle", "Waiting for file drop or selection", "fc-badge-neutral"],
                ["Uploading", "Live transfer with animated progress", "fc-badge-warning"],
                ["Success", "Ready for sharing and review", "fc-badge-success"],
                ["Error", "Retry needed or connection issue", "fc-badge-error"],
              ].map(([label, text, badge]) => (
                <div key={label} className="rounded-2xl border border-border bg-surface px-4 py-3 shadow-soft">
                  <span className={badge}>{label}</span>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UploadExperiencePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-6 lg:space-y-8">
        <div className="flex items-center justify-end">
          <button className="fc-button-secondary h-11 px-5" onClick={() => setModalOpen(true)} type="button">
            Open upload modal
          </button>
        </div>
        <UploadSurface />
      </div>

      {modalOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/35 p-3 backdrop-blur-sm sm:p-4">
          <div className="w-full max-w-4xl">
            <UploadSurface compact onClose={() => setModalOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
