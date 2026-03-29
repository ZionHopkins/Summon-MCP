// ============================================================
// SUMMON MCP — Full Pipeline Orchestrator
// Sequences the entire pipeline with state management
// ============================================================

import type { PipelineState } from "../types/index.js";

export function executeFullPipeline(input: {
  input: string;
  domain?: string;
  objective?: string;
}): { pipeline_state: PipelineState; instructions: string } {
  // Initialize pipeline state
  const state: PipelineState = {
    step: "discover",
    input: input.input,
    domain: input.domain,
    objective: input.objective
  };

  return {
    pipeline_state: state,
    instructions: `
SUMMON FULL PIPELINE — INITIATED

You are orchestrating the complete SUMMON pipeline. Follow these steps IN ORDER.
Do NOT skip steps. Each step's output feeds the next.

STEP 1 — DISCOVER:
Call summon_discover with: { input: "${input.input}"${input.domain ? `, domain: "${input.domain}"` : ""}${input.objective ? `, objective: "${input.objective}"` : ""} }
Present the objective classification and recommended architecture to the user.
Ask the generated questions. Collect answers.

STEP 2 — RESEARCH:
Call summon_research with the domain, objective, objective_type, architecture_shape, and discovery_answers.
Execute ALL search queries using web search.
Fill in EVERY field in the domain_map_template with specific, concrete findings.
Minimum 5 searches. If any section has fewer than 2 entries, search more.

STEP 3 — DESIGN:
Call summon_design with the completed domain_map, discovery_answers, objective, objective_type, and architecture_shape.
Present the designed architecture to the user for confirmation.
If user wants changes, adjust and re-run.

STEP 4 — BUILD AGENTS:
Call summon_build_agents with agent_id "all".
For each agent, build the complete superprompt following the returned template.
CRITICAL: Each layer must reference 2+ other layers by SPECIFIC NAME.
Verify against the validation checklist for each agent.

STEP 5 — DEPLOY CONFIG:
Call summon_deploy_config with the architecture and all completed superprompts.
Present the deployment package to the user.

PIPELINE ADAPTS TO SHAPE:
- single_expert: Steps 1-2-4-5 (skip org design, simplified deploy)
- council: Steps 1-2-3-4-5 (design includes debate protocol)
- full_org: All steps (full Paperclip deployment)
- hybrid: All steps (both Claude Project and Paperclip output)

BEGIN WITH STEP 1 NOW.`
  };
}
