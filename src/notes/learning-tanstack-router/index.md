---
title: "Learning TanStack Router"
date: "2026-02-20"
tags:
  - tanstack
  - routing
  - learning
topic: learning-react
---

Spent some time learning TanStack Router today. Some observations:

## File-Based Routing

The file-based routing is intuitive. Just create files in the `routes` folder:

- `routes/index.tsx` → `/`
- `routes/about.tsx` → `/about`
- `routes/blogs/$slug.tsx` → `/blogs/:slug`

## Type Safety

Really like the type-safe approach to routing. The params are fully typed when using `useParams`.

## Things I Learned

1. The `__root.tsx` file is the layout wrapper
2. Use `createFileRoute` for type-safe route definitions
3. Dynamic segments use `$` prefix (like `$slug`)

Good progress for a day's work!
