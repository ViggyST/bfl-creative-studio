# Session Log — BFL Creative Studio

Sessions S1–S5 predate this log (see Project Knowledge / earlier chat history for detail).
S5 (UI components) completed 15 Jun 2026 — see CLAUDE.md §7.

24 Jun 2026 — v2 Architecture Decision. Vision + template routing approved. Pre-flight complete. S7A next.

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

---

## 22 Jun 2026 — Desktop Composition Pass (S6c layout phase)

Root cause: all components were centring independently with no unified page shell, causing
content to float at different widths (BriefOutput was 1140px, BriefForm was 760px, header
was full-bleed with px-8 padding). At 1440px this looked unanchored.

**Phase 1 — `app/globals.css`**
- Added page shell tokens to `:root`: `--page-max: 1120px`, `--page-pad-x: clamp(24px, 4vw, 64px)`,
  plus `--section-gap`, `--card-pad-y/x`, `--output-bottom-pad` as slot tokens.
- Expanded `*` box-sizing rule to include `::before`/`::after`.
- Added `.page-shell` and `.prose-block` to `@layer utilities`. `.page-shell` uses
  `width: min(var(--page-max), calc(100% - (var(--page-pad-x) * 2)))` for a responsive
  1120px constraint with fluid edge padding.

**Phase 2 — `app/page.tsx`**
- HeaderBar: removed raw `px-8`, added inner `page-shell` wrapper div so header content
  aligns to the same 1120px rail as output sections.

**Phase 3 — `components/BriefOutput.tsx` (output wrapper + brief card)**
- Replaced `max-w-[1140px] px-12 py-10` content div with single `page-shell pt-4 pb-12`
  wrapper enclosing both the brief card and all section cards.
- BriefRequestCard redesigned: `py-[14px] px-6`, flex-row with fixed 110px "← New brief"
  area, vertical divider, `grid-cols-2 gap-x-8 gap-y-2` label/value grid, right-aligned
  badges. Labels 9px, values 12px.

**Phase 4 — Section cards**
- SectionCard: `px-6 py-5` (from px-8 py-7). Section label `text-[10px]`.
- Sections container: `mt-5 space-y-[18px]` (from gap-6).

**Phase 5 — Section-specific**
- CreativeType: `space-y-3` wrapper, `max-w-[68ch] leading-[1.6]` rationale, `mt-1` intent signal.
- ImagePrompts: prompt box `p-4 leading-[1.7] prose-block`, `mt-3` tab-to-box gap.
- CopyFormula: reverted to stacked `flex-col gap-3` (3-col grid too cramped at 1120px),
  boxes `p-4`, labels `text-[9px] mb-2`.
- LayoutBrief: row padding `py-2.5`, label `min-w-[80px] text-[9px]`.
- ReferenceCreatives: `gap-3` (from gap-4).
- IncludeAvoid: `gap-8` columns, items `py-2 px-2.5`, `space-y-1.5` list.
- CTRSignal: `space-y-1` rows, `py-1.5` per row, `h-2` bars with values in adjacent
  `<span>` outside bar (bars are 8px — too small to contain text), `mt-4` total block,
  `mt-2` disclaimer.

**Phase 6 — `components/BriefForm.tsx`**
- Underline: added `mb-4`.
- Sub-copy: removed `mt-6`, added `mb-8`.
- Form: `mt-8 → mt-0`, `gap-7 → gap-4`.
- Campaign Intent wrapper: added `mb-5`.
- Button: `mt-4 → mt-2`. Footer: `mt-4 → mt-3`.

**`components/CreativeCard.tsx`**
- Name label: `p-3 → p-2.5`.

Build: `npm run build` = 0 errors. Committed `6bcc413`, pushed to main.

**Next: S6c (original)** — verify all 82 filenames in `lib/creativeLibrary.ts` match
`public/creatives/` exactly (case-sensitive), then S7 (README + Vercel deploy).
