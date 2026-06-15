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
