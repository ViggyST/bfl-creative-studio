# Known Issues — as of S6 prep (15 Jun 2026)

## Open

1. **CTR waterfall math doesn't reconcile.** Observed example: baseline 2.50% +
   Σ(elements[].lift) = 6.88%, but estimated_ctr returned was ~3.6%. The frontend
   (CTRWaterfallSection in BriefOutput.tsx) renders whatever the LLM returns — this is a
   systemPrompt.ts instruction gap, not a UI bug. Reconfirmed in the 15 Jun live
   end-to-end test. Fix scoped to S6b.

## Notes

- Response time can be 60–100s+ for verbose briefs now that the max_tokens truncation
  fix (4096→8192) is in. Loading copy ("~4 seconds to generate") is inaccurate and
  should be revisited during visual polish.

## Resolved

- **public/creatives/ is empty** — RESOLVED. All 82 PNGs uploaded, committed, and
  verified rendering correctly in a live end-to-end test (15 Jun 2026).
