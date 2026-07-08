import type { Profile } from "@/lib/types";

/**
 * ── EDIT ME ──────────────────────────────────────────────────────────
 * This file (plus src/data/knowledge.ts) is the single source of truth
 * for everything on the site. Update your CV here; no component changes
 * are ever needed.
 */
export const profile: Profile = {
  name: "Patrick Seymour",
  title: "AI Go-To-Market · Product Strategy · Investor Relations",
  location: "London, UK",
  summary:
    "Commercial strategist working at the point where the world's largest asset manager meets the AI frontier — combining the investor's view of how AI companies win, the builder's experience shipping agentic AI into live enterprise workflows, and the operator's track record running a global franchise's client engagement from London.",

  contact: [
    { type: "email", label: "pws1live@gmail.com", href: "mailto:pws1live@gmail.com" },
    { type: "phone", label: "+44 7904 815358", href: "tel:+447904815358" },
  ],

  stats: [
    { label: "AI-dedicated AUM represented", value: 60, prefix: "$", suffix: "bn" },
    { label: "BAI ETF — scaled in under 2 years", value: 16, prefix: "$", suffix: "bn+" },
    { label: "Markets launched from scratch", value: 3 },
    { label: "Years across finance & tech", value: 7, suffix: "+" },
  ],

  experience: [
    {
      id: "blackrock",
      company: "BlackRock",
      role: "Product Specialist / IR, Technology & AI",
      location: "London",
      start: "2023-10",
      end: null,
      summary:
        "The commercial face of a ~$60bn AI investment franchise — and the builder of its agentic AI platform.",
      highlights: [
        {
          text: "Represent ~$60bn of AI-dedicated capital to global institutional clients within BlackRock Fundamental Equities — an investment franchise that invests in and engages with the companies defining the AI frontier.",
          metric: "~$60bn AUM",
        },
        {
          text: "Launched BAI, BlackRock's flagship AI active ETF, from concept to market — positioning, narrative, sales enablement, and client alignment — and helped scale it to more than $16bn in under two years, alongside a new hedge fund launch.",
          metric: ">$16bn in <2 yrs",
        },
        {
          text: "Building Asimov, an agentic AI platform for BlackRock's entire Product Strategy division — automating the division's core client and portfolio workflows — while driving LLM adoption as a core member of the Fundamental Equities GenAI workgroup.",
          metric: "in daily use",
        },
        {
          text: "Operate as the sole London presence of an SF-headquartered team, trusted to run EMEA client engagement autonomously: institutional pitches, consultant due diligence, and AI market-outlook briefings across a full time-zone divide.",
        },
        {
          text: "Translate complex AI investment theses into commercial narratives — RFPs, whitepapers, and portfolio commentary — for global institutional investors.",
        },
      ],
      tags: ["agentic-ai", "gtm", "client-engagement", "product-launch", "ai-ecosystem", "communication"],
    },
    {
      id: "gainpro",
      company: "Gain.AI",
      role: "Senior Research Analyst, Private Equity",
      location: "London",
      start: "2022-07",
      end: "2023-07",
      summary:
        "Scaled an AI-powered private-markets intelligence platform into three new regions.",
      highlights: [
        {
          text: "Expanded an AI-powered private-markets intelligence platform into three new regions — UK, Nordics, and CEE — shaping coverage strategy and client insight that underpinned the platform's commercial growth.",
          metric: "3 regions",
        },
        {
          text: "Built research coverage of Hungary, Croatia, and Serbia from the ground up — intelligence used directly by private equity clients in deal sourcing and diligence.",
        },
        {
          text: "Mentored junior analysts as the team scaled.",
        },
      ],
      tags: ["research", "private-markets", "gtm", "leadership", "data"],
    },
    {
      id: "morgan-stanley",
      company: "Morgan Stanley",
      role: "Finance Intern, Innovation Team",
      location: "Budapest",
      start: "2020-04",
      end: "2021-12",
      summary:
        "Automated brokerage & clearing workflows and built financial data visualisations.",
      highlights: [
        {
          text: "Automated brokerage and clearing workflows with VBA, Excel, and Access, cutting the innovation team's manual reporting effort.",
        },
        {
          text: "Built financial data visualisations used in the brokerage and clearing department's reporting.",
        },
      ],
      tags: ["automation", "data", "technical"],
    },
    {
      id: "achillbox",
      company: "AChillBox",
      role: "Founder",
      location: "Budapest",
      start: "2019-01",
      end: "2020-04",
      summary:
        "Built a consumer startup from zero — product, partnerships, and growth.",
      highlights: [
        {
          text: "Founded and ran a Budapest-based consumer startup connecting students and young people through live streaming-media events — owning product, partnerships, and growth end to end.",
        },
      ],
      tags: ["founder", "product-launch", "gtm", "leadership"],
    },
  ],

  education: [
    {
      id: "corvinus",
      institution: "Corvinus University of Budapest",
      degree: "BA, Business Management & Administration",
      detail:
        "First-class equivalent (4.71). Thesis on the impact of blockchain on the asset management industry — graded 99%.",
    },
    {
      id: "usc",
      institution: "University of Southern California — Marshall School of Business",
      degree: "Exchange Programme",
      detail:
        "Global Strategy, Business Communication, and Blockchain coursework. USC Blockchain Club member, running events and treasury.",
    },
    {
      id: "john-warner",
      institution: "The John Warner School, Hertfordshire",
      degree: "A-Levels & GCSEs",
    },
  ],

  skills: [
    {
      category: "AI & Agentic",
      proof:
        "Shipped to production at BlackRock — **Asimov**, agent workflows in daily use — plus this site's hybrid AI chat.",
      skills: [
        { name: "Agent workflow design", tags: ["agentic-ai"] },
        { name: "Prompt engineering", tags: ["agentic-ai"] },
        { name: "AI ecosystem & unit economics", tags: ["ai-ecosystem"] },
      ],
    },
    {
      category: "Commercial & GTM",
      proof:
        "Launched **BAI** and helped scale it past **$16bn** in under two years; runs EMEA engagement for a **$60bn** AI franchise.",
      skills: [
        { name: "Institutional sales & IR", tags: ["client-engagement", "gtm"] },
        { name: "Product positioning & launch", tags: ["product-launch", "gtm"] },
        { name: "RFPs & technical writing", tags: ["communication"] },
        { name: "Due diligence & market research", tags: ["research"] },
        { name: "Institutional asset management", tags: ["client-engagement", "ai-ecosystem"] },
        { name: "Private markets", tags: ["private-markets", "research"] },
      ],
    },
    {
      category: "Data & Tools",
      proof: "The working toolkit behind the research, automation, and reporting above.",
      skills: [
        { name: "SQL", tags: ["data", "technical"] },
        { name: "VBA & Excel automation", tags: ["automation", "technical"] },
        { name: "Tableau & Power BI", tags: ["data"] },
      ],
    },
  ],

  projects: [
    {
      id: "asimov",
      name: "Asimov — Agentic AI Platform",
      description:
        "An agentic AI platform for BlackRock's entire Product Strategy division: grounded, review-gated agent workflows that automate the division's core client and portfolio work — RFPs, Q&A, portfolio intelligence.",
      impact: "Production tooling in daily use inside a top-tier asset manager.",
      tech: ["Agent workflows", "Claude API", "Next.js", "TypeScript"],
      tags: ["agentic-ai", "product-launch"],
    },
    {
      id: "team-profiles",
      name: "Team Personality Profiles",
      description:
        "An AI tool that scans the team's emails, chats, and documents and reads the work across four dimensions — commercial focus, analytical rigour, clarity, and responsiveness — mapping how each person's personality translates into their work.",
      impact: "Used to position people around their strengths.",
      tech: ["LLM analysis", "Prompt engineering", "Data pipelines"],
      tags: ["agentic-ai", "leadership", "data"],
    },
    {
      id: "blockchain-thesis",
      name: "Blockchain × Asset Management Thesis",
      description:
        "Undergraduate thesis on the impact of blockchain on the asset management industry.",
      impact: "Graded 99%.",
      tech: ["Research", "Market analysis"],
      tags: ["research", "ai-ecosystem"],
    },
    {
      id: "achillbox-project",
      name: "AChillBox",
      description:
        "Consumer startup connecting students through live streaming-media events — built from zero: product, partnerships, and growth.",
      tech: ["Product", "Partnerships", "Growth"],
      tags: ["founder", "gtm"],
    },
  ],

  achievements: [
    {
      id: "genai-workgroup",
      title: "BlackRock FE GenAI Workgroup",
      detail: "Core member coordinating the build-out of AI applications for investment use cases.",
    },
    {
      id: "thesis-99",
      title: "Thesis graded 99%",
      detail: "Blockchain's impact on asset management — Corvinus University.",
      year: "2022",
    },
    {
      id: "first-class",
      title: "First-class equivalent degree (4.71)",
      detail: "BA Business Management & Administration, Corvinus University of Budapest.",
    },
    {
      id: "mifid",
      title: "MiFID II Knowledge & Competence",
      detail: "In progress.",
    },
    {
      id: "volunteering",
      title: "Volunteering — Cambodia & Nepal",
      detail: "Self-funded school-development expeditions; Everest base camp trek and orphanage restoration.",
      year: "2015–17",
    },
    {
      id: "languages",
      title: "English (native) · Hungarian (advanced)",
      detail: "Working languages across UK, US, and CEE markets.",
    },
    {
      id: "interests",
      title: "Tennis · Chess · Markets",
      detail: "Actively engaged in equity and crypto markets and applied AI.",
    },
  ],
};
