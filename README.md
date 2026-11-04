# Mommy Jai Ferrer — Creator Portfolio MVP

Responsive static site for GitHub-connected Cloudflare Pages. No framework, server, or build step required.

## Deployment status

**Deployment-ready source; not yet hosted.** The repository and Cloudflare Pages project still need to be created and linked. Avoid presenting a live staging URL until Cloudflare returns a successful deployment.

## Publish with GitHub + Cloudflare Pages

1. In GitHub (signed in as the intended owner), create a repository named `mommy-jai-portfolio`. Set it **private** while preparing the website if the linked Cloudflare installation supports private repositories. Do not add starter files; the site already has a README.
2. Upload the *contents of this folder*, not the parent folder, so `index.html`, `styles.css`, and `script.js` are at the repository root. Commit to the `main` branch.
3. Open Cloudflare Dashboard → Workers & Pages → Create application → Pages → connect/import a Git repository. Authorize the GitHub account and select `mommy-jai-portfolio`.
4. Set production branch `main`, framework preset **None**, build command **leave blank** (or `exit 0` if required), and output directory **`.`** (repository root). Root directory: repository root.
5. Deploy and wait for Cloudflare to report success. Open the actual `*.pages.dev` address shown in the dashboard; **do not guess the URL**.
6. Check at desktop and mobile widths: menu, hero, six links, social links, form, text contrast, responsive layout. Do not link the site in social bios until these checks pass.
7. Add approved assets and a custom domain when ready. Pushes to `main` will redeploy automatically once Git integration is active.

Cloudflare official reference: https://developers.cloudflare.com/pages/get-started/git-integration/

## Before social-bio launch

- **Portrait:** Replace the hero placeholder with an approved `assets/jai-portrait.jpg` (portrait crop, ideally at least 1000px wide).
- **Featured work:** Validate all six Facebook/TikTok content links publicly; these were sourced from the Brand Evidence tracker and have not undergone independent frame-by-frame review.
- **Relationship labels:** Confirm Bonakid's paid sponsorship and the five barter/cross-deal classifications before publishing.
- **Content usage:** Do not assume social-media footage, children's images, brand logos, or licensed music may be downloaded and republished on the portfolio. Link to original posts unless reuse rights are confirmed.
- **Inquiries:** The form composes an email to `mommyjaiferrer@gmail.com` in the visitor's configured email app. It does *not* transmit/store submissions. Test on mobile and desktop; publish the email address as a fallback.
- **Privacy:** No visitor tracking, cookies, or backend storage are configured. Reassess disclosure/consent if analytics or an external form is later installed.
- **SEO:** Add canonical URL and social preview image after the staging URL or custom domain is confirmed.
- **Visual QA:** Local browser automation was blocked in the creation environment. Perform a manual desktop/mobile review on the actual Cloudflare deployment.

## Files

- `index.html`: page markup, content, and links
- `styles.css`: responsive layout and presentation
- `script.js`: mobile menu, copyright year, email inquiry action
- `assets/favicon.svg`: website favicon
- `_headers`: basic security-related HTTP response headers supported by Cloudflare Pages

## Local preview

Run `python -m http.server 8000` in this directory and browse to `http://localhost:8000`, or open `index.html` locally.

## Brand data source

See the `Portfolio Details`, `Brand Evidence`, and `Featured Content` tabs of the existing Mommy Jai Ferrer UGC Campaign Opportunity Tracker.
