"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useTeam } from "@/src/context/TeamContext";
import { SelectDrawer } from "../ui/SelectDrawer";

type ViewMode = "grid" | "list";
type FileTypeFilter = "all" | "video" | "image" | "archive";
type SortKey = "recent" | "size" | "expiry";

type FileItem = {
  id: string;
  name: string;
  size: string;
  uploader: string;
  uploaderInitials: string;
  expiry: string;
  daysRemaining: number;
  type: FileTypeFilter;
  thumbTone: string;
  format: string;
  teamId: string;
};

const files: FileItem[] = [
  {
    id: "campaign-master",
    name: "Campaign_Master_v12.mp4",
    size: "4.8 GB",
    uploader: "Maya Chen",
    uploaderInitials: "MC",
    expiry: "Expires in 5 days",
    daysRemaining: 5,
    type: "video",
    thumbTone: "from-primary-subtle to-accent-subtle",
    format: "4K Video",
    teamId: "team-1",
  },
  {
    id: "launch-selects",
    name: "Launch_Selects_Press.zip",
    size: "1.3 GB",
    uploader: "Jordan Rivera",
    uploaderInitials: "JR",
    expiry: "Expires in 2 days",
    daysRemaining: 2,
    type: "archive",
    thumbTone: "from-warning-subtle to-surface",
    format: "Archive",
    teamId: "team-2",
  },
  {
    id: "hero-stills",
    name: "Hero_Stills_Final_Selects.png",
    size: "248 MB",
    uploader: "Amina Yusuf",
    uploaderInitials: "AY",
    expiry: "Expires in 6 days",
    daysRemaining: 6,
    type: "image",
    thumbTone: "from-accent-subtle to-primary-subtle",
    format: "Image Pack",
    teamId: "team-1",
  },
  {
    id: "storyboard-review",
    name: "Storyboard_Review_03.pdf",
    size: "42 MB",
    uploader: "Maya Chen",
    uploaderInitials: "MC",
    expiry: "Expires in 14 hours",
    daysRemaining: 0,
    type: "image",
    thumbTone: "from-error-subtle to-surface",
    format: "Review Doc",
    teamId: "team-1",
  },
  {
    id: "demo-cut",
    name: "Investor_Demo_Cutdown.mov",
    size: "2.1 GB",
    uploader: "Jordan Rivera",
    uploaderInitials: "JR",
    expiry: "Expires in 3 days",
    daysRemaining: 3,
    type: "video",
    thumbTone: "from-primary-subtle to-surface",
    format: "Video Draft",
    teamId: "team-2",
  },
  {
    id: "raw-sync",
    name: "Raw_Footage_Selects_AudioSync.mp4",
    size: "8.2 GB",
    uploader: "Noah Ellis",
    uploaderInitials: "NE",
    expiry: "Expires in 7 days",
    daysRemaining: 7,
    type: "video",
    thumbTone: "from-secondary-subtle to-accent-subtle",
    format: "Raw Video",
    teamId: "team-3",
  },
];

function parseSizeToMb(size: string) {
  const [value, unit] = size.split(" ");
  const numeric = Number.parseFloat(value);
  if (unit === "GB") return numeric * 1024;
  return numeric;
}

export function FileBrowser() {
  const { activeTeamId } = useTeam();
  const [view, setView] = useState<ViewMode>("grid");
  const [filter, setFilter] = useState<FileTypeFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("recent");
  const [downloadedFileId, setDownloadedFileId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState(() =>
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date()),
  );

  function handleRefresh() {
    setLastRefreshedAt(
      new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date()),
    );
  }

  function handleDownload(file: FileItem) {
    const manifest = [
      "FastCollab export preview",
      `File: ${file.name}`,
      `Format: ${file.format}`,
      `Size: ${file.size}`,
      `Uploader: ${file.uploader}`,
      `Expiry: ${file.expiry}`,
    ].join("\n");

    const blob = new Blob([manifest], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "_");

    anchor.href = url;
    anchor.download = `${safeName}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setDownloadedFileId(file.id);
  }

  const visibleFiles = useMemo(() => {
    let result = files.filter((file) => file.teamId === activeTeamId);
    result = filter === "all" ? result : result.filter((file) => file.type === filter);

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (file) =>
          file.name.toLowerCase().includes(query) ||
          file.uploader.toLowerCase().includes(query)
      );
    }

    result = [...result].sort((a, b) => {
      if (sortKey === "size") return parseSizeToMb(b.size) - parseSizeToMb(a.size);
      if (sortKey === "expiry") return a.daysRemaining - b.daysRemaining;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [filter, sortKey, searchQuery, activeTeamId]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return files
      .filter((file) => file.teamId === activeTeamId)
      .filter(
        (file) =>
          file.name.toLowerCase().includes(query) ||
          file.uploader.toLowerCase().includes(query)
      );
  }, [searchQuery, activeTeamId]);

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="fc-card-elevated">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-success/15 bg-success-subtle px-3 py-1 text-xs font-medium text-success">
                <span className="h-2 w-2 rounded-full bg-success" />
                Shared files synced live
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Browse files with clear previews and expiry visibility.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                Switch between a visual grid and compact list, sort the library fast, and keep downloads one click away.
              </p>
            </div>

            <Link className="fc-button-primary inline-flex h-11 items-center gap-2 whitespace-nowrap px-5" href="/upload">
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20">
                <path
                  d="M10 3.25a.75.75 0 0 1 .75.75v7.19l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 1.06-1.06l2.22 2.22V4a.75.75 0 0 1 .75-.75Z"
                  fill="currentColor"
                />
              </svg>
              Upload new file
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 20 20">
                  <path
                    d="M5.25 3.75A1.75 1.75 0 0 0 3.5 5.5v9a1.75 1.75 0 0 0 1.75 1.75h9a1.75 1.75 0 0 0 1.75-1.75v-6.4a1.75 1.75 0 0 0-.51-1.24L13.14 4.5a1.75 1.75 0 0 0-1.24-.51H5.25Z"
                    fill="currentColor"
                  />
                </svg>
                Total files
              </p>
              <p className="mt-3 text-3xl font-semibold text-foreground">{files.filter(f => f.teamId === activeTeamId).length}</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 20 20">
                  <path
                    d="M10 3.5a6.5 6.5 0 1 0 6.5 6.5A6.5 6.5 0 0 0 10 3.5Zm.75 3.25a.75.75 0 0 0-1.5 0v3.56c0 .2.08.39.22.53l2 2a.75.75 0 0 0 1.06-1.06l-1.78-1.78V6.75Z"
                    fill="currentColor"
                  />
                </svg>
                Expiring soon
              </p>
              <p className="mt-3 text-3xl font-semibold text-warning">
                {files.filter((file) => file.teamId === activeTeamId && file.daysRemaining <= 2).length}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 20 20">
                  <path
                    d="M10 3.25a.75.75 0 0 1 .75.75v7.19l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 1.06-1.06l2.22 2.22V4a.75.75 0 0 1 .75-.75Zm-5 10a.75.75 0 0 1 .75.75v.75h8.5V14a.75.75 0 0 1 1.5 0v1a1.25 1.25 0 0 1-1.25 1.25h-9A1.25 1.25 0 0 1 4.25 15v-1a.75.75 0 0 1 .75-.75Z"
                    fill="currentColor"
                  />
                </svg>
                Ready to download
              </p>
              <p className="mt-3 text-3xl font-semibold text-success">{files.filter(f => f.teamId === activeTeamId).length}</p>
            </div>
          </div>
        </div>

        <div className="fc-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                View Controls
              </p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Sorting and filters</h2>
            </div>
            <span className="fc-badge-success">Responsive</span>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">View mode</p>
              <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border bg-canvas p-1">
                {(["grid", "list"] as ViewMode[]).map((mode) => (
                  <button
                    key={mode}
                    className={`rounded-xl px-4 py-2.5 text-sm transition-all ${
                      view === mode
                        ? "bg-primary-subtle font-medium text-primary shadow-soft"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setView(mode)}
                    type="button"
                  >
                    {mode === "grid" ? "Grid view" : "List view"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SelectDrawer
                value={filter}
                onChange={(value) => setFilter(value as FileTypeFilter)}
                options={[
                  { value: "all", label: "All files" },
                  { value: "video", label: "Video" },
                  { value: "image", label: "Images / docs" },
                  { value: "archive", label: "Archives" },
                ]}
                label="Filter"
              />

              <SelectDrawer
                value={sortKey}
                onChange={(value) => setSortKey(value as SortKey)}
                options={[
                  { value: "recent", label: "Name / recent" },
                  { value: "size", label: "File size" },
                  { value: "expiry", label: "Expiry countdown" },
                ]}
                label="Sort by"
              />
            </div>

            <div className="rounded-2xl border border-border bg-canvas p-4">
              <p className="text-sm font-semibold text-foreground">Interaction notes</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Hovering a card lifts the surface slightly, reveals stronger contrast, and keeps expiry and download actions easy to scan.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">Last refreshed at {lastRefreshedAt}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="fc-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              File Browser
            </p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">
              {view === "grid" ? "Visual grid" : "Compact list"} of shared assets
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="fc-badge-neutral">{visibleFiles.length} results</span>
            <button className="fc-button-secondary inline-flex h-10 items-center gap-2 px-4" onClick={handleRefresh} type="button">
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20">
                <path
                  d="M10 4a6 6 0 0 1 5.58 3.8.75.75 0 0 1-1.4.54A4.5 4.5 0 1 0 14.25 10a.75.75 0 0 1 1.5 0A6 6 0 1 1 10 4Zm4.75-1a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0V4.5h-2.25a.75.75 0 0 1 0-1.5h3Z"
                  fill="currentColor"
                />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {downloadedFileId ? (
          <div className="mt-4 rounded-2xl border border-success/20 bg-success-subtle px-4 py-3 text-sm text-success">
            Download manifest prepared for{" "}
            <span className="font-semibold">
              {files.find((file) => file.id === downloadedFileId)?.name}
            </span>
            .
          </div>
        ) : null}

        <div className="mt-6 relative">
          <div className="relative">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              viewBox="0 0 20 20"
            >
              <path
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                fill="currentColor"
              />
            </svg>
            <input
              type="text"
              placeholder="Search files by name or team member..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchActive(true);
              }}
              onFocus={() => setIsSearchActive(true)}
              onBlur={() => setTimeout(() => setIsSearchActive(false), 200)}
              className="fc-input w-full pl-11 h-11"
            />
          </div>

          {isSearchActive && searchQuery.trim() && searchResults.length > 0 && (
            <div className="absolute top-full z-50 mt-2 w-full rounded-xl border border-border bg-surface shadow-lg">
              <div className="max-h-72 overflow-y-auto py-1">
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
                    <div className={`h-10 w-14 shrink-0 rounded-lg bg-gradient-to-br ${result.thumbTone}`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-foreground">{result.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">by {result.uploader}</p>
                    </div>
                    <span className="fc-badge-neutral text-xs">{result.format}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isSearchActive && searchQuery.trim() && searchResults.length === 0 && (
            <div className="absolute top-full z-50 mt-2 w-full rounded-xl border border-border bg-surface shadow-lg p-4">
              <p className="text-center text-sm text-muted-foreground">No files found matching &quot;{searchQuery}&quot;</p>
            </div>
          )}
        </div>

        {view === "grid" ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleFiles.map((file) => (
              <div
                key={file.id}
                className="group overflow-hidden rounded-[28px] border border-border bg-surface shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-border-strong hover:shadow-medium"
              >
                <div className={`flex h-44 items-end justify-between bg-gradient-to-br ${file.thumbTone} p-5`}>
                  <span className="fc-badge-neutral bg-surface/85 text-foreground shadow-soft">{file.format}</span>
                  <div className="rounded-2xl border border-white/50 bg-white/60 px-3 py-2 text-right text-xs font-medium text-foreground backdrop-blur">
                    {file.size}
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{file.name}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="fc-avatar h-7 w-7 text-[11px]">{file.uploaderInitials}</div>
                        <p className="text-xs text-muted-foreground">{file.uploader}</p>
                      </div>
                    </div>
                    <span className={file.daysRemaining <= 2 ? "fc-badge-warning" : "fc-badge-success"}>
                      {file.expiry}
                    </span>
                  </div>

                  <button
                    className="fc-button-secondary h-10 w-full justify-center transition-transform duration-200 group-hover:-translate-y-0.5"
                    onClick={() => handleDownload(file)}
                    type="button"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-[24px] border border-border">
            <div className="hidden grid-cols-[minmax(0,1.4fr)_110px_150px_180px_120px] gap-4 bg-muted/60 px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground lg:grid">
              <span>File</span>
              <span>Size</span>
              <span>Uploader</span>
              <span>Expiry</span>
              <span>Action</span>
            </div>

            <div className="divide-y divide-border">
              {visibleFiles.map((file) => (
                <div
                  key={file.id}
                  className="grid gap-4 px-5 py-4 transition-colors hover:bg-muted/50 lg:grid-cols-[minmax(0,1.4fr)_110px_150px_180px_120px] lg:items-center"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className={`h-14 w-20 shrink-0 rounded-2xl bg-gradient-to-br ${file.thumbTone}`} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{file.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{file.format}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground lg:hidden">Size</p>
                    <p className="text-sm text-muted-foreground">{file.size}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="fc-avatar h-8 w-8 text-[11px]">{file.uploaderInitials}</div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground lg:hidden">Uploader</p>
                      <p className="text-sm text-muted-foreground">{file.uploader}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground lg:hidden">Expiry</p>
                    <span className={file.daysRemaining <= 2 ? "fc-badge-warning" : "fc-badge-success"}>
                      {file.expiry}
                    </span>
                  </div>

                  <div>
                    <button
                      className="fc-button-secondary h-10 px-4"
                      onClick={() => handleDownload(file)}
                      type="button"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
