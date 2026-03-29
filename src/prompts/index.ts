// ============================================================
// SUMMON MCP — Prompt Templates
// ============================================================

export const PROMPTS = {
  "summon-objective": {
    name: "summon-objective",
    description: "Objective-first pipeline. State what you want to achieve — SUMMON determines the right cognitive architecture.",
    arguments: [
      { name: "objective", description: "What you want to achieve — be as specific or vague as you want", required: true }
    ],
    template: (args: Record<string, string>) =>
      `The user wants to achieve: "${args["objective"]}"\n\nCall summon_full_pipeline with input: "${args["objective"]}". This will initiate the complete SUMMON pipeline — classify the objective, recommend an architecture shape, ask smart questions, research the domain, design the architecture, build agents, and produce deployment-ready output.`
  },

  "summon-organization": {
    name: "summon-organization",
    description: "Build a full autonomous organization for a domain. Produces Paperclip-ready deployment package.",
    arguments: [
      { name: "domain", description: "The domain or industry for the organization", required: true },
      { name: "mission", description: "What the organization should accomplish", required: false }
    ],
    template: (args: Record<string, string>) =>
      `The user wants a full autonomous organization for: "${args["domain"]}"\n${args["mission"] ? `Mission: "${args["mission"]}"` : ""}\n\nCall summon_discover with input: "Build an autonomous organization for ${args["domain"]}${args["mission"] ? `. Mission: ${args["mission"]}` : ""}". Override the architecture shape to "full_org" — the user explicitly wants an organization.`
  },

  "summon-expert": {
    name: "summon-expert",
    description: "Build a single deep synthetic expert. Produces an 11-layer superprompt ready for Claude.ai Projects.",
    arguments: [
      { name: "domain", description: "The domain of expertise", required: true },
      { name: "archetype", description: "Archetype: Systematizer, Contrarian, First-Mover, or Integrator", required: false }
    ],
    template: (args: Record<string, string>) =>
      `The user wants a synthetic expert in: "${args["domain"]}"\n${args["archetype"] ? `Preferred archetype: ${args["archetype"]}` : ""}\n\nCall summon_discover with input: "Build an expert in ${args["domain"]}". Override the architecture shape to "single_expert".`
  },

  "summon-council": {
    name: "summon-council",
    description: "Assemble a council of 3-5 experts with diverse reasoning approaches for a decision or domain.",
    arguments: [
      { name: "topic", description: "The decision, question, or domain for the council", required: true },
      { name: "member_count", description: "Number of council members (3-5)", required: false }
    ],
    template: (args: Record<string, string>) =>
      `The user wants a council for: "${args["topic"]}"\n${args["member_count"] ? `Requested size: ${args["member_count"]} members` : ""}\n\nCall summon_discover with input: "I need a council for: ${args["topic"]}". Override the architecture shape to "council".`
  },

  "summon-twin": {
    name: "summon-twin",
    description: "Summon a digital twin of a specific real person. Deep research + 11-layer cognitive reconstruction.",
    arguments: [
      { name: "person", description: "The full name of the person to summon", required: true }
    ],
    template: (args: Record<string, string>) =>
      `The user wants to summon: "${args["person"]}"\n\nCall summon_discover with input: "Summon ${args["person"]}". This will be classified as digital_twin and trigger person-specific research queries (interviews, books, tweets, debates, mistakes, uncertainty signals).`
  },

  "summon-upgrade": {
    name: "summon-upgrade",
    description: "Upgrade an existing agent prompt to v5 architecture with coupling, SCAN checkpoints, and Chain of Persona.",
    arguments: [
      { name: "current_prompt", description: "The existing agent prompt to upgrade", required: true }
    ],
    template: (args: Record<string, string>) =>
      `The user wants to upgrade an existing prompt to v5 architecture.\n\nCurrent prompt:\n${args["current_prompt"]}\n\nUpgrade checklist:\n1. Audit each layer for coupling — does it reference 2+ other layers by specific name?\n2. Insert SCAN checkpoints between Position 2→3 and Position 4→5\n3. Upgrade Response Protocol to Chain of Persona (3 named layer checks)\n4. Verify Composition Rules: Mutual Reinforcement, Conflict Preservation, Emergent Behavior\n5. Run Coupling Integrity Test: ask a question requiring 3+ layers\n\nApply these upgrades and return the improved superprompt.`
  }
};
