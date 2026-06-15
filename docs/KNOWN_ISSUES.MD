# Known Issues — as of S5 completion (15 Jun 2026)

1. **public/creatives/ is empty.** lib/creativeLibrary.ts has correct filenames/URLs for
   all 82 cards, but the PNG files were never uploaded. Reference Creative thumbnails
   currently 404 in the UI. User uploads these separately (Cursor) — once done, S6c
   verifies filenames match exactly (case-sensitive).

2. **CTR waterfall math doesn't reconcile.** Observed example: baseline 2.50% +
   Σ(elements[].lift) = 6.88%, but estimated_ctr returned was ~3.6%. The frontend
   (CTRWaterfallSection in BriefOutput.tsx) renders whatever the LLM returns — this is a
   systemPrompt.ts instruction gap, not a UI bug. Fix scoped to S6b.