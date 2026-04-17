# FastCollab Application Architecture

FastCollab is a premium SaaS platform for temporary media sharing and team collaboration. The stack is:

- Frontend: Next.js App Router + Tailwind CSS
- Backend: Next.js server actions and route handlers
- Auth + Database + Storage: Supabase
- Billing: Stripe
- Background cleanup: Supabase cron + Edge Functions

The architecture is optimized for secure temporary file access, team-based collaboration, large uploads, and region-aware billing.

## 1. Text Architecture Diagram

```text
┌──────────────────────────────────────────────────────────────────┐
│                            Client UI                            │
│  Next.js App Router pages, Tailwind UI, upload dashboard, team  │
│  workspace, billing settings, file browser                      │
└───────────────┬───────────────────────────────┬──────────────────┘
                │                               │
                │ Server Components             │ Client Components
                │ and Server Actions            │ + progress state
                ▼                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                       Next.js Application                        │
│                                                                  │
│  app/(marketing)     app/(auth)      app/(dashboard)            │
│  app/api/*           server actions   middleware                 │
│                                                                  │
│  Responsibilities:                                               │
│  - Auth session bootstrap                                         │
│  - Team/workspace routing                                         │
│  - Signed upload/download orchestration                           │
│  - Stripe checkout + customer portal                              │
│  - RBAC enforcement at request layer                              │
└───────────────┬───────────────────────┬──────────────────────────┘
                │                       │
                │                       │ Webhooks / RPC / Signed URLs
                ▼                       ▼
┌──────────────────────────────┐   ┌───────────────────────────────┐
│           Supabase           │   │            Stripe             │
│                              │   │                               │
│  Postgres tables             │   │  Products / Prices            │
│  Row Level Security          │   │  Checkout Session             │
│  Auth (Magic Link, Google)   │   │  Billing Portal               │
│  Storage buckets             │   │  Subscription Webhooks        │
│  Realtime for collaboration  │   │                               │
│  Edge Functions + Cron       │   └───────────────────────────────┘
└───────────────┬──────────────┘
                │
                ▼
┌──────────────────────────────────────────────────────────────────┐
│                     Storage + Background Jobs                    │
│                                                                  │
│  Private object storage for files/chunks/previews               │
│  Signed URLs for access                                          │
│  Scheduled cleanup jobs:                                         │
│  - Expire shares after 7 days                                    │
│  - Delete storage objects                                         │
│  - Mark records deleted/audited                                  │
└──────────────────────────────────────────────────────────────────┘
```

## 2. Recommended Next.js Folder Structure

```text
app/
  (marketing)/
    page.tsx
    pricing/page.tsx
    features/page.tsx
  (auth)/
    login/page.tsx
    auth/callback/route.ts
  (dashboard)/
    layout.tsx
    page.tsx
    files/
      page.tsx
      [fileId]/page.tsx
      upload/page.tsx
    shares/
      page.tsx
      [shareId]/page.tsx
    teams/
      page.tsx
      [teamId]/
        page.tsx
        members/page.tsx
        settings/page.tsx
    billing/
      page.tsx
      success/page.tsx
  api/
    uploads/
      init/route.ts
      complete/route.ts
      signed-part-url/route.ts
    files/
      [fileId]/
        access/route.ts
        delete/route.ts
    shares/
      route.ts
      [shareId]/route.ts
    teams/
      [teamId]/
        invite/route.ts
        members/route.ts
    billing/
      checkout/route.ts
      portal/route.ts
      webhook/route.ts
    jobs/
      cleanup-expired/route.ts
src/
  components/
    ui/
    layout/
    files/
    teams/
    billing/
  lib/
    auth/
      server.ts
      client.ts
      guards.ts
    supabase/
      browser.ts
      server.ts
      admin.ts
    stripe/
      client.ts
      pricing.ts
      webhooks.ts
    uploads/
      tus.ts
      multipart.ts
      validators.ts
    permissions/
      roles.ts
      abilities.ts
    geo/
      country.ts
      currency.ts
    state/
      upload-store.ts
      ui-store.ts
    actions/
      files.ts
      teams.ts
      billing.ts
    db/
      queries.ts
      mutations.ts
  hooks/
  types/
supabase/
  migrations/
  functions/
    cleanup-expired-assets/
    stripe-webhook/
```

## 3. Database Schema

### Core Identity and Organizations

#### `profiles`

Stores app-level profile data linked to Supabase Auth users.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | References `auth.users.id` |
| `email` | `text` unique | Cached from auth |
| `full_name` | `text` | Nullable |
| `avatar_url` | `text` | Nullable |
| `default_team_id` | `uuid` | Nullable |
| `created_at` | `timestamptz` | Default now |
| `updated_at` | `timestamptz` | Default now |

#### `teams`

Tenant boundary for collaboration and billing.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | |
| `name` | `text` | |
| `slug` | `text` unique | Human-readable workspace id |
| `owner_user_id` | `uuid` | Initial creator |
| `billing_customer_id` | `text` | Stripe customer id |
| `billing_subscription_id` | `text` | Stripe subscription id |
| `billing_price_id` | `text` | Stripe price id |
| `billing_status` | `text` | trialing, active, past_due, canceled |
| `country_code` | `text` | ISO country code |
| `currency_code` | `text` | ISO currency code |
| `created_at` | `timestamptz` | |
| `updated_at` | `timestamptz` | |

#### `team_members`

Membership and RBAC mapping.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | |
| `team_id` | `uuid` FK -> teams.id | |
| `user_id` | `uuid` FK -> profiles.id | |
| `role` | `text` | `owner`, `editor`, `viewer` |
| `invited_by_user_id` | `uuid` FK -> profiles.id | Nullable |
| `created_at` | `timestamptz` | |

Constraint: unique (`team_id`, `user_id`)

#### `team_invites`

Invitation lifecycle for pre-auth users.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | |
| `team_id` | `uuid` FK -> teams.id | |
| `email` | `text` | |
| `role` | `text` | `editor`, `viewer` |
| `token_hash` | `text` | Do not store raw token |
| `expires_at` | `timestamptz` | |
| `accepted_at` | `timestamptz` | Nullable |
| `invited_by_user_id` | `uuid` FK -> profiles.id | |
| `created_at` | `timestamptz` | |

### Files, Shares, and Upload Lifecycle

#### `files`

Primary metadata for uploaded assets.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | |
| `team_id` | `uuid` FK -> teams.id | Tenant ownership |
| `uploader_user_id` | `uuid` FK -> profiles.id | |
| `storage_bucket` | `text` | Usually `media-private` |
| `storage_path` | `text` unique | Object path |
| `file_name` | `text` | |
| `mime_type` | `text` | |
| `size_bytes` | `bigint` | |
| `checksum_sha256` | `text` | Nullable |
| `status` | `text` | `uploading`, `ready`, `failed`, `deleted` |
| `visibility` | `text` | `team`, `shared_link`, `private` |
| `expires_at` | `timestamptz` | Default `created_at + interval '7 days'` |
| `deleted_at` | `timestamptz` | Nullable |
| `created_at` | `timestamptz` | |
| `updated_at` | `timestamptz` | |

#### `file_upload_sessions`

Tracks resumable or multipart uploads.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | |
| `file_id` | `uuid` FK -> files.id | |
| `upload_protocol` | `text` | `tus`, `multipart`, `supabase-standard` |
| `upload_key` | `text` | External upload session id |
| `status` | `text` | `initiated`, `uploading`, `completed`, `aborted` |
| `part_count` | `integer` | Nullable |
| `bytes_uploaded` | `bigint` | |
| `created_at` | `timestamptz` | |
| `completed_at` | `timestamptz` | Nullable |

#### `shares`

Public or restricted share links bound to a team file.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | |
| `file_id` | `uuid` FK -> files.id | |
| `team_id` | `uuid` FK -> teams.id | |
| `created_by_user_id` | `uuid` FK -> profiles.id | |
| `share_token_hash` | `text` unique | Raw token never stored |
| `requires_auth` | `boolean` | Default false |
| `password_hash` | `text` | Nullable |
| `max_downloads` | `integer` | Nullable |
| `download_count` | `integer` | Default 0 |
| `expires_at` | `timestamptz` | Default file expiry |
| `revoked_at` | `timestamptz` | Nullable |
| `created_at` | `timestamptz` | |

#### `share_access_logs`

Audit trail for access and abuse detection.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | |
| `share_id` | `uuid` FK -> shares.id | |
| `user_id` | `uuid` FK -> profiles.id | Nullable |
| `ip_hash` | `text` | Hash instead of raw IP |
| `country_code` | `text` | Nullable |
| `user_agent` | `text` | Nullable |
| `result` | `text` | `granted`, `denied`, `expired`, `revoked` |
| `created_at` | `timestamptz` | |

### Billing

#### `billing_customers`

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | |
| `team_id` | `uuid` FK -> teams.id unique | |
| `stripe_customer_id` | `text` unique | |
| `country_code` | `text` | Pricing hint |
| `currency_code` | `text` | |
| `created_at` | `timestamptz` | |

#### `billing_subscriptions`

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | |
| `team_id` | `uuid` FK -> teams.id | |
| `stripe_subscription_id` | `text` unique | |
| `stripe_price_id` | `text` | |
| `status` | `text` | |
| `current_period_start` | `timestamptz` | |
| `current_period_end` | `timestamptz` | |
| `cancel_at_period_end` | `boolean` | |
| `created_at` | `timestamptz` | |
| `updated_at` | `timestamptz` | |

#### `billing_events`

Webhook idempotency and audit store.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` PK | |
| `stripe_event_id` | `text` unique | |
| `type` | `text` | |
| `payload` | `jsonb` | |
| `processed_at` | `timestamptz` | |

## 4. Relationships

```text
profiles (1) ───< team_members >─── (1) teams
profiles (1) ───< team_invites
teams (1) ───< files
files (1) ───< file_upload_sessions
files (1) ───< shares
shares (1) ───< share_access_logs
teams (1) ─── (1) billing_customers
teams (1) ───< billing_subscriptions
```

## 5. Authentication Flow

### Providers

- Magic link via Supabase Auth email
- Google OAuth via Supabase Auth provider

### Sign-in flow

1. User opens `/login`.
2. User selects magic link or Google.
3. Next.js server action calls Supabase Auth.
4. Supabase redirects to `/auth/callback`.
5. Callback exchanges code for session and stores secure cookies.
6. On first login:
   - create `profiles` row
   - resolve any matching `team_invites` by email
   - add user to invited team if invite is valid
7. Redirect to:
   - invited team if invite accepted
   - existing default team
   - onboarding flow if no team exists

### Authorization model

- Authentication is managed by Supabase session cookies.
- Authorization is team-scoped and enforced at:
  - Next.js middleware for route gating
  - server actions / route handlers for business operations
  - Supabase RLS for row access

### Role abilities

| Role | Capabilities |
| --- | --- |
| `owner` | billing, team settings, delete team, manage roles, full file access |
| `editor` | upload files, create shares, edit metadata, invite viewers/editors if allowed |
| `viewer` | view and download accessible files, cannot upload/delete unless explicitly granted |

## 6. File Storage Strategy

### Bucket design

- `media-private`
  - Original uploads
  - Private bucket
- `media-previews`
  - Optional thumbnails/transcodes
  - Private bucket

### Object path strategy

```text
teams/{team_id}/files/{file_id}/original/{sanitized_filename}
teams/{team_id}/files/{file_id}/preview/{variant}.jpg
```

### Large upload approach

Recommended:

- Use resumable uploads for large files
- Preferred pattern:
  - client requests upload session from `/api/uploads/init`
  - server validates membership, quota, file type, planned size
  - server creates `files` row and `file_upload_sessions` row
  - client uploads in chunks using signed URLs or TUS-compatible flow
  - client reports progress locally and via Realtime if collaborative visibility is needed
  - client calls `/api/uploads/complete` when finished

### Why this approach

- Supports large unreliable network uploads
- Allows pause/resume
- Preserves app-level audit trail before object finalization
- Lets backend reject upload completion if final size or checksum mismatches

## 7. Background Jobs for Auto-Deletion

FastCollab auto-deletes temporary media after 7 days.

### Scheduled job flow

1. Supabase Cron triggers Edge Function every hour.
2. Edge Function selects records from `files` where:
   - `expires_at <= now()`
   - `deleted_at is null`
3. Function deletes related objects from storage.
4. Function marks:
   - `files.status = 'deleted'`
   - `files.deleted_at = now()`
   - `shares.revoked_at = now()` for linked shares
5. Function logs outcomes for retries and monitoring.

### Retry policy

- Use soft-delete in DB first if storage deletion partially fails
- Track failed cleanup attempts in logs or a dedicated job table
- Retry failed deletions in next cron cycle

## 8. API Routes and Server Actions

### Route Handlers

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/uploads/init` | `POST` | Create file + upload session |
| `/api/uploads/signed-part-url` | `POST` | Return signed URL for chunk/part |
| `/api/uploads/complete` | `POST` | Finalize upload and mark file ready |
| `/api/files/[fileId]/access` | `POST` | Validate permission and return signed download URL |
| `/api/files/[fileId]/delete` | `POST` | Soft-delete file and queue storage removal |
| `/api/shares` | `POST` | Create share link |
| `/api/shares/[shareId]` | `PATCH` | Revoke/update share |
| `/api/teams/[teamId]/invite` | `POST` | Send invite |
| `/api/teams/[teamId]/members` | `PATCH` | Update member role |
| `/api/billing/checkout` | `POST` | Create Stripe Checkout session |
| `/api/billing/portal` | `POST` | Create Stripe Billing Portal session |
| `/api/billing/webhook` | `POST` | Receive Stripe webhooks |
| `/api/jobs/cleanup-expired` | `POST` | Internal/manual cleanup trigger |

### Recommended Server Actions

- `createTeamAction`
- `switchActiveTeamAction`
- `createShareAction`
- `revokeShareAction`
- `updateFileVisibilityAction`
- `removeTeamMemberAction`
- `acceptInviteAction`

Use server actions for UI-bound mutations and route handlers for:

- webhook endpoints
- upload orchestration
- signed URL generation
- externally callable endpoints

## 9. State Management Approach

Use a layered model:

- Server state:
  - fetch through server components where possible
  - use Supabase queries in server layer
- Client cache:
  - TanStack Query for client-side refetching and mutation states
- Local UI state:
  - Zustand for upload queue, sidebar state, modal state
- Realtime:
  - Supabase Realtime for team activity, upload state visibility, invite updates

### Suggested ownership

| State Type | Tool |
| --- | --- |
| session/team bootstrap | Next.js server components |
| upload progress and retries | Zustand |
| file lists and share lists | TanStack Query |
| optimistic mutations | TanStack Query |
| theme and minor UI controls | Zustand or local component state |

## 10. Security Considerations

### Authentication and Sessions

- Use httpOnly secure cookies from Supabase auth helpers
- Enforce middleware checks on all dashboard routes
- Rotate session-sensitive flows through server actions, not client secrets

### Authorization

- Enforce RBAC in three places:
  - UI capability checks
  - server-side guards
  - Supabase RLS
- Never trust client-supplied `team_id` without verifying membership

### File Access

- Keep storage buckets private
- Never expose raw storage paths publicly
- Serve downloads through short-lived signed URLs
- Validate share expiry, revocation, and download limits before signing URL

### Upload Safety

- Validate MIME type, extension, and max size before upload init
- Revalidate final uploaded object metadata on completion
- Virus scanning can be added as a post-upload async job for enterprise plans

### Billing

- Trust Stripe webhook events over client callback pages
- Use webhook signature verification
- Store processed event ids to avoid duplicate processing

### Secrets and Privileged Access

- Only server routes and Edge Functions may use service-role Supabase keys
- Client uses anon key only
- Keep Stripe secret key and webhook secret server-side only

### Data Protection

- Hash share tokens and optional passwords
- Avoid storing raw IP addresses when hashed analytics are sufficient
- Add audit logs for admin actions, member role changes, and file deletion

## 11. Supabase RLS Strategy

Recommended policy model:

- `profiles`
  - user can read/update own row
- `teams`
  - members can read team
  - only owners can update billing/settings fields
- `team_members`
  - members can read memberships for their teams
  - only owners can change roles
- `files`
  - members can read team files according to visibility
  - editors/owners can insert
  - uploader or owner can delete
- `shares`
  - editors/owners can create
  - share owner or owner can revoke

Implement helper SQL functions:

- `is_team_member(team_uuid)`
- `team_role(team_uuid)`
- `can_manage_billing(team_uuid)`
- `can_edit_team_content(team_uuid)`

## 12. Country-Based Pricing and Currency Detection

### Detection flow

1. On first visit, infer country from:
   - edge headers from hosting provider
   - fallback IP geo provider
   - user billing country if signed in
2. Map country to supported Stripe price id and currency.
3. Persist chosen country/currency to:
   - `teams.country_code`
   - `teams.currency_code`
   - `billing_customers`
4. At checkout, use the matched regional Stripe price.

### Rule

- The authoritative billing currency should come from Stripe price selection, not only frontend geo detection.

## 13. Implementation Priorities

1. Auth + team bootstrap
2. Team membership and RBAC
3. File metadata + upload session orchestration
4. Private storage downloads via signed URLs
5. Share links and expiry enforcement
6. Stripe checkout + webhooks
7. Cleanup jobs for 7-day deletion
8. Realtime collaboration signals

## 14. Recommended Minimal MVP

For the first stable release:

- Magic link + Google auth
- Single team per user initially, multi-team ready schema
- Private storage bucket
- Resumable upload session tracking
- Owner/editor/viewer roles
- 7-day expiration on all uploaded media
- Regional Stripe price mapping
- Billing webhook synchronization

This keeps the core architecture clean while preserving a path to multi-workspace scale, enterprise controls, preview generation, and richer collaboration events.
