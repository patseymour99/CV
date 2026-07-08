import type { KnowledgeChunk, SuggestedQuestion } from "@/lib/types";

/**
 * ── EDIT ME ──────────────────────────────────────────────────────────
 * The chat assistant's entire world. Both the Claude system prompt and
 * the client-side fallback engine answer ONLY from these chunks — if a
 * fact isn't here, the assistant says it doesn't know.
 */
export const knowledge: KnowledgeChunk[] = [
  {
    id: "summary",
    topic: "summary",
    text: "Patrick Seymour is a commercial strategist based in London working at the intersection of institutional asset management and frontier AI. He combines three perspectives: the investor's (how leading AI companies make money, compete, and win enterprise adoption), the builder's (shipping agentic AI into live enterprise workflows), and the operator's (running a global franchise's client engagement autonomously from London).",
    keywords: ["who", "about", "overview", "background", "summary", "introduction", "profile", "patrick", "seymour"],
  },
  {
    id: "target-role",
    topic: "availability",
    text: "Patrick is targeting go-to-market and business development roles at a frontier AI lab, where his combination of AI investor perspective, hands-on agentic AI building, and enterprise client experience applies directly.",
    keywords: ["looking", "targeting", "available", "hiring", "role", "job", "opportunity", "gtm", "frontier", "lab", "fit", "why"],
  },
  {
    id: "blackrock-role",
    topic: "experience",
    text: "Since October 2023, Patrick has been a Product Specialist / Investor Relations lead for Technology & AI at BlackRock Fundamental Equities in London. He represents roughly $60bn of AI-dedicated capital to global institutional clients — the commercial face of an investment franchise that invests in and engages with the companies defining the AI frontier.",
    keywords: ["blackrock", "current", "role", "product", "specialist", "investor", "relations", "aum", "60bn", "institutional", "fundamental", "equities", "work", "job"],
  },
  {
    id: "blackrock-autonomy",
    topic: "experience",
    text: "At BlackRock, Patrick operates as the sole London presence of an SF-headquartered team, trusted to run EMEA client engagement autonomously: institutional pitches, consultant due diligence, and AI market-outlook briefings across a full time-zone divide.",
    keywords: ["emea", "london", "autonomous", "independent", "pitch", "consultant", "diligence", "briefing", "ownership"],
  },
  {
    id: "blackrock-launches",
    topic: "experience",
    text: "Patrick launched BAI, BlackRock's flagship AI active ETF, taking it from concept to market — positioning, narrative, sales enablement, and client alignment — and helped scale it to more than $16bn in assets in under two years. He also took a new hedge fund from concept to launch, and writes RFPs, whitepapers, and portfolio commentary translating complex AI investment theses for institutional investors.",
    keywords: ["bai", "launch", "hedge", "fund", "etf", "flagship", "16bn", "product", "positioning", "narrative", "rfp", "whitepaper", "commentary", "writing", "scale"],
  },
  {
    id: "asimov",
    topic: "projects",
    text: "Patrick is building Asimov, an agentic AI platform for BlackRock's entire Product Strategy division. It automates the division's core client and portfolio workflows with grounded, review-gated agent workflows — production tooling in daily use inside a top-tier asset manager. He also drives LLM adoption as a core member of the Fundamental Equities GenAI workgroup.",
    keywords: ["asimov", "agentic", "platform", "built", "building", "genai", "workgroup", "llm", "adoption", "automation", "agent", "shipping"],
  },
  {
    id: "gainpro",
    topic: "experience",
    text: "From July 2022 to July 2023, Patrick was a Senior Research Analyst in Private Equity at Gain.AI in London. He expanded an AI-powered private-markets intelligence platform into three new regions — UK, Nordics, and CEE — built research coverage of Hungary, Croatia, and Serbia from the ground up (used directly by private equity clients in deal sourcing and diligence), and mentored junior analysts.",
    keywords: ["gain", "gainai", "private", "equity", "research", "analyst", "nordics", "cee", "hungary", "croatia", "serbia", "coverage", "intelligence", "mentored"],
  },
  {
    id: "morgan-stanley",
    topic: "experience",
    text: "From April 2020 to December 2021, Patrick was a Finance Intern on the innovation team at Morgan Stanley in Budapest, within the brokerage and clearing department. He automated workflows with VBA, Excel, and Access and built financial data visualisations, cutting the team's manual reporting effort.",
    keywords: ["morgan", "stanley", "intern", "internship", "budapest", "vba", "automation", "brokerage", "clearing", "innovation"],
  },
  {
    id: "achillbox",
    topic: "experience",
    text: "From January 2019 to April 2020, Patrick founded and ran AChillBox, a Budapest-based consumer startup connecting students and young people through live streaming-media events. He built it from zero, owning product, partnerships, and growth.",
    keywords: ["achillbox", "founder", "startup", "founded", "entrepreneurship", "streaming", "students", "growth"],
  },
  {
    id: "ai-skills",
    topic: "skills",
    text: "Patrick's AI skill set covers agentic AI end to end: use-case scoping, prompt engineering, and agent workflow design, with production tooling shipped and in daily use inside a top-tier asset manager. He also has an investor-grade command of the AI ecosystem: business models, unit economics, competitive positioning, and what drives enterprise adoption.",
    keywords: ["ai", "skills", "agentic", "prompt", "engineering", "workflow", "design", "ecosystem", "economics", "enterprise", "adoption", "technical"],
  },
  {
    id: "technical-skills",
    topic: "skills",
    text: "Patrick's technical toolkit includes SQL, VBA, Tableau, Power BI, Excel, and Access, alongside deep domain knowledge of institutional asset management and private markets. He is completing the MiFID II Knowledge & Competence certification. He also designed and built this CV dashboard itself — Next.js, React, TypeScript, Tailwind, and the Anthropic SDK.",
    keywords: ["sql", "vba", "tableau", "power", "bi", "excel", "access", "tools", "technical", "coding", "programming", "mifid", "certification", "stack"],
  },
  {
    id: "commercial-skills",
    topic: "skills",
    text: "Commercially, Patrick is experienced in institutional sales and investor relations, product positioning and launches, RFPs and technical writing, and due diligence and market research — synthesizing complex financial and technical material for demanding audiences.",
    keywords: ["commercial", "sales", "communication", "presenting", "clients", "stakeholders", "writing", "positioning", "strengths"],
  },
  {
    id: "education-corvinus",
    topic: "education",
    text: "Patrick holds a BA in Business Management & Administration from Corvinus University of Budapest with a first-class equivalent grade (4.71). His thesis on the impact of blockchain on the asset management industry was graded 99%.",
    keywords: ["education", "degree", "university", "corvinus", "budapest", "thesis", "blockchain", "grade", "studied", "study"],
  },
  {
    id: "education-usc",
    topic: "education",
    text: "Patrick completed an exchange programme at the University of Southern California's Marshall School of Business, with coursework in Global Strategy, Business Communication, and Blockchain. He was a member of the USC Blockchain Club, organizing events and managing treasury functions. His secondary education was at The John Warner School in Hertfordshire, UK (A-Levels and GCSEs).",
    keywords: ["usc", "southern", "california", "marshall", "exchange", "blockchain", "club", "school", "hertfordshire", "a-level", "gcse"],
  },
  {
    id: "volunteering",
    topic: "personal",
    text: "Between 2015 and 2017, Patrick self-funded volunteering expeditions to Cambodia and Nepal: a four-week expedition developing a school and local housing in a Cambodian village, and in Nepal a trek to Everest base camp plus the restoration of an orphanage and a school. He fundraised and organized the resources himself.",
    keywords: ["volunteering", "volunteer", "cambodia", "nepal", "everest", "charity", "impact", "expedition", "orphanage"],
  },
  {
    id: "languages-interests",
    topic: "personal",
    text: "Patrick is a native English speaker with advanced Hungarian. Outside work he plays tennis and chess, and is actively engaged in equity and crypto markets and the application of AI in financial services.",
    keywords: ["languages", "english", "hungarian", "hobbies", "interests", "tennis", "chess", "crypto", "personal", "fun"],
  },
  {
    id: "location",
    topic: "personal",
    text: "Patrick is based in London, United Kingdom.",
    keywords: ["located", "location", "based", "live", "lives", "city", "london", "uk", "where"],
  },
  {
    id: "contact",
    topic: "contact",
    text: "You can reach Patrick by email at pws1live@gmail.com or by phone at +44 7904 815358. Email is the fastest way to arrange a conversation.",
    keywords: ["contact", "email", "phone", "reach", "call", "touch", "interview", "connect", "talk"],
  },
  {
    id: "this-site",
    topic: "projects",
    text: "This dashboard is itself one of Patrick's projects: an interactive CV built with Next.js 16, React 19, TypeScript, and Tailwind 4. The chat you're using is hybrid — a streaming Claude-powered assistant grounded strictly in his CV, with a hand-built client-side retrieval engine that takes over automatically if the API is unavailable.",
    keywords: ["site", "dashboard", "website", "chat", "assistant", "built", "how", "works", "nextjs", "react", "claude"],
  },
];

export const suggestedQuestions: SuggestedQuestion[] = [
  { label: "Role at BlackRock", question: "What does Patrick do at BlackRock?" },
  { label: "The BAI ETF", question: "Tell me about the BAI ETF Patrick launched." },
  { label: "What is Asimov?", question: "What is Asimov, the AI platform Patrick is building?" },
  { label: "Fit for an AI lab", question: "Why would Patrick be a strong hire for a frontier AI lab?" },
  { label: "Technical toolkit", question: "What are Patrick's technical skills?" },
  { label: "Education", question: "What is Patrick's education background?" },
  { label: "Contact", question: "How can I get in touch with Patrick?" },
];
