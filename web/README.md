# PZAI Business — PWA Scaffold

This is the deployable PWA scaffold for the owner-facing PZAI Business app. Pure vanilla HTML/CSS/JS — no build step, no framework.

## Files

- `index.html` — main dashboard. Freshness indicator + giant "Everything's Good" button + quick action grid + status badges.
- `manifest.json` — PWA manifest (name, icons, display: standalone, shortcuts).
- `service-worker.js` — offline-first shell caching + push notification scaffold (VAPID key is a placeholder).
- `style.css` — warm restaurant-owner palette, big tap targets (56px+), Inter font.
- `app.js` — service worker registration, install prompt, "Everything's Good" handler, push permission flow, URL action handling.
- `pages/menu.html` — placeholder menu update form.
- `pages/hours.html` — placeholder hours update form.
- `pages/traffic.html` — placeholder traffic snapshot.
- `icons/icon-192.png`, `icons/icon-512.png` — placeholder solid-color icons (replace with real brand icons before launch).

## What works right now

- Opens in any browser. Mobile-first.
- Service worker registers and caches the shell.
- Manifest is valid for PWA install (Add to Home Screen on iOS Safari and Android Chrome).
- "Everything's Good" button optimistically updates the UI, fires a placeholder POST to `/api/review-pass/<slug>`, and shows a confirmation toast.
- First click of the killer button asks for push notification permission.
- URL shortcuts work: `/?action=review-pass` triggers the review-pass automatically (used by PWA shortcuts and push notification action buttons).

## What's a placeholder

- `/api/review-pass/<slug>` endpoint — needs to be wired into the existing Flask service in `services/prospects/`.
- VAPID public key — replace `REPLACE_ME_WITH_REAL_VAPID_PUBLIC_KEY` in `app.js` and `service-worker.js`.
- Customer slug — currently hardcoded to `demo-restaurant`. Phase 1 will load it from auth/session.
- Icon PNGs — solid brand-color squares. Replace with the real PZAI mark.
- Freshness data — hardcoded to "all green." Phase 1 will load real values from the canonical JSON state.

## Deploying

Mack handles the Vercel side. The whole `web/` folder is the deploy root — drag and drop or `vercel --prod` from inside this directory.

## Why PWA, not native iOS

See `../02-PRD-AND-SPECS/Core-Docs/PRD.md` ("Why PWA, not Native iOS") and `../05-DECIDED-AGAINST/iOS Native (Swift-SwiftUI) for v1.md`.
