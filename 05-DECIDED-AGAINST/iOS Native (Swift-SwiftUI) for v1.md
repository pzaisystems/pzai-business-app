# iOS Native (Swift / SwiftUI) for v1

**Decided:** April 8, 2026
**Status:** Parked, not killed forever

---

## What was originally proposed

Build the PZAI Business App as a native iOS app using Swift / SwiftUI, distributed via the Apple App Store. The original PRD (April 6, 2026) specified this platform.

## Why we pivoted to PWA instead

1. **Time to ship.** Native iOS requires Mack to learn Xcode, set up an Apple Developer account ($99/yr), build a Swift project from scratch, navigate App Store review (1-2 weeks per submission), and maintain a separate codebase. PWA ships in days using the HTML/CSS/JS stack Mack already codes daily via Yoda.

2. **Cron nudge cost.** Decision #15 / Rule 41 specifies cron-based proactive freshness nudges 3x/day. Over SMS via Twilio, that's roughly $0.72/customer/month — an unacceptable margin hit on the $99/mo tier as we scale. Web Push notifications (built into every modern browser, including iOS 16.4+ Safari) cost approximately $0/notification. The PWA isn't a nice-to-have for nudges; it's a margin-protection requirement.

3. **No platform tax.** Apple takes 15-30% of in-app purchases. If we ever sell add-ons, seats, or upgrades inside the app, native iOS hands a chunk of every transaction to Apple. PWA dodges this entirely.

4. **One codebase, every device.** Native iOS only reaches iPhone owners. PWA installs identically on iPhone (Safari → Add to Home Screen) and Android (Chrome → Install). One codebase, every customer.

5. **Home screen install is real on iOS.** With `display: standalone` in the manifest and an Apple touch icon, an installed PWA on iOS opens fullscreen with no Safari chrome. Owners genuinely cannot tell it apart from a native app at first glance.

6. **v1 needs nothing native.** The MVP feature set (text Alex, view dashboard, push notifications, freshness toggle, photo upload, voice input) all work in modern browsers. We are not blocked on any native API.

7. **Mack's constraint.** Mack hasn't learned Xcode and is busy delivering auto parts and running the rest of PZAI. Gating the entire owner-facing app on a learning curve he hasn't started would push v1 out by months for zero gain over PWA.

## When we revisit this

Native iOS becomes worth reconsidering at roughly **$99K/mo MRR**, OR if we hit a real platform limitation. Examples that would force a revisit:

- NFC tap-to-update (e.g. owner taps a phone to a printed menu to refresh it). PWA can't do NFC writes.
- Apple Pay subscriptions inside the app (vs. Stripe links in the PWA).
- Deep CarPlay or watchOS integration.
- Background location for footfall analytics.
- App Clips for instant-load discovery.

Until any of those become a real customer-blocking issue, PWA is the right tool.

## What this does NOT mean

- It does not mean we'll never build a native iOS app. It means v1 is PWA.
- It does not mean Android matters less than iPhone. PWA serves both equally — that's the point.
- It does not mean the PWA is a "lite" version. With Web Push, install-to-home-screen, offline caching, camera/mic access, and notifications, the PWA covers 100% of v1 needs.

## Pointer to the live plan

See the updated PRD: `02-PRD-AND-SPECS/Core-Docs/PRD.md` ("Why PWA, not Native iOS" section).
The PWA scaffold lives at `web/`.
