// ============================================================
// SUMMON MCP — Build Agents Tool
// Returns templates + instructions for host LLM to build superprompts
// ============================================================

import type { DesignOutput, BuildAgentOutput, LayerTemplate } from "../types/index.js";
import { COUPLING_MAP, COUPLING_VERIFICATION_INSTRUCTIONS } from "../templates/coupling-map.js";
import { ARCHETYPES } from "../templates/archetypes.js";
import { FULL_LAYER_TEMPLATE, LIGHTWEIGHT_TEMPLATE, ASSEMBLY_RULES, ASSEMBLY_ORDER } from "../templates/assembly.js";

const FULL_LAYERS: LayerTemplate[] = [
  {
    layer: "mental_models",
    position: 1,
    instructions: "Build from domain first principles + archetype thinking style. How does this agent process information? What lenses do they apply? What conditional triggers shift their model? 2-4 sentences.",
    coupling_requirements: ["decision_frameworks", "emotional_processing"],
    domain_context: "Draw from domain map sub-domains and adjacent domains."
  },
  {
    layer: "core_beliefs",
    position: 1,
    instructions: "3-5 dashed beliefs. Must be contrarian or specific — not obvious truths. Take clear positions on contested questions from the domain map. Each belief should name who disagrees.",
    coupling_requirements: ["belief_conflict_map", "mental_models"],
    domain_context: "Draw from domain map contested territory and emotional landscape."
  },
  {
    layer: "decision_frameworks",
    position: 2,
    instructions: "The internal algorithm for making choices. Default filter, optimization target, trade-off preferences, mode-switching conditions. 2-3 sentences.",
    coupling_requirements: ["mental_models", "uncertainty_management"],
    domain_context: "Draw from domain map settled knowledge and failure modes."
  },
  {
    layer: "communication_style",
    position: 2,
    instructions: "How they deliver — tone, sentence structure, analogy domain, humor style, disagreement handling. Include 3-5 signature phrases. Must NOT mirror any single real person (for synthetic experts).",
    coupling_requirements: ["emotional_processing", "anti_patterns"],
    domain_context: "Shaped by archetype communication flavor."
  },
  {
    layer: "emotional_processing",
    position: 2,
    instructions: "What energizes them, what triggers frustration, how emotions show up in communication, what they feel protective of. 2-3 sentences.",
    coupling_requirements: ["communication_style", "metacognition"],
    domain_context: "Draw from domain map emotional landscape."
  },
  {
    layer: "anti_patterns",
    position: 3,
    instructions: "5-8 dashed items starting with 'You never:'. Include common bad advice they reject, language they'd never use, behaviors they find weak. At least 2 must contradict popular domain advice.",
    coupling_requirements: ["communication_style", "core_beliefs"],
    domain_context: "Draw from domain map failure modes and counterproductive best practices."
  },
  {
    layer: "belief_conflict_map",
    position: 3,
    instructions: "3-5 dashed conflict points. Name specific thinkers, schools, or mainstream positions they disagree with. Include hidden assumptions and non-negotiable fault lines.",
    coupling_requirements: ["core_beliefs", "decision_frameworks"],
    domain_context: "Draw from domain map contested territory."
  },
  {
    layer: "domain_transfer",
    position: 3,
    instructions: "Which mental models are universal vs domain-specific? How do they enter unfamiliar territory? 2-3 sentences. Tag which models transfer.",
    coupling_requirements: ["mental_models", "uncertainty_management"],
    domain_context: "Draw from domain map adjacent domains."
  },
  {
    layer: "metacognition",
    position: 4,
    instructions: "How they monitor their own thinking. Known blind spots (2-3 specific biases). Self-verification method. When to trust intuition vs demand data. 2-3 sentences.",
    coupling_requirements: ["anti_patterns", "decision_frameworks"],
    domain_context: "Shaped by archetype-specific self-monitoring."
  },
  {
    layer: "uncertainty_management",
    position: 4,
    instructions: "Confidence signals (certain vs speculating language). Domain boundaries. What they do when they genuinely don't know. 2-3 sentences.",
    coupling_requirements: ["domain_transfer", "metacognition"],
    domain_context: "Shaped by archetype's relationship with uncertainty."
  },
  {
    layer: "response_protocol",
    position: 5,
    instructions: "Numbered steps 1-5 for answering any question. Must include Chain of Persona self-check against THREE named layers: Mental Models, Anti-Patterns, Calibration.",
    coupling_requirements: ["mental_models", "anti_patterns", "calibration_anchors"],
    domain_context: "Shaped by archetype processing style."
  }
];

const LIGHTWEIGHT_LAYERS: LayerTemplate[] = [
  {
    layer: "responsibilities",
    position: 1,
    instructions: "2-4 clear, specific responsibilities for this role.",
    coupling_requirements: [],
    domain_context: "From the agent spec responsibilities."
  },
  {
    layer: "communication_style",
    position: 2,
    instructions: "1-2 sentences on tone and approach.",
    coupling_requirements: ["anti_patterns"],
    domain_context: "Brief, role-appropriate."
  },
  {
    layer: "anti_patterns",
    position: 3,
    instructions: "3-4 dashed items — what this role must never do.",
    coupling_requirements: ["communication_style"],
    domain_context: "Role-specific failure modes."
  },
  {
    layer: "response_protocol",
    position: 4,
    instructions: "3-step protocol for handling tasks. Include escalation path.",
    coupling_requirements: [],
    domain_context: "Simple, clear, routing-oriented."
  }
];

export function executeBuildAgents(input: {
  org_design: DesignOutput;
  domain_map: Record<string, unknown>;
  agent_id: string;
}): BuildAgentOutput | BuildAgentOutput[] {
  const agentIds = input.agent_id === "all"
    ? input.org_design.agents.map(a => a.id)
    : [input.agent_id];

  const results: BuildAgentOutput[] = agentIds.map(id => {
    const agent = input.org_design.agents.find(a => a.id === id);
    if (!agent) {
      return {
        agent_id: id,
        build_type: "lightweight" as const,
        template: {
          identity_line: `Agent ${id} not found in org design.`,
          layers: [],
          scan_checkpoints: {
            checkpoint_1: { position: "", format: "" },
            checkpoint_2: { position: "", format: "" }
          },
          chain_of_persona: { checks: [], format: "" },
          assembly_rules: {
            word_count: "0",
            xml_tags: false,
            attention_optimized_order: false,
            min_anti_patterns: 0,
            min_signature_phrases: 0,
            min_belief_conflicts: 0,
            coupling_verification: ""
          }
        },
        validation_checklist: [],
        next_step: `Agent ${id} not found. Check the org design.`
      };
    }

    const isFull = agent.depth === "full";
    const archetype = ARCHETYPES[agent.archetype];
    const layers = isFull ? FULL_LAYERS : LIGHTWEIGHT_LAYERS;

    // Enrich layer instructions with archetype-specific context
    const enrichedLayers = layers.map(l => ({
      ...l,
      instructions: `${l.instructions}\n\nARCHETYPE CONTEXT (${agent.archetype}): ${archetype.signature_coupling_pattern.tightest_coupling}\nMETACOGNITION CHECK: "${archetype.signature_coupling_pattern.metacognition_check}"`,
      coupling_requirements: l.coupling_requirements,
      domain_context: `${l.domain_context}\n\nROLE: ${agent.title} | ARCHETYPE: ${agent.archetype} | ${archetype.cognitive_profile}`
    }));

    return {
      agent_id: id,
      build_type: agent.depth,
      template: {
        identity_line: agent.role_type === "expert"
          ? `You are ${agent.title} — a synthetic expert built from the first principles of ${input.org_design.architecture.objective}. Your cognitive architecture is ${agent.archetype}-dominant.`
          : `You are ${agent.title} — ${agent.archetype}-dominant. ${agent.responsibilities[0] || ""}`,
        layers: enrichedLayers,
        scan_checkpoints: isFull ? {
          checkpoint_1: {
            position: "Between Position 2 (Decision Frameworks + Communication Style + Emotional Processing) and Position 3 (Anti-Patterns + Belief Conflict Map + Domain Transfer)",
            format: "Active check: What is your primary mental model? What is your signature decision heuristic? Name them before continuing."
          },
          checkpoint_2: {
            position: "Between Position 4 (Metacognition + Uncertainty Management + Calibration Anchors) and Position 5 (Response Protocol)",
            format: "Active check: What are your top 2 anti-patterns? What triggers your uncertainty flag? Name them before continuing."
          }
        } : {
          checkpoint_1: { position: "N/A — lightweight agent", format: "" },
          checkpoint_2: { position: "N/A — lightweight agent", format: "" }
        },
        chain_of_persona: isFull ? {
          checks: ["MENTAL MODELS", "ANTI-PATTERNS", "CALIBRATION"],
          format: "Before responding, verify against THREE layers:\n— MENTAL MODELS: Am I filtering through [specific model name], not generic reasoning?\n— ANTI-PATTERNS: Does this response violate any of my guardrails?\n— CALIBRATION: Does my confidence level match my actual certainty?"
        } : {
          checks: [],
          format: "If unsure, escalate. Don't guess."
        },
        assembly_rules: {
          word_count: isFull ? "500-800 words" : "150-300 words",
          xml_tags: true,
          attention_optimized_order: isFull,
          min_anti_patterns: isFull ? 5 : 3,
          min_signature_phrases: isFull ? 3 : 0,
          min_belief_conflicts: isFull ? 2 : 0,
          coupling_verification: isFull
            ? COUPLING_VERIFICATION_INSTRUCTIONS
            : "Lightweight agent — minimal coupling required."
        }
      },
      validation_checklist: isFull ? [
        `Mental Models are specific to ${agent.title}'s role — not generic`,
        "Anti-Patterns include 5+ entries",
        "Communication Style has 3-5 signature phrases",
        "Response Protocol includes Chain of Persona self-check (3 named layers)",
        "Every layer references its coupled layers per the Coupling Map by SPECIFIC NAME",
        `Tightest coupling matches ${agent.archetype}'s signature: ${archetype.signature_coupling_pattern.tightest_coupling}`,
        "Architecture satisfies Mutual Reinforcement (delete one layer → 2+ others feel incomplete)",
        "Architecture satisfies Conflict Preservation (genuine tensions preserved)",
        "Architecture satisfies Emergent Behavior (combined system produces behaviors no single layer specifies)",
        "Total prompt is 500-800 words",
        "All layers wrapped in XML tags in attention-optimized order",
        "SCAN checkpoints at Position 2→3 and Position 4→5 boundaries"
      ] : [
        `Responsibilities are specific to ${agent.title}`,
        "Anti-Patterns include 3+ entries",
        "Response Protocol includes escalation path",
        "Total prompt is 150-300 words"
      ],
      next_step: input.agent_id === "all"
        ? "All agent templates returned. Build each superprompt following the templates. After all are built, call summon_deploy_config."
        : `Build this agent's superprompt following the template. Verify against the validation checklist. Then call summon_build_agents for the next agent, or summon_deploy_config when all agents are built.`
    };
  });

  return results.length === 1 ? results[0]! : results;
}
