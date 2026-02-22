---
title: "Setting Up My Paper Blog"
date: "2026-02-21"
tags:
  - react
  - tanstack
  - setup
topic: blog-setup
---

Today I set up this blog with a paper-like theme. Here's what I did:

## Stack Choices

- **TanStack Router** for file-based routing — clean URLs and code splitting out of the box
- **Tailwind CSS** for styling — rapid iteration on the design
- **Markdown** — write content in markdown with frontmatter metadata

## Theme System

Implemented a light/dark theme toggle that:

- Persists preference to localStorage
- Respects system preferences on first visit
- Uses CSS custom properties for easy color switching

## Next Steps

- Add syntax highlighting for code blocks
- Consider adding an RSS feed
- Maybe add search functionality later
