---
title: "Adding Search"
date: "2026-02-21"
tags:
  - search
  - filter
  - ux
topic: blog-setup
---

Added search on Blogs and Notes pages.

## How It Works

- Simple client-side filter: type in the box and we filter by title, content, tags, and topic.
- No server or search index — all content is loaded once and filtered in the browser.
- Works together with the existing topic and tag filters.

For a small number of posts and notes this is enough. If the list grows a lot, I might add a proper search index later.
