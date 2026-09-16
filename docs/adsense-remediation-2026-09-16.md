# AdSense remediation — 2026-09-16

## Confirmed account finding

- Site: https://aitrans-lab.com
- Rejection: 가치가 별로 없는 콘텐츠 (low-value content).
- AdSense last update: 2026-09-13 17:40 KST.
- ads.txt: approved. This is not site approval.
- Google did not identify individual offending articles.
- No re-review request submitted: sitewide editorial work remains.

## Read-only audit snapshot

139 published posts. 130 had no external HTML link other than Unsplash attribution;
120 matched fictional-example wording; 88 matched first-person or experience-related wording.
These are triage heuristics, not Google's scoring criteria or proof of a violation.
No-source-link counts do not imply that every statement requires a citation.

## Changes in this remediation

- New /ai-pilot guide with task specification, worked input/output example,
  failure tests, measurement method and downloadable blank CSV record.
- Homepage and footer link to the guide; sitemap includes it.
- About page no longer implies every AI-generated post is firsthand validated.
- Shared highest-priority generator/editor rules prohibit invented experience,
  unsupported approximate statistics, fake tools, and fictional measured outcomes.
- cases-019 rewritten: remove unverified client collaboration and performance
  claims; replace with an explicitly illustrative document-workflow exercise.
- cases-017 and cases-018: explicit fictional status in title, summary and opening.
  This is transparency remediation, not a complete factual audit of those posts.
- Existing posts are not deleted or bulk unpublished.

## Required next steps before re-review

1. Owner approved draft-only generation. Generator now saves draft + NULL publication
   date. Existing automatic public rewrites are paused at the script entry point
   (manual runs require --allow-public-overwrite). Public ID API
   excludes drafts; authenticated admin reads use private, no-store responses.
   Verify deployment before reporting this as active.
   GitHub rejected workflow updates because the current token lacks workflow scope.
   Workflow files remain unchanged: email subjects still incorrectly say published;
   the generation log in the body correctly identifies private drafts. Updating
   notification wording and disabling the now-harmless rewrite schedule remain pending.
2. Review unsupported customer/experience claims and invented tool recommendations
   throughout the existing collection, starting with recent and prominent posts.
3. Replace hypothetical performance percentages with measured evidence or task
   procedures without performance claims; merge genuinely overlapping articles
   only after checking links and preserving URLs or redirects.
4. For product guides, inspect official documentation and add specific verified
   steps, applicability, dates and limitations. Do not auto-generate citations.
5. Collect real, non-sensitive workflow test records if available; never invent
   the owner's firsthand experience to simulate originality.
6. Check homepage, article templates, navigation, CSV, mobile layout and indexing.
7. Submit re-review only after a substantive sitewide pass. No fixed article count,
   word count, visitor threshold or approval guarantee is asserted.

## Official references

- https://support.google.com/adsense/answer/10015918?hl=ko
- https://support.google.com/adsense/answer/10502938?hl=ko
