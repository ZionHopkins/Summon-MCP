// ============================================================
// SUMMON MCP — Mandatory Coupling Map (from v5 Framework)
// ============================================================

export const COUPLING_MAP: Record<string, { must_reference: string[]; description: string }> = {
  mental_models: {
    must_reference: ["decision_frameworks", "emotional_processing"],
    description: "Mental Models must reference what Decision Frameworks they feed into, and what emotional triggers activate which model."
  },
  decision_frameworks: {
    must_reference: ["mental_models", "uncertainty_management"],
    description: "Decision Frameworks must reference which Mental Models feed decisions, and what uncertainty level triggers a mode switch."
  },
  communication_style: {
    must_reference: ["emotional_processing", "anti_patterns"],
    description: "Communication Style must reference how emotion changes delivery, and what language patterns are anti-patterns."
  },
  core_beliefs: {
    must_reference: ["belief_conflict_map", "mental_models"],
    description: "Core Beliefs must reference where beliefs create tension with mainstream views, and which Mental Models rest on these beliefs."
  },
  anti_patterns: {
    must_reference: ["communication_style", "core_beliefs"],
    description: "Anti-Patterns must reference language the agent would never use (Communication Style violations) and advice that violates Core Beliefs."
  },
  belief_conflict_map: {
    must_reference: ["core_beliefs", "decision_frameworks"],
    description: "Belief Conflict Map must reference which Core Beliefs drive the conflicts, and how conflicts affect Decision Frameworks."
  },
  domain_transfer: {
    must_reference: ["mental_models", "uncertainty_management"],
    description: "Domain Transfer must reference which Mental Models are universal vs. domain-specific, and how confidence changes outside domain."
  },
  metacognition: {
    must_reference: ["anti_patterns", "decision_frameworks"],
    description: "Metacognition must reference which Anti-Patterns represent known biases to self-monitor, and when to override intuition with analysis."
  },
  emotional_processing: {
    must_reference: ["communication_style", "metacognition"],
    description: "Emotional Processing must reference how emotions surface in Communication Style, and emotional self-awareness from Metacognition."
  },
  uncertainty_management: {
    must_reference: ["domain_transfer", "metacognition"],
    description: "Uncertainty Management must reference Domain Transfer confidence levels, and Metacognitive self-knowledge about what you don't know."
  },
  response_protocol: {
    must_reference: ["mental_models", "anti_patterns", "calibration_anchors"],
    description: "Response Protocol must reference specific Mental Models to filter through, Anti-Patterns to check against, and Calibration Anchors for tonal verification."
  }
};

// The strange loop: Response Protocol → Metacognition → Anti-Patterns → Communication Style → Emotional Processing → Metacognition
export const STRANGE_LOOP = [
  "response_protocol",
  "metacognition",
  "anti_patterns",
  "communication_style",
  "emotional_processing",
  "metacognition"
];

export const COUPLING_VERIFICATION_INSTRUCTIONS = `
COUPLING VERIFICATION RULES:
- Every layer must explicitly reference at least 2 other layers by SPECIFIC NAME or CONTENT
- WEAK coupling: "Filter through your mental models" (generic, no attention pathway)
- STRONG coupling: "Filter through your Value Equation and constraint-first lens — what's the binding variable?" (names specific content)
- The architecture must contain at least one strange loop: a chain of cross-layer references that cycles back
- If you delete any one layer, at least two other layers should feel incomplete because they reference it
`;
