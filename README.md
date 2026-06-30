# BFL Creative Studio

Internal tool for Bajaj Finserv's Insta EMI Card team. Campaign manager describes a campaign in plain English → single Anthropic API call with 5 winning reference creatives as vision inputs → production-ready 9-zone designer brief.

## What it does

- Routes the campaign description to one of 9 scenario templates based on product, intent, and season
- Sends 5 curated reference PNGs as base64 vision blocks to Claude
- Claude synthesises a brief from visual evidence + reach-weighted CTR data (not generic knowledge)
- Outputs a 9-zone brief: base creative, keep/change synthesis, component spec, copy pack, A/B experiment, image prompts, CTR signal analysis

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 App Router, TypeScript |
| Styling | Tailwind CSS with CSS custom properties |
| AI | Anthropic `claude-sonnet-4-6`, single call per brief, `max_tokens: 8192` |
| Vision | PNGs read as base64 via `fs.readFileSync` (server-side only) |
| Fonts | Space Grotesk, DM Sans, JetBrains Mono |
| Hosting | Vercel |

## Creative library

- **100 creatives** across 6 archetypes (Festive, Lifestyle, Partner Co-branded, Card Spotlight, Product Moment, Offer Highlight)
- **Baseline CTR: 1.83%** (reach-weighted median, 100 static/carousel creatives)
- Data source: Meta campaign performance, confound-corrected for cluster proxy effects
- Phase 2 merge completed 30 Jun 2026 — see `docs/Phase2_Creative_Performance.md`

## Running locally

```bash
# Install dependencies
npm install

# Add your Anthropic API key
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Must pass 0 TypeScript errors. See `CLAUDE.md` for the full engineering contract.
