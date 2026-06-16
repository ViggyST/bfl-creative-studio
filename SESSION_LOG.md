# Session Log — BFL Creative Studio

Sessions S1–S5 predate this log (see Project Knowledge / earlier chat history for detail).
S5 (UI components) completed 15 Jun 2026 — see CLAUDE.md §7.

---

## 15 Jun 2026 — Housekeeping (pre-S6a)

- Uploaded all 82 reference creative PNGs to public/creatives/ — verified rendering
  correctly (no 404s) in a live end-to-end test. KNOWN_ISSUES #1 resolved.
- Confirmed max_tokens fix (4096→8192) committed (`8db08a1`) — prevents JSON truncation
  on verbose briefs. Verified live.
- Reconfirmed CTR waterfall math issue (estimated_ctr doesn't reconcile with
  baseline + Σ lifts) in the live test — still open, scoped to S6b.
- Flagged: response time can now be 60–100s+ for verbose briefs; loading copy
  ("~4 seconds to generate") is inaccurate — revisit during visual polish.
- **S6a paused** pending a UIUX direction discussion with ST before any polish work
  starts.

---

## 16 Jun 2026 — S6 (Desktop layout + type scale + CTR fix)

**S6a — Visual polish (all files)**
- `app/page.tsx`: HeaderBar bumped to h-[56px] px-8; form wrapper to px-8 py-16;
  output state wrapped in `<main className="flex-1 bg-[var(--c-bg)]">`; loading
  heading → "Generating your brief…"; added 10–90s sub-note below step text.
- `components/BriefForm.tsx`: container max-w-[760px]; heading 42px tracking-[-0.7px];
  underline w-[52px] h-[3px]; sub-copy 14px; form gap-7; Required/Optional pill tags
  added to Product, Offer, Context; chips px-5 py-[10px] text-[13px]; inputs
  px-[18px] py-[16px] text-[16px] rounded-[7px]; textarea min-h-[140px]; button
  py-[18px] text-[16px] rounded-[7px] mt-4; footer note → "10–90 seconds to generate".
- `components/BriefOutput.tsx`: full-width brief-card flush to header (3px amber top
  border, no rounded corners); max-w-[1140px] centred content area px-12 py-10 gap-6;
  section cards rounded-[8px] px-8 py-7; section label 12px; Creative Type 44px h2 +
  34px CTR; Copy Formula 3-col [1fr_2fr_1fr] grid; Layout Brief amber left border 3px +
  row structure 140px labels; Reference Creatives 5-col gap-4; Include/Avoid 2-col
  border-left coloured items; Section 07 renamed "CTR Signal Analysis" with disclaimer
  note + proportional bars at 100px/1%.
- `components/CreativeCard.tsx`: thumbnail h-[120px].

**S6b — CTR system prompt fix**
- `lib/systemPrompt.ts`: added INSTRUCTION 08 clarifying elements[] are marginal-effect
  signal transparency only, NOT summed; estimated_ctr is holistic model prediction
  aligned with archetype benchmarks.

Build: `npm run build` = 0 errors. Committed `b172d00`, pushed to main.
