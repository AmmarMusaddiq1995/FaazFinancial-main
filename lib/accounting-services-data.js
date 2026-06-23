// TODO: All copy in this file (intro, whoFor, included, pricingSignal) is
// placeholder content written to match the page structure. Review and
// replace with real copy/pricing before launch.

export const accountingCategories = [
  {
    id: "core-bookkeeping",
    title: "Core Bookkeeping",
  },
  {
    id: "financial-management",
    title: "Accounting & Financial Management",
  },
  {
    id: "operational-support",
    title: "Operational Support",
  },
];

export const accountingServices = [
  // ---------- Core Bookkeeping ----------
  {
    slug: "ecommerce-bookkeeping",
    name: "Ecommerce Bookkeeping",
    category: "core-bookkeeping",
    intro:
      "Purpose-built bookkeeping for online sellers, reconciling marketplace payouts, fees, and refunds across Shopify, Amazon, and other channels. TODO: confirm platforms supported.",
    whoFor: [
      "Online stores selling on Shopify, Amazon, Etsy, or similar platforms",
      "Brands juggling multiple sales channels and payment processors",
      "Founders who need clean books for inventory and COGS tracking",
    ],
    included: [
      "Marketplace payout reconciliation (fees, refunds, chargebacks)",
      "Cost of goods sold (COGS) and inventory tracking",
      "Sales tax nexus tracking support",
      "Monthly profit & loss and balance sheet",
      "Categorized transactions in QBO/Xero",
    ],
    pricingSignal: "Starting from $TODO/mo — final quote depends on order volume and channels.",
  },
  {
    slug: "healthcare-bookkeeping",
    name: "Healthcare Bookkeeping",
    category: "core-bookkeeping",
    intro:
      "Bookkeeping tailored to medical and healthcare practices, handling insurance reimbursements, patient billing nuances, and practice-specific reporting.",
    whoFor: [
      "Private practices, clinics, and solo healthcare providers",
      "Practices billing through insurance and patient pay",
      "Owners who need practice-level financial visibility for growth",
    ],
    included: [
      "Insurance reimbursement and payer reconciliation",
      "Patient billing and accounts receivable tracking",
      "Monthly financial statements tailored for practice management",
      "Payroll-adjacent expense categorization",
      "Year-end tax-ready financials",
    ],
    pricingSignal: "Starting from $TODO/mo — final quote depends on practice size and payer mix.",
  },
  {
    slug: "small-business-bookkeeping",
    name: "Small Business Bookkeeping",
    category: "core-bookkeeping",
    intro:
      "Full-service bookkeeping for small businesses that need accurate, up-to-date books without hiring an in-house bookkeeper.",
    whoFor: [
      "Small businesses with growing transaction volume",
      "Owners who currently DIY bookkeeping and want it off their plate",
      "Businesses preparing for financing, tax filing, or an audit",
    ],
    included: [
      "Bank and credit card transaction categorization",
      "Monthly bank and credit card reconciliations",
      "Monthly profit & loss and balance sheet",
      "Chart of accounts setup and maintenance",
      "Dedicated bookkeeper point of contact",
    ],
    pricingSignal: "Starting from $TODO/mo — final quote depends on transaction volume.",
  },
  {
    slug: "monthly-bookkeeping",
    name: "Monthly Bookkeeping",
    category: "core-bookkeeping",
    intro:
      "Ongoing monthly bookkeeping to keep your books current, reconciled, and ready for decision-making every month.",
    whoFor: [
      "Businesses that want a predictable monthly bookkeeping cadence",
      "Owners who review financials monthly to guide decisions",
      "Companies that need books closed within a set number of days each month",
    ],
    included: [
      "Monthly transaction categorization and reconciliation",
      "Monthly close with profit & loss and balance sheet",
      "Variance review against prior month",
      "Ongoing chart of accounts maintenance",
      "Monthly check-in call (TODO: confirm cadence/availability)",
    ],
    pricingSignal: "Starting from $TODO/mo — billed monthly, no long-term contract.",
  },
  {
    slug: "quarterly-bookkeeping",
    name: "Quarterly Bookkeeping",
    category: "core-bookkeeping",
    intro:
      "A lower-touch bookkeeping cadence for businesses with simpler books that don't need monthly attention.",
    whoFor: [
      "Lower-volume businesses with straightforward transactions",
      "Side businesses or early-stage companies on a tighter budget",
      "Owners who only need quarterly tax-ready financials",
    ],
    included: [
      "Quarterly transaction categorization and reconciliation",
      "Quarterly profit & loss and balance sheet",
      "Estimated tax payment support coordination",
      "Chart of accounts maintenance",
      "Quarterly review summary",
    ],
    pricingSignal: "Starting from $TODO/quarter — final quote depends on transaction volume.",
  },
  {
    slug: "catch-up-cleanup",
    name: "Catch-up & Year-End Cleanup",
    category: "core-bookkeeping",
    intro:
      "Behind on your books or closing out a messy year? We catch up months (or years) of bookkeeping and clean it up for accurate filing.",
    whoFor: [
      "Businesses behind on bookkeeping by months or years",
      "Owners who inherited disorganized books from a prior bookkeeper",
      "Companies that need clean books before tax filing or financing",
    ],
    included: [
      "Historical transaction categorization and reconciliation",
      "Cleanup of miscategorized or duplicate entries",
      "Reconciled bank, credit card, and loan accounts",
      "Tax-ready financial statements for the catch-up period",
      "Handoff into ongoing monthly bookkeeping (optional)",
    ],
    pricingSignal: "Custom quote based on number of months/years and transaction volume.",
  },
  {
    slug: "year-end-reconciliations",
    name: "Year-End Reconciliations",
    category: "core-bookkeeping",
    intro:
      "A thorough year-end reconciliation of all accounts so your books are accurate and ready for tax filing.",
    whoFor: [
      "Businesses that handle bookkeeping in-house but want a year-end review",
      "Companies preparing for tax filing or year-end financial statements",
      "Owners who want assurance their books are accurate before year-close",
    ],
    included: [
      "Full reconciliation of bank, credit card, and loan accounts",
      "Review and correction of miscategorized transactions",
      "Year-end profit & loss and balance sheet",
      "Summary of adjustments made",
      "Tax-ready financial package",
    ],
    pricingSignal: "Starting from $TODO — final quote depends on account count and volume.",
  },
  {
    slug: "software-setup",
    name: "Accounting Software Setup & Implementation",
    category: "core-bookkeeping",
    intro:
      "We set up QuickBooks Online, Xero, or your accounting platform of choice correctly from day one, including chart of accounts and integrations.",
    whoFor: [
      "New businesses setting up accounting software for the first time",
      "Companies migrating from spreadsheets or another platform",
      "Businesses that want their software configured by a professional before bookkeeping begins",
    ],
    included: [
      "Software selection guidance (QBO, Xero, or other ERP)",
      "Chart of accounts setup tailored to your business",
      "Bank, credit card, and payment processor integrations",
      "Opening balances and historical data import",
      "Team training on day-to-day use (TODO: confirm scope)",
    ],
    pricingSignal: "Starting from $TODO one-time setup fee — varies by platform and complexity.",
  },

  // ---------- Accounting & Financial Management ----------
  {
    slug: "cfo-services",
    name: "Monthly CFO Services",
    category: "financial-management",
    intro:
      "Fractional CFO support on a monthly retainer — strategic financial guidance without the cost of a full-time hire.",
    whoFor: [
      "Growing businesses that need financial strategy, not just bookkeeping",
      "Owners preparing for fundraising, financing, or a major decision",
      "Companies that have outgrown basic bookkeeping support",
    ],
    included: [
      "Monthly financial review and strategy session",
      "Cash flow and runway analysis",
      "Financial scenario planning support",
      "Board/investor-ready reporting (TODO: confirm format)",
      "Direct access to a dedicated advisor",
    ],
    pricingSignal: "Starting from $TODO/mo — custom quote based on scope and meeting cadence.",
  },
  {
    slug: "financial-reporting",
    name: "Financial Reporting & Accountant Services",
    category: "financial-management",
    intro:
      "Accurate, timely financial reporting and accountant-level review so you always know where your business stands.",
    whoFor: [
      "Businesses that need accountant-reviewed (not just bookkeeper-prepared) financials",
      "Owners reporting to investors, lenders, or a board",
      "Companies that want a second set of eyes on monthly numbers",
    ],
    included: [
      "Accountant review of monthly financial statements",
      "Customized reporting package (P&L, balance sheet, cash flow)",
      "Variance analysis and commentary",
      "Year-over-year and budget-to-actual comparisons",
      "Audit-ready documentation support",
    ],
    pricingSignal: "Starting from $TODO/mo — final quote depends on reporting scope.",
  },
  {
    slug: "budgeting-forecasting",
    name: "Budgeting & Forecasting",
    category: "financial-management",
    intro:
      "Build an annual budget and rolling forecast so you can plan spending, hiring, and growth with confidence.",
    whoFor: [
      "Businesses planning next year's budget",
      "Owners who want to model growth, hiring, or expansion scenarios",
      "Companies that need to track actuals against a budget regularly",
    ],
    included: [
      "Annual budget build by department or category",
      "Rolling 12-month forecast",
      "Budget-to-actual tracking and variance reports",
      "Scenario modeling (best case / worst case)",
      "Quarterly budget review (TODO: confirm cadence)",
    ],
    pricingSignal: "Starting from $TODO — custom quote based on business complexity.",
  },
  {
    slug: "cashflow-management",
    name: "Cashflow Management",
    category: "financial-management",
    intro:
      "Stay ahead of cash crunches with proactive cash flow tracking, projections, and recommendations.",
    whoFor: [
      "Businesses with seasonal or uneven cash flow",
      "Owners who've been surprised by cash shortfalls",
      "Companies planning a major purchase, hire, or expansion",
    ],
    included: [
      "13-week (or custom) cash flow forecast",
      "Accounts receivable and payable timing analysis",
      "Cash position reporting and alerts",
      "Recommendations to improve cash conversion cycle",
      "Monthly cash flow review",
    ],
    pricingSignal: "Starting from $TODO/mo — final quote depends on complexity.",
  },
  {
    slug: "kpi-dashboards",
    name: "KPIs & Performance Dashboards",
    category: "financial-management",
    intro:
      "Custom dashboards that track the financial and operational KPIs that matter most to your business, updated regularly.",
    whoFor: [
      "Owners who want at-a-glance visibility into business performance",
      "Businesses tracking metrics beyond standard financial statements",
      "Companies that report performance to partners, investors, or teams",
    ],
    included: [
      "KPI selection workshop (TODO: confirm process)",
      "Custom dashboard build (tooling TBD per client)",
      "Automated or recurring data refresh",
      "Monthly KPI summary and trend commentary",
      "Dashboard access for your team",
    ],
    pricingSignal: "Starting from $TODO one-time build, plus optional monthly maintenance.",
  },
  {
    slug: "fpa-services",
    name: "FP&A Services",
    category: "financial-management",
    intro:
      "Financial planning & analysis support to turn your numbers into actionable insight — modeling, analysis, and decision support.",
    whoFor: [
      "Businesses making data-driven strategic decisions",
      "Companies evaluating new products, pricing, or markets",
      "Owners who need deeper analysis than standard bookkeeping provides",
    ],
    included: [
      "Financial modeling for key business decisions",
      "Profitability analysis by product, service, or segment",
      "Ad hoc analysis support for leadership",
      "Recurring management reporting",
      "Strategic recommendations based on findings",
    ],
    pricingSignal: "Custom quote based on project scope and ongoing needs.",
  },

  // ---------- Operational Support ----------
  {
    slug: "accounts-payable",
    name: "Accounts Payable (AP) Management",
    category: "operational-support",
    intro:
      "We manage your bill pay process end to end — from invoice intake to approval and payment — so nothing falls through the cracks.",
    whoFor: [
      "Businesses with a growing volume of vendor bills",
      "Owners who want approval controls before payments go out",
      "Companies wanting to move off manual, paper-based AP",
    ],
    included: [
      "Invoice intake and data entry",
      "Vendor bill coding and categorization",
      "Approval workflow management",
      "Scheduled bill payments (TODO: confirm payment methods supported)",
      "Vendor account reconciliation",
    ],
    pricingSignal: "Starting from $TODO/mo — final quote depends on bill volume.",
  },
  {
    slug: "accounts-receivable",
    name: "Accounts Receivable (AR) Management",
    category: "operational-support",
    intro:
      "Get paid faster with managed invoicing, payment tracking, and follow-up on outstanding customer balances.",
    whoFor: [
      "Businesses that invoice customers regularly",
      "Owners struggling with late or unpaid invoices",
      "Companies that want consistent, professional collections follow-up",
    ],
    included: [
      "Customer invoicing and delivery",
      "Payment application and tracking",
      "Aging report monitoring",
      "Past-due follow-up and collections outreach",
      "Monthly AR summary reporting",
    ],
    pricingSignal: "Starting from $TODO/mo — final quote depends on invoice volume.",
  },
  {
    slug: "day-to-day-bookkeeper",
    name: "Day-to-Day Bookkeeper & Record Manager",
    category: "operational-support",
    intro:
      "An ongoing, hands-on bookkeeper who manages your day-to-day financial records so you don't have to.",
    whoFor: [
      "Businesses that want a consistent point of contact for bookkeeping",
      "Owners who need day-to-day financial admin handled, not just monthly reports",
      "Companies that generate documents/receipts needing regular organization",
    ],
    included: [
      "Daily/weekly transaction recording",
      "Receipt and document organization",
      "Ongoing recordkeeping and filing",
      "Day-to-day questions and support (TODO: confirm response time SLA)",
      "Monthly summary handoff",
    ],
    pricingSignal: "Starting from $TODO/mo — final quote depends on hours required.",
  },
  {
    slug: "internal-controls",
    name: "Internal Controls & Review Services",
    category: "operational-support",
    intro:
      "We review your financial processes and recommend internal controls to reduce errors, fraud risk, and inefficiency.",
    whoFor: [
      "Growing businesses formalizing financial processes for the first time",
      "Companies that have experienced errors, discrepancies, or fraud concerns",
      "Owners preparing for an audit or due diligence",
    ],
    included: [
      "Review of current financial processes and approval flows",
      "Internal control gap assessment",
      "Recommendations report with prioritized action items",
      "Segregation-of-duties guidance",
      "Optional implementation support (TODO: confirm scope)",
    ],
    pricingSignal: "Custom quote based on business size and process complexity.",
  },
  {
    slug: "payroll-processing",
    name: "Payroll Processing & Management",
    category: "operational-support",
    intro:
      "Accurate, on-time payroll processing and management so your team gets paid correctly and compliantly, every cycle.",
    whoFor: [
      "Businesses with employees and/or contractors on recurring payroll",
      "Owners who want payroll off their plate without losing oversight",
      "Companies needing payroll tax filing handled correctly",
    ],
    included: [
      "Recurring payroll processing (TODO: confirm supported providers)",
      "Employee and contractor payment management",
      "Payroll tax calculation and filing support",
      "New hire and termination processing",
      "Payroll reporting and reconciliation to the books",
    ],
    pricingSignal: "Starting from $TODO/mo — final quote depends on headcount and frequency.",
  },
];
