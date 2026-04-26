"use client";

import Link from "next/link";
import { useRef, useState, type RefObject } from "react";

type SettingsTab = "profile" | "security" | "billing" | "appearance";
type ThemeMode = "light" | "dark";

const tabs: { id: SettingsTab; label: string; description: string }[] = [
  { id: "profile", label: "Profile", description: "Personal details and team-facing profile" },
  { id: "security", label: "Security", description: "Supabase auth and session controls" },
  { id: "billing", label: "Billing", description: "Stripe portal and invoice preferences" },
  { id: "appearance", label: "Appearance", description: "Theme and interface preferences" },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });
  const [statusMessage, setStatusMessage] = useState("All changes are up to date.");
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  function applyTheme(nextTheme: ThemeMode) {
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    setStatusMessage(`Theme switched to ${nextTheme} mode.`);
  }

  function handleSaveChanges() {
    setStatusMessage("Profile and workspace preferences saved.");
  }

  function handleChangePhoto() {
    photoInputRef.current?.click();
  }

  function handlePhotoSelected() {
    setStatusMessage("New profile photo selected. Save changes to apply it.");
  }

  function handleSecurityAction(message: string) {
    setStatusMessage(message);
  }

  function handleInvoiceDownload() {
    const invoicePreview = [
      "FastCollab invoice preview",
      "Plan: Pro",
      "Amount: $39.00",
      "Billing cycle: Monthly",
      "Renewal: Apr 28",
    ].join("\n");

    const blob = new Blob([invoicePreview], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "fastcollab-invoice-preview.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setStatusMessage("Invoice preview downloaded.");
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="fc-card-elevated">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-success/15 bg-success-subtle px-3 py-1 text-xs font-medium text-success">
                <span className="h-2 w-2 rounded-full bg-success" />
                Settings synced across workspace
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Profile, billing, and security in one calm surface.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                Manage your FastCollab account with clear tabs, lightweight forms, and quick access to authentication, theme, and billing controls.
              </p>
            </div>

            <button className="fc-button-secondary h-11 whitespace-nowrap px-5" onClick={handleSaveChanges} type="button">
              Save changes
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Account status
              </p>
              <p className="mt-3 text-2xl font-semibold text-success">Active</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Auth provider
              </p>
              <p className="mt-3 text-2xl font-semibold text-foreground">Supabase</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Billing plan
              </p>
              <p className="mt-3 text-2xl font-semibold text-primary">Pro</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-success/20 bg-success-subtle px-4 py-3 text-sm text-success">
            {statusMessage}
          </div>
        </div>

        <div className="fc-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Quick Actions
              </p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Fast account controls</h2>
            </div>
            <span className="fc-badge-success">Ready</span>
          </div>

          <div className="mt-6 space-y-3">
            {[
              "Manage login and sessions through Supabase-backed auth settings.",
              "Open Stripe billing portal to update payment method and invoices.",
              "Switch between light and dark mode without leaving the settings flow.",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-muted/70 px-4 py-3 text-sm leading-6 text-muted-foreground">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-canvas p-4">
            <p className="text-sm font-semibold text-foreground">Security snapshot</p>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Magic link enabled</span>
                <span className="fc-badge-success">Yes</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Google sign-in linked</span>
                <span className="fc-badge-success">Linked</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Session alerts</span>
                <span className="fc-badge-neutral">On</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fc-card">
        <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`w-full rounded-2xl px-4 py-3 text-left transition-all ${
                  activeTab === tab.id
                    ? "bg-primary-subtle text-primary shadow-soft"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                <p className="text-sm font-semibold">{tab.label}</p>
                <p className="mt-1 text-xs leading-5">{tab.description}</p>
              </button>
            ))}
          </aside>

          <div className="min-w-0">
            {activeTab === "profile" ? (
              <ProfileSettingsPanel
                onChangePhoto={handleChangePhoto}
                onPhotoSelected={handlePhotoSelected}
                photoInputRef={photoInputRef}
              />
            ) : null}
            {activeTab === "security" ? (
              <SecuritySettingsPanel onAction={handleSecurityAction} />
            ) : null}
            {activeTab === "billing" ? (
              <BillingSettingsPanel onDownloadInvoices={handleInvoiceDownload} />
            ) : null}
            {activeTab === "appearance" ? (
              <AppearanceSettingsPanel onThemeChange={applyTheme} theme={theme} />
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProfileSettingsPanel({
  photoInputRef,
  onChangePhoto,
  onPhotoSelected,
}: {
  photoInputRef: RefObject<HTMLInputElement | null>;
  onChangePhoto: () => void;
  onPhotoSelected: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">User profile settings</p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">Profile details</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="rounded-[28px] border border-border bg-canvas p-5 shadow-soft">
          <div className="fc-avatar h-20 w-20 text-xl">MC</div>
          <p className="mt-4 text-lg font-semibold text-foreground">Maya Chen</p>
          <p className="mt-1 text-sm text-muted-foreground">Owner, Studio Team</p>
          <input
            ref={photoInputRef}
            className="hidden"
            onChange={onPhotoSelected}
            type="file"
            accept="image/*"
          />
          <button className="fc-button-secondary mt-5 w-full justify-center" onClick={onChangePhoto} type="button">
            Change photo
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="full-name">
              Full name
            </label>
            <input className="fc-input" defaultValue="Maya Chen" id="full-name" type="text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="job-title">
              Job title
            </label>
            <input className="fc-input" defaultValue="Operations Lead" id="job-title" type="text" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Email
            </label>
            <input className="fc-input" defaultValue="maya@fastcollab.com" id="email" type="email" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium text-foreground" htmlFor="bio">
              Short bio
            </label>
            <textarea
              className="fc-input min-h-28 resize-none py-3"
              defaultValue="Running client delivery, upload reviews, and team workflow coordination across media projects."
              id="bio"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SecuritySettingsPanel({ onAction }: { onAction: (message: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Supabase auth management</p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">Security and authentication</h2>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-[28px] border border-border bg-canvas p-5 shadow-soft">
          <p className="text-sm font-semibold text-foreground">Connected providers</p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">Magic link</p>
                <p className="text-xs text-muted-foreground">Passwordless sign-in enabled</p>
              </div>
              <span className="fc-badge-success">Enabled</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">Google</p>
                <p className="text-xs text-muted-foreground">Linked to current account</p>
              </div>
              <span className="fc-badge-success">Linked</span>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-border bg-canvas p-5 shadow-soft">
          <p className="text-sm font-semibold text-foreground">Session security</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-border bg-surface px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Current device</p>
                  <p className="text-xs text-muted-foreground">Chrome on Windows • Active now</p>
                </div>
                <span className="fc-badge-success">Current</span>
              </div>
            </div>
            <button
              className="fc-button-secondary w-full justify-center"
              onClick={() => onAction("All other sessions were signed out.")}
              type="button"
            >
              Sign out other sessions
            </button>
            <button
              className="fc-button-danger w-full justify-center"
              onClick={() => onAction("Account access has been paused for review.")}
              type="button"
            >
              Disable account access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BillingSettingsPanel({
  onDownloadInvoices,
}: {
  onDownloadInvoices: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Billing portal</p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">Stripe billing and invoices</h2>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-border bg-canvas p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Current plan</p>
              <p className="mt-1 text-sm text-muted-foreground">FastCollab Pro billed monthly</p>
            </div>
            <span className="fc-badge-success">Active</span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-4">
              <p className="text-xs text-muted-foreground">Amount</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">$39.00</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4">
              <p className="text-xs text-muted-foreground">Billing cycle</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">Monthly</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4">
              <p className="text-xs text-muted-foreground">Renewal</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">Apr 28</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link className="fc-button-primary px-5" href="/pricing">
              Open Stripe portal
            </Link>
            <button className="fc-button-secondary px-5" onClick={onDownloadInvoices} type="button">
              Download invoices
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-border bg-canvas p-5 shadow-soft">
          <p className="text-sm font-semibold text-foreground">Tax and billing contact</p>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="billing-email">
                Billing email
              </label>
              <input className="fc-input" defaultValue="finance@fastcollab.com" id="billing-email" type="email" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="tax-id">
                Tax ID
              </label>
              <input className="fc-input" defaultValue="FC-GB-2390182" id="tax-id" type="text" />
            </div>
            <div className="rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground">
              Estimated taxes and final payment methods are managed through the Stripe customer portal.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppearanceSettingsPanel({
  theme,
  onThemeChange,
}: {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">Theme toggle</p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">Appearance and interface</h2>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_0.95fr]">
        <div className="rounded-[28px] border border-border bg-canvas p-5 shadow-soft">
          <p className="text-sm font-semibold text-foreground">Theme preference</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {(["light", "dark"] as ThemeMode[]).map((mode) => (
              <button
                key={mode}
                className={`rounded-[24px] border p-4 text-left transition-all ${
                  theme === mode
                    ? "border-primary bg-primary-subtle shadow-soft"
                    : "border-border bg-surface hover:border-border-strong"
                }`}
                onClick={() => onThemeChange(mode)}
                type="button"
              >
                <p className="text-sm font-semibold capitalize text-foreground">{mode} mode</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {mode === "light"
                    ? "Bright, clear default workspace with soft shadows."
                    : "Low-glare interface for late-night review sessions."}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-border bg-canvas p-5 shadow-soft">
          <p className="text-sm font-semibold text-foreground">Preview</p>
          <div className="mt-4 rounded-[24px] border border-border bg-surface p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">Workspace appearance</p>
                <p className="text-xs text-muted-foreground">Current mode: {theme}</p>
              </div>
              <span className="fc-badge-success">Live</span>
            </div>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                Sidebar, cards, and controls update instantly with the selected theme.
              </div>
              <div className="rounded-2xl border border-border bg-canvas px-4 py-3 text-sm text-muted-foreground">
                Perfect for matching team preference without leaving settings.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
