// Single source of truth for the /partners page copy and rates.
// Rates are client-facing and change periodically — edit them here only.

export const partnerHero = {
  eyebrow: "Faaz Partner Program",
  headline: {
    before: "Refer a client once. Get paid ",
    highlight: "every time",
    after: " we file for them.",
  },
  subhead:
    "Two ways to earn by referring LLC formation clients to Faaz Financial Group — pick a flat commission, or run your own branded formation business on our backend.",
  stats: [
    { value: "$20", label: "Flat referral payout" },
    { value: "95%", label: "Of partners choose White Label" },
    { value: "50", label: "States we file in" },
  ],
};

export const partnerOffers = [
  {
    variant: "light",
    option: "Option 01",
    title: "Referral Rewards",
    description:
      "Send us a client under your referral name. We handle the sale, the pricing, and the client conversation at our standard rates — you just collect your cut.",
    payout: {
      label: "You earn",
      value: "$20 / client",
      note: "Fixed, paid on every closed referral",
    },
    benefits: [
      {
        title: "Zero effort after the intro",
        detail: "We quote, close, and deliver — you just make the connection.",
      },
      {
        title: "Faaz rates apply",
        detail: "Clients pay our existing published pricing directly.",
      },
      {
        title: "Best for occasional referrals",
        detail: "Simple and hands-off — no need to manage clients yourself.",
      },
    ],
    footnote: {
      before: "Best if you send referrals ",
      highlight: "occasionally",
      after: " and want zero admin",
    },
  },
  {
    variant: "dark",
    badge: "Most chosen · 95% of partners",
    option: "Option 02",
    title: "White Label Partner",
    description:
      "Set your own price and sell formation services under your own brand. Clients pay you directly — you send us our base rate and keep the rest.",
    payout: {
      label: "You earn",
      value: "Your price − our rate",
      note: "The margin is entirely yours to set",
    },
    benefits: [
      {
        title: "You price it, you collect it",
        detail:
          "Money lands in your bank account first — you decide the markup, client by client.",
      },
      {
        title: "We fulfill fully on the backend",
        detail:
          "Once you send us our rate, we handle the entire filing and delivery.",
      },
      {
        title: "100% private, 100% your brand",
        detail:
          "Present it as your own team. We never discuss pricing with your clients — ever.",
      },
    ],
    footnote: {
      before: "Best if you want ",
      highlight: "full pricing control",
      after: " and higher margins",
    },
  },
];

export const baseRates = {
  eyebrow: "Current base rates (Example)",
  title: "Wyoming LLC Formation",
  description:
    "These are the base rates behind both programs — your $20 referral is paid on top of these, and your White Label margin is calculated against these.",
  tiers: [
    {
      name: "Express Delivery",
      duration: "7 days",
      price: "$515",
      note: "Faster turnaround, priority filing",
      featured: true,
    },
    {
      name: "Standard Delivery",
      duration: "14 days",
      price: "$475",
      note: "Standard processing timeline",
      featured: false,
    },
  ],
};

export const whiteLabelFlow = {
  eyebrow: "White label flow",
  title: "How Option 02 works, start to finish",
  description:
    "Here's the full loop once you decide to run White Label — from first client to final delivery.",
  steps: [
    {
      step: "01",
      title: "You quote your client",
      detail:
        "Set whatever price you want, client by client. Faaz's rates never appear in this conversation.",
    },
    {
      step: "02",
      title: "Client pays you directly",
      detail:
        "Payment lands in your own bank account — you're the merchant of record from the client's view.",
    },
    {
      step: "03",
      title: "You send us our rate",
      detail:
        "Forward our base rate for the service selected. You keep the balance as your margin.",
    },
    {
      step: "04",
      title: 'We deliver as "your team"',
      detail:
        "We file and fulfill on the backend under your brand. No direct contact or pricing talk with your client, ever.",
    },
  ],
};

export const partnerCta = {
  before: "Ready to start earning? ",
  highlight: "Pick your program and send us your first referral.",
  buttonLabel: "Connect With Us",
  buttonHref: "/contact",
  disclaimer:
    "Rates shown apply to Wyoming LLC formation and are subject to change. Faaz Financial Group LLC.",
};
