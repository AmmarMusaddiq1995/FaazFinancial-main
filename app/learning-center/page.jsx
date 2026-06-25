"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Search, BookOpen, Lightbulb } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// ── Fallback seed data shown while Supabase table is empty ────────────────────
const SEED_TOPICS = [
  {
    id: "seed-1",
    title: "Why an LLC is Important for Your Business",
    category: "LLC",
    icon: "🏢",
    summary:
      "An LLC (Limited Liability Company) separates your personal assets from your business debts — protecting your savings, home, and car if your business is ever sued.",
    content: `An LLC (Limited Liability Company) is one of the most popular business structures in the United States — and for good reason.

**Personal Asset Protection**
The most important benefit of an LLC is the liability shield. If your business gets sued or can't pay its debts, creditors can't come after your personal savings, home, or other assets. Your risk is limited to what you've invested in the business.

**Tax Flexibility**
By default, an LLC is a "pass-through" entity — profits and losses flow directly to your personal tax return, avoiding the double taxation corporations face. You can also elect to be taxed as an S-Corp or C-Corp if that's more advantageous as you grow.

**Professional Credibility**
Operating as "Your Name LLC" instantly signals to clients, banks, and partners that you're running a legitimate, established business — not just a side hustle.

**Simple Management**
Unlike corporations, LLCs don't require a board of directors, annual shareholder meetings, or heavy paperwork. An Operating Agreement is all you need to govern how the business runs.

**Low Cost to Form**
In most states, forming an LLC costs between $50–$500 in state filing fees. That's a small investment for the protection and credibility it provides.

**Who should form an LLC?**
Freelancers, consultants, e-commerce sellers, real estate investors, service businesses — essentially any individual or small team that wants liability protection without corporate complexity.`,
  },
  {
    id: "seed-2",
    title: "Benefits of C-Corp Formation",
    category: "Corporation",
    icon: "🏛️",
    summary:
      "A C-Corporation is the go-to structure for startups seeking venture capital, businesses with international owners, or companies planning to issue multiple classes of stock.",
    content: `A C-Corporation (C-Corp) is a separate legal entity owned by shareholders. It's the most common structure for large companies and is increasingly popular among startups and international entrepreneurs.

**Unlimited Investor-Friendly Structure**
C-Corps can issue multiple classes of stock (common, preferred, etc.), which is essential for raising venture capital. Most institutional investors — and all major VC firms — require a C-Corp structure before investing.

**No Residency Requirements**
Unlike S-Corps, C-Corps have no citizenship or residency restrictions. Foreign nationals can be shareholders, making it the default choice for non-US residents forming US companies.

**Retained Earnings at a Lower Tax Rate**
C-Corps pay a flat 21% federal corporate tax rate. For high-earning businesses that reinvest profits, this can be lower than personal income tax rates.

**Employee Benefits & Stock Options**
C-Corps can deduct fringe benefits (health insurance, retirement plans) for employees, including owner-employees. Stock option plans (ISOs) are only available to C-Corp employees — a key tool for attracting top talent.

**Perpetual Existence**
A C-Corp continues to exist even if shareholders change, die, or sell shares — important for long-term business stability and succession planning.

**The Trade-off: Double Taxation**
The downside is double taxation: the corporation pays tax on profits, then shareholders pay tax again on dividends. This is less of an issue if you reinvest profits instead of distributing them.

**Who should form a C-Corp?**
Startups planning to raise funding, businesses with non-US owners, companies expecting to issue stock options, and any business with long-term plans to go public.`,
  },
  {
    id: "seed-3",
    title: "S-Corp vs C-Corp: Which is Right for You?",
    category: "Corporation",
    icon: "⚖️",
    summary:
      "S-Corps and C-Corps are both corporations, but they differ in taxation, ownership rules, and investor appeal. Here's how to choose.",
    content: `Both S-Corps and C-Corps are formed the same way at the state level — you file Articles of Incorporation. The difference is how the IRS taxes them.

**C-Corp (Default)**
- Taxed at the corporate level (21%) AND shareholders pay tax on dividends — "double taxation"
- Can have unlimited shareholders, including foreigners and other corporations
- Can issue multiple classes of stock
- Preferred by venture-backed startups and companies seeking outside investment

**S-Corp (Tax Election)**
- Pass-through taxation: profits/losses flow to shareholders' personal returns — no corporate tax
- Maximum 100 shareholders, all must be US citizens or permanent residents
- Only one class of stock allowed
- Popular for profitable small businesses to reduce self-employment taxes

**The S-Corp Tax Savings Strategy**
If your LLC or corporation earns more than ~$40,000/year in profit, an S-Corp election can save significant money. As an owner-employee, you pay yourself a "reasonable salary" (subject to payroll taxes), but additional distributions avoid self-employment tax.

Example: If your business earns $100,000 and you pay yourself a $60,000 salary, only $60,000 is subject to payroll taxes — saving ~$6,000–$8,000 vs. a single-member LLC.

**Which should you choose?**
- Raising venture capital → C-Corp (required by most investors)
- Non-US owner → C-Corp (S-Corp not available)
- Profitable small US business → S-Corp election on LLC or Corp
- Early-stage startup, uncertain future → LLC now, elect S-Corp later when profitable`,
  },
  {
    id: "seed-4",
    title: "What is an EIN and Why Does Your Business Need One?",
    category: "Tax & Compliance",
    icon: "🔢",
    summary:
      "An EIN (Employer Identification Number) is your business's tax ID from the IRS. You need it to open a business bank account, hire employees, and file business taxes.",
    content: `An EIN — Employer Identification Number — is a 9-digit tax identification number issued by the IRS, formatted as XX-XXXXXXX. Think of it as a Social Security Number (SSN) for your business.

**Why You Need an EIN**
Even if you have no employees, you almost certainly need an EIN:

1. **Business bank account** — Every bank requires an EIN to open a business checking account
2. **Business taxes** — Required to file business tax returns
3. **Hiring employees** — Legally required before you can put anyone on payroll
4. **Business credit** — Needed to establish business credit under your company's name
5. **Working with vendors** — Many suppliers and contractors require your EIN for 1099 reporting
6. **Licenses & permits** — Many state and local business licenses require an EIN

**How to Get One**
The IRS issues EINs for free. Apply online at irs.gov (takes ~10 minutes) and receive your EIN immediately. International applicants without an SSN apply by fax or mail.

**EIN vs SSN**
Never use your personal SSN for business purposes if you can avoid it. Using your EIN for business protects your SSN from exposure to vendors, clients, and contractors.

**One EIN Per Business Entity**
Each LLC, corporation, or partnership gets its own EIN. If you form a new entity, you need a new EIN — even if you already have one for another business.`,
  },
  {
    id: "seed-5",
    title: "Wyoming vs Delaware: Best State to Form Your LLC?",
    category: "LLC",
    icon: "🗺️",
    summary:
      "Wyoming and Delaware are the two most popular states for forming an LLC. Both have business-friendly laws — here's how they compare on cost, privacy, and taxes.",
    content: `Most business owners don't form their LLC in the state where they live. Instead, they choose a "formation state" with the best laws and lowest costs. Wyoming and Delaware are the top two choices.

**Wyoming LLC**
- Annual fee: $62/year (one of the lowest in the US)
- No state income tax
- Strong charging order protection (creditors can't take your LLC membership interest)
- Anonymous LLC allowed — members not listed in public records
- Best for: small businesses, solopreneurs, non-US residents, real estate investors

**Delaware LLC**
- Annual fee: $300/year (franchise tax)
- Sophisticated, well-developed business court (Court of Chancery)
- Highly favorable to corporate governance
- Venture capitalists almost always require Delaware incorporation
- Best for: startups seeking VC funding, companies that may go public

**The Key Difference**
Wyoming wins on cost and privacy. Delaware wins on investor-readiness and legal precedent.

**Do You Need to Operate There?**
No. You form your LLC in Wyoming or Delaware but operate anywhere. If you operate in a different state, you'll register as a "foreign LLC" in your home state — paying fees in both states.

**Our Recommendation**
- Non-US resident or privacy-conscious small business → **Wyoming LLC**
- Tech startup planning to raise funding → **Delaware C-Corp**
- Everything else → Wyoming LLC is usually the better value

At Faaz Financial Group, we handle formations in all 50 states and guide you to the right choice for your specific situation.`,
  },
  {
    id: "seed-6",
    title: "How to Maintain LLC Compliance After Formation",
    category: "Compliance",
    icon: "✅",
    summary:
      "Forming an LLC is just the beginning. To keep your liability protection intact, you must meet annual filing requirements, maintain a registered agent, and keep business and personal finances separate.",
    content: `Forming your LLC gets you started — but ongoing compliance is what keeps your liability protection valid. A "dissolved" or "non-compliant" LLC loses its legal protections, meaning creditors could potentially pierce the corporate veil and come after your personal assets.

**Annual Reports**
Most states require an annual (or biennial) report confirming your LLC's registered agent and member information. Fees range from $0 (Wyoming) to $800 (California). Missing the deadline can result in late fees or administrative dissolution.

**Registered Agent**
Every LLC must maintain a registered agent — a person or service with a physical address in the formation state that can receive legal documents on behalf of the LLC. If your registered agent changes, file an update immediately.

**Separate Bank Account**
Never mix personal and business finances. Use a dedicated business bank account and business credit card for all company transactions. Commingling funds is the #1 reason courts "pierce the corporate veil."

**Operating Agreement**
Keep your Operating Agreement updated. If ownership changes, a new member joins, or your business structure evolves — update the document and have all members sign.

**Federal Tax Filings**
- Single-member LLCs: report on Schedule C of your personal 1040
- Multi-member LLCs: file Form 1065 (partnership return) plus Schedule K-1s for each member
- S-Corp election: file Form 1120-S

**State & Local Requirements**
Depending on your industry and location, you may also need: business licenses, sales tax permits, professional licenses, or BOI (Beneficial Ownership Information) reports.

**Faaz Financial Group handles all of this for you** — from annual report filings to registered agent service and tax compliance monitoring.`,
  },
  {
    id: "seed-7",
    title: "What is a Registered Agent and Do You Need One?",
    category: "Compliance",
    icon: "📬",
    summary:
      "A registered agent is a person or service that receives legal documents and official state mail on behalf of your LLC or corporation. Every US business entity is required to have one.",
    content: `Every LLC and corporation formed in the United States is legally required to designate a registered agent — also called a "statutory agent" or "resident agent."

**What Does a Registered Agent Do?**
A registered agent receives:
- Legal notices (lawsuits, subpoenas)
- State tax and compliance documents
- Annual report notices
- Any official government correspondence about your business

**Requirements for a Registered Agent**
- Must have a physical street address (not a P.O. box) in the state where your LLC is formed
- Must be available during normal business hours to accept documents
- Can be an individual (you, a family member, a lawyer) or a professional registered agent service

**Can You Be Your Own Registered Agent?**
Yes — if you live in the state where your LLC is formed and are available during business hours. The downside: your address becomes part of the public record, and you risk missing important documents if you travel.

**Why Use a Professional Service?**
Professional registered agent services (like Faaz Financial Group's registered agent service) offer:
- A stable address that never changes
- Privacy — your personal address stays off public records
- Digital delivery of documents with immediate notifications
- Compliance reminders so you never miss a deadline
- Cost: typically $49–$150/year

**Changing Your Registered Agent**
If your registered agent changes, file a Statement of Change with your state immediately. Failure to maintain a valid registered agent can result in your LLC being dissolved.`,
  },
  {
    id: "seed-8",
    title: "Understanding the BOI Report (Beneficial Ownership Information)",
    category: "Tax & Compliance",
    icon: "📋",
    summary:
      "Starting January 2024, most US LLCs and corporations must file a Beneficial Ownership Information (BOI) report with FinCEN. Here's what it is and what you need to do.",
    content: `The Corporate Transparency Act (CTA) introduced a new federal filing requirement for most US businesses: the Beneficial Ownership Information (BOI) report. This is filed with FinCEN (Financial Crimes Enforcement Network), a bureau of the US Treasury.

**Who Must File?**
Most LLCs, corporations, and similar entities formed in the US must file — including foreign companies registered to do business in the US. There are 23 exemptions, mostly for large regulated companies (banks, publicly traded companies, etc.).

**What Information is Required?**
For each beneficial owner (anyone who owns 25%+ of the company or exercises substantial control):
- Full legal name
- Date of birth
- Residential address
- Government-issued ID (driver's license or passport) — number, issuing state, and a copy of the document

For the company itself: legal name, trade names (DBAs), address, state of formation, EIN.

**Deadlines**
- Companies formed before January 1, 2024: deadline varies by court rulings — check FinCEN.gov for current status
- Companies formed on or after January 1, 2024: must file within 90 days of formation
- Any changes to beneficial ownership: must be reported within 30 days

**Penalties for Non-Compliance**
Civil penalties of up to $591 per day for each day of violation, plus potential criminal penalties.

**How to File**
File directly on FinCEN's website at fincen.gov/boi — it's free. You can also authorize a third party (like Faaz Financial Group) to file on your behalf.

**Important Note:** BOI reports are NOT filed with the IRS or your state — they go directly to FinCEN.`,
  },
];

const ALL_CATEGORIES = ["All", ...Array.from(new Set(SEED_TOPICS.map((t) => t.category)))];

export default function LearningCenterPage() {
  const [topics, setTopics] = useState(SEED_TOPICS);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [categories, setCategories] = useState(ALL_CATEGORIES);

  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from("learning_topics")
          .select("*")
          .eq("is_published", true)
          .order("order_index", { ascending: true })
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setTopics(data);
          const cats = ["All", ...Array.from(new Set(data.map((t) => t.category)))];
          setCategories(cats);
        }
      } catch {
        // table may not exist yet — seed data remains visible
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = topics.filter((t) => {
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              Free Business Education
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              Learning Center
            </h1>
            <p className="text-xl text-gray-600 mb-10 text-pretty">
              Plain-English guides on LLCs, corporations, taxes, and compliance — everything you
              need to start and protect your business.
            </p>
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search topics…"
                className="pl-12 py-5 text-base shadow-sm"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveCategory("All");
                }}
              />
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="py-6 bg-white border-b sticky top-16 z-30 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setSearch("");
                    setExpandedId(null);
                  }}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Topics Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            {loading ? (
              <div className="text-center py-20 text-gray-400">Loading topics…</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <Lightbulb className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No topics match your search.</p>
                <button
                  onClick={() => { setSearch(""); setActiveCategory("All"); }}
                  className="mt-4 text-primary text-sm font-medium hover:underline cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((topic) => {
                  const isOpen = expandedId === topic.id;
                  return (
                    <motion.div
                      key={topic.id}
                      layout
                      className={`bg-white rounded-2xl border transition-shadow duration-300 overflow-hidden ${
                        isOpen ? "shadow-xl border-primary/30" : "shadow-sm hover:shadow-md border-gray-200"
                      }`}
                    >
                      {/* Card header — always visible */}
                      <button
                        onClick={() => toggle(topic.id)}
                        className="w-full text-left px-6 py-5 flex items-start gap-4 cursor-pointer group"
                      >
                        {topic.icon && (
                          <span className="text-2xl flex-shrink-0 mt-0.5">{topic.icon}</span>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <Badge
                              variant="secondary"
                              className="text-xs font-medium bg-primary/10 text-primary border-0"
                            >
                              {topic.category}
                            </Badge>
                          </div>
                          <h3 className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                            {topic.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{topic.summary}</p>
                        </div>
                        <div className="flex-shrink-0 mt-1">
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-primary" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                          )}
                        </div>
                      </button>

                      {/* Expandable content */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                              <div className="prose prose-sm md:prose-base max-w-none mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                                {topic.content}
                              </div>
                              <div className="mt-6 flex flex-wrap gap-3">
                                <a href="https://calendly.com/ammarmusaddiq123/30min" target="_blank" rel="noopener noreferrer">
                                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-white cursor-pointer">
                                    Book a free consultation
                                  </Button>
                                </a>
                                <a href="/contact">
                                  <Button size="sm" variant="outline" className="cursor-pointer">
                                    Ask us a question
                                  </Button>
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Our team is here to help you pick the right structure and stay compliant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://calendly.com/ammarmusaddiq123/30min" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto cursor-pointer">
                  Book a free consultation
                </Button>
              </a>
              <a href="/contact">
                <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-slate-900 w-full sm:w-auto cursor-pointer">
                  Contact us
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
