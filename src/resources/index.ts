// ============================================================
// SUMMON MCP — Resources (Framework docs served to host LLM)
// ============================================================

import { COUPLING_MAP, COUPLING_VERIFICATION_INSTRUCTIONS, STRANGE_LOOP } from "../templates/coupling-map.js";
import { FULL_LAYER_TEMPLATE, LIGHTWEIGHT_TEMPLATE, ASSEMBLY_ORDER, ASSEMBLY_RULES, COUNCIL_ORCHESTRATION_TEMPLATE } from "../templates/assembly.js";
import { ARCHETYPES, ARCHETYPE_SELECTION_INSTRUCTIONS } from "../templates/archetypes.js";

// Framework docs are large — for MVP, we serve condensed operational summaries
// rather than embedding the full 50KB+ documents. The host LLM has the full docs
// in its project context; these resources provide quick-reference versions.

export const RESOURCES: Record<string, { uri: string; name: string; description: string; content: string }> = {
  "digital-twin-v5": {
    uri: "summon://frameworks/digital-twin-v5",
    name: "Digital Twin Superprompt Framework v5",
    description: "How to build twins of real people. 11-layer cognitive architecture with inter-layer coupling, SCAN checkpoints, and Chain of Persona anti-drift.",
    content: `# Digital Twin Superprompt Framework v5 — Quick Reference

## Core Principle
You are reconstructing a cognitive operating system, not writing a character description.
The 11 layers are ordered by causal priority. Assembly orders them by attention priority.
Inter-layer coupling ensures they function as a system, not a list.

## The 11 Layers
1. Mental Models — how they process information
2. Decision Frameworks — what rules govern choices
3. Communication Style — tone, structure, phrases
4. Core Beliefs — non-negotiable worldview
5. Anti-Patterns — what they NEVER do (min 5 entries)
6. Belief Conflict Map — where they clash with mainstream
7. Domain Transfer — how to apply outside primary domain
8. Metacognition — how they think about thinking
9. Emotional Processing — how emotions inform reasoning
10. Uncertainty Management — how they handle unknowns
11. Response Protocol — step-by-step with Chain of Persona

## Research Protocol
Minimum 5 web searches. Priority sources: long-form interviews > Q&As > Twitter > keynotes > books > articles.
Must target: metacognitive content (mistakes, uncertainty, changed minds).

## Assembly Order (Attention-Optimized)
${ASSEMBLY_ORDER}

## Anti-Drift System (4 Layers)
L1: XML structural anchoring (passive)
L2: SCAN checkpoints between position groups (~50 tokens)
L3: Chain of Persona 3-layer self-check every response
L4: Periodic re-anchoring at turn 10-15, then every 10-15

## Coupling Requirement
${COUPLING_VERIFICATION_INSTRUCTIONS}

## Assembly Rules
${ASSEMBLY_RULES}

## Master Template
${FULL_LAYER_TEMPLATE}
`
  },

  "synthetic-expert-v3": {
    uri: "summon://frameworks/synthetic-expert-v3",
    name: "Synthetic Expert Creation Framework v3",
    description: "How to build experts from first principles. Same 11-layer architecture + archetype-layer coupling cascade.",
    content: `# Synthetic Expert Creation Framework v3 — Quick Reference

## Core Distinction
Digital Twins work BACKWARD from a person's outputs.
Synthetic Experts work FORWARD from a domain's structure.
Same 11-layer output. Different extraction engine.

## Pipeline
1. DOMAIN MAPPING: 5-7 sub-domains, settled vs contested, failure modes, emotional landscape, coupling landscape. Min 5 web searches.
2. ARCHETYPE SELECTION: Systematizer / Contrarian / First-Mover / Integrator. Each has a signature coupling pattern.
3. SOURCE SYNTHESIS: Extract from 3-5 real practitioners. Never copy one person. Verify extracted elements can couple.
4. COGNITIVE ASSEMBLY: Same 11 layers, same coupling, same SCAN, same Chain of Persona.
5. VALIDATION: Domain Depth Test, Contrarian Test, Boundary Test, Coupling Integrity Test.

## Archetype Coupling Signatures
${Object.values(ARCHETYPES).map(a => `- ${a.name}: Tightest coupling = ${a.signature_coupling_pattern.tightest_coupling}`).join("\n")}

## Archetype Selection
${ARCHETYPE_SELECTION_INSTRUCTIONS}

## Quality Checklist
- Domain Map covers 5-7 sub-domains
- Expert has clear positions on ALL contested questions
- Archetype consistently applied across all 11 layers
- Mental Models draw from 2+ adjacent disciplines
- Anti-Patterns include 2+ entries contradicting popular advice
- Belief Conflict Map names 2+ specific competing schools
- Expert does NOT sound like any single real person
- Every layer references coupled layers per Coupling Map
- Tightest coupling matches archetype signature
- Passes all 4 validation tests on all 6 dimensions
- Total prompt 500-800 words
`
  },

  "operations-manual-v2": {
    uri: "summon://frameworks/operations-manual-v2",
    name: "Cognitive Twin System Operations Manual v2",
    description: "Deployment, anti-drift engineering, coupling diagnostics, tool integration, memory architecture, and evaluation.",
    content: `# Operations Manual v2 — Quick Reference

## Deployment: Claude.ai Projects
Paste superprompt in Custom Instructions. Upload source material as Project files.
SCAN checkpoints and Chain of Persona work automatically once deployed.

## Deployment: API
System message = superprompt. Implement automated re-anchoring at turn intervals.
Add coupling diagnostics: score coupling integrity 1-10 after each response.

## Anti-Drift Engineering
Persona consistency degrades 30%+ within 8-12 turns.
COUPLING degrades BEFORE content degrades — catch it early.

Drift signals: longer responses, missing signature phrases, stops challenging premises,
both-sides answers, confidence calibration breaks.

Coupling degradation signals: single-framework responses, missing emotional intensity,
perfunctory self-checks, subtle anti-pattern violations.

## Re-Anchoring Templates
Standard (turn 10-15): [PERSONA CHECK] Core lens + decision filter + voice + never + calibration
Deep (significant drift): [FULL PERSONA RESET] All layers summarized + re-read system prompt

## Evaluation: Persona Fidelity Scorecard (6 dimensions)
1. Substance Accuracy (7+ target)
2. Voice Authenticity (7+)
3. Boundary Enforcement (7+)
4. Confidence Calibration (7+)
5. Drift Resistance (7+)
6. Coupling Integrity (7+) — can you trace 3+ inter-layer connections per response?

## 10-Turn Stress Test
Turns 1-2: Domain expert questions
Turns 3-4: Reframe challenges with flawed premises
Turns 5-6: Cross-domain questions
Turns 7-8: Personal/emotional questions
Turns 9-10: Edge-of-knowledge questions
`
  },

  "paperclip-reference": {
    uri: "summon://references/paperclip",
    name: "Paperclip AI Reference",
    description: "LLM-optimized reference for Paperclip deployment. Setup, governance, budget model, agent config, best practices.",
    content: `# Paperclip Reference — Quick Reference

## Core Mental Model
Human = Board of Directors. CEO agent = top. Agents = employees.
Tasks = tickets with goal ancestry. Heartbeats = scheduled wake cycles.

## Setup Order
company(name+mission) → goal(measurable) → CEO agent → org chart → budgets → heartbeats → tasks

## Budget Model (80/100)
80% = soft warning. 100% = hard stop.
NEVER set to 0. Single runaway loop = $200 before you notice.
Starter: CEO 5000c, Managers 3000c, ICs 2000c.

## Model Selection
CEO/Strategy → Sonnet. Manager/Delegation → Haiku (3x cheaper).
IC Creative → Sonnet. IC Formulaic → Haiku. QA → Sonnet.

## Heartbeats
Active worker: 600s. Manager: 900s. On-demand: 86400s+wakeOnDemand. NEVER below 30s.

## Circuit Breaker
5 no-progress runs, 3 consecutive failures, 3.0x token velocity spike.

## Critical Warnings
- Launch via start.sh, never from Claude Code terminal
- unset CLAUDECODE if "nested sessions" error
- Memory: agents have zero persistence between heartbeats — use PARA file system
- 13.4% of ClawHub skills have critical security issues — ONLY use internally audited skills
- GET /api/companies/{id}/agents EXPOSES PLAINTEXT SECRETS on non-local
`
  },

  "coupling-map": {
    uri: "summon://templates/coupling-map",
    name: "Mandatory Inter-Layer Coupling Map",
    description: "Which layers must reference which other layers. The structural backbone of every superprompt.",
    content: `# Mandatory Coupling Map

${Object.entries(COUPLING_MAP).map(([layer, spec]) =>
  `## ${layer}\nMust reference: ${spec.must_reference.join(", ")}\n${spec.description}`
).join("\n\n")}

## Strange Loop
${STRANGE_LOOP.join(" → ")}
This loop means generating any response activates a chain of cross-layer checks.

${COUPLING_VERIFICATION_INSTRUCTIONS}
`
  },

  "assembly-template": {
    uri: "summon://templates/assembly",
    name: "v5 Master Assembly Template",
    description: "The complete template for assembling 11-layer superprompts with SCAN checkpoints and Chain of Persona.",
    content: `# v5 Master Assembly Template

${ASSEMBLY_ORDER}

## Full 11-Layer Template
${FULL_LAYER_TEMPLATE}

## Lightweight Template
${LIGHTWEIGHT_TEMPLATE}

## Council Orchestration
${COUNCIL_ORCHESTRATION_TEMPLATE}

## Assembly Rules
${ASSEMBLY_RULES}
`
  },

  "archetypes": {
    uri: "summon://templates/archetypes",
    name: "Archetype Definitions & Coupling Patterns",
    description: "The four archetypes with their cognitive profiles, communication styles, and signature coupling patterns.",
    content: `# Archetype Definitions

${Object.values(ARCHETYPES).map(a => `
## ${a.name}
**Profile:** ${a.cognitive_profile}
**Best when:** ${a.best_when}
**Communication:** ${a.communication}
**Tightest coupling:** ${a.signature_coupling_pattern.tightest_coupling}
**Metacognition check:** "${a.signature_coupling_pattern.metacognition_check}"
**Anti-pattern focus:** ${a.signature_coupling_pattern.anti_pattern_focus}
**Emotional driver:** ${a.signature_coupling_pattern.emotional_driver}
`).join("\n")}

${ARCHETYPE_SELECTION_INSTRUCTIONS}
`
  }
};
