export const KNOWLEDGE_BASE = `

## BLOCK 01 — PRODUCT FACTS

Product: Bajaj Finserv Insta EMI Card
Issuer: Bajaj Finance Limited (BFL)
Type: Pre-approved EMI card (not a credit card)

### Core Features
- Loan limit: Up to ₹3,00,000 (show as ₹3 Lakh or ₹3,00,000 — always anchor this number)
- EMI tenure: 3 to 60 months (flexible)
- Annual fee: ZERO
- Down payment: ZERO
- Joining fee: ZERO
- Interest/hidden charges: None on the card itself (EMI interest applies per product)
- Approval: Instant — 100% digital, zero documents, seconds to approve
- Eligibility: Pre-approved offers — customer checks their limit via landing page

### Where It Works
- 1 Lakh+ partner stores (offline)
- 4,000+ cities across India
- Online: Amazon, Flipkart, and all major e-commerce platforms
- Also usable at: Lifestyle, Myntra, Ajio, Nykaa, Croma, and partner retailers

### Product Categories Covered
Smartphones, Laptops, Tablets, TVs, Air Conditioners, Washing Machines,
Refrigerators, Cameras, Wearables, Gaming consoles, Air Purifiers,
Furniture, and general electronics.

### Target Customer
Age 25–40, aspirational buyer, seeks EMI financing for big-ticket purchases.
Motivated by: zero upfront cost, flexible EMI, trusted brand (Bajaj).
Campaign channel: Meta (Facebook + Instagram).
Landing page goal: Check loan limit → Apply for card.

### Key Brand Anchors (always use these numbers/phrases)
- ₹3,00,000 loan limit (anchor number — always show)
- ₹0 Annual Fee (always show — strong differentiator)
- ₹0 Down Payment (always show for product-specific creatives)
- EMI starting from ₹X/month (specific number always beats vague "easy EMI")
- "Instant Approval" — 100% digital, zero documents

## BLOCK 02 — FEATURE INTELLIGENCE (Confound-Corrected CTR Lifts)

Portfolio baseline CTR: 1.83% (median static/carousel across 100 creatives)
Reach-weighted mean: 1.79% (depressed by high-reach carousels at 1.1–1.4% CTR)
Use 1.83% median as the benchmark — it is less sensitive to reach concentration.
All lifts below are vs this baseline.

### Positive Signals
| Feature                        | CTR Lift | Notes                                      |
|-------------------------------|----------|--------------------------------------------|
| Festive / BBD theme           | +2.21%   | Strongest single signal in portfolio       |
| Cashback ≥ ₹2,000             | +1.78%   | Non-linear jump — significantly beats ₹1K |
| Affordability messaging       | +1.73%   | Single-product context only (see note)     |
| Retailer partner logo visible | +1.62%   | Flipkart or Amazon prominently shown       |
| High text density (3+ elements)| +1.03%  | EMI audience reads offers — don't strip    |
| Card visible in creative      | +0.80%   | Critical on mobile formats                 |
| Loan limit ₹3L shown          | +0.53%   | Anchor number — always include             |
| Cashback ≥ ₹1,000             | +0.29%   | Standard offer — good but not enough alone |
| EMI/month shown (specific ₹)  | +0.26%   | Specific number beats vague "easy EMI"     |
| Lifestyle / person in scene   | +0.25%   | Best for appliance and TV categories       |

### Negative Signals
| Feature                        | CTR Drag | Notes                                      |
|-------------------------------|----------|--------------------------------------------|
| Mobile creative + no card shown| −1.48%  | Most costly mistake in portfolio           |
| Multi-product cluster format  | −1.23%   | Confirmed drag — not a proxy               |
| Niche category (watch/camera) | −0.80%   | Audience intent mismatch for this product  |

### Critical Confound Correction
Affordability messaging, aspiration triggers, and "Zero Annual Fee" as headline
ALL appeared negative in raw data. This was a cluster proxy — they appeared
overwhelmingly in multi-product cluster creatives which structurally underperform.
In single-product context: affordability messaging = +1.73% lift.
Never penalise affordability, aspiration, or Zero Annual Fee in single-product briefs.

### Archetype Benchmarks
| Archetype            | Reach-Weighted CTR | n  | Reach   |
|----------------------|--------------------|----|---------|
| Festive/Event        | 3.53%              | 6  | 4.1M    |
| Lifestyle            | 3.30%              | 5  | 6.7M    |
| Partner Co-branded   | 2.39%              | 6  | 51.5M   |
| Card Spotlight       | 1.81%              | 13 | 407M    |
| Product Moment       | 1.73%              | 61 | 1.05B   |
| Offer Highlight      | 1.73%              | 7  | 24.3M   |

Note: Lifestyle now outperforms Card Spotlight post-correction (Jun 2026
data refresh) — see docs/Phase2_Creative_Performance.md for methodology.

### High-Performance Combinations
- Festive × Cashback visible → 4.43% avg (n=6, most consistent combo)
- Card Hero × Dark theme → best retargeting format at scale
- Lifestyle × Appliance/TV category → strongest lifestyle use case
- Single product × Specific brand × Cashback → triple combo, high potential
- Card placement bottom-left → 2.97% vs bottom-right → 2.75% (test deliberately)

### Downstream Intent by Category
- HIGH: Card-hero creatives, card-only, specific mobile (iPhone / Samsung flagship)
- HIGH-MED: Laptop, tablet
- MEDIUM: Mobile generic, AC, white goods, TV
- MEDIUM-LOW: Electronics cluster
- LOW: Camera, smartwatch, air purifier

## BLOCK 03 — CREATIVE TYPE TAXONOMY

Six valid creative types for Insta EMI Card. Never create Generic Cluster.

---

### TYPE 1 — Card Spotlight
Card is the hero. No specific product. Benefits and loan limit are primary.
- When to use: Cold acquisition, retargeting, brand awareness
- Avg CTR: 1.81% (n=13, 407M reach — no longer the standout cold-acquisition
  format; Lifestyle and Festive now outperform it post-correction)
- Key elements: Card on podium or centre stage, ₹3L limit prominent,
  benefit chips (₹0 Annual Fee / ₹0 Down / EMI from ₹X), dark navy/black background
- Card placement: Centre stage (only format where card is centred)
- Tone: Confident. "Here's your financial tool."
- Top performers: Card on Center Stage (5.49%), Card Specific with Benefits (4.46%)

---

### TYPE 2 — Product Moment
One specific product is hero. Card is the enabler. EMI/month is the hook.
- When to use: Product launch, acquisition with clear product intent
- Avg CTR: 1.73% (n=61, 1.05B reach)
- Key elements: Single product occupies 60–70% of frame, card in bottom corner,
  ₹X/month shown, brand logo visible, ₹0 Down Payment badge
- Card placement: Bottom-left corner
- Tone: Aspirational + specific. "Own this. Here's how."
- Top performers: Samsung Phone with Card (4.63%), iPad Colours with Cards
  (3.60%), Google Pixel with Card (3.60%)

---

### TYPE 3 — Lifestyle / Aspiration
Person in a real home setting with the product. Emotional, relatable.
- When to use: Appliances, TV, AC — big-ticket home products
- Avg CTR: 3.30% (n=5, 6.7M reach — now the #2 archetype in the portfolio
  post-correction, ahead of Card Spotlight and Partner Co-branded)
- Key elements: Real home setting, person in scene interacting with product,
  product in natural context, card visible bottom-left
- Card placement: Bottom-left corner
- Tone: Warm, aspirational. "This is the life you can have."
- Top performers: LG AC sofa scene (Voltas AC Benefits), TV in Home with
  Card Benefits, Multiple Laptop Specific with Card

---

### TYPE 4 — Festive / Event
Seasonal energy is the creative wrapper. Offer is the hook. Product secondary.
- When to use: BBD, Diwali, Republic Day, any sale event, seasonal moment
- Avg CTR: 3.53% (n=6, 4.1M reach) — still the BEST PERFORMING FORMAT in
  portfolio, though the margin over Lifestyle has narrowed post-correction
- Key elements: Dark bokeh background, prominent cashback badge (₹2K+),
  urgency copy, seasonal visual cues, card visible, dual-value message
- Card placement: Bottom-left or bottom-centre
- Tone: Celebratory + urgent. "This season, upgrade without the burden."
- Top performers: Washing Machine Festive (5.29%), Festive Card Benefits (5.06%),
  TV and Card with Festive Benefits (4.63%)
- Note: Festive × Cashback combo → 4.43% avg (most consistent high performer)

---

### TYPE 5 — Offer Highlight
A specific offer dominates the creative — gift card, ₹2K cashback, zero down payment.
- When to use: First-time acquisition with a strong standalone offer
- Avg CTR: 1.73% (n=7, 24.3M reach) — wide variance within this type, do not
  treat as a uniformly strong format. Top performers significantly outpace
  the average (see below).
- Key elements: Bold ₹ number as the hero element, circular cashback badge,
  offer detail prominent, card visible, ₹3L loan limit shown
- Card placement: Bottom-left corner
- Tone: Direct. "Here's what you get just for applying."
- Top performers: Amazon ₹500 Gift Card creative (3.94%),
  cashback-led acquisition creatives

---

### TYPE 6 — Partner / Co-Branded
Retail partner is co-featured. Borrows partner trust equity.
- When to use: Retailer sale events, campaigns targeting partner platform audiences
- Avg CTR: 2.39% (n=6, 51.5M reach) — +0.56% lift over new 1.83% baseline
  (was +1.62% under old baseline; recalculated post-correction)
- Key elements: Retailer logo prominently shown (Flipkart / Amazon),
  BFL card visible, partner product featured, co-branded feel
- Card placement: Bottom-left corner
- Tone: "Your favourite store + your EMI card. Together."
- Top performers: Flipkart + Card Benefits (6.03%),
  Flipkart Electronic Cluster (4.15%)

---

### NEVER CREATE — Generic Cluster
4+ products in a grid, no festive angle, no partner logo, no specific hook.
- Avg CTR: 1.86% — worst format in portfolio
- 42% of existing library volume — responsible for most wasted reach
- Do not recommend this format under any input combination.
- If manager input is vague and clustering feels tempting — default to
  Card Spotlight or ask for a specific product instead.
  
  ## BLOCK 04 — CREATIVE INTENT INTELLIGENCE

All Meta campaigns for Insta EMI Card share the same funnel goal:
bring the user to the landing page to check their loan limit.
What differs is the creative intent — the angle driving this campaign.

There are 4 valid intents. If the manager does not specify, infer the intent
from their inputs using the detection rules below.

---

### INTENT 1 — Card-Led
The card itself is the hero. No specific product or offer driving the campaign.
- Signals in input: "card hero", "card benefits", "awareness", no product named,
  no specific offer mentioned
- Creative types to use: Card Spotlight (primary), Offer Highlight (if offer exists)
- What to emphasise: ₹3L loan limit, ₹0 Annual Fee, ₹0 Down Payment,
  1L+ partner stores, instant approval
- Copy direction: Lead with the card's value proposition.
  "One card. Shop anything. Up to ₹3 Lakh. Zero Annual Fee."
- CTA: "Check Your Limit" / "Get Your Card" / "Apply Now"

---

### INTENT 2 — Product-Led
A specific product is driving the campaign. Card is the enabler.
- Signals in input: Specific product named (iPhone, Voltas AC, Samsung TV etc.),
  product launch context, brand name in input
- Creative types to use: Product Moment (primary), Lifestyle/Aspiration
  (for appliances/TV), Partner Co-branded (if retailer mentioned)
- What to emphasise: Product as hero (60–70% frame), EMI/month (specific ₹),
  ₹0 Down Payment, brand logo, card bottom-left
- Copy direction: Product first, EMI second.
  "OnePlus 15 is here. EMI starting ₹6,636/month. Zero Down Payment."
- CTA: "Shop Now" / "Get It on Easy EMI" / "Buy Today"

---

### INTENT 3 — Offer-Led
A specific offer is the hook. The deal itself drives clicks.
- Signals in input: Cashback amount mentioned (₹1,000 / ₹2,000 / gift card),
  "offer" or "deal" in context, first transaction cashback
- Creative types to use: Offer Highlight (primary), Partner Co-branded
  (if offer is retailer-specific)
- What to emphasise: ₹ number as the hero, cashback badge prominent,
  ₹3L loan limit secondary, card visible
- Cashback threshold rule: ₹2,000+ significantly outperforms ₹1,000.
  If offer is ≥₹2,000 always make it the dominant visual element.
- Copy direction: Lead with the offer.
  "₹2,000 Cashback on your first purchase. Apply now."
- CTA: "Claim Cashback" / "Avail Offer" / "Apply Now"

---

### INTENT 4 — Festive / Event
A seasonal moment or sale event is the creative wrapper.
- Signals in input: BBD, Diwali, Republic Day, Independence Day, "festive",
  "sale season", "season", any named sale event
- Creative types to use: Festive/Event (always primary), Partner Co-branded
  (if a retailer sale is running simultaneously)
- What to emphasise: Seasonal visual energy mandatory (dark bokeh background,
  festive cues), cashback badge (₹2,000+ strongly preferred), urgency copy,
  dual value (season + card benefit)
- Copy direction: Season first, offer second.
  "Big Billion Days are here. Shop with Insta EMI Card. ₹2,000 Cashback."
- CTA: "Shop Now" / "Avail Offer" / "Get the Deal"

---

### Auto-Detection Rules (when manager does not specify intent)
Apply in this order — first match wins:

1. Any sale event / seasonal keyword in input → FESTIVE/EVENT
2. Cashback or gift card amount mentioned, no specific product → OFFER-LED
3. Specific product or brand named in input → PRODUCT-LED
4. No product, no offer, no seasonal context → CARD-LED

When auto-detecting, declare the detected intent in your output and explain
the signal that triggered it in one sentence.

## BLOCK 05 — CREATIVE DESIGN SYSTEM

A Meta ad has 1–2 seconds to stop a scroll.
The creative must work as a whole visual system — not a checklist of components.
Think: What does the eye land on first? Where does it go next? What does the
person feel before they read a single word?

---

### THE THREE-LAYER MODEL
Every creative has three visual layers. Design all three intentionally.

LAYER 1 — STOP (0–0.5 seconds)
The one element that arrests the scroll. Should be immediately legible at thumb
size. Only one thing can be Layer 1 — if everything competes, nothing wins.
  → Card Spotlight: the card itself
  → Product Moment: the product (60–70% of frame)
  → Festive: the cashback number or seasonal energy
  → Offer Highlight: the ₹ number
  → Lifestyle: the person / emotional scene

LAYER 2 — HOLD (0.5–2 seconds)
The supporting information that converts interest into intent.
Benefit chips, EMI/month, ₹3L limit, brand logo, card (if not Layer 1).
Must be readable at mobile size. 3+ elements = +1.03% CTR lift (data-backed).

LAYER 3 — ACT
The CTA. Should be obvious but not competing with Layer 1.
Never the most visually dominant element — it's a confirmation, not a shout.

Design rule: If you can't identify which layer each element belongs to,
the creative is not designed — it is assembled.

---

### WHAT WE KNOW — DATA-LOCKED RULES
These are non-negotiable. Derived from the original 82-creative
Phase 1 baseline; feature lifts below are NOT recalculated with Phase 2
data and should be treated as directional for Phase 2-only creative types.

Card visibility
  → Card must be visible in every creative — no exceptions
  → Mobile creative + no card = −1.48% CTR (most costly mistake in portfolio)
  → Card Spotlight: centre stage, 40–60% of frame
  → All other types: bottom-left corner, ~20% of frame
  → Bottom-left (2.97%) outperforms bottom-right (2.75%) — default to left

Text density
  → Minimum 3 benefit elements visible — always
  → EMI audience reads offers. Information density is a positive signal.
  → Specific ₹ numbers always outperform vague language ("₹1,999/month" > "Easy EMI")

Cashback display
  → Cashback ≥ ₹2,000: hero element — circular badge, bold, above the fold
  → Cashback ₹1,000–₹1,999: prominent but secondary
  → Cashback < ₹1,000: chip only — do not hero it
  → No cashback: lead with ₹0 Annual Fee and ₹3L limit — do not fabricate an offer

Background (locked for specific types)
  → Card Spotlight: dark navy or black — no exceptions
  → Festive/Event: dark bokeh — mandatory
  → Lifestyle: real home setting — not a studio backdrop

---

### VISUAL DESIGN — PRINCIPLES + EXPERIMENT SPACE

The rules below are organised as:
  [LOCKED] — data-backed, do not deviate
  [DEFAULT] — current best practice, test before changing
  [EXPERIMENT] — no data yet, worth testing deliberately

── COLOR ──

[LOCKED]    Dark background for Card Spotlight and Festive formats
[LOCKED]    Light/contextual background for Lifestyle (appliances, home products)
[DEFAULT]   Dark or gradient background for electronics/smartphones — product pops better
[DEFAULT]   Warm cream/white for AC and appliance Product Moment formats
[EXPERIMENT] Cool blue-white for AC (temperature association — "cool/cold" colour psychology)
[EXPERIMENT] Warm amber/gold for festive formats as an alternative to dark bokeh
[EXPERIMENT] High-contrast colour blocking (split background — dark left, light right)
             — untested in this portfolio, strong signal in global fintech ad benchmarks

── TYPOGRAPHY AS A VISUAL ELEMENT ──

[LOCKED]    Specific ₹ number must be large enough to read at mobile size without zoom
[DEFAULT]   Headline weight: bold. Body/chip text: medium.
[EXPERIMENT] Oversized EMI number as the visual hero (e.g., "₹1,999" at 80–100px)
             — number itself becomes the scroll-stopper instead of product image
[EXPERIMENT] Contrast typography: thin headline + ultra-bold ₹ number
             — creates visual tension that draws the eye

── PRODUCT PHOTOGRAPHY STYLE ──

[DEFAULT]   Product cutout on coloured/gradient background (current dominant approach)
[DEFAULT]   Lifestyle: real person + real setting (sofa, home, outdoors)
[EXPERIMENT] 3D rendered product with soft shadow — premium feel, untested in this portfolio
[EXPERIMENT] Product with motion blur or speed lines — signals aspiration/upgrade
[EXPERIMENT] Flat-lay product (top-down, clean surface) — works in D2C, untested here

── VISUAL WEIGHT AND BALANCE ──

[DEFAULT]   Product/hero: 60–70% of frame
            Card: 20% of frame (bottom-left)
            Chips/text: remaining space
[EXPERIMENT] Asymmetric layouts — product pushed left, large text right
             — breaks grid = stops scroll, tested in global social ads

── NEGATIVE SPACE ──

[DEFAULT]   Dense — 3+ elements, fills the frame
[EXPERIMENT] Intentional breathing room around the hero element
             — premium signal, may trade density lift for perceived brand quality
             — test for iPhone/flagship phone formats specifically

---

### SEASONAL / THEMATIC COLOUR SIGNALS
Directional only — not data-backed from this portfolio. Use as starting point.

Summer (AC / cooling)    → Cool whites, sky blues, clean light — "relief" feeling
Monsoon (appliances)     → Warm indoor tones, cosy — "comfort in chaos"
Festive (BBD / Diwali)   → Dark background + gold/orange accents — locked formula
Winter (TV / home)       → Deep warm tones, amber, living room feel
Republic Day / Sale      → Blue + white + bold red — patriotic palette, safe choice

---

### LAYOUT BRIEF STANDARD
Every brief must specify all of the following. No vague instructions.

  Layer 1 element      → What is the scroll-stopper? What % of frame?
  Layer 2 elements     → List all 3+ benefit chips with exact ₹ values
  Card placement       → Position + approximate size
  Background           → Colour / texture / mood — specific, not "dark" or "light"
  Brand logo placement → BFL top-right. Partner logo if applicable.
  Typography note      → Any specific size/weight direction for key number
  Colour direction     → LOCKED / DEFAULT / EXPERIMENT — flag which rules apply
  One thing to test    → Every brief should suggest one EXPERIMENT element
                         so the creative library builds evidence over time

---

### THE TEST PROTOCOL
When recommending an EXPERIMENT element, always specify:
  → What you're testing (the variable)
  → What the control is (current DEFAULT)
  → What metric to watch (CTR at minimum, downstream quality if trackable)
  → Minimum reach before reading the result (suggest 500K+ impressions)

This turns every new creative into a data point, not just an execution.

`;
