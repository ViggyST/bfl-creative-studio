# BFL Creative Studio — Design System v1.1

**Status:** Locked · June 2026
**Supersedes:** v1.0 (dark theme)
**Owner:** ST · Insta EMI Card Marketing
**Applies to:** S5 UI build and all future UI work

---

## 0. What changed from v1.0

v1.0 was a dark theme. After review, **light theme is locked for v1.1** — same structure, same section order, same fonts, same three-state flow, but re-themed to a warm off-white canvas.

Additionally, five refinements inspired by Linear's design system are folded in:

1. **Soft-shadow elevation** instead of flat borders-only — cards lift gently off the canvas
2. **Letter-spacing scales with size** — tight tracking on display type, normal below 16px
3. **Weight discipline** — DM Sans never exceeds 500, Space Grotesk never exceeds 600
4. **Pills reserved for tags/chips/badges only** — section cards, buttons, inputs stay sharp (4-6px)
5. **Focus glow** — soft amber-tinted shadow on focused inputs, not just a border-colour swap

Everything else from v1.0 — three-state flow, brief request card, 7-section order, amber accent, three-font system — is unchanged in substance, only re-themed.

---

## 1. What this document is

This is the canonical design reference for BFL Creative Studio. Every UI decision made during S5 (and any future UI sprint) must be derived from this document. If a decision is not covered here, default to the closest existing rule rather than inventing a new pattern.

---

## 2. Product identity

**Name:** BFL Creative Studio
**Tagline:** Generate a creative brief
**Sub-copy:** Backed by 82 analysed Insta EMI Card creatives · Confound-corrected CTR data
**Logo treatment:** Amber dot (●) + "BFL Creative Studio" in Space Grotesk 600
**Environment:** Desktop web app, internal URL, no auth

---

## 3. Interaction model — three-state flow

The app has exactly three states. No other screens exist in V1. (Unchanged from v1.0.)

### State 1 — Form (full page)

The entire viewport is the form. Nothing else.

**Layout:**
- Header bar (46px) at top
- Form content centred in the remaining viewport
- Max-width 520px for the form fields, centred horizontally
- No output visible, no nav, no distractions

**Fields (in order):**
1. Campaign Intent — pill chip selector (Auto-detect / Card-Led / Product-Led / Offer-Led / Festive/Event). Default: Auto-detect.
2. Product / Focus — text input, required. Placeholder: "e.g. Voltas AC — summer theme, iPhone 16, Card Hero"
3. Offer — text input, required. Placeholder: "e.g. ₹2,000 cashback + Zero Down Payment"
4. Context — textarea, optional. Placeholder: "Audience notes, seasonal event, tone, competitor angle…"

**Generate button:** Full-width within the form inner container. Amber background, white text, Space Grotesk 600. Padding 13px 28px.

**Footer note:** "~4 seconds to generate · ₹2.30 per brief · No data stored" — JetBrains Mono, 10px, faint colour.

### State 2 — Loading (full page)

Shown while the Anthropic API call is in flight (~3–5 seconds).

**Layout:** Header stays. Content area shows centred loading message.

**Loading message:** "Generating brief..." in Space Grotesk 600, 16px.

**Progress bar:** Thin amber bar (2px height, 200px wide) on a light track, animating from 0% to ~95% over 1.7s ease-out. Does not complete to 100% until the response arrives.

**Loading steps:** Cycle through these 5 lines below the bar at 340ms intervals (JetBrains Mono, 11px, faint):
1. Classifying product & intent
2. Matching reference creatives
3. Building layout brief
4. Generating copy formula
5. Composing image prompts

**No spinner.** The progress bar is the only motion element.

### State 3 — Output (full page, scrollable)

The brief fills the page. The form input is summarised in a compact "brief request card" at the top so the user never loses context.

**Layout:**
- Header bar stays
- Brief request card directly below header (Section 6)
- Brief sections below that, full width, scrollable

**Navigation back:** "← New Brief" pill button inside the brief request card. Takes user back to State 1 (pre-filled with last inputs is acceptable).

---

## 4. Visual system

### 4.1 Colour tokens

| Token | Hex / Value | Role |
|---|---|---|
| `--c-bg` | `#FAF8F4` | Page canvas — warm off-white, not pure white |
| `--c-surface` | `#FFFFFF` | Section card background |
| `--c-surface-2` | `#F3EFE9` | Header, brief request card, reference thumbnails (placeholder) |
| `--c-surface-3` | `#F7F4EF` | Inset boxes — copy formula blocks, image prompt boxes |
| `--c-border` | `#E8E2D9` | Default card / input borders |
| `--c-border-subtle` | `#F0EBE3` | Row dividers within cards |
| `--c-text` | `#2B2723` | Primary text — warm near-black, not pure black |
| `--c-text-muted` | `#6B655F` | Secondary text, body content inside cards |
| `--c-text-faint` | `#A39C92` | Labels, metadata, section numbers |
| `--c-text-ghost` | `#CCC4B8` | Placeholder text, footer notes |
| `--c-amber` | `#BA8A3C` | Brand accent — Generate button, active chip, headline underline, Layout Brief border |
| `--c-amber-soft` | `rgba(186,138,60,0.08–0.10)` | Amber badge/pill backgrounds |
| `--c-green` | `#1A8F4E` | CTR positive signals, include list, estimated CTR number |
| `--c-green-soft` | `rgba(26,143,78,0.05–0.16)` | Green chip/bar backgrounds |
| `--c-red` | `#D9534F` | Avoid list, negative CTR signals |
| `--c-red-soft` | `rgba(217,76,63,0.05–0.07)` | Avoid item backgrounds |
| `--c-blue` | `#3568D4` | Intent signal indicator, CTA copy text |
| `--c-blue-soft` | `rgba(53,104,212,0.08)` | Intent signal badge background |

**Why these specific values:** the amber, green, red, and blue from v1.0 (`#D9A853`, `#34D399`, `#F87171`, `#60A5FA`) were calibrated for a dark background. On white, those same hex values fail contrast — they read as washed-out pastels. Every accent colour has been **deepened** for light-surface contrast while preserving the same hue family and role.

**Colour rules (unchanged from v1.0):**
- Amber: Generate button, active intent chip, headline underline, Layout Brief border, "★ Most important" badge. Never decorative.
- Green: positive CTR lifts, estimated CTR number, include list, active prompt tab underline, reference creative CTR badges (high performers).
- Red: avoid list items only.
- Blue: intent signal indicator, CTA copy text only.

### 4.2 Typography

**Font stack (unchanged from v1.0):**

| Font | Weight | Use |
|---|---|---|
| Space Grotesk | 600 | Creative type name, app logo, Generate button label, headings |
| DM Sans | 400, 500 | Body copy, field labels, section content, reasons |
| JetBrains Mono | 400, 500 | All section labels, CTR numbers, chip labels, metadata, image prompts, copy formula text |

**WEIGHT DISCIPLINE (new in v1.1, borrowed from Linear):**
- **Space Grotesk never exceeds 600.** No 700 anywhere. 600 is the "loud" end of this system.
- **DM Sans never exceeds 500.** 400 for reading, 500 for emphasis. No 600/700 DM Sans anywhere.
- This restraint is what separates "designed" from "default bold." Going heavier than these ceilings is a system violation, not a style choice.

**LETTER-SPACING SCALE (new in v1.1, borrowed from Linear):**

Tracking tightens as size increases, and relaxes to normal below 16px. This is a formula, not a one-off override.

| Size | Letter-spacing | Use |
|---|---|---|
| 30–32px | −0.8px | Creative Type name |
| 24–26px | −0.5px | CTR estimate number, CTR waterfall total |
| 18–20px | −0.3px | (reserved for future larger headings) |
| 14–16px | −0.1px | Generate button label, body emphasis |
| ≤13px | normal (0) | Body text, section content |
| Mono labels (9–11px) | +0.06em to +0.14em | Section labels, ALL CAPS metadata — mono fonts get WIDER tracking, not tighter, when uppercase |

**Size scale:**

| px | Use |
|---|---|
| 30px | Creative type name (Space Grotesk 600, −0.8px) |
| 24px | Estimated CTR number in creative type section (Space Grotesk 600, −0.5px) |
| 18px | CTR waterfall total (Space Grotesk 600, −0.5px) |
| 14px | Generate button label (Space Grotesk 600, −0.1px) |
| 13px | Body text — field inputs, section content |
| 12px | Secondary body — inside cards |
| 11px | JetBrains Mono — prompts, chips, step labels |
| 10px | JetBrains Mono — section title labels (ALL CAPS), metadata |
| 9px | JetBrains Mono — field sub-labels, reference card names |

**Rules:**
- Section title labels (e.g. "LAYOUT BRIEF", "COPY FORMULA") are always JetBrains Mono, 10px, amber colour, ALL CAPS, letter-spacing +0.1em.
- The Creative Type name is always Space Grotesk 600, 30px, −0.8px tracking, followed by a 2px amber underline block (36px wide).
- Copy formula text (headline, body, CTA) is always JetBrains Mono to signal "this is copy, not prose."
- Image prompt text is JetBrains Mono to signal "this is a prompt string, not prose."

### 4.3 Spacing and density

**Density:** DENSE. This is a work tool. (Unchanged from v1.0.)

**Named spacing scale (new in v1.1 — same values, now tokenised):**

| Token | Value | Use |
|---|---|---|
| `--space-xxs` | 4px | Micro gaps — chip internal padding |
| `--space-xs` | 6px | Tight gaps — icon-to-text |
| `--space-sm` | 8px | Row gaps, small element spacing |
| `--space-md` | 12px | Section gap (between cards), grid gaps |
| `--space-lg` | 14px | Card internal padding (vertical) |
| `--space-xl` | 16px | Card internal padding (horizontal), form inner gap |
| `--space-2xl` | 20px | Page outer padding |
| `--space-3xl` | 32px | Form section max-width context spacing |

| Location | Value |
|---|---|
| Page outer padding | `--space-2xl` (20px) sides |
| Section gap (between cards) | `--space-md` (12–14px) |
| Card internal padding | `--space-lg` `--space-xl` (14px 16px) |
| Form inner gap | `--space-xl` (16px) |
| Form section centred max-width | 520px |
| Row divider padding (within layout brief) | 6px 0 |

### 4.4 Shape language

**Rule (new in v1.1, borrowed from Linear): SHARP for structure, PILL for tags.**

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4px | Inputs, copy formula boxes, image prompt boxes |
| `--radius-md` | 5px | Buttons |
| `--radius-lg` | 6px | Section cards, reference creative cards |
| `--radius-pill` | 9999px | **All chips, badges, pills, intent selectors, CTR badges, "★ Most important" tag, ← New Brief button** |
| App outer | 10px | The outermost container only |

**The contrast is the point.** Section cards and inputs are sharp (4-6px) — they read as structure. Chips, badges, and pills are fully rounded — they read as tags/metadata. Never blur this line: a section card must never be pill-shaped, and a chip must never be sharp-cornered.

### 4.5 Elevation and depth

**CHANGED in v1.1 (borrowed from Linear): soft shadows replace flat borders as the primary depth signal.**

v1.0 used flat dark cards with visible borders for separation. On a light canvas, borders-only reads as flat and slightly cheap. Linear's light-mode equivalent of their dark "luminance stacking" is a soft, low-opacity shadow stack.

| Element | Treatment |
|---|---|
| Section card | `box-shadow: 0 1px 2px rgba(43,39,35,0.04), 0 1px 1px rgba(43,39,35,0.03)` + `1px solid var(--c-border)` |
| Reference creative card | Same as section card |
| Layout Brief card | Section card shadow + `border-left: 2px solid var(--c-amber)` |
| Input field (default) | `1px solid var(--c-border)`, no shadow |
| Input field (focus) | `1px solid var(--c-amber)` + `box-shadow: 0 0 0 3px rgba(186,138,60,0.12)` — **focus glow, new in v1.1** |
| Brief request card | `2px solid var(--c-amber)` top border + `1px solid var(--c-border)` elsewhere, no shadow (it's a header element, not a floating card) |

**Rule:** shadows are always soft, low-opacity, and warm-tinted (`rgba(43,39,35,...)` — using the text colour at low opacity, not pure black). Never use `rgba(0,0,0,...)` shadows — they read as cold/generic on a warm canvas.

### 4.6 Motion

**Philosophy:** FUNCTIONAL — motion confirms actions, never decorates. (Unchanged from v1.0.)

| Interaction | Duration | Easing | Notes |
|---|---|---|---|
| State 1 → 2 (form submits) | Instant | — | No animation, just swap |
| Loading bar fill | 1700ms | ease-out | From 0 to 95%. Completes on response. |
| Loading step text | 340ms intervals | — | Cycling text, no fade |
| State 2 → 3 (brief appears) | Instant | — | Full DOM swap, no stagger |
| State 3 → 1 (← New Brief) | Instant | — | |
| Button hover | 150ms | ease | opacity 0.9 |
| Intent chip select | 120ms | ease | background + border colour swap |
| Input focus | 150ms | ease | border colour + focus glow shadow fade in |

**No** staggered section entrances, no scroll reveals, no spring animations. The brief renders in full at once.

---

## 5. Section architecture

### 5.1 Section order (locked)

Unchanged from v1.0 — ordering reflects usage frequency, highest-use first.

| # | Section | Why this position |
|---|---|---|
| 01 | Creative Type | The verdict that anchors everything. Always first. |
| 02 | Image Gen Prompts | Highest daily use. Designer starts generating images while reading the rest. |
| 03 | Copy Formula | Second most used — headline / body / CTA often sent to designer first. |
| 04 | Layout Brief | The actionable spec. Amber border signals importance. |
| 05 | Reference Creatives | Visual reference, looked at before diving into analysis. |
| 06 | Include / Avoid | Guardrails — useful but not referenced every time. |
| 07 | CTR Score Waterfall | Deepest analysis. For curious managers. |

### 5.2 Section card spec

```
┌─────────────────────────────────────────────────────┐
│ [SECTION LABEL]                       [Copy button] │  ← 10px mono amber label, copy icon
├─────────────────────────────────────────────────────┤
│                                                     │
│  [Section content]                                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

- Background: `--c-surface` (`#FFFFFF`)
- Border: `1px solid --c-border`
- Shadow: `0 1px 2px rgba(43,39,35,0.04), 0 1px 1px rgba(43,39,35,0.03)`
- Border radius: 6px
- Padding: 14px 16px
- Section label: JetBrains Mono, 10px, amber, ALL CAPS, letter-spacing +0.1em
- Copy button: always visible (not hover-only), JetBrains Mono 11px, ti-copy icon + "copy" text, faint colour

**Exception:** Layout Brief card has an additional `border-left: 2px solid var(--c-amber)`.

### 5.3 Creative Type section

```
[FESTIVE / EVENT pill]  [Auto-detected · Diwali + ₹2K pill]

FESTIVE / EVENT                              ~4.6%
══════════                              Estimated CTR ±0.5%

One-sentence rationale in DM Sans 400, muted colour.
● Intent signal: "Diwali keyword + cashback ≥₹2,000..."
```

- Creative type name: Space Grotesk 600, 30px, −0.8px tracking, `--c-text`
- Amber underline: 36px wide, 2px tall, block element below the name
- CTR number: Space Grotesk 600, 24px, −0.5px tracking, `--c-green`
- CTR label: JetBrains Mono 10px, `--c-text-faint`
- Rationale: DM Sans 400, 12px, `--c-text-muted`, max 64ch
- Intent signal: JetBrains Mono 11px, `--c-text-faint`, with 5px blue dot
- Badges: pill-shaped (9999px), amber-soft and blue-soft backgrounds per Section 4.1

### 5.4 Image Gen Prompts section

Three tabs: GPT-4o · Gemini · Midjourney
- Active tab: underline in green (`--c-green`), text green
- Inactive tabs: text `--c-text-faint`
- Tab underline is 2px, not 1px
- Prompt text area: `--c-surface-3` background, `1px solid --c-border-subtle`, radius 4px, JetBrains Mono 11px, `--c-text-muted`, line-height 1.7
- Copy button: top-right of prompt area, always visible

Prompts must be differentiated by platform (see system prompt instructions). They are not variations of the same prompt.

### 5.5 Copy Formula section

Three boxes stacked: Headline / Body / CTA
Each box:
- Background: `--c-surface-3`, border `1px solid --c-border-subtle`, radius 4px
- Label: JetBrains Mono 9px, ALL CAPS, `--c-text-faint`
- Content: JetBrains Mono 12px (signals "this is copy-ready text")
- Headline + CTA: `--c-text`
- Body: amber-deepened (`#A8762E` — slightly darker than `--c-amber` for body-text contrast on the cream box) — the offer details are the money line
- CTA: `--c-blue`

"Copy all" button in section header copies all three fields as formatted plain text.

### 5.6 Layout Brief section

Five rows always present:

| Row label | Content type |
|---|---|
| Hero | Prose description of primary element + frame % |
| Card | Placement + approximate frame % |
| Background | Specific colour (#hex or description), NOT generic |
| Chips | Displayed as green pill chips (₹X Cashback, ₹0 Down, etc.) |
| Density | Text density guidance + urgency copy instruction |

Additional rows may appear for: Brand logo, Seasonal motif, etc.

Row dividers: `--c-border-subtle` (`#F0EBE3`), no bottom border on last row.
Key label: JetBrains Mono 9px, ALL CAPS, `--c-text-faint`, 80px min-width.

### 5.7 Reference Creatives section

5-card horizontal grid (equal columns).

Each card:
- Background `--c-surface`, border `1px solid --c-border`, radius 6px, same soft shadow as section cards
- Thumbnail: 52px tall, `--c-surface-2` placeholder background. In production renders actual PNG from `/public/creatives/`.
- CTR badge: absolute top-right of thumbnail, pill-shaped. Green badge for high performers, amber badge for category matches with lower CTR.
- Card name: JetBrains Mono 9px, `--c-text-faint`, below thumbnail
- Best match card: `1px solid var(--c-amber)` border

Footer note: "PNG thumbnails from /public/creatives/ · gold border = best match" — `--c-text-ghost`, 10px mono.

### 5.8 Include / Avoid section

Two-column grid (50/50) within the card.

Include column:
- Header: "✓ Include" in `--c-green`, JetBrains Mono 10px, ALL CAPS, +0.08em tracking
- Items: left border 2px green, `--c-green-soft` background, radius 4px, 4–6 items
- Each item 11px, `--c-text-muted`

Avoid column:
- Header: "✗ Avoid" in `--c-red`, JetBrains Mono 10px, ALL CAPS, +0.08em tracking
- Items: left border 2px red, `--c-red-soft` background, radius 4px, 3–5 items
- Each item 11px, `--c-text-muted`

On narrow viewports, columns stack vertically with a `--c-border-subtle` divider between.

### 5.9 CTR Score Waterfall section

Horizontal bar chart. NOT a table.

Each row:
- Label: JetBrains Mono 10px, 96px fixed width, `--c-text-faint` (baseline) or `--c-text` (lift rows)
- Bar: filled rectangle, radius 3px
  - Baseline bar: `--c-surface-2` (`#F0ECE5`), 80px wide
  - Positive lift bars: `--c-green-soft` at decreasing opacity (16%, 12%, 8%) and decreasing width proportional to lift value
- Value: JetBrains Mono 9px inside bar

Totals row:
- Thin `--c-border-subtle` divider above
- "~X.X%" in Space Grotesk 600, 18px, −0.5px tracking, `--c-green`
- "estimated" label in JetBrains Mono 10px, `--c-text-faint`

---

## 6. Brief request card (result screen header)

```
┌──────────────────────────────────────────────────────────────┐
│ (← New Brief)  │  Product:  Voltas AC — summer cooling        │
│                │  Offer:    ₹2,000 cashback + Zero Down       │
│                │  Context:  Diwali season, tier-2 cities      │
│                │  Intent:   Festive/Event (auto-detected)     │
│                                    [Festive/Event] [~4.6% CTR] │
└──────────────────────────────────────────────────────────────┘
```

**Spec:**
- Background: `--c-surface-2` (`#F3EFE9`)
- Top border: 2px solid `--c-amber`
- Bottom/side borders: `1px solid --c-border`
- No shadow (header element, not a floating card)
- Padding: 11px 20px
- Layout: flex row — "← New Brief" pill button + divider + 2×2 label/value grid + result badges (right-aligned)
- Label column: JetBrains Mono 9px, ALL CAPS, `--c-text-faint`, +0.06em tracking
- Value column: DM Sans 12px, `--c-text`
- ← New Brief button: pill-shaped (9999px), JetBrains Mono 11px, `--c-text-muted`, `1px solid --c-border`, `--c-bg` fill, left arrow icon
- Result badges (Creative Type + estimated CTR): pill-shaped, amber-soft and green-soft respectively — same badges as appear in the Creative Type section

The full input is always visible. Nothing is truncated.

---

## 7. Form design details

### Header bar
- Height: 46px
- Background: `--c-surface` (`#FFFFFF`)
- Bottom border: `--c-border`
- Left: amber dot + "BFL Creative Studio" (Space Grotesk 600, 13px, −0.2px tracking)
- Right: "Insta EMI Card · Marketing" (JetBrains Mono 11px, `--c-text-faint`)

### Form area
- Background: `--c-bg` (`#FAF8F4`)
- Centred content with max-width 520px
- Top: eyebrow label "CREATIVE INTELLIGENCE TOOL" (JetBrains Mono 11px, ALL CAPS, +0.12em, `--c-text-faint`)
- Heading: "Generate a creative brief" (Space Grotesk 600, 26px, −0.6px tracking, `--c-text`)
- Amber underline below heading: 36px wide, 2px tall
- Sub-copy: "Backed by 82 analysed Insta EMI Card creatives · Confound-corrected CTR data / Fill 4 fields. Get a production-ready brief in ~4 seconds." (DM Sans 400, 12px, two lines, `--c-text-faint`, centred)
- Gap between sub-copy and first field: 32px

### Intent chips
- Row of 5 pills: Auto-detect (default active), Card-Led, Product-Led, Offer-Led, Festive/Event
- Active chip: `--c-amber-soft` background + `1px solid var(--c-amber)` border, `--c-amber` text
- Inactive chip: `--c-surface` bg, `--c-border` border, `--c-text-faint` text
- All chips fully pill-shaped (9999px)
- Only one chip active at a time
- Font: JetBrains Mono 11px

### Input fields
- Background: `--c-surface` (`#FFFFFF`)
- Border: `1px solid --c-border` at rest
- Focus: `1px solid var(--c-amber)` + focus glow `box-shadow: 0 0 0 3px rgba(186,138,60,0.12)`
- Border radius: 5px (sharp — inputs are structure, not tags)
- Padding: 11px 14px
- Font: DM Sans 400, 13px
- Placeholder: `--c-text-ghost`
- Context textarea: min-height 72px, resize: none

### Generate button
- Background: `--c-amber`
- Text: `--c-surface` (`#FFFFFF`), Space Grotesk 600, 14px, −0.1px tracking
- Sparkles icon (ti-sparkles) before label
- Full width of form inner container
- Padding: 13px 28px
- Border radius: 5px (sharp — it's a primary action, not a tag)
- Hover: opacity 0.9, 150ms

---

## 8. What this app will never do

- Use a chat interface or conversational input
- Show a full-screen spinner (loading bar only)
- Use `--radius-lg` (6px) or larger on chips, badges, or pills — those are always 9999px
- Use 9999px radius on section cards, buttons, or inputs — those are always 4-6px
- Use gradient backgrounds
- Use purple as an accent colour
- Use pure black (`#000000`) shadows — shadows are always warm-tinted (`rgba(43,39,35,...)`)
- Use Space Grotesk above weight 600, or DM Sans above weight 500
- Show output sections in equal visual weight — section order = usage priority
- Truncate the brief request inputs on the result screen
- Hide copy buttons on hover — they are always visible
- Present the CTR waterfall as a table — it is always a horizontal bar chart
- Show Generic Cluster as a recommended creative type — it is not a valid type
- Apply positive letter-spacing to display headlines — tracking is always 0 or negative on Space Grotesk

---

## 9. Typography installation (Next.js)

Add to `app/layout.tsx`:

```typescript
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-custom',
})
```

Apply to `<html>` className: `${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`

In `globals.css`, add the full token set from Section 4.1, 4.3, and 4.4 as CSS custom properties on `:root`. Example:

```css
:root {
  /* Colour */
  --c-bg: #FAF8F4;
  --c-surface: #FFFFFF;
  --c-surface-2: #F3EFE9;
  --c-surface-3: #F7F4EF;
  --c-border: #E8E2D9;
  --c-border-subtle: #F0EBE3;
  --c-text: #2B2723;
  --c-text-muted: #6B655F;
  --c-text-faint: #A39C92;
  --c-text-ghost: #CCC4B8;
  --c-amber: #BA8A3C;
  --c-green: #1A8F4E;
  --c-red: #D9534F;
  --c-blue: #3568D4;

  /* Fonts */
  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --font-mono: var(--font-mono-custom);

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 5px;
  --radius-lg: 6px;
  --radius-pill: 9999px;

  /* Shadow */
  --shadow-card: 0 1px 2px rgba(43,39,35,0.04), 0 1px 1px rgba(43,39,35,0.03);
  --shadow-focus: 0 0 0 3px rgba(186,138,60,0.12);
}
```

---

## 10. Deferred to V2

- Section collapse/expand (for the analysis sections 06 and 07)
- Section reordering preference per user
- "Share brief" link generation
- Print / PDF export
- Brief history
- Dark mode toggle (light is the only theme in V1; dark spec from v1.0 is preserved as reference but not built)
- Mobile-optimised layout

---

*Design System v1.1 · Locked Jun 2026 · Owner: ST · Supersedes v1.0*
