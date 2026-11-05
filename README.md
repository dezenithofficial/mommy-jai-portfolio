# Mommy Jai Ferrer — Creator Portfolio

A lightweight, responsive editorial portfolio for **Mommy Jai Ferrer**, a Philippines-based mom and lifestyle creator offering UGC production, sponsored creator-published content, and selective brand collaborations.

**Production:** https://mommy-jai-portfolio.pages.dev/  
**GitHub:** `dezenithofficial/mommy-jai-portfolio`  
**Deployment:** Cloudflare Pages, connected to the `main` branch (automatic deploys)

## Current production features

- Editorial hero portrait, family portrait, and six photographic featured campaigns
- Dedicated Bonakid flagship presentation and published-campaign evidence
- Featured Work video/carousel modal and expandable campaign details
- Nine additional published Brand Stories with in-page TikTok drawer and direct-post fallback
- Responsive mobile navigation, continuously scrolling specialties ticker, and bottom quick-contact dock
- Reduced-motion support, keyboard close/escape behavior, and no horizontal scrolling in tested viewports
- Formspree collaboration inquiry form with explicit consent, accessible status messaging, spam honeypot, and email fallback
- Separate `/privacy` notice

## Content and relationship integrity

The portfolio distinguishes paid sponsorship from product exchange and other creator work. Preserve those distinctions when adding brands or testimonials; do not invent campaign metrics. Use the original published links as primary campaign evidence. Product text in AI-assisted presentation imagery may differ from original packaging, so do not use edited illustrations as a source of factual product details.

## SEO and social sharing

- `index.html` has canonical and social metadata for the **current Pages domain**, plus WebSite/Person structured data.
- `privacy.html` has its own canonical/metadata.
- `assets/mommy-jai-social-preview.jpg` is the 1200 × 630 branded image for rich link previews.
- `robots.txt` and `sitemap.xml` are at the repository root and served by Cloudflare.
- If a custom domain is adopted, update all canonical, Open Graph, structured-data, robots and sitemap URLs together. Keep privacy and live form links aligned.

Some social apps cache previews; use Facebook Sharing Debugger or the respective provider's rescrape function if a preview remains stale.

## Conversion tracking and traffic attribution

The collaboration form submits via **Formspree**: `https://formspree.io/f/mdeebebb`. A successful form submission is recorded in its submission inbox, and notification email is controlled in Formspree settings.

For submitted inquiries only, the form adds privacy-safe hidden fields:
- `portfolio_source`: `utm_source` if present, otherwise recognized social/search referral or `direct / untagged`
- `portfolio_medium`: `utm_medium` or `unspecified`
- `portfolio_campaign`: `utm_campaign` or `not tagged`

Only basic tags, not full referrer URLs or unique visitor identifiers, are included. Nothing is sent to an analytics platform solely because a visitor opens the site.

Example source-tagged links for use in social bios and outreach:

- TikTok: https://mommy-jai-portfolio.pages.dev/?utm_source=tiktok&utm_medium=bio&utm_campaign=creator-portfolio
- Instagram: https://mommy-jai-portfolio.pages.dev/?utm_source=instagram&utm_medium=bio&utm_campaign=creator-portfolio
- Facebook: https://mommy-jai-portfolio.pages.dev/?utm_source=facebook&utm_medium=bio&utm_campaign=creator-portfolio
- Brand outreach: https://mommy-jai-portfolio.pages.dev/?utm_source=outreach&utm_medium=direct&utm_campaign=brand-proposals

### Visit analytics — Cloudflare account action

**Web Analytics is not enabled merely by adding source code.** Enable it from the Cloudflare account:

1. Open **Cloudflare Dashboard → Workers & Pages → mommy-jai-portfolio → Metrics**.
2. Click **Enable** under **Web Analytics**.
3. Trigger the next Pages deployment (for example, a GitHub commit).
4. Confirm the Cloudflare beacon is injected into rendered HTML; view visitors and performance in **Web Analytics**.

Cloudflare Web Analytics does **not** support custom click events as of November 2026. Use Cloudflare for visitor/page metrics and Formspree for actual inquiry conversions. If true per-campaign click events become necessary, choose a privacy-reviewed analytics provider with custom events, and update the privacy notice before activating it.

Provider documentation: https://developers.cloudflare.com/pages/how-to/web-analytics/

## Files

- `index.html`: structure, featured work, contact form, and page metadata
- `styles.css`: responsive design, transitions, modal, drawer
- `script.js`: navigation, Formspree submission, UTM attribution, motion, viewers
- `ticker.js`: continuous specialties marquee
- `privacy.html`: privacy notice available at `/privacy`
- `assets/`: portrait, family image, campaign images, social preview, favicon
- `robots.txt`, `sitemap.xml`: search crawler guidance
- `_headers`: Cloudflare Pages security-related HTTP headers

## Maintenance checks

After editing production content, test at minimum 320px and 390px mobile plus a desktop width; inspect images, campaign links, both drawers, keyboard navigation, and the inquiry form's success and failure messages. Avoid using the real Formspree endpoint for repetitive test submissions; mock HTTP success/failure when possible.
