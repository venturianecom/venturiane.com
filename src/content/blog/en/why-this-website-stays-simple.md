---
language: en
translationKey: why-this-website-stays-simple
slug: why-this-website-stays-simple
title: Why this website stays simple
description: Why Venturian Ecom deliberately chooses a small, fast and maintainable website without unnecessary complexity.
author:
  name: Tim Twiest
  url: https://timtwiest.nl
pubDate: 2026-09-29
tags:
  - technology
  - simplicity
  - web development
draft: false
---

It is easy to make a website bigger. Add another section, a new animation, a
dashboard or a system that might become useful later. The harder choice is to
decide what is actually needed today.

This website deliberately stays simple. It explains what Venturian Ecom does,
offers a way to get in touch and provides a place for occasional notes. That is
enough for now.

## Simple does not mean careless

There is still a solid foundation behind the simple exterior. The website
works in Dutch and English, is accessible by keyboard, performs well on mobile
devices and generates every page from typed content.

Most visitors should never have to think about any of that. Good technology is
often most useful when it stays out of the way.

## Less to maintain

Every feature has a cost after it has been built. It needs to remain secure,
understandable and compatible with everything around it. Avoiding unnecessary
parts keeps that cost low and leaves more attention for the work that matters.

This principle applies beyond websites. In consultancy and e-commerce, a small
solution that clearly solves the current problem is often more valuable than a
large system built around assumptions.

## A practical test

Before adding something, we ask three questions:

1. What problem does it solve today?
2. Who will notice the difference?
3. What will it cost to maintain?

If there is no clear answer, we do not build it yet. That avoids unnecessary
technology and helps direct time and attention towards what creates value today.

## What the pipeline checks automatically

Every proposed change runs through the pipeline: an automated sequence of
quality checks. Among other things, it verifies:

- formatting, TypeScript types and whether the production build succeeds;
- internal links and important user actions in multiple browsers;
- automatically detectable accessibility problems against
  [WCAG](https://www.w3.org/WAI/standards-guidelines/) levels A and AA;
- performance, accessibility, best practices and SEO with Google Lighthouse on
  mobile and desktop.

A change is only published after those checks pass. That does not guarantee a
perfect experience for every visitor. Automated accessibility tests can find
many problems, but not all of them. Good HTML semantics, keyboard support,
contrast and visual reviews therefore remain deliberate decisions too.

## Room to grow

Keeping the website simple does not mean keeping it fixed. Articles can be
added in Markdown, new pages can be introduced when they have a purpose and the
technical foundation can grow with them.

Every note has a Dutch and English version. Both start from the same fixed
template. One of those files looks like this, for example:

```md
---
language: en
translationKey: clear-title
slug: a-clear-title
title: A clear title
description: A short summary.
author:
  name: Tim Twiest
  url: https://timtwiest.nl
pubDate: 2026-09-29
tags:
  - technology
draft: false
---

The content starts here.
```

There is no separate content management system, just plain text that is easy to
read, preserve and move elsewhere later.

The aim is not to have as little as possible. It is to have exactly enough,
with a clear reason for everything that remains.
