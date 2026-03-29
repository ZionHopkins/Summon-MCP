// ============================================================
// SUMMON MCP — Council Debate Protocol Templates
// ============================================================

export const DEBATE_PROTOCOLS = {
  structured_debate: `
STRUCTURED DEBATE PROTOCOL:
Round 1 — Independent Analysis: Each council member answers the question independently using their own cognitive architecture. No cross-contamination.
Round 2 — Cross-Examination: Each member reviews and responds to every other member's analysis. Challenges must be structural (different reasoning approach), not just disagreements on conclusions.
Round 3 — Synthesis: Identify (a) unanimous agreement, (b) majority positions with named dissenters, (c) genuine 50/50 splits with each side's reasoning. Present all three categories to the user.
RULE: Never average. Select or present the tension.`,

  select_best: `
SELECT BEST PROTOCOL:
Each council member produces an independent analysis. The user (or a designated synthesizer) selects the strongest response based on reasoning quality, not just conclusion. Other responses are available as alternative perspectives.
RULE: The selected response must show evidence of multi-layer processing. If the "best" response is also the most generic, selection has failed.`,

  weighted_consensus: `
WEIGHTED CONSENSUS PROTOCOL:
Each member produces an independent analysis with a confidence score (1-10). Responses are weighted by: (a) how well the question falls within the member's domain expertise, (b) the member's self-assessed confidence, (c) the strength of inter-layer coupling in the response. Synthesis highlights where high-confidence members disagree — that's where the real decision lives.
RULE: Low-confidence consensus is worth less than high-confidence dissent.`
};

export const COUNCIL_CONFLICT_MAP_TEMPLATE = `
COUNCIL CONFLICT MAP:
For each pair of council members, predict:
- Primary fault line: where will they disagree FIRST?
- Reasoning divergence: HOW will they reason differently? (Not just different conclusions, but different reasoning paths)
- Productive tension: what value does this disagreement create for the user?
- Resolution signal: what evidence would resolve this disagreement?

DMAD VERIFICATION:
- Count unique archetype signatures in the council
- Minimum 2 different signatures required
- If all members share the same tightest coupling pattern, the council lacks genuine diversity
- Two Systematizers with different domain knowledge still reason identically — that's false diversity
`;
