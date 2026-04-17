# FastCollab Design System

FastCollab is styled as a premium collaboration SaaS with a bright, minimal default theme, high legibility, and restrained accents. The system is optimized for Next.js plus Tailwind CSS and uses semantic CSS variables so light and dark themes can share the same utility API.

## Tailwind Config Suggestions

- Use `darkMode: ["class"]` for explicit theme control.
- Map semantic colors to CSS variables instead of hard-coded palette names.
- Keep spacing on an 8px grid. Standard building blocks are `4`, `6`, `8`, `10`, `12`, `16`, `20`, and `24`.
- Keep radius slightly softer than default utility presets to match premium SaaS UI patterns.
- Add a single `shimmer` animation for skeleton loading instead of many overlapping animation primitives.

## Color System

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `canvas` | `rgb(248 250 252)` | `rgb(2 6 23)` | App background |
| `surface` | `rgb(255 255 255)` | `rgb(15 23 42)` | Cards, nav, panels |
| `surface-raised` | `rgb(255 255 255)` | `rgb(17 24 39)` | Floating surfaces |
| `border` | `rgb(226 232 240)` | `rgb(30 41 59)` | Default dividers |
| `border-strong` | `rgb(203 213 225)` | `rgb(51 65 85)` | Hover and active chrome |
| `foreground` | `rgb(15 23 42)` | `rgb(241 245 249)` | Main text |
| `muted-foreground` | `rgb(100 116 139)` | `rgb(148 163 184)` | Secondary text |
| `primary` | `rgb(37 99 235)` | `rgb(96 165 250)` | Primary CTAs, progress |
| `secondary` | `rgb(15 23 42)` | `rgb(226 232 240)` | Dense contrast actions |
| `accent` | `rgb(8 145 178)` | `rgb(34 211 238)` | Highlights, collaboration states |
| `success` | `rgb(22 163 74)` | `rgb(74 222 128)` | Success feedback |
| `warning` | `rgb(217 119 6)` | `rgb(251 191 36)` | Warning feedback |
| `error` | `rgb(220 38 38)` | `rgb(248 113 113)` | Error states |

## Typography Scale

| Style | Tailwind classes | Use |
| --- | --- | --- |
| Hero | `text-5xl md:text-6xl font-semibold tracking-tight` | Marketing/product hero |
| H1 | `text-4xl md:text-5xl font-semibold tracking-tight` | Page title |
| H2 | `text-3xl md:text-4xl font-semibold tracking-tight` | Section title |
| H3 | `text-2xl font-semibold tracking-tight` | Module title |
| H4 | `text-xl font-semibold tracking-tight` | Card heading |
| Body Large | `text-lg leading-8` | Product intro copy |
| Body | `text-base leading-7` | Default app copy |
| Body Small | `text-sm leading-6` | Supporting text |
| Caption | `text-xs font-medium uppercase tracking-[0.12em]` | Labels, overlines |

## Component-Level Tokens

### Buttons

- Base: `fc-button`
- Primary: `fc-button-primary`
- Secondary: `fc-button-secondary`
- Ghost: `fc-button-ghost`
- Danger: `fc-button-danger`
- Loading: add `fc-button-loading` and render a spinner absolutely centered

### Inputs

- Base: `fc-input`
- Success: `fc-input fc-input-success`
- Error: `fc-input fc-input-error`
- Helper copy should use `text-sm text-muted-foreground`

### Cards and Containers

- Standard card: `fc-card`
- Elevated panel: `fc-card-elevated`
- Section container: `fc-section`
- App shell: `fc-shell`

### Navigation

- Navbar: `fc-navbar`
- Sidebar: `fc-sidebar`
- Recommended sidebar item pattern:
  - Default: `text-muted-foreground hover:bg-muted hover:text-foreground`
  - Active: `bg-primary-subtle text-primary`

### Identity and Feedback

- Avatar: `fc-avatar`
- Neutral badge: `fc-badge fc-badge-neutral`
- Status badges: `fc-badge-success`, `fc-badge-warning`, `fc-badge-error`
- Tag: `fc-tag`
- Skeleton: `fc-skeleton`
- Progress track: `fc-progress`
- Progress indicator: `fc-progress-bar`

## Clean UI Structure

Use a predictable app shell for implementation:

1. `app/layout.tsx`
   Apply `globals.css`, font loading, theme class, and root shell.
2. `components/layout/navbar.tsx`
   64px height, sticky, translucent surface, subtle border.
3. `components/layout/sidebar.tsx`
   288px width on desktop, collapsible on tablet, stacked navigation groups.
4. `components/ui`
   Place buttons, inputs, badges, avatars, cards, skeletons, and progress primitives here.
5. `src/lib/design-tokens.ts`
   Keep semantic token references centralized for docs, Storybook, or design audits.

## Dark Mode Tokens

Dark mode keeps the same semantic token names and swaps only the CSS variable values. This means components should always consume semantic utilities like `bg-surface`, `text-foreground`, and `border-border` instead of hard-coded gray or blue classes.

## Implementation Notes

- `tailwind.config.ts` contains the semantic theme contract.
- `app/globals.css` contains the actual light and dark tokens plus reusable component classes.
- `src/lib/design-tokens.ts` exports the token map for code-level reuse.
