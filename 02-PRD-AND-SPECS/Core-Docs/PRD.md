# PZAI Business App — Product Requirements Document

**Last Updated:** April 6, 2026
**Status:** Pre-Development (collecting requirements)
**Platform:** iOS (Swift / SwiftUI)

---

## Vision

One app for business owners to manage their PZAI website. Text updates, voice updates, analytics, Google Maps stats — everything in one place.

## Target User

Small business owner in NJ. Not tech-savvy. Manages their business from their phone. Wants things to "just work."

## Core Principles

1. **Text-first** — the primary interaction is sending a text message. The app enhances this, doesn't replace it.
2. **Niche-specific** — a restaurant owner sees menu tools. A real estate agent sees listing tools. Not one-size-fits-all.
3. **Zero learning curve** — if you can text, you can use the app.

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
- DATA changes. Alex handles automatically.

**Customizations (limited):**
- Color changes, layout moves, font swaps, section reordering, new sections
- DESIGN changes. Require manual work.
- 7-day configuration window after site goes live (unlimited design tweaks)
- After 7 days: $5 per design change, or included on Growth
- Full redesign: new interview, rebuild from scratch (free once/year on Concierge, unlimited on Growth)

---

## Phases

### Phase 1 — MVP
- Send update requests (text + voice)
- View site analytics (visits, clicks, calls)
- See update history
- Push notifications for completed updates

### Phase 2
- Google Business Profile stats
- Photo upload with review status
- Voice-to-text updates
- Monthly report view
- Industry-specific dashboard

### Phase 3
- In-app chat with Alex
- Billing / tier management
- Multi-seat management
- Refer-a-business program
- Cross-channel conversation history

---

## Backend

- Existing VPS: 187.124.157.74:5050
- Alex AI: Opus (complex) → Gemma (simple) → Regex (trivial)
- Customer tracker: data/customer-tracker.json
- Niche schemas: data/niche-schemas.json
- Analytics: self-hosted Umami (planned)
