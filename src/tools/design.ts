// ============================================================
// SUMMON MCP — Design Tool
// Shape-aware: produces single expert, council, full org, or hybrid
// ============================================================

import type { ObjectiveType, ArchitectureShape, DesignOutput, AgentSpec, Archetype } from "../types/index.js";
import { ARCHETYPES, ARCHETYPE_SELECTION_INSTRUCTIONS } from "../templates/archetypes.js";
import { DEBATE_PROTOCOLS, COUNCIL_CONFLICT_MAP_TEMPLATE } from "../templates/council.js";

function selectArchetype(role: string, objectiveType: ObjectiveType): Archetype {
  // Heuristic archetype selection based on role + objective
  const roleArchetypeMap: Record<string, Archetype> = {
    ceo: "Systematizer",
    strategy: "First-Mover",
    research: "Integrator",
    analyst: "Systematizer",
    editor: "Contrarian",
    creative: "Integrator",
    quality: "Contrarian",
    operations: "Systematizer",
    growth: "First-Mover",
    risk: "Contrarian",
    innovation: "First-Mover",
    synthesis: "Integrator",
  };

  const roleLower = role.toLowerCase();
  for (const [key, archetype] of Object.entries(roleArchetypeMap)) {
    if (roleLower.includes(key)) return archetype;
  }

  // Default based on objective type
  const objectiveDefaults: Record<ObjectiveType, Archetype> = {
    business_growth: "Systematizer",
    wealth_creation: "First-Mover",
    intelligence_product: "Systematizer",
    learning_mastery: "Integrator",
    creative_production: "Integrator",
    decision_support: "Contrarian",
    operational_automation: "Systematizer",
    research_discovery: "Integrator",
    digital_twin: "Systematizer",
    general: "Systematizer",
  };

  return objectiveDefaults[objectiveType];
}

function designSingleExpert(domain: string, objective: string, objectiveType: ObjectiveType): DesignOutput {
  const archetype = selectArchetype("expert", objectiveType);

  const agent: AgentSpec = {
    id: "expert",
    title: `${domain} Expert`,
    role_type: "expert",
    archetype,
    archetype_rationale: `${archetype} selected because: ${ARCHETYPES[archetype].best_when}`,
    depth: "full",
    reports_to: null,
    responsibilities: [
      `Provide deep expertise in ${domain}`,
      `Challenge assumptions and surface blind spots`,
      `Apply ${archetype} reasoning to all questions`,
      `Flag domain boundaries and uncertainty honestly`
    ],
    kpis: [
      "Substance accuracy — would a real expert agree?",
      "Boundary enforcement — flags uncertainty appropriately",
      "Coupling integrity — multi-layer processing visible in responses"
    ],
    heartbeat_interval_sec: 86400,
    budget_credits: 3000,
    model_recommendation: "sonnet"
  };

  return {
    architecture: { shape: "single_expert", objective, objective_type: objectiveType },
    agents: [agent],
    org_chart: { structure: `Single expert: ${agent.title} (${archetype})` },
    dmad_verification: {
      passed: true,
      archetype_distribution: { [archetype]: 1 },
      reasoning_diversity_score: "Single expert — DMAD not applicable. Diversity comes from the expert's internal conflict preservation."
    },
    next_step: `Call summon_build_agents with agent_id "expert" to generate the full 11-layer superprompt.`
  };
}

function designCouncil(domain: string, objective: string, objectiveType: ObjectiveType, answers: Record<string, string>): DesignOutput {
  // Build 3-5 council members with diverse archetypes
  const archetypePool: Archetype[] = ["Systematizer", "Contrarian", "First-Mover", "Integrator"];
  const memberCount = objectiveType === "decision_support" ? 4 : 3;

  const agents: AgentSpec[] = [];
  for (let i = 0; i < memberCount; i++) {
    const archetype = archetypePool[i % archetypePool.length]!;
    const titles: Record<Archetype, string> = {
      Systematizer: "Process Analyst",
      Contrarian: "Challenger",
      "First-Mover": "Opportunity Scout",
      Integrator: "Synthesis Thinker"
    };

    agents.push({
      id: `council_${archetype.toLowerCase().replace("-", "_")}`,
      title: `${titles[archetype]} — ${domain}`,
      role_type: "council_member",
      archetype,
      archetype_rationale: `${archetype} reasoning provides: ${ARCHETYPES[archetype].cognitive_profile}`,
      depth: "full",
      reports_to: null,
      responsibilities: [
        `Analyze questions through ${archetype} lens`,
        `Provide independent perspective before seeing other members' analysis`,
        `Challenge other members' reasoning paths, not just conclusions`,
        `Flag when your archetype bias may be distorting your analysis`
      ],
      kpis: [
        "Reasoning distinctiveness — uses structurally different approach from other members",
        "Self-awareness — flags own archetype's blind spots",
        "Engagement quality — responds to substance of others' arguments"
      ],
      heartbeat_interval_sec: 86400,
      budget_credits: 2000,
      model_recommendation: "sonnet"
    });
  }

  // Build conflict map
  const conflictMap = [];
  for (let i = 0; i < agents.length; i++) {
    for (let j = i + 1; j < agents.length; j++) {
      const a = agents[i]!;
      const b = agents[j]!;
      conflictMap.push({
        agent_a: a.id,
        agent_b: b.id,
        predicted_fault_line: `${a.archetype} vs ${b.archetype}: ${a.archetype} will prioritize ${ARCHETYPES[a.archetype].signature_coupling_pattern.tightest_coupling.split("(")[0]} while ${b.archetype} will prioritize ${ARCHETYPES[b.archetype].signature_coupling_pattern.tightest_coupling.split("(")[0]}`,
        reasoning_diversity_check: `Structurally different: ${a.archetype}'s metacognition checks "${ARCHETYPES[a.archetype].signature_coupling_pattern.metacognition_check}" vs ${b.archetype}'s "${ARCHETYPES[b.archetype].signature_coupling_pattern.metacognition_check}"`
      });
    }
  }

  // Verify DMAD
  const archetypeCounts: Record<string, number> = {};
  agents.forEach(a => { archetypeCounts[a.archetype] = (archetypeCounts[a.archetype] || 0) + 1; });
  const uniqueArchetypes = Object.keys(archetypeCounts).length;

  return {
    architecture: { shape: "council", objective, objective_type: objectiveType },
    agents,
    org_chart: { structure: `Council: ${agents.map(a => `${a.title} (${a.archetype})`).join(" | ")}` },
    council_config: {
      members: agents.map(a => a.id),
      debate_protocol: DEBATE_PROTOCOLS.structured_debate,
      conflict_map: conflictMap,
      synthesis_method: objectiveType === "decision_support" ? "structured_debate" : "weighted_consensus"
    },
    dmad_verification: {
      passed: uniqueArchetypes >= 2,
      archetype_distribution: archetypeCounts,
      reasoning_diversity_score: `${uniqueArchetypes} unique archetype signatures across ${agents.length} members. ${uniqueArchetypes >= 2 ? "PASSED" : "FAILED — need more archetype diversity"}`
    },
    next_step: `Call summon_build_agents for each council member to generate their 11-layer superprompts. Build them independently — no cross-contamination during construction.`
  };
}

function designFullOrg(domain: string, objective: string, objectiveType: ObjectiveType, answers: Record<string, string>): DesignOutput {
  // Design org structure based on objective type
  const orgTemplates: Record<string, () => AgentSpec[]> = {
    business_growth: () => [
      makeAgent("ceo", "Chief Executive Officer", "ceo", "Systematizer", domain, objectiveType, null, 5000, 600),
      makeAgent("strategist", "Growth Strategist", "manager", "First-Mover", domain, objectiveType, "ceo", 3000, 900),
      makeAgent("marketing_lead", "Marketing Lead", "manager", "Integrator", domain, objectiveType, "ceo", 3000, 600),
      makeAgent("sales_analyst", "Sales Analyst", "ic", "Systematizer", domain, objectiveType, "strategist", 2000, 600),
      makeAgent("content_creator", "Content Creator", "ic", "Integrator", domain, objectiveType, "marketing_lead", 2000, 600),
      makeAgent("qa_reviewer", "Quality Reviewer", "ic", "Contrarian", domain, objectiveType, "ceo", 1500, 900),
    ],
    intelligence_product: () => [
      makeAgent("ceo", "Intelligence Director", "ceo", "Systematizer", domain, objectiveType, null, 5000, 600),
      makeAgent("domain_analyst_1", "Senior Domain Analyst", "ic", "Systematizer", domain, objectiveType, "ceo", 3000, 600),
      makeAgent("domain_analyst_2", "Domain Analyst — Emerging Signals", "ic", "First-Mover", domain, objectiveType, "ceo", 3000, 600),
      makeAgent("contrarian_editor", "Contrarian Editor", "ic", "Contrarian", domain, objectiveType, "ceo", 2500, 900),
      makeAgent("synthesis", "Synthesis & Delivery", "ic", "Integrator", domain, objectiveType, "ceo", 2000, 600),
    ],
    creative_production: () => [
      makeAgent("ceo", "Creative Director", "ceo", "Integrator", domain, objectiveType, null, 5000, 600),
      makeAgent("ideation", "Ideation Lead", "manager", "First-Mover", domain, objectiveType, "ceo", 3000, 900),
      makeAgent("writer", "Lead Writer", "ic", "Integrator", domain, objectiveType, "ideation", 3000, 600),
      makeAgent("editor", "Editor & Quality Gate", "ic", "Contrarian", domain, objectiveType, "ceo", 2000, 900),
      makeAgent("distribution", "Distribution & Analytics", "ic", "Systematizer", domain, objectiveType, "ceo", 1500, 1800),
    ],
    operational_automation: () => [
      makeAgent("ceo", "Operations Director", "ceo", "Systematizer", domain, objectiveType, null, 5000, 600),
      makeAgent("process_designer", "Process Designer", "manager", "Systematizer", domain, objectiveType, "ceo", 3000, 600),
      makeAgent("executor", "Execution Agent", "ic", "Systematizer", domain, objectiveType, "process_designer", 2000, 300),
      makeAgent("qa", "Quality Assurance", "ic", "Contrarian", domain, objectiveType, "ceo", 2000, 600),
      makeAgent("optimizer", "Continuous Optimizer", "ic", "First-Mover", domain, objectiveType, "ceo", 1500, 1800),
    ],
    research_discovery: () => [
      makeAgent("ceo", "Research Director", "ceo", "Integrator", domain, objectiveType, null, 5000, 600),
      makeAgent("methodology", "Methodology Lead", "manager", "Systematizer", domain, objectiveType, "ceo", 3000, 900),
      makeAgent("researcher_1", "Senior Researcher", "ic", "Integrator", domain, objectiveType, "methodology", 3000, 600),
      makeAgent("researcher_2", "Contrarian Researcher", "ic", "Contrarian", domain, objectiveType, "methodology", 3000, 600),
      makeAgent("synthesis", "Synthesis & Publication", "ic", "Systematizer", domain, objectiveType, "ceo", 2000, 900),
    ],
  };

  // Select template or use default
  const templateFn = orgTemplates[objectiveType] || orgTemplates["business_growth"]!;
  const agents = templateFn();

  // DMAD verification
  const archetypeCounts: Record<string, number> = {};
  agents.forEach(a => { archetypeCounts[a.archetype] = (archetypeCounts[a.archetype] || 0) + 1; });
  const uniqueArchetypes = Object.keys(archetypeCounts).length;

  // Build org chart string
  const ceo = agents.find(a => !a.reports_to);
  const orgLines = [ceo ? `${ceo.title} (${ceo.archetype}) [CEO]` : ""];
  const managers = agents.filter(a => a.reports_to === ceo?.id && a.role_type === "manager");
  const directIcs = agents.filter(a => a.reports_to === ceo?.id && a.role_type === "ic");

  managers.forEach(m => {
    orgLines.push(`├── ${m.title} (${m.archetype})`);
    const ics = agents.filter(a => a.reports_to === m.id);
    ics.forEach((ic, i) => {
      orgLines.push(`│   ${i === ics.length - 1 ? "└" : "├"}── ${ic.title} (${ic.archetype})`);
    });
  });
  directIcs.forEach((ic, i) => {
    orgLines.push(`${i === directIcs.length - 1 ? "└" : "├"}── ${ic.title} (${ic.archetype})`);
  });

  return {
    architecture: { shape: "full_org", objective, objective_type: objectiveType },
    agents,
    org_chart: { structure: orgLines.join("\n") },
    dmad_verification: {
      passed: uniqueArchetypes >= 2,
      archetype_distribution: archetypeCounts,
      reasoning_diversity_score: `${uniqueArchetypes} unique archetype signatures across ${agents.length} agents. ${uniqueArchetypes >= 2 ? "PASSED" : "FAILED"}`
    },
    optimization_loop: {
      editable_asset: "Agent superprompts, process templates, and quality rubrics",
      scalar_metric: `Quality score composite: substance accuracy + objective progress + coupling integrity`,
      micro_loop_cadence: "Weekly review of agent outputs against KPIs",
      macro_loop_cadence: "Monthly strategic review — are we moving toward the objective?"
    },
    next_step: `Call summon_build_agents for each agent. Build CEO first, then managers, then ICs. Each agent gets the full 11-layer template appropriate to their depth level.`
  };
}

function makeAgent(
  id: string, title: string, roleType: "ceo" | "manager" | "ic",
  archetype: Archetype, domain: string, objectiveType: ObjectiveType,
  reportsTo: string | null, budget: number, heartbeat: number
): AgentSpec {
  return {
    id,
    title,
    role_type: roleType,
    archetype,
    archetype_rationale: `${archetype}: ${ARCHETYPES[archetype].best_when}`,
    depth: roleType === "ic" && heartbeat > 1800 ? "lightweight" : "full",
    reports_to: reportsTo,
    responsibilities: [
      `Execute ${title} function for ${domain}`,
      `Apply ${archetype} reasoning to all decisions`,
      `Report to ${reportsTo || "Board"} with clear status and blockers`
    ],
    kpis: [`${title} effectiveness`, "Response quality", "Coupling integrity"],
    heartbeat_interval_sec: heartbeat,
    budget_credits: budget,
    model_recommendation: roleType === "manager" && archetype !== "Contrarian" ? "haiku" : "sonnet"
  };
}

export function executeDesign(input: {
  domain_map: Record<string, unknown>;
  discovery_answers: Record<string, string>;
  objective: string;
  objective_type: ObjectiveType;
  architecture_shape: ArchitectureShape;
}): DesignOutput {
  switch (input.architecture_shape) {
    case "single_expert":
      return designSingleExpert(
        input.discovery_answers["q_domain"] || "the specified domain",
        input.objective,
        input.objective_type
      );
    case "council":
      return designCouncil(
        input.discovery_answers["q_domain"] || "the specified domain",
        input.objective,
        input.objective_type,
        input.discovery_answers
      );
    case "full_org":
      return designFullOrg(
        input.discovery_answers["q_domain"] || "the specified domain",
        input.objective,
        input.objective_type,
        input.discovery_answers
      );
    case "hybrid":
      // Hybrid = council + org components. For MVP, treat as full_org with council config.
      const org = designFullOrg(
        input.discovery_answers["q_domain"] || "the specified domain",
        input.objective,
        input.objective_type,
        input.discovery_answers
      );
      org.architecture.shape = "hybrid";
      return org;
    default:
      return designSingleExpert(
        input.discovery_answers["q_domain"] || "the specified domain",
        input.objective,
        input.objective_type
      );
  }
}
