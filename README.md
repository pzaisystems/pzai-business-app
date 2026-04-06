# PZAI Business App

**Client-facing mobile app for PZAI Systems customers.**

## What It Does

This is the companion app for businesses using PZAI's website management service. Customers can manage their website, view analytics, and communicate with PZAI — all from their phone.

## Communication Channels

1. **Text (SMS)** — primary, already live
2. **WhatsApp** — planned
3. **Telegram** — planned
4. **In-App** — this app

All channels funnel into the same Alex AI backend.

## Planned Features

### MVP (Phase 1)
- [ ] Send update requests (text + voice input)
- [ ] View site analytics (visits, clicks, calls, directions)
- [ ] See update history (what was changed and when)
- [ ] Push notifications for completed updates

### Phase 2
- [ ] Google Business Profile stats integration
- [ ] Photo upload for site updates (with review status)
- [ ] Voice-to-text updates ("change my hours to 9 to 5")
- [ ] Monthly report view (visits, engagement, AI search impressions)

### Phase 3
- [ ] In-app chat with Alex
- [ ] Industry-specific dashboard (restaurant sees menu editor, real estate sees listings)
- [ ] Billing / tier management
- [ ] Refer-a-business program

## Tech Stack

- **Platform:** iOS (Swift / SwiftUI)
- **Backend:** Existing VPS infrastructure (Flask webhook at 187.124.157.74:5050)
- **AI:** Alex (Opus for complex, Gemma for simple updates)
- **Analytics:** Self-hosted Umami or Plausible on VPS

## Feature Requests

Mack drops feature ideas here. Yoda builds them when time allows. Not a priority — built slowly, little by little.

---

*PZAI Systems — AI-powered website management*
