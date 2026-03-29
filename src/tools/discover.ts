// ============================================================
// SUMMON MCP — Discover Tool
// Classifies objective, recommends architecture shape, generates questions
// ============================================================

import {
  classifyObjective,
  OBJECTIVE_TO_SHAPE,
  BASE_QUESTIONS,
  OBJECTIVE_SPECIFIC_QUESTIONS
} from "../templates/objectives.js";
import type { DiscoverOutput } from "../types/index.js";

export function executeDiscover(input: {
  input: string;
  domain?: string;
  objective?: string;
}): DiscoverOutput {
  const rawInput = input.input || input.objective || input.domain || "";

  // Step 1: Classify objective
  const classification = classifyObjective(rawInput);

  // Step 2: Map to architecture shape
  const shapeMapping = OBJECTIVE_TO_SHAPE[classification.type];

  // Step 3: Build question set
  const objectiveQuestions = OBJECTIVE_SPECIFIC_QUESTIONS[classification.type] || [];
  const questions = [...BASE_QUESTIONS, ...objectiveQuestions];

  // Step 4: Construct output
  return {
    objective_classification: classification,
    recommended_architecture: {
      shape: shapeMapping.default_shape,
      rationale: shapeMapping.rationale,
      alternatives: shapeMapping.alternatives.map(
        a => `${a.shape}: ${a.when}`
      )
    },
    questions,
    next_step: `Present these questions to the user. After they answer, call summon_research with the domain, objective ("${rawInput}"), objective_type ("${classification.type}"), architecture_shape ("${shapeMapping.default_shape}"), and their answers as discovery_answers JSON.`
  };
}
