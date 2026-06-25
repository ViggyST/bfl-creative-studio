# CLAUDE.md — BFL Creative Studio v2

> This is the v2 engineering contract. It supersedes all v1 instructions.
> Full architecture rationale: `BFL_Studio_v2_Architecture_Document.html` (Project Knowledge).
> Full session plan + exact code: `BFL_Studio_v2_Session_Plan.html` (Project Knowledge).
> Session history: `SESSION_LOG.md`. Design system: `docs/DESIGN_SYSTEM.md`.

---

## 1. North Star / Scope

Internal tool for Bajaj Finserv's Insta EMI Card team. Campaign manager fills 4 fields
(intent, product, offer, context) → single Anthropic API call → production-ready
**9-zone designer brief**, so designers never need a follow-up call.

**v2 core change:** Reference creatives are now load-bearing via vision. Claude receives
5 winning PNG creatives as base64 image blocks and synthesises from visual evidence +
CTR data. The LLM no longer reasons from generic knowledge.

**In scope (S7A–S7D):**
- `lib/templateLibrary.ts` — NEW. 9 scenario routes, each mapping to 5 curated PNG filenames
- `lib/creativeLibrary.ts` — ADD 4 classifier functions + `getScenarioCreatives()`
- `app/api/generate-brief/route.ts` — EXTEND with base64 PNG vision blocks
- `lib/systemPrompt.ts` — FULL REWRITE. Synthesis-first, not rule-following
- `components/BriefOutput.tsx` — FULL REDESIGN to 9-zone layout
- `components/CreativeCard.tsx` — MINOR: gold border on base creative (`is_base` flag)
- `app/globals.css` — MINOR: tokens for Keep/Change panel colours if needed

**Out of scope (all v2):** auth, brief history, feedback loop, admin panel, mobile layout,
audience segmentation, competitor benchmarks, reel/video briefs.

---

## 2. Tech Stack

| Layer | Choice | Version / Notes |
|---|---|---|
| Framework | Next.js App Router, TypeScript | 14 |
| Styling | Tailwind CSS — CSS vars in globals.css, arbitrary-value classes only | v3 |
| AI | @anthropic-ai/sdk · `claude-sonnet-4-6` · single call/brief | — |
| Vision | PNGs read as base64 via `fs.readFileSync` from `public/creatives/` | server-side only |
| Icons | lucide-react | — |
| Fonts | next/font/google — Space Grotesk, DM Sans, JetBrains Mono | — |
| Hosting | Vercel (auto-deploy on push to main) | — |

---

## 3. Conventions

- Design tokens: CSS custom properties on `:root` in `app/globals.css` — see
  `docs/DESIGN_SYSTEM.md` §4.1–4.5 for full table.
- Reference tokens via Tailwind arbitrary values: `bg-[var(--c-surface)]`,
  `rounded-[var(--radius-lg)]`, `shadow-[var(--shadow-card)]`.
- Font utilities: `.font-display` (Space Grotesk), `.font-data` (JetBrains Mono).
  Body defaults to DM Sans — no utility needed.
- Weight ceiling: Space Grotesk ≤600, DM Sans ≤500. Never exceed.
- Shape rule: section cards/inputs/buttons = 4–6px radius. Chips/badges/pills =
  `--radius-pill` (9999px).
- Components: PascalCase in `/components`, one per file. `'use client'` only where
  state/effects/handlers are used.
- Filenames in `creativeLibrary.ts` are **case-sensitive** and must match
  `public/creatives/` exactly. Verified during S6c.

---

## 4. File & Folder Structure (v2 target state)

```
app/
  layout.tsx, globals.css, page.tsx
  api/generate-brief/route.ts        ← EXTEND: vision blocks (S7B)
components/
  BriefForm.tsx                       ← NO CHANGE
  BriefOutput.tsx                     ← FULL REDESIGN: 9-zone (S7C)
  CopyButton.tsx                      ← NO CHANGE
  CreativeCard.tsx                    ← MINOR: is_base gold border (S7C)
lib/
  knowledge.ts                        ← Block 02 updated (pre-flight ✓)
  creativeLibrary.ts                  ← ADD classifiers + getScenarioCreatives (S7A)
  templateLibrary.ts                  ← NEW: 9 ScenarioRoutes (S7A)
  systemPrompt.ts                     ← FULL REWRITE (S7B)
types/
  index.ts                            ← v2 BriefResponse schema (pre-flight ✓)
public/creatives/                     ← 82 PNGs — NO CHANGE. Used as vision inputs.
docs/
  DESIGN_SYSTEM.md
  KNOWN_ISSUES.md
```

---

## 5. Types / Schema

`types/index.ts` contains the v2 `BriefResponse`. **Do not revert to v1 fields.**

Key v2 fields (full interface in `types/index.ts`):

```typescript
BriefResponse {
  scenario_id, scenario_name           // routing result
  base_creative: { filename, display_name, ctr, url }
  confidence: 'HIGH' | 'MED' | 'LOW'
  evidence_note, needs_pretest

  structural_keep: string[]            // what stays from the reference
  story_change: string[]               // what adapts for this brief

  component_spec: { hero, card, background, chips[], logo, cta }
  copy_pack: { headline, body, cta }
  ab_experiment: string                // ONE suggestion, text only

  image_prompts: { gpt4o, gemini, midjourney }

  ctr_signal_analysis: {
    baseline: 2.12                     // always 2.12 — never 2.50
    signals: [{ feature, lift, note }]
    estimated_range: string            // "3.0–4.5%" — range, not a number
    confidence: string
  }

  reference_creatives: [{
    filename, display_name, ctr, url
    is_base: boolean                   // true = gold border in UI
  }]
}
```

`BriefOutput.tsx` currently uses `brief: any` — intentional workaround until S7C.
All other interfaces (`CreativeCard`, `BriefRequest`, `CreativeIntent`, etc.) unchanged.

---

## 6. Scenario Routing (v2 core logic)

`lib/templateLibrary.ts` maps detected scenario → 5 curated PNG filenames.
`lib/creativeLibrary.ts` looks up those filenames → returns full `CreativeCard[]`.

**Tie-breaker:** Partner > Festive > Category-specific > Fallback (S7 Card Hero).
**Fallback:** S7 always. Most data-backed, lowest risk.

| ID | Scenario | Trigger | Confidence | Pre-test |
|----|----------|---------|------------|----------|
| S1 | Festive — Appliance | detectSeason + category ∈ {AC, WM, Fridge, TV} | HIGH | — |
| S2 | Festive — Smartphone | detectSeason + category = Smartphone | MED | ✓ |
| S3 | Festive — Generic/Card | detectSeason + no specific product | MED | — |
| S4 | Partner Co-branded | detectPartner fires (any input) | MED | — |
| S5 | Product Spec — Smartphone | category = Smartphone, no season, no partner | HIGH | — |
| S6 | Appliance — Non-Festive | category ∈ {AC, TV, WM, Fridge}, no season | HIGH | — |
| S7 | Card Hero (fallback) | intent = Card-Led, no product/season | HIGH | — |
| S8 | Offer Hero | intent = Offer-Led, no brand detected | MED | — |
| S9 | Niche Defensive | category ∈ {Wearable, Air Purifier, Camera} | MED | ✓ |

New classifiers to add in `creativeLibrary.ts`:
- `detectPartner(product, context)` — detects Flipkart, Amazon, etc.
- `detectSeason(product, context, goal)` — detects BBD, Diwali, Republic Day, etc.
- `detectCashbackTier(offer)` — returns 'HIGH' (≥₹2K) | 'MED' (₹1K–₹1,999) | 'LOW'
- `getScenarioCreatives(product, offer, context, goal)` — orchestrator; returns 5 CreativeCards

Full route definitions with exact filenames are in `BFL_Studio_v2_Session_Plan.html` §04.

---

## 7. Vision Integration Pattern (S7B)

```typescript
import fs from 'fs';
import path from 'path';

function readCreativeAsBase64(url: string): string {
  // url = "/creatives/filename.png"
  const filePath = path.join(process.cwd(), 'public', url);
  return fs.readFileSync(filePath).toString('base64');
}

// Build user message: images first, then text
const imageBlocks = scenarioCreatives.map(c => ({
  type: 'image' as const,
  source: {
    type: 'base64' as const,
    media_type: 'image/png' as const,
    data: readCreativeAsBase64(c.url),
  },
}));

const userContent = [
  ...imageBlocks,
  { type: 'text' as const, text: campaignBriefText }
];
```

`max_tokens` stays at 8192 (set S4, confirmed working). Cost ~₹17–19/brief after vision.

---

## 8. 9-Zone Output Layout (S7C)

| Zone | Content | Note |
|------|---------|------|
| 1 | Brief request card + "← New Brief" | Above fold |
| 2 | Base creative image (full-width) + template badge + evidence | Above fold |
| 3 | Keep / Change panels (chip style) | Above fold |
| 4 | Component Spec (6-row table: HERO/CARD/BG/CHIPS/LOGO/CTA) | Visible |
| 5 | Copy Pack (HEADLINE / BODY / CTA) | Visible |
| 6 | A/B Experiment — "EXPERIMENT — UNPROVEN" label | Visible |
| 7 | Image Adaptation Prompts (GPT-4o / Gemini / Midjourney tabs) | Visible |
| 8 | Reference Creatives (5-card row, gold border on base) | Visible |
| 9 | CTR Signal Analysis | **Collapsed by default** |

---

## 9. Build Session Plan

| Session | Tool | Scope | Gate |
|---------|------|-------|------|
| Pre-flight | Cursor | knowledge.ts Block 02 + types/index.ts + CLAUDE.md + SESSION_LOG.md + KNOWN_ISSUES.md | ✅ Done — commit 8d79043 |
| **S7A** | Claude Code | `lib/templateLibrary.ts` (new) + classifiers in `lib/creativeLibrary.ts` | `getScenarioCreatives()` returns correct 5 cards for 5 test inputs. `npm run build` = 0 errors. |
| S7B | Claude Code | `app/api/generate-brief/route.ts` vision + `lib/systemPrompt.ts` full rewrite | 3 test briefs return v2 JSON. No 500 errors. `structural_keep` / `story_change` non-empty. |
| S7C | Claude Code | `components/BriefOutput.tsx` 9-zone redesign + `CreativeCard.tsx` minor | Zone 2 image loads. Zone 3 chips non-empty. Zone 9 collapsed by default. `npm run build` = 0 errors. |
| S7D | Claude Code | Polish + README + Vercel deploy | 3 real briefs <15s. 0 console errors. Shared URL works. |

Commit convention: `feat(S7A): ...`, `feat(S7B): ...`, etc.

---

## 10. Current Status

**Pre-flight complete — commit 8d79043 — 24 Jun 2026.**
- `lib/knowledge.ts` Block 02: baseline updated to 2.12% / 104 creatives. Archetype table expanded to 7 rows.
- `types/index.ts`: v2 `BriefResponse` schema in place. All old interfaces retained to avoid TS errors until S7C.
- `BriefOutput.tsx`: temporarily uses `brief: any` — expected, documented, will be fixed in S7C.
- `CLAUDE.md`, `SESSION_LOG.md`, `docs/KNOWN_ISSUES.md`: updated.

**Next: S7A in Claude Code.**
Paste kickoff context block from `BFL_Studio_v2_Session_Plan.html` §09 at the start of the session.

---

## 11. Tool Division

| | Claude Code | Cursor |
|---|---|---|
| Use for | S7A–S7D: all multi-file builds, logic changes, prompt rewrites | Git pushes, `npm run dev`, one-line tweaks, asset management |
| Default if unsure | Touches >1 file or involves logic → **Claude Code** | File/asset ops only → **Cursor** |

---

## 12. Env Vars & Constraints

- `ANTHROPIC_API_KEY` — Vercel env var / `.env.local`. **Never commit.**
- Never modify `.gitignore` or `.env.local`.
- Checkpoint after each file — confirm before moving to the next.
- `npm run build` must pass 0 errors at the end of every session.
- `'use client'` only where state/effects/handlers are used.
- Filenames in `creativeLibrary.ts` / `templateLibrary.ts` are **case-sensitive**.
  Always match `public/creatives/` exactly.
- Reels/video: excluded from all logic. No T8, no reel routes, no reel references.