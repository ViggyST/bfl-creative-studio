# Known Issues — as of S6 prep (15 Jun 2026)

## Open

_(none)_

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
- **v2 schema migration** — RESOLVED (S7C). BriefOutput.tsx fully rewritten to 9-zone
  layout using v2 BriefResponse type throughout. `brief: any` workaround removed.
- **Phase 2 creative library dedup + CTR correction** — RESOLVED (30 Jun 2026).
  9 duplicate entries removed and merged into existing entries with corrected
  reach-weighted CTRs. 29 entries updated with verified source data. knowledge.ts
  archetype table rebuilt from reach-weighted source data. Library: 104 → 100 entries,
  baseline: 2.12% → 1.83%. See docs/Phase2_Creative_Performance.md for methodology.
