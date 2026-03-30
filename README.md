# SUMMON MCP

**Objective-Driven Cognitive Architecture Engine**

Say what you want to achieve. SUMMON figures out the right cognitive architecture — single expert, council of minds, or full autonomous organization — and builds it deployment-ready.

```
"I want to grow my SaaS to $10M ARR"
→ SUMMON classifies: business_growth → full_org
→ Researches SaaS scaling domain
→ Designs 6-agent org with 4 archetype diversity
→ Builds 11-layer superprompts with coupling verification
→ Outputs Paperclip-ready deployment package

"Summon an expert in regenerative agriculture"
→ SUMMON classifies: learning_mastery → single_expert
→ Researches the domain (5+ web searches)
→ Builds one deep Integrator-archetype expert
→ Outputs Claude.ai Project prompt + re-anchoring template

"I need a council to evaluate this acquisition"
→ SUMMON classifies: decision_support → council
→ Builds 4 experts with structurally different reasoning
→ Outputs debate protocol + conflict map + all superprompts
```

## What This Is

An MCP server that encodes three cognitive architecture frameworks into a reusable tool pipeline:

- **Digital Twin Superprompt Framework v5** — 11-layer cognitive architecture for reconstructing any mind
- **Synthetic Expert Creation Framework v3** — domain-first expert construction with archetype coupling
- **Cognitive Twin System Operations Manual v2** — anti-drift engineering, deployment, evaluation

The MCP server handles orchestration. The host LLM (Claude, etc.) handles all research and reasoning via its native web search. Zero API keys required.

## Quick Start

### Install via npx (Recommended)

No installation required — just configure your MCP client:

### Connect to Claude Desktop

Add to your Claude Desktop config (`claude_desktop_config.json`):

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "summon": {
      "command": "npx",
      "args": ["summon-mcp"]
    }
  }
}
```

Restart Claude Desktop. SUMMON tools will appear in your tool list.

### Connect to Claude Code

```bash
claude mcp add summon -- npx summon-mcp
```

### Install from Source

```bash
git clone https://github.com/ZionHopkins/summon.git
cd summon
npm install
npm run build
```

## Usage

### Objective-First (SUMMON decides the shape)

> "I want to build a competitive intelligence operation for the semiconductor industry"

> "Help me build generational wealth"

> "I need to master negotiation for my next funding round"

### Direct Entry Points

> "Summon an expert in biotech" — builds a single deep synthetic expert

> "Summon Naval Ravikant" — builds a digital twin from research

> "Build me an organization for content production" — builds a full Paperclip-deployable org

> "I need a council to decide whether to pivot my product" — builds a 3-5 expert debate council

### Upgrade Existing Agents

> "Upgrade this agent to v5 architecture" — adds coupling, SCAN checkpoints, Chain of Persona

## Architecture

### How It Works

```
User states objective
        ↓
summon_discover → classifies objective → recommends architecture shape → asks smart questions
        ↓
summon_research → generates search queries → host LLM does web research → fills domain map
        ↓
summon_design → designs architecture (expert/council/org/hybrid) → DMAD verification
        ↓
summon_build_agents → returns 11-layer templates → host LLM builds superprompts → coupling validation
        ↓
summon_deploy_config → generates deployment package (Claude Project / Paperclip / both)
```

### Key Design Decision: Thick Orchestration, Thin Cognition

The MCP server does **not** call external APIs. The host LLM does all research and reasoning. The server handles workflow sequencing, template assembly, validation, and config generation. This means:

- Zero API keys required
- Zero external dependencies
- Works with any MCP-compatible host LLM
- The user's Claude session handles all intelligence work

### Objective Types → Architecture Shapes

| Objective | Shape | Why |
|-----------|-------|-----|
| Business growth | Full org | Multiple functions needed |
| Wealth creation | Council | Multi-perspective analysis |
| Intelligence product | Full org | Domain specialists + delivery |
| Learning/mastery | Single expert | Deep domain expert |
| Creative production | Full org | Creative council + pipeline |
| Decision support | Council | Diverse reasoning approaches |
| Operational automation | Full org | Process specialists + QA |
| Research/discovery | Full org or council | Research + synthesis |
| Digital twin | Single agent | One deep 11-layer twin |

## Tools

| Tool | Purpose |
|------|---------|
| `summon_discover` | Classify objective, recommend shape, generate questions |
| `summon_research` | Generate search queries + domain map template |
| `summon_design` | Design architecture (expert/council/org/hybrid) |
| `summon_build_agents` | Generate 11-layer superprompt templates |
| `summon_deploy_config` | Generate deployment configs (Claude Project / Paperclip) |
| `summon_full_pipeline` | Run entire pipeline end-to-end |

## Resources

| Resource | Content |
|----------|---------|
| `summon://frameworks/digital-twin-v5` | Digital Twin Framework quick reference |
| `summon://frameworks/synthetic-expert-v3` | Synthetic Expert Framework quick reference |
| `summon://frameworks/operations-manual-v2` | Operations Manual quick reference |
| `summon://references/paperclip` | Paperclip deployment reference |
| `summon://templates/coupling-map` | Mandatory inter-layer coupling map |
| `summon://templates/assembly` | v5 Master Assembly Template |
| `summon://templates/archetypes` | Four archetype definitions + coupling patterns |

## Prompts

| Prompt | Use |
|--------|-----|
| `summon-objective` | "I want to [achieve X]" — objective-first pipeline |
| `summon-organization` | "Build me an org for [domain]" — full org |
| `summon-expert` | "Summon an expert in [domain]" — single expert |
| `summon-council` | "I need a council for [decision]" — multi-expert debate |
| `summon-twin` | "Summon [Person Name]" — digital twin |
| `summon-upgrade` | "Upgrade this agent" — add v5 architecture |

## The 11-Layer Cognitive Architecture

Every full-depth agent built by SUMMON has:

1. **Mental Models** — how they process information
2. **Core Beliefs** — non-negotiable worldview (contrarian positions)
3. **Decision Frameworks** — rules governing choices
4. **Communication Style** — tone, phrases, delivery
5. **Emotional Processing** — what energizes/frustrates, how it affects output
6. **Anti-Patterns** — what they NEVER do (min 5 entries)
7. **Belief Conflict Map** — where they clash with mainstream
8. **Domain Transfer** — how to apply outside primary domain
9. **Metacognition** — how they monitor their own thinking
10. **Uncertainty Management** — how they handle unknowns
11. **Response Protocol** — step-by-step with Chain of Persona self-check

Plus **SCAN checkpoints** for anti-drift and **inter-layer coupling** ensuring every layer references 2+ others by name.

## The Four Archetypes

| Archetype | Tightest Coupling | Metacognition Check |
|-----------|-------------------|-------------------|
| **Systematizer** | Mental Models → Decision Frameworks | "Is this process repeatable?" |
| **Contrarian** | Core Beliefs → Belief Conflict Map | "Am I being contrarian for its own sake?" |
| **First-Mover** | Uncertainty Mgmt → Decision Frameworks | "Am I moving too early, or too late?" |
| **Integrator** | Domain Transfer → Mental Models | "Am I forcing a false synthesis?" |

## Quality Guarantees

SUMMON enforces these rules in code:

- Every full-depth superprompt has all 11 layers in XML tags
- Every layer references 2+ other layers by specific name (coupling verification)
- SCAN checkpoints at position 2→3 and 4→5 boundaries
- Response Protocol includes Chain of Persona (3 named layer checks)
- Every multi-agent architecture has 2+ different archetype signatures (DMAD)
- Anti-Patterns minimum 5 entries per full-depth agent
- Paperclip budgets never set to 0 (runaway protection)
- Paperclip heartbeats never below 30 seconds

## Deployment Targets

- **Single experts & councils** → Claude.ai Project system prompt (copy-paste ready)
- **Full organizations** → Paperclip deployment package (company config, agent configs, agents.md files, heartbeats, budgets, org chart, Claude Code build prompt)
- **Hybrid** → Both outputs

## Development

```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript
npm run dev          # Run with tsx (development)
npm start            # Run compiled version
```

## Roadmap

- [ ] Community template library — share and import org architectures
- [ ] Automated quality scoring via LLM-as-judge
- [ ] Multi-orchestrator output (CrewAI, LangGraph, AutoGen configs)
- [ ] Fine-tuning integration for persistent high-fidelity twins
- [ ] Visual org chart rendering
- [ ] Optimization loop execution (autoresearch)

## License

MIT

## Credits

Built on three cognitive architecture frameworks:
- Digital Twin Superprompt Framework v5
- Synthetic Expert Creation Framework v3
- Cognitive Twin System Operations Manual v2

Deployment target: [Paperclip AI](https://github.com/paperclipai/paperclip)

Protocol: [Model Context Protocol (MCP)](https://modelcontextprotocol.io)
