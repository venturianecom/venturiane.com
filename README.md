# Venturian Ecom

The source code for [venturiane.com](https://venturiane.com), the bilingual
home of Venturian Ecom's technology consulting and e-commerce work.

The site uses Astro and TypeScript to generate a small, static website with
localized routes, SEO metadata, and Markdown-based blog support.

## Local development

Use Node.js 24 and npm 11. The repository includes `.node-version`, an engine
constraint, and a pinned package-manager version so local development matches
CI.

Install the dependencies and start the development server:

```sh
npm ci
npx --no-install playwright install chromium firefox webkit
npm run dev
```

Then visit [http://localhost:4321](http://localhost:4321).

## Quality checks

Run the complete validation pipeline:

```sh
npm run validate
```

This checks formatting with Prettier, linting with ESLint, Astro and TypeScript
diagnostics, generated HTML, the production build, Vitest unit tests, internal
links, WCAG rules, and Playwright flows across Chromium, Firefox, WebKit,
Android, and iPhone profiles. It also enforces Lighthouse budgets for mobile
and desktop.

Individual commands are also available:

```sh
npm run format
npm run format:check
npm run lint
npm run check
npm run check:html
npm test
npm run test:unit
npm run test:e2e
npm run build
npm run lighthouse
npm run smoke:production
```

## Deployment

Every push to `master` is validated, built, and deployed automatically with
GitHub Pages. Astro writes the production site to `dist`, which is the only
directory uploaded by the workflow. After deployment, a production smoke test
verifies the localized pages, blog posts, metadata assets, robots file, and
sitemap on the custom domain.

## Project structure

- `src/pages` contains the root language redirect and localized page routes.
- `src/components` contains the shared header, footer, selector, and notes.
- `src/layouts/BaseLayout.astro` contains shared SEO and social metadata.
- `src/i18n/config.ts` is the single source for Dutch and English interface copy.
- `src/content/blog` contains Markdown blog posts.
- `src/content.config.ts` validates blog frontmatter at build time.
- `src/content/integrity.ts` enforces unique routes and complete translations.
- `src/pages/sitemap.xml.ts` generates localized sitemap entries.
- `public/style.css` contains the visual design.
- `tests` contains production-output tests.
- `e2e` contains Playwright browser tests.
- `.github/workflows/deploy-pages.yml` validates and publishes the site.

## Adding a blog post

Copy `src/content/blog/_template.md` and create one Markdown file per language.
A post uses this frontmatter:

```md
---
language: nl
translationKey: example-post
slug: voorbeeld
title: Voorbeeld
description: Een korte omschrijving voor de homepage en zoekmachines.
pubDate: 2026-09-28
tags:
  - techniek
draft: false
---

De inhoud van de blogpost.
```

Use the same `translationKey` for translated versions. Astro generates the
localized blog routes and alternate-language metadata automatically.

## License

This project is available under the [MIT License](LICENSE).
