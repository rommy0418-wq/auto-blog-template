# Sitewide editorial and functional audit — final verification

User authorized the entire audit and corrections without per-batch approval.
Do not report completion until all categories and deployed behavior are checked.

## Recovery

Private snapshot of all 139 published rows:
`/var/folders/vc/h62gg6t570n6l4w54tq1w8r00000gn/T/blog-full-review-ZJdg3j/originals.json`.
Includes hashes of title/content/meta/keywords/status to prevent overwriting concurrent edits.
Views and comments are preserved. URLs, status and original publication dates unchanged.

## Content status

- Cases: 19/19 corrected in prior batches; DB/local equality previously verified.
- Foundation: 19/19 editor-authored replacements rendered, validated, applied;
  all 19 cache refreshes succeeded. Backup:
  `/var/folders/vc/h62gg6t570n6l4w54tq1w8r00000gn/T/blog-review-apply-mHMV9n/originals.json`.
- Business: 19/19 authored, rendered, applied; all cache refreshes succeeded.
  Backup: `/var/folders/vc/h62gg6t570n6l4w54tq1w8r00000gn/T/blog-review-apply-DFhNtW/originals.json`.
- Marketing: 23/23 authored, rendered, applied; all cache refreshes succeeded.
  Backup: `/var/folders/vc/h62gg6t570n6l4w54tq1w8r00000gn/T/blog-review-apply-ES2TIj/originals.json`.
- Tools: 33/33 authored, rendered, applied; all cache refreshes succeeded.
  Backup: `/var/folders/vc/h62gg6t570n6l4w54tq1w8r00000gn/T/blog-review-apply-FnDXtA/originals.json`.
- Transform: 26/26 authored, rendered, applied; all cache refreshes succeeded.
  Backup: `/var/folders/vc/h62gg6t570n6l4w54tq1w8r00000gn/T/blog-review-apply-C5WuKQ/originals.json`.
- Read-only database verification: all **139/139** bodies exactly match reviewed
  files; original IDs, slugs and publication dates match the private snapshot.

Editorial sources live in `scripts/editorial/*-review.ts`; rendering is deterministic
through `scripts/build-reviewed-guides.ts CATEGORY`. Generated HTML and manifest are
in `scripts/editorial/reviewed-CATEGORY/`. Apply with `scripts/sitewide-review.ts`
using exact snapshot and manifest paths; default is validation only, `--apply` writes.
Application is replay-safe for matching final text and refreshes caches even on replay.

An attempted external-AI drafting call was blocked by automatic safety review because
the user had not explicitly authorized sending full original posts to Gemini for this
operation. No original posts were sent by that attempt. The temporary generation
script was removed. Continue with direct editorial work; do not bypass the rejection.

## Functional corrections

- Removed unsubstantiated tenure and productivity promises from home/about/contact.
- Script-safe Article JSON serialization and XML escaping for RSS.
- Integer pagination validation, old/new slug cache refresh, contents/feed/sitemap refresh.
- Abort stale search requests; distinguish service errors from no results; accessible labels.
- Mobile home header wrapping; pagination labels; accurate KakaoStory share labels.
- Preserve ordered-list start values in sanitized articles.

- Removed build/ISR/API-read increments and public display of unreliable historical
  view counts. Historical values remain stored, not reset; GA4 is the traffic source.
- Corrected privacy/terms to describe password hashes, IP/UA-derived identifiers,
  service providers, actual retention limitations and third-party rights honestly.
  No legal-compliance certification or invented retention automation.
- Comments: validate field types, whitespace, IDs and bcrypt's 72-byte boundary;
  protect deletion attempts, atomic request limits, fail closed on storage errors.
  New rate-limit/spam identifiers use keyed hashes, not raw IPs.
- Removed nonfunctional hCaptcha challenge and production test bypass. Rate-limited
  clients receive a real cooldown and Retry-After instead. No new CAPTCHA provider.
- Storage-disabled/malformed localStorage no longer breaks view toggle/likes;
  comment and like failures have visible error states and comment fetch retry.
- Admin post fields validated; existing slugs cannot change without a redirect
  migration. Publishing sets a date when needed.
- Removed explicit TLS certificate-verification bypass in runtime DB connection.
- Corrected streaming soft-404 behavior: block metadata until existence checks;
  remove root loading boundary; unknown post/negative/out-of-range pages return404.
- Added page-level connection-error recovery UI; restricted image optimization
  to the actual Unsplash image host; removed nested share buttons from card links.
- Retired superseded one-shot editorial scripts so they cannot silently restore
  old unsupported claims. Original history remains in Git.

## Verification evidence

- Final lint passed; unit/regression suite10/10 passed; production build154 pages
  passed after all code changes.
- Actual PostgreSQL limiter integration passed: threshold, reset, keyed identifier;
  uses a temporary table with ROLLBACK, no persistent visitor/test data.
- First whole-site crawl: 172 pages/internal links. Found and corrected soft404
  responses; cases-019 uses its original dated correction wording (test adjusted).
- Official editorial source URLs: 46 checked,42 returned200; Canva, Midjourney,
  Runway and Perplexity returned403 to scripted requests. These four had been
  inspected using the web source tool;403 is not reported as a confirmed dead link.
- Browser QA: search for 파일럿 returned transform-008; navigation and table-of-
  contents anchor work;390px article viewport measured scrollWidth=390, no page
  overflow. Mobile table and article screenshot inspected.
- Name-leak check on all fetched public pages and reviewed DB bodies passed.
- Post-fix local crawl:172 pages/internal links, zero errors; all139 article
  metadata, correction notices, JSON-LD and body equality verified. RSS and
  sitemap both passed xmllint parsing.
- Responsive320px checks: home list,about,contact,contents,privacy,terms,ai-pilot,
  article all had scrollWidth=clientWidth=320. Home card screenshot at320px and
  desktop screenshot inspected. Browser console error check returned an empty list.

## Release checks / bounded limitations

- Deployment and post-deployment public crawl are the remaining release gates.
- Privacy wording now describes actual behavior, but legal review and a formal
  provider-specific retention/transfer compliance review are not certified here.
  Existing visitor/security records were not bulk deleted.
- GitHub workflow token still lacks workflow scope; do not alter workflow files and claim deployed.
- No AdSense re-review request submitted or authorized in this scope.

Final report must distinguish completed corrections, actual tests, remaining limitations,
and Google's independent approval. Never claim AdSense acceptance or revenue guaranteed.
