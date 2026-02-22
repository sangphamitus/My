---
title: "Adding the Topics Page"
date: "2026-02-21"
tags:
  - topics
  - routing
  - ui
topic: blog-setup
---

Added a Topics section so I can group posts and notes by project or theme.

## What I Did

- Defined topic configs in `topics.ts` with status (todo, in-progress, done) and description.
- Topics aggregate posts and notes that have a matching `topic` in frontmatter (or from the folder path).
- Built a Topics index page with status filters and a topic detail page that lists related posts and notes.

Keeping everything under topics makes it easier to see what's active and what's done.
