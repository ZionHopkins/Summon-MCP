// ============================================================
// SUMMON MCP — Objective Classification & Architecture Mapping
// ============================================================

import type { ObjectiveType, ArchitectureShape, DiscoveryQuestion } from "../types/index.js";

// --- Objective Signal Patterns ---
// Keywords/patterns that signal each objective type

export const OBJECTIVE_SIGNALS: Record<ObjectiveType, string[]> = {
  business_growth: [
    "grow", "scale", "revenue", "ARR", "MRR", "customers", "market share",
    "expand", "sales", "acquisition", "retention", "business", "startup",
    "agency", "SaaS", "e-commerce", "clients", "pipeline", "conversion"
  ],
  wealth_creation: [
    "wealth", "invest", "portfolio", "financial", "passive income", "assets",
    "retire", "net worth", "compound", "dividends", "real estate", "stocks",
    "crypto", "trading", "returns", "capital"
  ],
  intelligence_product: [
    "intelligence", "monitoring", "competitive", "analysis for", "reports for",
    "briefing", "signals", "surveillance", "market research", "due diligence",
    "threat", "landscape"
  ],
  learning_mastery: [
    "learn", "master", "understand", "study", "expert in", "teach me",
    "curious about", "deep dive", "how does", "explain", "skill",
    "knowledge", "proficiency", "fluent"
  ],
  creative_production: [
    "content", "create", "produce", "write", "publish", "media",
    "podcast", "video", "blog", "newsletter", "creative", "design",
    "music", "art", "film", "script", "brand"
  ],
  decision_support: [
    "decide", "should I", "evaluate", "pivot", "choose between",
    "assess", "risk", "option", "trade-off", "pros and cons",
    "acquisition", "merger", "hire", "fire", "strategy"
  ],
  operational_automation: [
    "automate", "streamline", "optimize", "process", "workflow",
    "efficiency", "pipeline", "operations", "reduce manual",
    "systematize", "SOP", "playbook"
  ],
  research_discovery: [
    "research", "discover", "hypothesis", "study", "investigate",
    "frontier", "breakthrough", "experiment", "explore", "survey",
    "literature", "findings", "evidence"
  ],
  digital_twin: [
    "summon", "twin of", "channel", "think like", "as if I were",
    "in the style of", "what would .* say", "build me a .* twin"
  ],
  general: []
};

// --- Architecture Shape Mapping ---

export const OBJECTIVE_TO_SHAPE: Record<ObjectiveType, {
  default_shape: ArchitectureShape;
  rationale: string;
  alternatives: Array<{ shape: ArchitectureShape; when: string }>;
}> = {
  business_growth: {
    default_shape: "full_org",
    rationale: "Business growth requires multiple functions working in coordination — strategy, marketing, sales, operations, finance. A full org with specialized agents and reporting structure handles this best.",
    alternatives: [
      { shape: "council", when: "Early-stage with a single bottleneck — a strategy council may be more focused than a full org" },
      { shape: "single_expert", when: "Solo founder needing a thinking partner, not execution agents" }
    ]
  },
  wealth_creation: {
    default_shape: "council",
    rationale: "Wealth creation benefits from multiple analytical perspectives — risk, growth, fundamentals, macro, tax strategy. A council debates and surfaces blind spots better than a single expert or org.",
    alternatives: [
      { shape: "single_expert", when: "User wants a single investment philosophy, not multi-perspective debate" },
      { shape: "full_org", when: "Running an actual fund or investment operation at scale" }
    ]
  },
  intelligence_product: {
    default_shape: "full_org",
    rationale: "Intelligence products need domain specialists for collection, a contrarian editor for quality, and a delivery pipeline. Org structure enables the full intelligence cycle.",
    alternatives: [
      { shape: "council", when: "Analysis-only — no delivery pipeline needed" },
      { shape: "single_expert", when: "Single-domain monitoring with simple output" }
    ]
  },
  learning_mastery: {
    default_shape: "single_expert",
    rationale: "Learning is best served by a deep domain expert who can teach, challenge, and adapt to the learner. One excellent expert beats a committee for pedagogy.",
    alternatives: [
      { shape: "council", when: "Cross-disciplinary learning where multiple perspectives accelerate understanding" },
      { shape: "hybrid", when: "Structured curriculum + expert mentorship" }
    ]
  },
  creative_production: {
    default_shape: "full_org",
    rationale: "Content at scale requires a creative council for ideation, a production pipeline for execution, and domain experts for substance. Org structure handles the full pipeline.",
    alternatives: [
      { shape: "council", when: "Ideation and strategy only — user handles production" },
      { shape: "single_expert", when: "Single-format, single-voice content" }
    ]
  },
  decision_support: {
    default_shape: "council",
    rationale: "Important decisions benefit from structurally diverse reasoning — each council member uses different mental models and frameworks. DMAD ensures genuine perspective diversity, not just different labels.",
    alternatives: [
      { shape: "single_expert", when: "Domain-specific decision where expertise matters more than diversity" },
      { shape: "hybrid", when: "Decision + execution plan needed" }
    ]
  },
  operational_automation: {
    default_shape: "full_org",
    rationale: "Operations automation needs process-specialist agents with QA loops, reporting structure, and continuous optimization. Org structure with heartbeats enables autonomous operation.",
    alternatives: [
      { shape: "single_expert", when: "Process design only — user implements" },
      { shape: "council", when: "Process evaluation before automation" }
    ]
  },
  research_discovery: {
    default_shape: "full_org",
    rationale: "Research at scale needs collection specialists, methodology agents, synthesis, and peer review. Org structure enables the full research cycle with quality gates.",
    alternatives: [
      { shape: "council", when: "Multi-disciplinary analysis without ongoing research operations" },
      { shape: "single_expert", when: "Narrow research question, single-domain" }
    ]
  },
  digital_twin: {
    default_shape: "single_expert",
    rationale: "A digital twin reconstructs one person's cognitive architecture. Single deep agent with all 11 layers.",
    alternatives: [
      { shape: "council", when: "Multiple twins in debate — adversarial or collaborative" }
    ]
  },
  general: {
    default_shape: "single_expert",
    rationale: "When the objective doesn't clearly map to a type, start with a single expert. Can scale to council or org after discovery clarifies the need.",
    alternatives: [
      { shape: "council", when: "Multiple perspectives seem needed" },
      { shape: "full_org", when: "Ongoing autonomous operation is the goal" }
    ]
  }
};

// --- Discovery Questions by Objective Type ---

export const BASE_QUESTIONS: DiscoveryQuestion[] = [
  {
    id: "q_domain",
    question: "What domain or field is this in? Be as specific as you can.",
    why: "Determines the knowledge landscape for domain mapping",
    category: "domain"
  },
  {
    id: "q_outcome",
    question: "What does success look like in 6 months? Describe the concrete outcome.",
    why: "Anchors the architecture to measurable results",
    category: "strategic"
  },
  {
    id: "q_bottleneck",
    question: "What's the single biggest bottleneck or gap right now?",
    why: "Determines where the architecture should concentrate cognitive depth",
    category: "strategic"
  }
];

export const OBJECTIVE_SPECIFIC_QUESTIONS: Record<ObjectiveType, DiscoveryQuestion[]> = {
  business_growth: [
    { id: "bg_stage", question: "What stage is the business? (Pre-revenue, early revenue, scaling, mature)", why: "Determines org complexity — early stage needs fewer agents", category: "strategic" },
    { id: "bg_model", question: "What's the business model? (SaaS, agency, e-commerce, marketplace, content, services)", why: "Shapes which functional agents are needed", category: "domain" },
    { id: "bg_bottleneck", question: "Where is growth currently stuck? (Leads, conversion, retention, operations, hiring)", why: "Focuses the org on the actual constraint", category: "strategic" },
    { id: "bg_team", question: "What does your current team look like? What functions are you weakest in?", why: "Agents should complement, not duplicate existing capability", category: "execution" }
  ],
  wealth_creation: [
    { id: "wc_stage", question: "What's your starting point? (Building from zero, growing existing portfolio, optimizing large portfolio)", why: "Determines council composition", category: "strategic" },
    { id: "wc_style", question: "What's your risk tolerance? (Conservative, balanced, aggressive, don't know yet)", why: "Shapes archetype selection — conservative favors Systematizers, aggressive favors First-Movers", category: "preference" },
    { id: "wc_domains", question: "What asset classes interest you? (Stocks, real estate, crypto, businesses, all of the above)", why: "Determines domain expertise needed", category: "domain" },
    { id: "wc_timeline", question: "What's your time horizon? (1 year, 5 years, 10+, generational)", why: "Affects strategy orientation of council members", category: "strategic" }
  ],
  intelligence_product: [
    { id: "ip_buyer", question: "Who is the buyer of this intelligence? What decisions does it inform?", why: "Shapes output format and delivery cadence", category: "strategic" },
    { id: "ip_sources", question: "What are the primary signal sources? (Public data, proprietary, human intelligence, all)", why: "Determines collection agent specialization", category: "domain" },
    { id: "ip_cadence", question: "How often does the intelligence need to be delivered? (Real-time, daily, weekly, on-demand)", why: "Sets heartbeat intervals and org structure", category: "execution" }
  ],
  learning_mastery: [
    { id: "lm_level", question: "What's your current level in this domain? (Complete beginner, some experience, intermediate, advanced)", why: "Determines expert communication style and depth", category: "preference" },
    { id: "lm_style", question: "How do you learn best? (Socratic dialogue, structured curriculum, hands-on projects, debate and challenge)", why: "Shapes the expert's response protocol", category: "preference" },
    { id: "lm_focus", question: "What specific aspect of this domain matters most to you right now?", why: "Focuses the expert's mental models on the highest-value sub-domain", category: "domain" }
  ],
  creative_production: [
    { id: "cp_format", question: "What content format? (Written, video, audio, visual, multi-format)", why: "Determines production pipeline agents", category: "domain" },
    { id: "cp_voice", question: "Is there a specific creative voice or style you're going for? Any references?", why: "Shapes communication style layers of creative agents", category: "preference" },
    { id: "cp_cadence", question: "What's the target output cadence? (Daily, weekly, monthly)", why: "Sets heartbeat intervals and workload distribution", category: "execution" },
    { id: "cp_distribution", question: "Where does the content go? (Blog, social, newsletter, podcast, YouTube, all)", why: "Determines distribution and analytics agents", category: "execution" }
  ],
  decision_support: [
    { id: "ds_decision", question: "What's the specific decision you're facing? Be concrete.", why: "Council composition depends on the decision domain", category: "strategic" },
    { id: "ds_stakes", question: "What's at stake? What happens if you get it wrong?", why: "High stakes = more council members + deeper analysis", category: "strategic" },
    { id: "ds_timeline", question: "When does this decision need to be made?", why: "Determines depth vs. speed trade-off", category: "execution" },
    { id: "ds_perspectives", question: "Are there specific perspectives you want represented? (Financial, technical, market, contrarian)", why: "Directly shapes council member selection", category: "preference" }
  ],
  operational_automation: [
    { id: "oa_process", question: "What process or workflow do you want to automate?", why: "Determines agent specialization", category: "domain" },
    { id: "oa_volume", question: "What's the volume? How often does this process run?", why: "Shapes heartbeat intervals and parallelism", category: "execution" },
    { id: "oa_quality", question: "What does a quality output look like? How do you measure it today?", why: "Defines the optimization metric", category: "strategic" },
    { id: "oa_handoffs", question: "Where in the process do you need human review vs. full autonomy?", why: "Sets governance level", category: "boundary" }
  ],
  research_discovery: [
    { id: "rd_question", question: "What's the research question or area of investigation?", why: "Determines domain mapping scope", category: "domain" },
    { id: "rd_method", question: "What research methodology? (Literature review, data analysis, experimental, mixed)", why: "Shapes agent roles — analysts, synthesizers, methodology specialists", category: "domain" },
    { id: "rd_output", question: "What's the deliverable? (Report, dataset, recommendations, publication)", why: "Determines output pipeline", category: "execution" }
  ],
  digital_twin: [
    { id: "dt_person", question: "Who do you want to summon? Full name.", why: "Required for research phase", category: "domain" },
    { id: "dt_use", question: "What will you use the twin for? (Thinking partner, decision advice, content creation, training)", why: "Focuses which layers get deepest research", category: "strategic" },
    { id: "dt_aspects", question: "What aspects of their thinking matter most to you? (Strategy, creativity, communication, leadership)", why: "Prioritizes layer depth", category: "preference" }
  ],
  general: [
    { id: "gen_clarify", question: "Help me understand what you're trying to achieve. What would be different in your life/work if this worked perfectly?", why: "Reclassify the objective with more context", category: "strategic" },
    { id: "gen_shape", question: "Are you looking for: (a) a single thinking partner/expert, (b) a group of perspectives to debate, or (c) a full autonomous system that operates on its own?", why: "Directly determines architecture shape", category: "preference" }
  ]
};

// --- Objective Classification Function ---

export function classifyObjective(input: string): {
  type: ObjectiveType;
  confidence: "high" | "medium" | "low";
  reasoning: string;
} {
  const lower = input.toLowerCase();
  const scores: Partial<Record<ObjectiveType, number>> = {};

  // Check for digital twin signals first (pattern-based)
  const twinPatterns = [
    /summon\s+[A-Z]/i,
    /twin\s+of/i,
    /channel\s+[A-Z]/i,
    /think\s+like\s+[A-Z]/i,
    /what\s+would\s+\w+\s+say/i
  ];
  if (twinPatterns.some(p => p.test(input))) {
    return { type: "digital_twin", confidence: "high", reasoning: "Input references a specific person to summon or channel" };
  }

  // Score each objective type by keyword matches
  for (const [type, keywords] of Object.entries(OBJECTIVE_SIGNALS)) {
    if (type === "general" || type === "digital_twin") continue;
    const matchCount = keywords.filter(kw => lower.includes(kw.toLowerCase())).length;
    if (matchCount > 0) {
      scores[type as ObjectiveType] = matchCount;
    }
  }

  // Find highest scoring type
  const sorted = Object.entries(scores).sort(([, a], [, b]) => (b ?? 0) - (a ?? 0));

  if (sorted.length === 0) {
    return { type: "general", confidence: "low", reasoning: "No strong signal patterns detected. Will ask clarifying questions to classify." };
  }

  const [topType, topScore] = sorted[0]!;
  const secondScore = sorted[1]?.[1] ?? 0;

  // Determine confidence
  let confidence: "high" | "medium" | "low";
  if (topScore! >= 3 && topScore! > secondScore * 2) {
    confidence = "high";
  } else if (topScore! >= 2) {
    confidence = "medium";
  } else {
    confidence = "low";
  }

  return {
    type: topType as ObjectiveType,
    confidence,
    reasoning: `Matched ${topScore} signal patterns for ${topType}. ${confidence === "low" ? "Will confirm with user." : ""}`
  };
}
