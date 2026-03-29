// ============================================================
// SUMMON MCP — Paperclip Configuration Templates
// ============================================================

import type { AgentSpec, ModelRecommendation } from "../types/index.js";

export function generatePaperclipAgentConfig(agent: AgentSpec, superprompt: string) {
  return {
    id: agent.id,
    title: agent.title,
    adapter: "claude_code_local",
    adapter_config: {
      timeoutSec: 900,
      graceSec: 15,
      maxTurnsPerRun: 20,
      dangerouslySkipPermissions: true,
      instructionsFilePath: `./agents/${agent.id}.md`
    },
    heartbeat: {
      enabled: true,
      intervalSec: Math.max(30, agent.heartbeat_interval_sec), // Never below 30s
      wakeOnDemand: agent.heartbeat_interval_sec > 3600, // On-demand for infrequent agents
      cooldownSec: 10,
      maxConcurrentRuns: 1
    },
    budget: {
      credits: Math.max(100, agent.budget_credits), // Never zero
      warning_threshold: 0.8,
      hard_stop: 1.0
    },
    reports_to: agent.reports_to,
    model: agent.model_recommendation === "sonnet" ? "claude-sonnet-4-6" : "claude-haiku-4-5",
    superprompt
  };
}

export function generateAgentMd(agent: AgentSpec, companyName: string): string {
  const kpisTable = agent.kpis.map(kpi => `| ${kpi} | TBD | Measured per cycle |`).join("\n");

  return `# ${agent.title} — ${companyName}

## Reporting Line
Reports to: ${agent.reports_to ?? "Board of Directors (Human)"}

## Archetype
${agent.archetype} — ${agent.archetype_rationale}

## Responsibilities
${agent.responsibilities.map((r, i) => `${i + 1}. ${r}`).join("\n")}

## KPIs
| Metric | Target | Measurement |
|--------|--------|-------------|
${kpisTable}

## Rules
- Do NOT cancel or modify tasks assigned to other agents
- Escalate to ${agent.reports_to ?? "the Board"} if blocked for more than 2 heartbeat cycles
- When in doubt, ask — do not guess on ambiguous requirements
- Follow your cognitive architecture (superprompt) for all reasoning and communication
- Flag when operating outside your domain expertise
`;
}

export const MODEL_SELECTION_GUIDE: Record<string, ModelRecommendation> = {
  ceo: "sonnet",
  strategy: "sonnet",
  manager: "haiku",
  delegation: "haiku",
  creative: "sonnet",
  writing: "sonnet",
  coding: "sonnet",
  qa: "sonnet",
  review: "sonnet",
  monitoring: "haiku",
  routing: "haiku",
  scheduling: "haiku",
  operations: "haiku",
  research: "sonnet",
  analysis: "sonnet"
};

export const BUDGET_GUIDELINES = `
PAPERCLIP BUDGET MODEL (80/100):
- 80% threshold = soft warning to board ("focus on critical tasks only")
- 100% threshold = hard stop (agent pauses until manual reset)
- NEVER set to 0 (0 = unlimited = runaway risk)
- A single runaway loop burns $200 before you notice
- Review budgets weekly, not monthly

SUGGESTED RANGES:
| Role Level | Credits/Month | Notes |
|-----------|--------------|-------|
| CEO | 3000-8000 | Strategic reasoning, fewer but expensive runs |
| Division Head | 2000-5000 | Delegation + occasional deep work |
| Manager | 1500-3000 | Routing and coordination |
| IC (Sonnet) | 2000-4000 | Quality output requires headroom |
| IC (Haiku) | 800-2000 | Cheap model = more runs for less |
| Monitoring | 500-1500 | Low frequency, low cost |
`;

export const CIRCUIT_BREAKER_CONFIG = {
  noProgressRuns: 5,
  consecutiveFailures: 3,
  tokenVelocityMultiplier: 3.0
};
