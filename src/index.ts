#!/usr/bin/env node
// ============================================================
// SUMMON MCP — Objective-Driven Cognitive Architecture Engine
// ============================================================

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { executeDiscover } from "./tools/discover.js";
import { executeResearch } from "./tools/research.js";
import { executeDesign } from "./tools/design.js";
import { executeBuildAgents } from "./tools/build-agents.js";
import { executeDeployConfig } from "./tools/deploy-config.js";
import { executeFullPipeline } from "./tools/full-pipeline.js";
import { RESOURCES } from "./resources/index.js";
import { PROMPTS } from "./prompts/index.js";

const server = new McpServer({
  name: "summon-mcp",
  version: "0.1.0",
});

// ============================================================
// TOOLS
// ============================================================

server.tool(
  "summon_discover",
  "Classify an objective, recommend an architecture shape (single expert, council, full org, or hybrid), and generate smart discovery questions. Always the first step.",
  {
    input: z.string().describe("The user's raw request — objective, domain, person name, or any combination"),
    domain: z.string().optional().describe("Explicit domain if provided"),
    objective: z.string().optional().describe("Explicit objective if provided")
  },
  async (args) => {
    const result = executeDiscover({ input: args.input, domain: args.domain, objective: args.objective });
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "summon_research",
  "Generate domain research instructions and search queries for the host LLM to execute via web search.",
  {
    domain: z.string(),
    objective: z.string(),
    objective_type: z.string(),
    architecture_shape: z.string(),
    discovery_answers: z.string().describe("JSON string of user answers")
  },
  async (args) => {
    let answers: Record<string, string>;
    try { answers = JSON.parse(args.discovery_answers); } catch { answers = { raw: args.discovery_answers }; }
    const result = executeResearch({
      domain: args.domain, objective: args.objective,
      objective_type: args.objective_type as any, architecture_shape: args.architecture_shape as any,
      discovery_answers: answers
    });
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "summon_design",
  "Design the cognitive architecture — single expert, council, full org, or hybrid.",
  {
    domain_map: z.string().describe("JSON string of domain map"),
    discovery_answers: z.string().describe("JSON string of user answers"),
    objective: z.string(),
    objective_type: z.string(),
    architecture_shape: z.string()
  },
  async (args) => {
    let map: Record<string, unknown>; let answers: Record<string, string>;
    try { map = JSON.parse(args.domain_map); } catch { map = {}; }
    try { answers = JSON.parse(args.discovery_answers); } catch { answers = {}; }
    const result = executeDesign({
      domain_map: map, discovery_answers: answers, objective: args.objective,
      objective_type: args.objective_type as any, architecture_shape: args.architecture_shape as any
    });
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "summon_build_agents",
  "Generate 11-layer superprompt templates for agents. Returns templates + assembly rules + validation checklist.",
  {
    org_design: z.string().describe("JSON string of design output"),
    domain_map: z.string().describe("JSON string of domain map"),
    agent_id: z.string().describe("Agent ID or 'all'")
  },
  async (args) => {
    let design: any; let map: Record<string, unknown>;
    try { design = JSON.parse(args.org_design); } catch { design = {}; }
    try { map = JSON.parse(args.domain_map); } catch { map = {}; }
    const result = executeBuildAgents({ org_design: design, domain_map: map, agent_id: args.agent_id });
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "summon_deploy_config",
  "Generate deployment-ready output — Claude.ai Project for experts/councils, Paperclip for orgs.",
  {
    architecture: z.string().describe("JSON string of design output"),
    agent_superprompts: z.string().describe("JSON string mapping agent_id to superprompt")
  },
  async (args) => {
    let arch: any; let prompts: Record<string, string>;
    try { arch = JSON.parse(args.architecture); } catch { arch = {}; }
    try { prompts = JSON.parse(args.agent_superprompts); } catch { prompts = {}; }
    const result = executeDeployConfig({ architecture: arch, agent_superprompts: prompts });
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "summon_full_pipeline",
  "Run the complete SUMMON pipeline end-to-end from any input.",
  {
    input: z.string().describe("The user's raw request"),
    domain: z.string().optional(),
    objective: z.string().optional()
  },
  async (args) => {
    const result = executeFullPipeline({ input: args.input, domain: args.domain, objective: args.objective });
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  }
);

// ============================================================
// RESOURCES
// ============================================================

for (const resource of Object.values(RESOURCES)) {
  server.resource(resource.name, resource.uri, async () => ({
    contents: [{ uri: resource.uri, mimeType: "text/markdown" as const, text: resource.content }]
  }));
}

// ============================================================
// PROMPTS
// ============================================================

for (const prompt of Object.values(PROMPTS)) {
  const schema: Record<string, z.ZodString | z.ZodOptional<z.ZodString>> = {};
  for (const arg of prompt.arguments) {
    schema[arg.name] = arg.required ? z.string() : z.string().optional();
  }
  server.prompt(prompt.name, prompt.description, schema, async (args) => ({
    messages: [{ role: "user" as const, content: { type: "text" as const, text: prompt.template(args as Record<string, string>) } }]
  }));
}

// ============================================================
// START
// ============================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("SUMMON MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
