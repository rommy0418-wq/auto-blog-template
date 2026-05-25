# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered auto-blogging template built with Next.js 16 (App Router). An AI model (Gemini 2.5 Flash) generates blog posts on a schedule with category-specific prompts and randomized structure templates, fetches images from Unsplash, and publishes them to a PostgreSQL database. The `/auto-blog-setup` skill customizes everything (topic, theme, LLM, deploy stack) via guided interview.

## Commands

```bash
npm run dev          # Start Next.js dev server
npm run build        # Production build
npm run lint         # ESLint
npm run generate     # Generate one blog post via AI (requires .env.local with DB + LLM keys)
npx tsx scripts/generate-post.ts    # Same as above, explicit
npx tsx scripts/upgrade-posts.ts    # Upgrade N existing posts (default 5, lowest view count first)
npx tsx scripts/upgrade-posts.ts 10 # Upgrade 10 posts
npx tsx scripts/regenerate-post.ts  # Regenerate a specific post (legacy, MySQL-based)
npx tsx scripts/fix-missing-thumbs.ts # Backfill missing thumbnails
```

## Architecture

### Data flow

1. `scripts/generate-post.ts` picks the next unpublished topic from `scripts/topics.ts` (130 topics, balanced across 6 categories)
2. Builds a prompt with category-specific instructions + randomized structure template (5 types: standard, comparison, checklist, story, Q&A)
3. Sends prompt to Gemini 2.5 Flash; includes trustworthiness rules to prevent fabricated statistics
4. Extracts AI-generated meta description from `<!-- meta: ... -->` comment in output
5. Fetches Unsplash images (1 thumbnail + 2 inline), deduplicating against already-used images in DB
6. Cleans HTML output (strips markdown artifacts, icon tags) and injects inline images with topic-based alt text after `<h2>` tags
7. Saves to PostgreSQL `posts` table with status `'published'`

### Content quality system

- **Category-specific prompts** (`CATEGORY_INSTRUCTIONS` in generate-post.ts): Each of the 6 categories has tailored writing guidelines (e.g., cases → real company examples with before/after tables)
- **Structure diversity** (`STRUCTURE_TEMPLATES`): 5 article templates randomly selected per post
- **Trustworthiness rules**: Prompts explicitly forbid fabricating statistics, require range expressions ("약 절반") instead of exact numbers, and mandate labeling fictional case studies
- **AI meta description**: Gemini generates a 150-char summary embedded as HTML comment, extracted and stored as `meta_description`
- **Upgrade pipeline** (`scripts/upgrade-posts.ts`): Batch re-generates existing posts (lowest view count first) with new prompts. Tracks via `upgraded_at` column.

### Database

PostgreSQL via `pg` Pool (`src/lib/db.ts`), connection string from `DATABASE_URL` env var. Schema files in `sql/init.pg.sql` (PostgreSQL) and `sql/init.sql` (MySQL). Tables: `posts` (includes `upgraded_at` column), `comments`, `likes`, `rate_limits`, `spam_logs`.

### API Routes (`src/app/api/`)

- `posts/` — GET (paginated list with category filter), POST (admin-only, requires `Authorization: Bearer {ADMIN_API_KEY}`)
- `posts/[id]/` — GET, PATCH, DELETE (admin-only)
- `posts/[id]/like/` — POST (visitor likes, hashed IP dedup)
- `comments/` — GET (by postId), POST (with honeypot + rate limit + hCaptcha)
- `comments/[id]/` — DELETE (password-verified)
- `search/` — GET (ILIKE search on title, meta_description, keywords; 300ms debounced client-side)

### Anti-spam (`src/lib/spam.ts`)

Layered: honeypot field (`website`) → DB-backed rate limiting (configurable via `COMMENT_RATE_LIMIT` / `RATE_LIMIT_WINDOW` env vars) → hCaptcha verification on rate limit trigger.

### Styling & Design System

CSS custom properties in `src/app/globals.css` (`:root` block):
- **Colors**: Light + dark mode (`prefers-color-scheme: dark`) with full variable overrides
- **Spacing scale**: `--space-xs` (0.5rem) through `--space-2xl` (3rem), 8px-based
- **Transitions**: `--transition: 0.15s ease` global variable
- **Button system**: `.btn` base + `.btn-sm/.btn-md/.btn-lg` sizes + `.btn-primary/.btn-outline` variants
- **Badge system**: Category badges (6 colors) + level badges (3 colors)
- **Typography**: Noto Sans KR (body) + Nanum Myeongjo (headings), prose class for article content (1.125rem, line-height 1.7)

Tailwind CSS 4 with `@tailwindcss/postcss`. Inline styles dominate in page components; use CSS classes for shared patterns (buttons, badges, prose).

### Pages

- `/` — Homepage with category tabs, search, view toggle (list/card), pagination
- `/posts/[slug]` — Article detail with TOC, reading time, like, share, related posts, comments
- `/about` — Blog introduction and operator info
- `/contact` — Contact email (ybkim@ipgroup.co.kr) and company link
- `/contents` — Full topic curriculum (130 topics, published/pending status)
- `/terms` — Terms of service including AI content disclaimer
- `/privacy` — Privacy policy
- `/sitemap.xml`, `/robots.txt` — Auto-generated from DB

### Related Posts

Post detail page (`src/app/posts/[slug]/page.tsx`) shows up to 4 related posts from the same category below the article, before the comment section.

### Key env vars

See `.env.production.example` for the full list. Critical ones: `DATABASE_URL`, `GEMINI_API_KEY`, `UNSPLASH_ACCESS_KEY`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_CONTACT_EMAIL`, `ADMIN_API_KEY`, `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`, `HCAPTCHA_SECRET_KEY`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GOOGLE_VERIFICATION`, `NEXT_PUBLIC_NAVER_VERIFICATION`.

**Important**: Default site name fallback is `"AI전환연구소"` across all files. Do not use `"내 블로그"` as fallback anywhere.

## Path alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Deployment

- **Hosting**: Vercel (Hobby plan), Git-connected for auto-deploy on push
- **Domain**: `aitrans-lab.com` (purchased via Vercel, DNS auto-configured)
- **DB**: Neon PostgreSQL (us-east-1)
- **CI/CD**: GitHub Actions — two workflows:
  - `daily-post.yml` — auto-generates 1 new post per weekday at KST 09:00, sends email notification
  - `upgrade-posts.yml` — upgrades 5 existing posts per weekday at KST 11:00
- **GitHub repo**: `rommy0418-wq/auto-blog-template`

### Deploying

```bash
git push origin main       # Triggers Vercel auto-deploy (Git-connected)
vercel --prod              # Manual deploy to production
```

### GitHub Actions Secrets

`DATABASE_URL`, `GEMINI_API_KEY`, `UNSPLASH_ACCESS_KEY`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`, `GMAIL_USER`, `GMAIL_APP_PASSWORD` — all registered in repo Settings → Secrets.

## SEO & Analytics

- **Google Search Console**: registered, sitemap submitted
- **Google Analytics**: GA4 (`G-SJX0H7Y3BY`) via `NEXT_PUBLIC_GA_ID`
- **Naver Search Advisor**: registered, sitemap submitted
- Sitemap at `/sitemap.xml`, robots at `/robots.txt` — both auto-generated from DB
- **AdSense**: Planned for ~July 2026. Required pages ready: About, Contact, Terms, Privacy.

## Notes

- `scripts/` directory is excluded from `tsconfig.json` — scripts use their own imports (`dotenv`, `pg` directly) and run via `tsx`, not the Next.js build.
- The `scripts/topics.ts` file is auto-generated by the `/auto-blog-setup` skill with 130 niche-specific topics. Don't hand-edit unless adding topics beyond 130.
- Post content is raw HTML stored in DB and rendered via `dangerouslySetInnerHTML`. The `cleanHtml()` function in `generate-post.ts` strips markdown residue, icon tags, and extracts AI meta descriptions before saving.
- Post detail pages use `revalidate = 3600` (ISR). View count increments on every page load (not deduplicated).
- Admin auth is a simple bearer token check against `ADMIN_API_KEY` env var (`src/lib/seo.ts:verifyAdminKey`).
- The project is in Korean by default (lang="ko"). The setup skill can switch to other languages.
- Category balancing: `getNextTopic()` in `generate-post.ts` picks the category with the fewest published posts, keeping distribution even across 6 categories.
- User does not want profile photo on the About page.
- Contact email is company email: `ybkim@ipgroup.co.kr`. Operating company: IPGroup (http://www.ipgroup.co.kr).
