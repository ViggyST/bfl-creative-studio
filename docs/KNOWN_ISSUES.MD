# Known Issues — as of S6 prep (15 Jun 2026)

## Open

1. **v2 schema migration — BriefOutput.tsx renders v1 fields until S7C completes.**
   types/index.ts now defines the v2 BriefResponse shape. BriefOutput.tsx still references
   v1 fields (detected_intent, creative_type, ctr_score_estimate, layout_brief, etc.).
   Temporary workaround: BriefOutput prop typed as `any` if needed to unblock build.
   Fix scoped to S7B/S7C.

## Notes

- Response time can be 60–100s+ for verbose briefs now that the max_tokens truncation
  fix (4096→8192) is in. Loading copy ("~4 seconds to generate") is inaccurate and
  should be revisited during visual polish.

## Resolved

- **public/creatives/ is empty** — RESOLVED. All 82 PNGs uploaded, committed, and
  verified rendering correctly in a live end-to-end test (15 Jun 2026).
- **CTR waterfall math doesn't reconcile** — RESOLVED (S6b). systemPrompt.ts updated
  with INSTRUCTION 08: elements[] are signal transparency only, estimated_ctr is a
  holistic prediction aligned with archetype benchmarks — not a sum of lifts.
