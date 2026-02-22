---
title: "Deploying the Blog"
date: "2026-02-22"
tags:
  - deploy
  - vite
  - hosting
topic: blog-setup
---

Thinking about where to host this blog.

## Options

- **Vercel / Netlify** — `npm run build` and point at `dist`. Good default for Vite + SPA.
- **GitHub Pages** — Same build; may need base path if repo is not at root.
- **Static host (S3, Cloudflare Pages, etc.)** — Same story: static files from build.

No backend, so anywhere that serves static files works. I'll likely start with Vercel or Netlify for the first deploy.
