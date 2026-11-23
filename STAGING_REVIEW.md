# Staging review — Mommy Jai UGC & paid collaborations

Status: FOR REVIEW, NOT PRODUCTION. Branch: staging-ugc-paid-collabs. Version: 4.7 staging.

## Agreed positioning direction
- UGC Creator / Lifestyle Storyteller / Brand Collaborator.
- Primary: UGC assets for brand-owned channels; paid creator-published collaborations. Brand reuse and boosting rights separately agreed.
- Secondary: selective affiliate partnerships, product exchange and gifting.
- Pillars: food and dining; travel and experiences; mom and kids; beauty and lifestyle.

## Published campaign evidence assessed
- Gogi Marami Reel: https://www.facebook.com/share/v/1CPf53fCm5/ — published Mommy Jai Facebook Reel (video ID 1194472273011818) about family dining, Korean BBQ and venue storytelling in Angeles City, Pampanga.
- Gogi Marami post: https://www.facebook.com/share/p/1DcKsnskfS/ — separate published creator photo post about the same venue.
- Gogi was previously established as a hosted/product-exchange arrangement. Do not label it paid without a documented fee. No fabricated results, audience metrics or usage rights.
- Published Facebook photo supplies assets/gogi-marami-post.jpg, not generated stock photography.
- Nestlé Cerelac gifted PR photo post: https://www.facebook.com/share/p/1EKaABuwKb/ — Mommy Jai Facebook post acknowledging receipt of Cerelac goodies for baby Jared. Show as published gifted-PR work; do not imply an infant product demonstration, paid placement or verified results.
- M2 Veggie Drink Reel: https://www.facebook.com/share/r/1CqtszUZxQ/ — published Mommy Jai Facebook Reel (video ID 1872827670734858), positioning the drink as a Christmas gift idea for moms. Post credits M2 Lactation Club PR kit and Dear Mama PH collaboration. Do not represent it as paid without evidence.

## New engagements requiring verified public evidence
- Dental clinic UGC engagement: user confirmed, but approved sample, scope and publication permission outstanding.
- Paid agency collaboration: brand identity and approved creative sample not yet verified.
- Hair salon UGC: content sample and sharing permission not yet supplied.
- Focus pillars describe subject matter, not verified paid-case counts.

## Technical preservation
- Hero identity/portrait, ticker, Featured Work viewer, Brand Stories drawer, Formspree endpoint, mobile dock, consent, attribution and reduced motion are preserved.
- Seven selected campaigns remain: Bonakid paid sponsorship, Gogi hosted experience, and five other published product-exchange features. Eleven additional Brand Stories are now linked (9 TikTok, 2 Facebook).
- Card-facing content labels now prioritize niche / content format; paid, hosted and product-exchange arrangement facts are retained in campaign details. The Bonakid card signals its paid-campaign status.
- The Brand Stories drawer supports TikTok, Facebook posts and Facebook Reels, with an original-platform fallback link. Actual embedded playback is subject to each platform's restrictions.
- The second Gogi post opens independently; clicking the featured image opens the Reel viewer.

## V4.7 motion refinement — Soft Cinematic Editorial
- Retained hero portrait, original floating stickers, ambient glow, motion ticker, gallery layout, viewers, Brand Stories drawer and contact form.
- Added one-time sequenced hero-copy and portrait entrances; no new continual animations or third-party animation libraries.
- Standardized one-time scroll reveals for section headings, whole campaign cards, service cards, about copy, brand index and contact content, avoiding nested animated card links and repetitive replays.
- Replaced sweeping campaign-card shine with subtle photo hover zoom and a quiet lift on hover/focus; hover effects are pointer-capability aware.
- Added restrained CTA arrow microinteraction and featured viewer entrance; kept the pre-existing Brand Stories drawer behavior.
- Motion is progressive enhancement: without JS or IntersectionObserver/CSS translate support, content stays visible. Respect prefers-reduced-motion, including preference changes during a session.
- Performance: use CSS transforms/translate and opacity, one IntersectionObserver; no autoplay, heavy scroll handlers, added dependencies or forced parallax.
- Staging asset versions: styles.css?v=4.7.0-staging and script.js?v=1.9.0. Production remains unchanged.

## V4.7 QA — November 23, 2026
- Live staging response HTTP 200 with `styles.css?v=4.7.0-staging` and `script.js?v=1.9.0`; live production HTTP 200 without those staging versions.
- JavaScript parsed successfully and CSS delimiters balanced; browser loaded both assets.
- Tested headless Chrome desktop at 1440×900 and true mobile emulation at 390×844. Hero rendered at full opacity; no horizontal document overflow (desktop document/client width 1425px; mobile document/client width 390px).
- Confirmed hero entrance is active in default motion and absent in emulated `prefers-reduced-motion:reduce`. Reduced-motion mode left hero fully visible.
- Confirmed Featured Work viewer and Brand Stories drawer both open from their cards on desktop and mobile. Original Facebook link available from brand drawer.
- Staging images and editorial layout visually inspected at desktop and emulated mobile viewports.
- Remaining manual QA: real iPhone/Android testing and low-power performance; actual third-party embed playback under account restrictions; inquiry form delivery (do not submit a live inquiry for QA).
- Browser emulation and source checks do not guarantee all devices or network conditions behave identically.

## Before merging to production
1. Review desktop, iPhone and tablet layout, including the motion ticker.
2. Confirm Gogi image, relationship wording and permissions.
3. Add approved WhiteClover, salon and agency samples when available.
4. Remove staging noindex,nofollow robots meta from home and privacy before merging.
5. Revalidate Formspree success/failure, both viewers, keyboard navigation, images and external links.
6. Verify both new Facebook samples open in the Brand Stories drawer and their external fallback links work; validate desktop and mobile layout for the 11-item brand grid.
7. Review V4.7 entrance timing and CTA clarity on desktop/mobile, test in-page navigation, reduced-motion mode, keyboard focus and slow-loading images. Avoid promoting staging until real-device visual QA is complete.
