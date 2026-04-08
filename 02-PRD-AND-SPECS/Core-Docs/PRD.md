# PZAI Business App — Product Requirements Document

**Last Updated:** April 8, 2026
**Status:** Pre-Development → Scaffold in progress
**Platform:** PWA (HTML/CSS/JS, deployable as static site to Vercel)

---

## Vision

One installable web app for business owners to manage their PZAI website. Text updates, voice updates, analytics, Google Maps stats, and the **one-tap "Everything's Good" review-pass** — everything in one place, on the home screen of their phone, no app store required.

## Target User

Small business owner in NJ (initially Hoboken restaurants). Not tech-savvy. Manages their business from their phone. Wants things to "just work." Walks through a kitchen one-handed.

## Core Principles

1. **Text-first, app-enhanced** — the primary interaction is still SMS via Twilio. The PWA enhances it with one-tap actions, push notifications, and visual previews. It does not replace the SMS channel — owners can use either.
2. **Niche-specific** — a restaurant owner sees menu tools. A real estate agent sees listing tools. Not one-size-fits-all.
3. **Zero learning curve** — if you can text, you can use the app. The home screen has ONE giant button.
4. **Glanceable** — every important status (freshness, traffic, AI-readiness) is visible from across a kitchen.

---

## Why PWA, not Native iOS

The original PRD specified iOS Swift / SwiftUI. We pivoted to PWA on April 8, 2026 for these reasons:

- **Ships in days, not months** — no Xcode, no Apple Developer account ($99/yr), no app store review cycle (1-2 weeks). Mack hasn't learned Xcode and shouldn't have to before we ship v1.
- **Cost-killer for cron nudges** — Web Push notifications are free. SMS nudges 3x/day cost ~$0.72/customer/month at scale. PWA push drops that to ~$0/customer/month, which protects margin on the $99/mo tier.
- **No platform tax** — Apple/Google take 15-30% of in-app purchases. PWA dodges this entirely. Critical if we ever sell add-ons inside the app.
- **One codebase, every device** — same PWA installs on iPhone AND Android. No duplicate native builds.
- **Home screen install is real** — iOS Safari and Android Chrome both support `display: standalone`. The PWA opens fullscreen with no browser chrome and looks like a native app. Owners won't know the difference.
- **Mack already codes the stack** — HTML/CSS/JS via Yoda. Same workflow as the niche pages and templates. Zero new tooling.
- **v1 needs are web-compatible** — text Alex, view dashboard, push notifications, freshness toggle, photo upload. None of these need native APIs that PWAs lack.

Native iOS is **not killed forever** — it's parked. If we hit $99K/mo MRR and run into a real platform limitation (e.g., NFC tap-to-update, Apple Pay subscriptions, deep CarPlay integration), we revisit. Until then, PWA wins on every dimension that matters.

See: `05-DECIDED-AGAINST/iOS Native (Swift-SwiftUI) for v1.md`.

---

## Pricing Context

- Free tier: 3 updates, 1 seat
- Concierge ($49/mo): unlimited updates, 1 seat
- Growth ($99/mo): upsell inside Concierge funnel, includes Google Maps, analytics, 3 seats
- Additional seats: $49 one-time, max 3

---

## Update vs Customization Rules

**Updates (unlimited on Concierge/Growth):**
- Hours, phone, address, specials, menu items, announcements, photos, social links
- DATA changes. Alex handles automatically. The app reads/writes the same canonical JSON state Alex uses (Decision #16).

**Customizations (limited):**
- Color changes, layout moves, font swaps, section reordering, new sections
- DESIGN changes. Require manual work.
- 7-day configuration window after site goes live (unlimited design tweaks)
- After 7 days: $5 per design change, or included on Growth
- Full redesign: new interview, rebuild from scratch (free once/year on Concierge, unlimited on Growth)

---

## The Killer Feature: One-Tap Review-Pass

The home screen of the PWA is dominated by ONE giant button: **"✓ Everything's Good."**

When the owner taps it:
1. App POSTs to `/api/review-pass/<slug>`
2. Backend reads `data/template-master/brand-variants/<slug>.json`
3. Every text-updateable item's `_updated_at` field gets stamped to NOW
4. Site re-renders, freshness stamps refresh on every item
5. App shows a checkmark animation: "Everything refreshed — your visitors will see fresh timestamps."

This replaces the SMS reply "all good" that the cron nudges currently solicit. It's the difference between typing two words on a tiny keyboard while driving and tapping one giant button while walking through the kitchen.

Per CLAUDE.md Rule 41, the freshness stamp is the customer-trust mechanism. Re-confirming an unchanged item still restamps it — the owner doesn't have to lie or skip. They just confirm "yes still accurate" with one tap.

---

## Phases

### Phase 0 — Scaffold (April 2026, this week)
- [x] PWA skeleton (`web/index.html`, `manifest.json`, `service-worker.js`, `style.css`, `app.js`)
- [x] Home dashboard with freshness indicator + one-tap "Everything's Good" button (placeholder backend)
- [x] Page stubs: menu update, hours update, traffic stats
- [ ] Deploy to `app.pzai.systems` (Vercel) — Mack handles Vercel side

### Phase 1 — MVP (real backend wiring)
- [ ] Wire `/api/review-pass/<slug>` to the existing Flask service in `services/prospects/`
- [ ] Read freshness state from `data/template-master/brand-variants/<slug>.json`
- [ ] PWA install prompt + home screen icon
- [ ] Web Push subscription flow (VAPID keys, push server endpoint)
- [ ] Web Push cron nudges replacing the SMS nudges (3x/day from existing cron)

### Phase 2 — Update flows
- [ ] Real menu update form writing to the JSON state
- [ ] Real hours update form
- [ ] 86-the-dish quick action (long-press from dashboard)
- [ ] Voice update via phone mic → Opus parser → confirm tap
- [ ] Photo upload with brand-safety review status

### Phase 3 — Visibility / status
- [ ] Today's traffic snapshot card (visits, calls, directions, AI impressions)
- [ ] "Google AI Overview ready" badge (Decision #18 surfacing)
- [ ] AI agent traffic indicator (Decision #17 surfacing — gates on per-restaurant MCP server)
- [ ] Freshness stamp 5-location toggle UI with live preview (Decision #15)

### Phase 4 — Polish + niche
- [ ] In-app chat with Alex (text + voice, multilingual per Decision #14)
- [ ] Mood preset switcher (tied to customize page)
- [ ] Bilingual inline preview toggle
- [ ] Reservation FAB on/off (Decision #13)
- [ ] Customer feedback inbox

### Phase 5 — Network / billing
- [ ] Multi-seat management
- [ ] Billing / tier management
- [ ] Brain Network "ask another PZAI restaurant" button
- [ ] Refer-a-business program

---

## Backend

- Existing VPS Flask service: `services/prospects/` (port 5050)
- Alex AI: Opus (any customer-facing text per Rule 34) → Gemma (internal scoring) → Regex (trivial)
- Canonical state: `data/template-master/brand-variants/<slug>.json` (Decision #16)
- Customer tracker: `data/customer-tracker.json`
- Niche schemas: `data/niche-schemas.json`
- Per-restaurant MCP: H2 2026 (Decision #17)
- Analytics: self-hosted Umami (planned)
- Push server: VAPID + web-push library, runs alongside the existing Flask service (Phase 1)
