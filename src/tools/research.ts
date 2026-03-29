// ============================================================
// SUMMON MCP — Research Tool
// Returns structured research instructions for host LLM web search
// ============================================================

import type { ObjectiveType, ArchitectureShape, ResearchOutput } from "../types/index.js";

function generateSearchQueries(domain: string, objective: string, objectiveType: ObjectiveType): string[] {
  const base = [
    `${domain} core sub-domains key areas`,
    `${domain} contested debates current 2025 2026`,
    `${domain} common mistakes failure modes`,
    `${domain} best practitioners thought leaders`,
    `${domain} emerging trends edge developments`,
  ];

  const typeSpecific: Record<ObjectiveType, string[]> = {
    business_growth: [
      `${domain} business growth strategies scaling`,
      `${domain} revenue optimization case studies`,
      `${domain} competitive landscape market size`,
    ],
    wealth_creation: [
      `${domain} investment strategies returns`,
      `${domain} risk management approaches`,
      `${domain} wealth building long term`,
    ],
    intelligence_product: [
      `${domain} intelligence analysis methodology`,
      `${domain} competitive intelligence sources`,
      `${domain} monitoring tools platforms`,
    ],
    learning_mastery: [
      `${domain} learning path curriculum`,
      `${domain} expert vs beginner mental models`,
      `${domain} mastery skills progression`,
    ],
    creative_production: [
      `${domain} content strategy production`,
      `${domain} creative best practices`,
      `${domain} audience engagement growth`,
    ],
    decision_support: [
      `${domain} decision frameworks evaluation criteria`,
      `${domain} risk assessment methodology`,
      `${objective} pros cons analysis`,
    ],
    operational_automation: [
      `${domain} automation best practices`,
      `${domain} process optimization SOP`,
      `${domain} efficiency metrics benchmarks`,
    ],
    research_discovery: [
      `${domain} research methodology approaches`,
      `${domain} frontier discoveries recent`,
      `${domain} open questions unsolved problems`,
    ],
    digital_twin: [], // Handled separately via person-specific queries
    general: [
      `${domain} overview comprehensive guide`,
      `${domain} expert perspectives`,
    ],
  };

  return [...base, ...(typeSpecific[objectiveType] || [])];
}

function generatePersonQueries(personName: string): string[] {
  return [
    `${personName} long interview podcast`,
    `${personName} advice principles framework`,
    `${personName} biggest mistake what I got wrong`,
    `${personName} primary domain expertise`,
    `${personName} Twitter X tweets threads`,
    `${personName} book summary key ideas`,
    `${personName} debate disagrees controversy`,
    `${personName} uncertain I don't know changed mind`,
  ];
}

export function executeResearch(input: {
  domain: string;
  objective: string;
  objective_type: ObjectiveType;
  architecture_shape: ArchitectureShape;
  discovery_answers: Record<string, string>;
}): ResearchOutput {
  const searchQueries = generateSearchQueries(input.domain, input.objective, input.objective_type);

  const personQueries = input.objective_type === "digital_twin"
    ? generatePersonQueries(input.discovery_answers["dt_person"] || input.domain)
    : undefined;

  return {
    search_queries: searchQueries,
    person_research_queries: personQueries,
    domain_map_template: {
      sub_domains: "FILL: Identify 5-7 core sub-domains or skill areas. What is the hierarchy? Which are foundational vs. advanced?",
      settled_knowledge: "FILL: What is established fact in this field? What would every expert agree on?",
      contested_territory: "FILL: What is actively debated? Name competing schools of thought. Which side should this expert take?",
      emerging_edge: "FILL: What are new developments not yet fully processed by the field?",
      failure_modes: {
        beginner_mistakes: "FILL: Top 5-10 mistakes beginners make",
        expert_mistakes: "FILL: Top 3-5 mistakes even experienced practitioners still make",
        counterproductive_best_practices: "FILL: What 'best practices' does the field repeat that are actually counterproductive?"
      },
      emotional_landscape: {
        energizers: "FILL: What excites the best practitioners in this field?",
        frustration_triggers: "FILL: What common misconceptions or bad practices trigger frustration?",
        protective_topics: "FILL: What do experienced practitioners feel protective of?"
      },
      adjacent_domains: "FILL: What 3-5 adjacent disciplines feed into this domain? Which mental models from adjacent fields would most improve decision-making?",
      coupling_landscape: {
        strongest_dependencies: "FILL: Which sub-domains have the strongest dependencies? These become inter-layer coupling targets.",
        productive_contradictions: "FILL: Where do domain tensions create productive contradictions? These become Conflict Preservation candidates.",
        expert_emergent_behaviors: "FILL: What emergent behaviors distinguish experts from competent practitioners? These test successful coupling."
      }
    },
    validation: {
      min_searches: input.objective_type === "digital_twin" ? 8 : 5,
      required_coverage: ["sub_domains", "contested_territory", "failure_modes", "coupling_landscape"],
      depth_check: "If any section has fewer than 2 specific, concrete entries, do additional searches to fill the gap. Domain mapping depth directly determines agent quality."
    },
    next_step: `Execute the search queries using web search. Fill in every FILL field in the domain_map_template with specific, concrete findings. ${input.objective_type === "digital_twin" ? "Also execute the person_research_queries to gather cognitive architecture data for the twin. " : ""}After completing the domain map, call summon_design with the filled domain_map, discovery_answers, objective ("${input.objective}"), objective_type ("${input.objective_type}"), and architecture_shape ("${input.architecture_shape}").`
  };
}
