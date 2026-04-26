"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SelectDrawer } from "../ui/SelectDrawer";

type CountryOption = {
  code: string;
  flag: string;
  name: string;
  currency: string;
  symbol: string;
  taxRate: number;
};

const countries: CountryOption[] = [
  { code: "US", flag: "US", name: "United States", currency: "USD", symbol: "$", taxRate: 0.0 },
  { code: "GB", flag: "GB", name: "United Kingdom", currency: "GBP", symbol: "£", taxRate: 0.2 },
  { code: "DE", flag: "DE", name: "Germany", currency: "EUR", symbol: "€", taxRate: 0.19 },
  { code: "IN", flag: "IN", name: "India", currency: "INR", symbol: "₹", taxRate: 0.18 },
];

const planConfig = [
  {
    name: "Free",
    description: "For solo trials and lightweight reviews.",
    basePrice: 0,
    includedGb: 25,
    overagePer100Gb: 0,
    cta: "Start Free",
    featured: false,
    features: [
      "1 workspace",
      "25 GB monthly transfer",
      "7-day auto-expiry",
      "Basic file sharing",
    ],
  },
  {
    name: "Pro",
    description: "For fast-moving creators shipping every week.",
    basePrice: 24,
    includedGb: 500,
    overagePer100Gb: 6,
    cta: "Choose Pro",
    featured: true,
    features: [
      "5 team members",
      "500 GB monthly transfer included",
      "Priority upload queue",
      "Advanced expiry controls",
    ],
  },
  {
    name: "Team",
    description: "For collaborative teams with heavier media workflows.",
    basePrice: 79,
    includedGb: 2000,
    overagePer100Gb: 4,
    cta: "Talk to Sales",
    featured: false,
    features: [
      "15 team members included",
      "2 TB monthly transfer included",
      "Permission management",
      "Shared workspaces + reporting",
    ],
  },
];

const comparisonRows = [
  ["Included users", "1", "5", "15"],
  ["Monthly transfer included", "25 GB", "500 GB", "2 TB"],
  ["Auto-expiry presets", "Basic", "Advanced", "Advanced + team policies"],
  ["Role-based access", "Viewer only", "Owner / Editor / Viewer", "Owner / Editor / Viewer"],
  ["Usage overage billing", "No", "Yes", "Yes"],
  ["Priority support", "No", "Email", "Priority + onboarding"],
];

function formatPrice(value: number, symbol: string) {
  if (value === 0) return "Free";
  return `${symbol}${value.toFixed(0)}`;
}

export function PricingPage() {
  const [countryCode, setCountryCode] = useState("US");
  const [usageGb, setUsageGb] = useState(850);

  const country = countries.find((item) => item.code === countryCode) ?? countries[0];

  const calculatedPlans = useMemo(() => {
    return planConfig.map((plan) => {
      const overageUnits = Math.max(0, usageGb - plan.includedGb) / 100;
      const overageCost = Math.ceil(overageUnits) * plan.overagePer100Gb;
      const subtotal = plan.basePrice + overageCost;
      const taxAmount = subtotal * country.taxRate;
      const total = subtotal + taxAmount;

      return {
        ...plan,
        subtotal,
        overageCost,
        taxAmount,
        total,
      };
    });
  }, [country.taxRate, usageGb]);

  return (
    <main className="fc-shell overflow-x-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(8,145,178,0.16),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.94),_rgba(248,250,252,0.7))]" />

      <header className="fc-navbar sticky top-0 z-50 w-full">
        <div className="container flex h-16 items-center justify-between">
          <Link className="flex items-center gap-3" href="/">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground shadow-soft">
              FC
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">FastCollab</p>
              <p className="text-xs text-muted-foreground">Usage-based pricing</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <Link className="transition-colors hover:text-foreground" href="/">
              Product
            </Link>
            <Link className="font-medium text-foreground" href="/pricing">
              Pricing
            </Link>
            <Link className="transition-colors hover:text-foreground" href="/login">
              Sign in
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link className="fc-button-ghost hidden sm:inline-flex" href="/login">
              Sign in
            </Link>
            <Link className="fc-button-primary shadow-soft" href="/signup">
              Start Free
            </Link>
          </div>
        </div>
      </header>

      <section className="container pb-16 pt-14 md:pb-20 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-soft backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-success" />
            Stripe-style pricing clarity with regional display
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
            Pricing that scales with real team usage.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Start free, scale with uploads, and keep billing transparent with local currency display, usage-based overage, and tax visibility before checkout.
          </p>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="fc-card-elevated">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
                  Country Detection
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">Regional billing preview</h2>
              </div>
              <span className="fc-badge-success">Detected</span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <SelectDrawer
                value={countryCode}
                onChange={setCountryCode}
                options={countries.map((country) => ({
                  value: country.code,
                  label: `${country.flag} ${country.name} (${country.currency})`,
                }))}
                label="Billing country"
              />

              <div className="rounded-2xl border border-border bg-surface px-4 py-3 shadow-soft">
                <p className="text-xs text-muted-foreground">Currency</p>
                <p className="mt-1 text-lg font-semibold text-foreground">
                  {country.flag} {country.currency}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[28px] border border-border bg-canvas p-5 shadow-soft">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Usage Meter
                  </p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                    {usageGb.toLocaleString()} GB / month
                  </p>
                </div>
                <span className="fc-badge-neutral">Usage-based</span>
              </div>

              <input
                className="mt-6 w-full accent-[rgb(37,99,235)]"
                max={3000}
                min={25}
                onChange={(event) => setUsageGb(Number(event.target.value))}
                type="range"
                value={usageGb}
              />

              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>25 GB</span>
                <span>1 TB</span>
                <span>3 TB</span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-surface p-4">
                  <p className="text-xs text-muted-foreground">Detected tax</p>
                  <p className="mt-2 text-xl font-semibold text-foreground">
                    {(country.taxRate * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-4">
                  <p className="text-xs text-muted-foreground">Billing display</p>
                  <p className="mt-2 text-xl font-semibold text-foreground">
                    {country.symbol} localized
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-4">
                  <p className="text-xs text-muted-foreground">Checkout feel</p>
                  <p className="mt-2 text-xl font-semibold text-success">Stripe-ready</p>
                </div>
              </div>
            </div>
          </div>

          <div className="fc-card space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                  Billing Snapshot
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">Estimated invoice preview</h2>
              </div>
              <span className="fc-badge-success">Live total</span>
            </div>

            <div className="rounded-[28px] border border-border bg-gradient-to-br from-surface via-surface to-primary-subtle/40 p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">FastCollab Pro</p>
                  <p className="text-xs text-muted-foreground">
                    {country.flag} {country.name} billing preview
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Currency</p>
                  <p className="text-sm font-semibold text-foreground">{country.currency}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3 rounded-2xl border border-border bg-surface p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Base plan</span>
                  <span className="font-medium text-foreground">
                    {formatPrice(calculatedPlans[1].basePrice, country.symbol)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Usage overage</span>
                  <span className="font-medium text-foreground">
                    {country.symbol}
                    {calculatedPlans[1].overageCost.toFixed(0)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Tax ({(country.taxRate * 100).toFixed(0)}%)
                  </span>
                  <span className="font-medium text-foreground">
                    {country.symbol}
                    {calculatedPlans[1].taxAmount.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">Estimated total</span>
                    <span className="text-2xl font-semibold tracking-tight text-foreground">
                      {country.symbol}
                      {calculatedPlans[1].total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-success" />
                Taxes shown before checkout
                <span className="h-2 w-2 rounded-full bg-primary" />
                Country-aware currency display
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-canvas p-5 shadow-soft">
              <p className="text-sm font-semibold text-foreground">Why this converts better</p>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <p>Clear base pricing, obvious usage logic, and no hidden tax surprises.</p>
                <p>Localized currency and country display creates trust before Stripe checkout begins.</p>
                <p>Usage preview helps teams understand when to move from Free to Pro or Team.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <div className="grid gap-6 xl:grid-cols-3">
          {calculatedPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[30px] border p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-medium ${
                plan.featured
                  ? "border-primary/30 bg-gradient-to-b from-primary-subtle/60 to-surface"
                  : "border-border bg-surface"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">{plan.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{plan.description}</p>
                </div>
                {plan.featured ? <span className="fc-badge-success">Popular</span> : null}
              </div>

              <div className="mt-8 flex items-end gap-2">
                <span className="text-5xl font-semibold tracking-tight text-foreground">
                  {formatPrice(plan.basePrice, country.symbol)}
                </span>
                {plan.basePrice > 0 ? (
                  <span className="pb-2 text-sm text-muted-foreground">/ month</span>
                ) : null}
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-canvas p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Included usage</span>
                  <span className="font-medium text-foreground">{plan.includedGb.toLocaleString()} GB</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Usage overage</span>
                  <span className="font-medium text-foreground">
                    {plan.overagePer100Gb === 0
                      ? "Not available"
                      : `${country.symbol}${plan.overagePer100Gb} / 100 GB`}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estimated tax</span>
                  <span className="font-medium text-foreground">
                    {country.symbol}
                    {plan.taxAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-surface-raised p-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Estimated total at {usageGb.toLocaleString()} GB
                </p>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                  {country.symbol}
                  {plan.total.toFixed(2)}
                </p>
              </div>

              <Link
                className={`mt-8 w-full ${
                  plan.featured ? "fc-button-primary" : "fc-button-secondary"
                }`}
                href={plan.name === "Team" ? "/contact" : "/signup"}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <div className="fc-section">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
              Feature Comparison
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Choose the plan that matches your team&apos;s pace
            </h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-[28px] border border-border">
            <div className="hidden grid-cols-[minmax(0,1.6fr)_1fr_1fr_1fr] gap-4 bg-muted/60 px-6 py-4 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground md:grid">
              <span>Capability</span>
              <span>Free</span>
              <span>Pro</span>
              <span>Team</span>
            </div>

            <div className="divide-y divide-border">
              {comparisonRows.map(([feature, free, pro, team]) => (
                <div
                  key={feature}
                  className="grid gap-4 px-6 py-4 text-sm md:grid-cols-[minmax(0,1.6fr)_1fr_1fr_1fr] md:items-center"
                >
                  <div className="font-medium text-foreground">{feature}</div>
                  <div className="text-muted-foreground">{free}</div>
                  <div className="text-muted-foreground">{pro}</div>
                  <div className="text-muted-foreground">{team}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-16 pt-4 md:pb-24">
        <div className="rounded-[32px] border border-border bg-gradient-to-br from-surface via-surface to-primary-subtle/40 px-6 py-8 shadow-medium md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-primary">
                Ready to start?
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Launch on Free, upgrade when usage makes it obvious.
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                No guesswork, clean overage logic, localized totals, and a checkout flow that feels trustworthy before Stripe even opens.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="fc-button-primary h-12 px-6" href="/signup">
                Start Free
              </Link>
              <Link className="fc-button-secondary h-12 px-6" href="/contact">
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
