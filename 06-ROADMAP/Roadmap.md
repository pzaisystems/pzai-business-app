# PZAI Business App — Roadmap

**Last Updated:** April 8, 2026
**Platform:** PWA (pivoted from native iOS — see PRD + 05-DECIDED-AGAINST)

---

## Now (April 2026)
- [x] Repo created
- [x] PRD drafted
- [x] PRD pivoted from native iOS to PWA
- [x] Feature ideas collected (April 6 + April 8 brainstorms)
- [x] PWA scaffold built (`web/`)
- [ ] Mack deploys `web/` to Vercel as `app.pzai.systems`

## Next (Phase 1 — MVP wiring)
- [ ] Wire `/api/review-pass/<slug>` to existing Flask service in `services/prospects/`
- [ ] Read freshness state from canonical JSON (`data/template-master/brand-variants/<slug>.json`)
- [ ] PWA install prompt + home screen icon polish
- [ ] Web Push subscription flow (real VAPID keys, push server endpoint)
- [ ] Replace SMS cron nudges with Web Push cron nudges (cost goes to ~$0/customer/month)

## Soon (Phase 2 — Update flows)
- [ ] Real menu update form writing to JSON state
- [ ] Real hours update form
- [ ] 86-the-dish quick action (long-press from dashboard)
- [ ] Voice update via phone mic → Opus parser → confirm tap
- [ ] Photo upload with brand-safety review status

## Later (Phase 3 — Status/visibility)
- [ ] Today's traffic snapshot card
- [ ] "Google AI Overview ready" badge (Decision #18 surfacing)
- [ ] AI agent traffic indicator (Decision #17 surfacing — gates on per-restaurant MCP)
- [ ] Freshness stamp 5-location toggle UI with live preview (Decision #15)

## Future (Phase 4-5)
- [ ] In-app chat with Alex (multilingual per Decision #14)
- [ ] Mood preset switcher
- [ ] Bilingual inline preview toggle
- [ ] Reservation FAB on/off (Decision #13)
- [ ] Customer feedback inbox
- [ ] Multi-seat management
- [ ] Billing / tier management
- [ ] Brain Network "ask another PZAI restaurant" button
- [ ] Refer-a-business program
