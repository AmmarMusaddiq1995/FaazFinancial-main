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
| Backend / Auth | Supabase |
| Email | Nodemailer + Gmail SMTP |

Primary brand color: `#f97316` (orange), exposed as the `--primary` CSS variable.

---

## Environment Variables

All secrets live in `.env.local` at the project root. **Never commit this file.**

```env
# ── Contact form ──────────────────────────────────────────────────────────────
SMTP_USER=faazfinancialgroup.com@gmail.com        # Gmail that SENDS emails
SMTP_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx             # Gmail App Password (16 chars)
CONTACT_FORM_RECIPIENT=ammarmu007@gmail.com       # Where submissions are delivered

# ── Trustpilot (optional — enables live reviews) ──────────────────────────────
TRUSTPILOT_API_KEY=                               # From developers.trustpilot.com
NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID=          # Your business unit ID
```

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
  contact/                          Contact page (wired contact form)
  admin/
    blogs/                          Admin: manage blog posts
    learning-center/                Admin: manage learning topics
  api/
    contact/route.js                POST — sends contact form emails via Nodemailer
    trustpilot-reviews/route.js     GET — returns Trustpilot reviews (live or hardcoded fallback)

components/
  header.jsx                        Site-wide header with all mega-menus and dropdowns
  footer.jsx                        Site-wide footer
  testimonials.jsx                  Trustpilot glass carousel (Embla + manual autoplay)
  contact-form.jsx                  Animated contact form (AnimatePresence success state)
  it-services-teaser.jsx            Homepage teaser section for IT services
  accounting-service-template.jsx   Shared template for all 19 accounting service pages
                                    ↳ exports CALENDLY_URL — change here to update everywhere
  admin/
    admin-layout.jsx                Admin sidebar layout + navigation

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
