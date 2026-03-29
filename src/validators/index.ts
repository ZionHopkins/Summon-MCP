// ============================================================
// SUMMON MCP — Validators
// ============================================================

import type { Archetype } from "../types/index.js";

// Coupling validator — checks if superprompt text references coupled layers
export function validateCoupling(superprompt: string, layerName: string, requiredReferences: string[]): {
  passed: boolean;
  missing: string[];
  details: string;
} {
  const lower = superprompt.toLowerCase();
  const missing = requiredReferences.filter(ref => {
    // Check for the layer name in various forms
    const refLower = ref.toLowerCase().replace(/_/g, " ").replace(/-/g, " ");
    const refUnderscore = ref.toLowerCase();
    const refHyphen = ref.toLowerCase().replace(/_/g, "-");
    return !lower.includes(refLower) && !lower.includes(refUnderscore) && !lower.includes(refHyphen);
  });

  return {
    passed: missing.length === 0,
    missing,
    details: missing.length === 0
      ? `${layerName}: All coupling references present.`
      : `${layerName}: MISSING references to: ${missing.join(", ")}. Add specific cross-references.`
  };
}

// DMAD validator — checks archetype diversity
export function validateDMAD(archetypes: Archetype[]): {
  passed: boolean;
  unique_count: number;
  details: string;
} {
  const unique = new Set(archetypes);
  return {
    passed: unique.size >= 2 || archetypes.length <= 1,
    unique_count: unique.size,
    details: archetypes.length <= 1
      ? "Single agent — DMAD not applicable."
      : unique.size >= 2
        ? `DMAD PASSED: ${unique.size} unique archetypes across ${archetypes.length} agents.`
        : `DMAD FAILED: Only ${unique.size} unique archetype across ${archetypes.length} agents. Need 2+ different reasoning approaches.`
  };
}

// Quality gate — checks superprompt against minimum requirements
export function validateQuality(superprompt: string, isFull: boolean): {
  passed: boolean;
  checks: Array<{ check: string; passed: boolean; details: string }>;
} {
  const checks = [];
  const wordCount = superprompt.split(/\s+/).length;

  // Word count
  const wcMin = isFull ? 400 : 100; // Slightly relaxed from target for validation
  const wcMax = isFull ? 1000 : 400;
  checks.push({
    check: "Word count",
    passed: wordCount >= wcMin && wordCount <= wcMax,
    details: `${wordCount} words (target: ${isFull ? "500-800" : "150-300"})`
  });

  // XML tags present
  const hasXmlTags = /<\w+>/.test(superprompt) && /<\/\w+>/.test(superprompt);
  checks.push({
    check: "XML tags",
    passed: hasXmlTags,
    details: hasXmlTags ? "XML layer tags present" : "MISSING XML layer tags"
  });

  if (isFull) {
    // SCAN checkpoints
    const hasScan = superprompt.includes("scan_check") || superprompt.includes("Active check");
    checks.push({
      check: "SCAN checkpoints",
      passed: hasScan,
      details: hasScan ? "SCAN checkpoints present" : "MISSING SCAN checkpoints"
    });

    // Chain of Persona
    const hasChain = superprompt.includes("SELF-CHECK") || superprompt.includes("Chain of Persona");
    checks.push({
      check: "Chain of Persona",
      passed: hasChain,
      details: hasChain ? "Chain of Persona self-check present" : "MISSING Chain of Persona in Response Protocol"
    });

    // Anti-patterns count
    const antiPatternMatches = superprompt.match(/^[—\-•]\s/gm) || [];
    const apCount = antiPatternMatches.length;
    checks.push({
      check: "Anti-patterns count",
      passed: apCount >= 5,
      details: `${apCount} anti-pattern entries (minimum: 5)`
    });
  }

  return {
    passed: checks.every(c => c.passed),
    checks
  };
}
