// ============================================================
// SUMMON MCP — Shared Types
// ============================================================

// --- Objective Classification ---

export type ObjectiveType =
  | "business_growth"
  | "wealth_creation"
  | "intelligence_product"
  | "learning_mastery"
  | "creative_production"
  | "decision_support"
  | "operational_automation"
  | "research_discovery"
  | "digital_twin"
  | "general";

export type ArchitectureShape =
  | "single_expert"
  | "council"
  | "full_org"
  | "hybrid";

export type Archetype =
  | "Systematizer"
  | "Contrarian"
  | "First-Mover"
  | "Integrator";

export type AgentDepth = "full" | "lightweight";

export type RoleType = "expert" | "council_member" | "ceo" | "manager" | "ic";

export type ModelRecommendation = "sonnet" | "haiku";

// --- Discovery ---

export interface ObjectiveClassification {
  type: ObjectiveType;
  confidence: "high" | "medium" | "low";
  reasoning: string;
}

export interface ArchitectureRecommendation {
  shape: ArchitectureShape;
  rationale: string;
  alternatives: string[];
}

export interface DiscoveryQuestion {
  id: string;
  question: string;
  why: string;
  category: "strategic" | "boundary" | "execution" | "domain" | "preference";
}

export interface DiscoverOutput {
  objective_classification: ObjectiveClassification;
  recommended_architecture: ArchitectureRecommendation;
  questions: DiscoveryQuestion[];
  next_step: string;
}

// --- Research ---

export interface DomainMap {
  sub_domains: string;
  settled_knowledge: string;
  contested_territory: string;
  emerging_edge: string;
  failure_modes: {
    beginner_mistakes: string;
    expert_mistakes: string;
    counterproductive_best_practices: string;
  };
  emotional_landscape: {
    energizers: string;
    frustration_triggers: string;
    protective_topics: string;
  };
  adjacent_domains: string;
  coupling_landscape: {
    strongest_dependencies: string;
    productive_contradictions: string;
    expert_emergent_behaviors: string;
  };
}

export interface ResearchOutput {
  search_queries: string[];
  domain_map_template: DomainMap;
  person_research_queries?: string[];  // For digital twins
  validation: {
    min_searches: number;
    required_coverage: string[];
    depth_check: string;
  };
  next_step: string;
}

// --- Design ---

export interface AgentSpec {
  id: string;
  title: string;
  role_type: RoleType;
  archetype: Archetype;
  archetype_rationale: string;
  depth: AgentDepth;
  reports_to: string | null;
  responsibilities: string[];
  kpis: string[];
  heartbeat_interval_sec: number;
  budget_credits: number;
  model_recommendation: ModelRecommendation;
}

export interface CouncilConflict {
  agent_a: string;
  agent_b: string;
  predicted_fault_line: string;
  reasoning_diversity_check: string;
}

export interface CouncilConfig {
  members: string[];
  debate_protocol: string;
  conflict_map: CouncilConflict[];
  synthesis_method: "select_best" | "weighted_consensus" | "structured_debate";
}

export interface DMADVerification {
  passed: boolean;
  archetype_distribution: Record<string, number>;
  reasoning_diversity_score: string;
}

export interface OptimizationLoop {
  editable_asset: string;
  scalar_metric: string;
  micro_loop_cadence: string;
  macro_loop_cadence: string;
}

export interface DesignOutput {
  architecture: {
    shape: ArchitectureShape;
    objective: string;
    objective_type: ObjectiveType;
  };
  agents: AgentSpec[];
  org_chart: {
    structure: string;
  };
  council_config?: CouncilConfig;
  dmad_verification: DMADVerification;
  optimization_loop?: OptimizationLoop;
  next_step: string;
}

// --- Build Agents ---

export interface LayerTemplate {
  layer: string;
  position: number;
  instructions: string;
  coupling_requirements: string[];
  domain_context: string;
}

export interface BuildAgentOutput {
  agent_id: string;
  build_type: AgentDepth;
  template: {
    identity_line: string;
    layers: LayerTemplate[];
    scan_checkpoints: {
      checkpoint_1: { position: string; format: string };
      checkpoint_2: { position: string; format: string };
    };
    chain_of_persona: {
      checks: string[];
      format: string;
    };
    assembly_rules: {
      word_count: string;
      xml_tags: boolean;
      attention_optimized_order: boolean;
      min_anti_patterns: number;
      min_signature_phrases: number;
      min_belief_conflicts: number;
      coupling_verification: string;
    };
  };
  validation_checklist: string[];
  next_step: string;
}

// --- Deploy Config ---

export interface PaperclipAgentConfig {
  id: string;
  title: string;
  adapter: string;
  adapter_config: {
    timeoutSec: number;
    graceSec: number;
    maxTurnsPerRun: number;
    dangerouslySkipPermissions: boolean;
    instructionsFilePath: string;
  };
  heartbeat: {
    enabled: boolean;
    intervalSec: number;
    wakeOnDemand: boolean;
    cooldownSec: number;
    maxConcurrentRuns: number;
  };
  budget: {
    credits: number;
    warning_threshold: number;
    hard_stop: number;
  };
  reports_to: string | null;
  superprompt: string;
}

export interface DeployConfigOutput {
  deployment_type: "claude_project" | "paperclip" | "both";
  paperclip_config?: {
    company: { name: string; mission: string };
    agents: PaperclipAgentConfig[];
    org_chart: Record<string, unknown>;
    goals: Array<{ title: string; description: string; measurable: boolean; time_boxed: string }>;
  };
  claude_project_config?: {
    system_prompt: string;
    re_anchoring_prompt: string;
    sample_exchange: string;
    refinement_prompts: string[];
  };
  agents_md_files: Record<string, string>;
  build_prompt: string;
  deployment_instructions: string;
}

// --- Pipeline State ---

export interface PipelineState {
  step: "discover" | "research" | "design" | "build_agents" | "deploy_config" | "complete";
  input: string;
  domain?: string;
  objective?: string;
  objective_type?: ObjectiveType;
  architecture_shape?: ArchitectureShape;
  discovery_answers?: Record<string, string>;
  domain_map?: DomainMap;
  design?: DesignOutput;
  agent_superprompts?: Record<string, string>;
  deploy_config?: DeployConfigOutput;
}
