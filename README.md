# Faaz Financial Group — Website Codebase

Next.js website for **Faaz Financial Group LLC** — a US business formation and accounting firm.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router, Turbopack) |
| Styling | Tailwind CSS v4 (CSS-only config in `app/globals.css`) |
| UI Components | shadcn/ui |
| Icons | Lucide React |
| Animations | Framer Motion (`motion/react`) |
| Carousel | Embla Carousel React v8 |
| Backend / Auth | Supabase (auth, `form_submissions` DB, `uploads` storage bucket) |
| Payments | Stripe Checkout (`/api/get-payment-url` → `/successfully-paid`) |
| Email | Nodemailer + Gmail SMTP |

Primary brand color: `#f97316` (orange), exposed as the `--primary` CSS variable.

---

## Environment Variables

All secrets live in `.env.local` at the project root. **Never commit this file.**

```env
# ── Supabase (required — auth, database, file storage) ───────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=             # anon/publishable key (browser-safe)

# ── Stripe (required — service payments) ─────────────────────────────────────
STRIPE_SECRET_KEY=sk_live_xxx                     # Server-side only, never NEXT_PUBLIC
STRIPE_WEBHOOK_SECRET=whsec_xxx                   # Only needed if the webhook is enabled
NEXT_PUBLIC_BASE_URL=http://localhost:3000        # Used to build Stripe success/cancel URLs

# ── Contact form ──────────────────────────────────────────────────────────────
SMTP_USER=faazfinancialgroup.com@gmail.com        # Gmail that SENDS emails
SMTP_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx             # Gmail App Password (16 chars)
CONTACT_FORM_RECIPIENT=ammarmu007@gmail.com       # Where submissions are delivered

# ── Trustpilot (optional — enables live reviews) ──────────────────────────────
TRUSTPILOT_API_KEY=                               # From developers.trustpilot.com
NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID=          # Your business unit ID
```

> Without `STRIPE_SECRET_KEY` the production build fails while collecting page
> data for `/api/get-payment-url` (the Stripe client is created at module load).
> Dev mode and every non-payment page still work.

### How to generate a Gmail App Password
1. Enable 2-Step Verification on the Gmail account (`myaccount.google.com/security`)
2. Go to `myaccount.google.com/apppasswords`
3. Create a new App Password — select **Mail** then **Other**
4. Copy the 16-character password into `SMTP_APP_PASSWORD`
5. Restart the dev server (`npm run dev`) — env vars only load on startup

---

## Quick-Change Reference

The table below lists every value you are likely to update, with the exact file and line.

| What to change | File | What to edit |
|---|---|---|
| **Calendly booking URL** | `components/accounting-service-template.jsx` line 8 | `export const CALENDLY_URL = "..."` — all 19 service pages, the hub, and both header menus pull from this single export |
| **Contact form recipient email** | `.env.local` | `CONTACT_FORM_RECIPIENT=your@email.com` then restart dev server |
| **Gmail sender account** | `.env.local` | `SMTP_USER` and `SMTP_APP_PASSWORD` |
| **Trustpilot live reviews** | `.env.local` + `components/testimonials.jsx` line 104 | Add `TRUSTPILOT_API_KEY`, then uncomment the `useEffect` block (lines 104–110) in testimonials.jsx |
| **Trustpilot star rating display** | `components/testimonials.jsx` line 269 | Change `fillPercent={70}` on the 5th star (70% = 4.7 stars). Adjust proportionally for other ratings |
| **Hardcoded testimonials** | `components/testimonials.jsx` | Edit the `REVIEWS` array at the top of the file |
| **IT Services portfolio projects** | `app/it-services/page.jsx` | Edit the `projects` array |
| **Accounting services copy / pricing** | `lib/accounting-services-data.js` | Each service object has `intro`, `whoFor[]`, `included[]`, `pricingSignal` — all currently placeholder copy marked `TODO` |
| **Learning Center seed topics** | `app/learning-center/page.jsx` | Edit `SEED_TOPICS` array — these show when the Supabase table is empty |
| **Admin-managed learning topics** | `/admin/learning-center` in the browser | Use the admin panel form — no code changes needed |
| **Card processing fee (currently 4.5%)** | 3 places — see [Card processing fee](#card-processing-fee) | `CARD_FEE_RATE` + `CARD_FEE_LABEL` in `components/submission-forms/form-wizard.jsx`, the `0.045` in `app/api/get-payment-url/route.js`, and the `0.045` + label in `app/successfully-paid/page.jsx` |
| **LLC formation prices (per state)** | `components/submission-forms/llc-formation-form.jsx` | Edit `priceTableForLLC` — keys are underscored state names (`New_York`), values `{ normal, express }` |
| **C-Corp formation prices (per state)** | `components/submission-forms/c-corporation-formation.jsx` | Edit `priceTableForCCorp` |
| **Annual state filing / DBA prices** | `annual-company-state-filing-form.jsx` / `dba-trademark-registration-services-form.jsx` | Edit the `priceTableFor...` object at the top of each file |
| **Fixed service prices** (EIN, ITIN, VAT, CT600, etc.) | The service's file in `components/submission-forms/` | Each fixed-price form has a `..._PRICE` constant or a small `packageType` → price `useEffect` near the top |

---

## Features Added (Recent Updates)

### 1. IT Services Section

A dedicated page showcasing web development and AI automation services.

- **Page:** `app/it-services/page.jsx`
- **Homepage teaser:** `components/it-services-teaser.jsx`
- **Nav:** "IT Services" button in desktop nav and mobile accordion

Portfolio projects are hardcoded in the `projects` array inside `app/it-services/page.jsx`. Current projects:
- Nayl Luxury Rentals — https://naylrentalcardxb.com (Next.js, Tailwind CSS, Strapi CMS)
- AI-Powered Lead Capture — (OpenAI API, Google Sheets, N8N, Gmail API)
- Future Cell & Gadgets — https://futurecellandgadgets.vercel.app (React, Tailwind CSS, Supabase, PostgreSQL)

---

### 2. Accounting Services — 19 Service Pages + Hub + Mega-Menu

A full accounting services section with a 3-column mega-menu in the navbar.

**Files:**

| File | Purpose |
|---|---|
| `lib/accounting-services-data.js` | Single source of truth — all 19 service definitions (slug, name, category, copy) |
| `components/accounting-service-template.jsx` | Reusable page template used by all 19 service pages. Also exports `CALENDLY_URL` |
| `app/services/accounting-services/page.jsx` | Hub page listing all services by category |
| `app/services/<slug>/page.jsx` (×19) | Individual service pages — each imports the template |

**The 19 services by category:**

| Category | Services |
|---|---|
| Core Bookkeeping | Ecommerce Bookkeeping, Healthcare Bookkeeping, Small Business Bookkeeping, Monthly Bookkeeping, Quarterly Bookkeeping, Catch-Up & Cleanup, Year-End Reconciliations, Software Setup |
| Accounting & Financial Management | CFO Services, Financial Reporting, Budgeting & Forecasting, Cashflow Management, KPI Dashboards, FP&A Services |
| Operational Support | Accounts Payable, Accounts Receivable, Day-to-Day Bookkeeper, Internal Controls, Payroll Processing |

**To update content:** edit the matching object in `lib/accounting-services-data.js`. The `intro`, `whoFor`, `included`, and `pricingSignal` fields for all 19 services are placeholder copy and need to be replaced before launch.

**To update the Calendly URL across all pages at once:** change the single line in `components/accounting-service-template.jsx` line 8:
```js
export const CALENDLY_URL = "https://calendly.com/your-link-here";
```

---

### 3. Testimonials with Trustpilot Branding

A dark glass-card carousel on the homepage showing client reviews with Trustpilot stars.

- **Component:** `components/testimonials.jsx`
- **API route (scaffolded):** `app/api/trustpilot-reviews/route.js`

**Currently:** Shows 12 hardcoded reviews from the `REVIEWS` array at the top of `testimonials.jsx`.

**To switch to live Trustpilot data:**
1. Get your API key at https://developers.trustpilot.com
2. Add to `.env.local`:
   ```
   TRUSTPILOT_API_KEY=your_key_here
   NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID=your_business_unit_id
   ```
3. In `components/testimonials.jsx`, uncomment lines 104–110 (the `useEffect` that fetches `/api/trustpilot-reviews`)
4. Restart dev server

**To update the star rating displayed in the footer badge:**
Open `components/testimonials.jsx` and find line 269:
```jsx
<TrustpilotStar fillPercent={70} size={28} />
```
`fillPercent` controls how filled the 5th star is (0–100). Examples:
- 4.7 stars → `fillPercent={70}`
- 4.8 stars → `fillPercent={80}`
- 4.5 stars → `fillPercent={50}`

---

### 4. Contact Form with Email Delivery

The contact form at `/contact` submits to a Next.js API route that sends a formatted HTML email via Gmail SMTP.

**Files:**

| File | Purpose |
|---|---|
| `components/contact-form.jsx` | Client form — loading spinner, animated success card, error banner |
| `app/api/contact/route.js` | POST handler — validates fields, sends email via Nodemailer |
| `.env.local` | SMTP credentials and recipient address |

**Animated success message:** Spring-scaled green checkmark → "Your message has been received. We will get back to you shortly." → "Send another message" reset link (powered by Framer Motion `AnimatePresence`).

**To change who receives the emails:** update `.env.local` only — no code changes needed:
```
CONTACT_FORM_RECIPIENT=new-address@example.com
```
Restart the dev server after editing.

**Note:** The Gmail App Password (`SMTP_APP_PASSWORD`) must not contain dashes when provided to Gmail — the API route strips them automatically, so copy-pasting the password with or without dashes both work.

---

### 5. Learning Center — Interactive Topics + Admin Panel

An educational resource section where users browse and expand topics. Admins add new topics from `/admin/learning-center` without touching code.

**Public page:** `app/learning-center/page.jsx`
- Category filter tabs (sticky below the header)
- Accordion-style expandable topic cards with smooth animation
- Search bar that filters by title, summary, and category
- 8 pre-written seed topics (LLC, C-Corp, EIN, compliance, etc.) appear automatically when the Supabase table is empty

**Admin panel:** `app/admin/learning-center/page.jsx`
- URL: `/admin/learning-center` (admin login required)
- Add topics: title, category, emoji icon, summary, full content, display order, publish/draft toggle
- Toggle visibility (eye icon) or delete existing topics

**Nav:** "Learning Center" in the header is now a dropdown:
- **Learning Topics** → `/learning-center`
- **Business Blog** → `/blog`

#### Supabase Table Setup (one-time)

In Supabase dashboard → **SQL Editor → New query**, run:

```sql
create table public.learning_topics (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text unique not null,
  category      text not null,
  icon          text,
  summary       text not null,
  content       text not null,
  is_published  boolean not null default true,
  order_index   integer not null default 0,
  created_at    timestamptz not null default now(),
  created_by    uuid references auth.users(id) on delete set null
);

alter table public.learning_topics enable row level security;

create policy "Public can read published topics"
  on public.learning_topics for select
  using (is_published = true);

create policy "Admins can manage topics"
  on public.learning_topics for all
  using (auth.uid() = created_by);
```

Once the table exists and you add topics through the admin panel, the seed data is automatically replaced by your live Supabase topics.

---

## Service Submission Forms (31 services)

Every paid service (LLC formation, EIN, VAT, bookkeeping, …) has a submission
form in `components/submission-forms/`. Since the 2026-07 redesign they all
share **one wizard system** instead of 31 hand-rolled layouts, so a change to
the shared module restyles every form at once.

### Shared module — `components/submission-forms/form-wizard.jsx`

| Export | What it is |
|---|---|
| `FormWizard` | The card shell every form renders: title/description header, desktop step icons + mobile progress bar, animated step transitions, Back/Continue navigation, inline error box, running-total ribbon, and the submit button. Forms with a single step render as a plain styled card (no stepper). |
| `OptionToggle` | Pill-style Yes/No (or any 2-option) toggle. Stores the same string values the old `<Select>`s did (`"Yes"`, `"No"`, `"Anonymous_LLC"`, …). |
| `PackageCards` | Selectable price cards that replaced the Normal/Express dropdowns. Same stored values (`"normal"` / `"express"`, or `"simple"` / `"complex"`). |
| `PackageDetailsTooltip` | The ⓘ tooltip listing a package's inclusions/exclusions and price. |
| `PriceSummary` | Price breakdown block: caller passes base rows, it appends Subtotal → Card Processing Fee → Total. |
| `PricingBadge` | The pill under the title when a user arrives from a pricing page with a pre-selected package (`pricingData` prop). |
| `DateField` | Calendar popover storing an ISO `YYYY-MM-DD` string, with a hidden `required` input for native validation (same behavior as the old inline popovers). |
| `FileUploadField` | Styled dashed drop-area wrapping a real `<input type="file">` (kept in the DOM so `required` still works). |
| `inputStyles` | The shared Tailwind class string for all text inputs / select triggers. |
| `US_STATES` | State list used by forms whose **prices depend on the state**. Multi-word states are underscored (`New_Hampshire`) so they match the price-table keys — see "State name format" below. |
| `CARD_FEE_RATE`, `CARD_FEE_LABEL`, `cardFeeAmount()`, `totalWithCardFee()` | The card-fee constants — see "Card processing fee" below. |

There is also `quotation-request-form.jsx` — a shared **quotation** form (no
fixed price; opens a prefilled Gmail draft to `info@faazfinancialgroup.com` and
records the request with `amount: 0`). The five bookkeeping-style forms
(`book-keeping-services-form-{small,medium,large}.jsx`,
`setting-up-new-books-form.jsx`, `full-year-reconciliation-form.jsx`) are thin
wrappers that just pass a `serviceName` to it.

### Anatomy of a form

Every form follows the same pattern:

```jsx
export function SomeServiceForm({ pricingData }) {   // pricingData only on LLC / C-Corp
  const [formData, setFormData] = useState({ ... }); // one key per field
  // fetch the user's row id from the `user_data` table (needed for the insert)
  // optional: price state derived from packageType / state via useEffect

  const handleSubmit = async (e) => {
    // inserts into Supabase `form_submissions`:
    //   { user_id, service_name, form_data, status: "pending",
    //     payment_status: "pending", amount: <PRE-FEE price> }
    // then router.push("/form-submission-success")
  };

  const steps = [
    { title, subtitle, icon,        // shown in the stepper
      heading, intro,               // optional heading above the step content
      validate: () => "" | "error", // checks custom controls (toggles/cards)
      content: <>...fields...</> },
  ];

  return <FormWizard title=... steps={steps} onSubmit={handleSubmit}
                     loading={loading} submitLabel=... price={price} />;
}
```

**Validation model:** only the current step's inputs are mounted, so clicking
*Continue* runs native `form.reportValidity()` against just that step, then the
step's `validate()` for controls the browser can't check (package cards, pill
toggles). By the time the user reaches Submit, every previous step has been
validated. Enter advances the wizard instead of submitting on intermediate
steps.

**State name format:** the four forms with per-state price tables (LLC, C-Corp,
annual state filing, DBA trademark) store states **underscored**
(`New_York`, `Rhode_Island`) so the dropdown value can be used directly as a
price-table key. Other forms keep plain `"New York"` strings. Keep this in mind
when querying `form_submissions.form_data->>'state'`.

### Card processing fee

The fee (currently **4.5%**) is applied *on top of* the price stored in
`form_submissions.amount`. It lives in **three places** — update all of them
together:

1. `components/submission-forms/form-wizard.jsx` — `CARD_FEE_RATE = 0.045` and
   `CARD_FEE_LABEL = "4.5%"` (drives every form's breakdown + total ribbon).
2. `app/api/get-payment-url/route.js` — `amount + (amount * 0.045)` — **this is
   the amount actually charged in Stripe.**
3. `app/successfully-paid/page.jsx` — the receipt display (`0.045` and the
   "Card Fee (4.5%)" label).

If (1) and (2) disagree, the price shown on the form won't match what Stripe
charges.

### Adding a new service form

1. Copy the closest existing form (e.g. `vat-return-filing-form.jsx` for a
   simple fixed-price form, `annual-company-state-filing-form.jsx` for a
   2-step form with a price table).
2. Change `formData` keys, the fields inside `steps[].content`, the
   `service_name` string in `handleSubmit`, and the price constant/table.
3. Wire it into whichever page renders it (see `app/start-business/page.jsx`
   for the pattern — forms are plain components, no props required unless you
   want `pricingData` pre-selection).
4. Use the shared building blocks (`inputStyles`, `OptionToggle`,
   `PackageCards`, `DateField`, `FileUploadField`, `PriceSummary`) — don't
   introduce new field styles.

---

## Payment Flow (end to end)

```
1. User (logged in) fills a service form
        └─ INSERT form_submissions  { status: "pending", payment_status: "pending",
                                      amount: <pre-fee price>, form_data: {...} }
        └─ redirect → /form-submission-success

2. User opens the dashboard (components/dashboard/dashboard-overview2.jsx)
        └─ sees their submissions, clicks "Pay" on one
        └─ POST /api/get-payment-url  { form_id, amount }
              └─ adds the 4.5% card fee, creates a Stripe Checkout Session
                 (form_id stored in payment_intent metadata)
              └─ marks the submission status: "in-progress"
        └─ browser redirects to Stripe Checkout

3. Stripe redirects back:
   success → /successfully-paid?session_id=...
        └─ page calls GET /api/verify-payment?session_id=...
           (retrieves the session from Stripe server-side)
        └─ on "paid": the page updates form_submissions
           (payment_status, payment_id) and shows the receipt
           (order amount + 4.5% card fee + total)
   cancel/failed → /payment-failed
```

Notes for developers:

- `app/api/webhooks/stripe/route.js` exists but is **entirely commented out**.
  Payment-status updates currently happen client-side on the success page; if
  you need server-authoritative updates (recommended before scaling), enable
  the webhook and set `STRIPE_WEBHOOK_SECRET`.
- `form_submissions.amount` is always the **pre-fee** price. The fee is added
  only at charge time.
- All forms require a logged-in user (`AuthGate` wraps the pages; the form
  itself also re-checks `supabase.auth.getUser()` before inserting).

### Known quirks (pre-existing, preserved on purpose)

- **Payroll Withholding:** the `responsiblePartyMembers` array is collected in
  the UI but **not included** in the submitted `form_data`, and the Option 1
  (individual officers) and Option 2 (commercial owners) sections render the
  *same* array. Fix deliberately deferred — confirm intent with the client.
- **Registered Agent:** the UI shows $25/$35 packages but the row is inserted
  with `amount: "50"` (string). Confirm the intended price with the client.
- Several console.log statements remain throughout the forms — they were kept
  during the redesign to avoid touching logic; safe to strip in a cleanup pass.

---

## Database Tables (Supabase)

| Table | Used by | Purpose |
|---|---|---|
| `user_data` | All forms, dashboard | App-level user profile. Forms look up `user_data.id` via `auth_user_id = auth.uid()` and store that id as `form_submissions.user_id`. |
| `form_submissions` | All forms, dashboard, payment flow, admin | One row per service request: `user_id`, `service_name`, `form_data` (jsonb — the entire form), `status` (`pending` → `in-progress`), `payment_status` (`pending` → `paid`), `amount` (pre-fee), `payment_id`, `admin_uploaded_file`. |
| `blogs` | `/blog`, `/admin/blogs` | Blog posts. |
| `learning_topics` | `/learning-center`, `/admin/learning-center` | Learning Center content (SQL to create it is in the Learning Center section above). |
| Storage bucket `uploads` | Forms with file fields | User documents (passports, EIN letters, balance sheets…), stored under `<user_data.id>/<fieldName>/<timestamp>-<filename>`. Public URLs are saved into `form_data`. |

---

## Admin Panel Routes

Located at `/admin` — requires admin account login.

| Route | Purpose |
|---|---|
| `/admin` | Overview dashboard |
| `/admin/blogs` | Create blog posts (saved to `blogs` Supabase table) |
| `/admin/learning-center` | Add / hide / delete Learning Center topics |

---

## Project Structure (Key Files)

```
app/
  page.jsx                          Homepage
  blog/                             Business blog (Supabase-backed)
  learning-center/                  Interactive learning topics (public)
  it-services/                      IT & web development services page
  services/
    accounting-services/            Hub page listing all 19 accounting services
    ecommerce-bookkeeping/          }
    healthcare-bookkeeping/         }
    monthly-bookkeeping/            }  19 individual accounting service pages
    ... (16 more slugs)             }
    llc-formation-2/                LLC formation page that passes pricingData to the form
  start-business/                   Renders the formation forms (behind AuthGate)
  submission-forms/                 Pages hosting the other service submission forms
  dashboard/                        Logged-in user dashboard (submissions list + "Pay" button)
  auth/                             Login / signup pages
  form-submission-success/          Shown after a form is submitted (pre-payment)
  successfully-paid/                Stripe success page — verifies session, updates payment_status
  payment-failed/                   Stripe cancel/failure page
  contact/                          Contact page (wired contact form)
  admin/
    blogs/                          Admin: manage blog posts
    learning-center/                Admin: manage learning topics
  api/
    contact/route.js                POST — sends contact form emails via Nodemailer
    trustpilot-reviews/route.js     GET — returns Trustpilot reviews (live or hardcoded fallback)
    get-payment-url/route.js        POST — adds 4.5% card fee, creates Stripe Checkout Session
    verify-payment/route.js         GET — retrieves a Checkout Session for the success page
    webhooks/stripe/route.js        Stripe webhook (currently fully commented out / disabled)

components/
  header.jsx                        Site-wide header with all mega-menus and dropdowns
  footer.jsx                        Site-wide footer
  testimonials.jsx                  Trustpilot glass carousel (Embla + manual autoplay)
  contact-form.jsx                  Animated contact form (AnimatePresence success state)
  it-services-teaser.jsx            Homepage teaser section for IT services
  auth-gate.jsx                     Wraps pages that require a logged-in user
  accounting-service-template.jsx   Shared template for all 19 accounting service pages
                                    ↳ exports CALENDLY_URL — change here to update everywhere
  submission-forms/
    form-wizard.jsx                 ★ Shared wizard system for ALL 31 service forms
                                      (FormWizard, OptionToggle, PackageCards, PriceSummary,
                                       DateField, FileUploadField, US_STATES, CARD_FEE_RATE…)
    quotation-request-form.jsx      Shared quotation form (bookkeeping-style services)
    llc-formation-form.jsx          5-step LLC wizard (per-state price table)
    c-corporation-formation.jsx     5-step C-Corp wizard (per-state price table)
    uk-ltd-formation-form.jsx       5-step UK LTD wizard (fixed £240)
    payroll-withholding-services-form.jsx  5-step payroll wizard
    ... (26 more service forms)     Each = state + handleSubmit + steps[] + <FormWizard>
  dashboard/
    dashboard-overview2.jsx         User's submissions table + "Pay" → /api/get-payment-url
  admin/
    admin-layout.jsx                Admin sidebar layout + navigation

context/
  AppContext.jsx                    Auth context — useAuthContext() → { user, isAdmin, loading }

lib/
  accounting-services-data.js       All 19 service definitions — edit copy and pricing here
  supabaseClient.js                 Supabase browser client instance
```

---

## Running Locally

```bash
npm install
npm run dev
```

Dev server starts at `http://localhost:3000`.

> **Important:** Changes to `.env.local` require a full dev server restart — hot reload does not pick up environment variable updates.

---

## Pending Before Launch

- [ ] Replace all placeholder copy in `lib/accounting-services-data.js` (19 services — `intro`, `whoFor`, `included`, `pricingSignal` fields are all marked `TODO`)
- [ ] Run the Supabase SQL above to create the `learning_topics` table
- [ ] Decide whether to merge the old "Accounting & Bookkeeping" nav dropdown with the new "Accounting Services" mega-menu (two overlapping nav items currently exist)
- [ ] Add `TRUSTPILOT_API_KEY` to `.env.local` and uncomment the `useEffect` in `components/testimonials.jsx` to switch to live Trustpilot reviews
