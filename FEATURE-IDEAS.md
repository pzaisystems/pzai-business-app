# Feature Ideas — Drop Zone

Mack adds ideas here anytime. Yoda builds them when capacity allows.

---

## From April 6, 2026

- [ ] Voice input for updates — talk into the app, it sends the update to Alex
- [ ] Google Business Profile stats — show search impressions, clicks, direction requests
- [ ] Site analytics dashboard — visits, referrers, devices, AI search traffic
- [ ] Monthly auto-report — text or email with this month's stats
- [ ] Photo upload with "reviewing for brand safety" status indicator
- [ ] Industry-specific update forms (restaurant menu editor, real estate listing manager)
- [ ] Update history timeline — see every change Alex made to the site
- [ ] Push notification when update is complete ("Your hours have been updated!")

## From April 6, 2026 (afternoon)

- [ ] Cross-channel tracking — link phone, Messenger ID, Telegram ID, WhatsApp to one customer account
- [ ] Multi-seat support — multiple managers per business ($10 one-time per additional seat)
- [ ] Recommend primary channel at onboarding — "pick your favorite, but we'll know you on any"
- [ ] Unified conversation thread — all channels feed into one history per customer
- [ ] Facebook Messenger as communication channel (194M US users)

## From April 8, 2026 (Yoda subagent brainstorm)

Grounded in tonight's locked decisions (#15 freshness stamps, #16 JSON-state-is-the-product, #17 per-restaurant MCP, #18 JSON-LD/llms.txt freebie) and CLAUDE.md Rule 41.

- [ ] **One-tap "Everything's Good" button** — KILLER FEATURE. Giant button on the home dashboard. Tapping it triggers the review-pass workflow: every text-updateable item gets its `_updated_at` stamped to NOW. Replaces the SMS "all good" reply. Owner can refresh the entire site's freshness in <1 second while walking through the kitchen.
- [ ] **Freshness traffic light at the top of the dashboard** — green / yellow / red dot showing OLDEST per-item effective freshness across the whole site. Tap it to drill into which specific items are stalest. Glanceable from a kitchen counter.
- [ ] **86-the-dish quick action** — long-press or swipe on any menu item from the home dashboard → "86 this dish" → instantly hides it from the live site and stamps a freshness update. No typing, no Alex round-trip. Un-86 the same way.
- [ ] **Manual review-pass trigger with item-by-item swipe-through** — alternative to one-tap. Owner sees stalest items one at a time, swipes right = "still good, restamp," swipes left = "needs update, type or voice me the new value." Tinder-for-menu-items UX.
- [ ] **Web Push cron nudges (replaces SMS nudges)** — same 3x/day cron schedule as the SMS nudges, but delivered via Web Push to the installed PWA. Drops nudge cost from ~$0.72/customer/month to ~$0/month. Owner taps the notification → opens straight to the review-pass flow.
- [ ] **Freshness stamp toggle UI (5-location switcher)** — visual settings screen showing the 5 toggleable freshness-stamp locations from Decision #15 (hero, menu items, daily specials, events, hours bar). Each is a switch. Live preview pane shows the site with stamps on/off so the owner sees exactly what their visitors will see.
- [ ] **Mood preset switcher** — tied to the existing customize page. Owner picks "Tonight feels like: cozy / energetic / romantic / family-friendly" and the site's color/texture overlay shifts in seconds. Useful for restaurants that change vibe between brunch and dinner.
- [ ] **Bilingual inline preview toggle** — Decision #14. Owner taps a flag icon → the in-app site preview switches between primary and secondary language so they can verify Italian/Spanish copy without leaving the app.
- [ ] **Voice update via phone mic** — owner taps a mic button, says "tonight's special is osso buco for thirty-two dollars," Opus parses it, app shows the proposed change with a confirm tap. Walking-through-the-kitchen UX.
- [ ] **Quick photo upload for menu items** — tap a dish → camera opens → snap photo → auto-uploads, gets brand-safety reviewed, replaces the live photo. Owner can update plated dishes the moment they're ready.
- [ ] **Today's traffic snapshot card** — small card on the home dashboard showing today's visits, phone-tap-to-call count, "Get Directions" taps, and AI-search impressions. No deep analytics — just "did people visit today, yes/no/how many."
- [ ] **AI agent traffic indicator (Decision #17 surfacing)** — once the per-restaurant MCP server is live, show a small badge: "12 AI agents queried your menu today." Makes the owner feel the future is real and justifies the $99/mo.
- [ ] **"Google AI Overview ready" badge (Decision #18 surfacing)** — green checkmark on the dashboard confirming JSON-LD + llms.txt are valid and being served. Tap it for a one-line explainer ("ChatGPT, Perplexity, and Google's AI can read your menu correctly"). Visible proof of an invisible feature.
- [ ] **Customer feedback inbox** — texts that come into the Twilio number that AREN'T update requests (compliments, complaints, questions) get bucketed into an inbox tab. Owner can read and reply from inside the app. Keeps Alex focused on updates.
- [ ] **"Refresh Now" big-button shortcut** — distinct from "Everything's Good." This one re-runs the full site render pipeline (rebuild HTML from JSON state, redeploy). For when the owner has manually edited multiple items and wants the live site to reflect everything immediately.
- [ ] **Multi-language Alex chat** — Decision #14. Italian-speaking owner taps the in-app chat with Alex and Alex replies in Italian. Same Opus backend, language preference stored on the customer record.
- [ ] **Reservation FAB toggle (Decision #13)** — single switch on the home screen: "Accept reservations: ON / OFF." Flips the floating action button on the live site. Owner can pause reservations during a kitchen fire without calling anyone.
- [ ] **Daily-special expiration timer** — when adding a special, optionally set "expires at: tomorrow 10am." Item auto-86s itself when the timer hits, freshness stamp restamps. Prevents stale "today's special" from yesterday haunting the site.
- [ ] **Brain Network "ask another PZAI restaurant" button** — H2 feature. Owner can post a question ("anyone else struggling with vendor X?") that broadcasts to the opted-in Brain Network. Builds the network effect that locks them in.
- [ ] **Stale-item dead-man-switch warning** — if no review-pass has been confirmed in 5+ days, the home dashboard turns red and a banner appears: "Your site is going stale. Visitors will notice. Tap to refresh." The cost of NOT using the app, made visible.

