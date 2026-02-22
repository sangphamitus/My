---
title: "Choosing the Right Stack"
date: "2026-02-20"
tags:
  - react
  - typescript
  - decisions
topic: blog-setup
---

When starting this blog, I had to decide on a stack that would stay out of the way and let me focus on writing.

## What I Wanted

- **Simple content authoring** — Markdown, no CMS
- **Fast and static-friendly** — good for hosting anywhere
- **Type safety** — fewer surprises at runtime
- **Minimal dependency churn** — stable tooling

## What I Picked

- **React + TypeScript** — I'm already comfortable here, and types help when the project grows.
- **Vite** — Fast dev server and straightforward build. No complex config.
- **TanStack Router** — File-based routes map nicely to how I think about pages.
- **Tailwind** — Utility-first CSS without designing a system from scratch.

So far it's been easy to add features (topics, notes, search) without the stack getting in the way. That was the goal.
