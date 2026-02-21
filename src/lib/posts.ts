import { parseFrontmatter, generateExcerpt, extractSlugFromPath, generateToc, type TocItem } from '../common/markdown'

export type Post = {
    slug: string
    title: string
    date?: string
    tags?: string[]
    topic?: string
    content: string
    excerpt?: string
    toc: TocItem[]
    basePath: string
}

const modules = import.meta.glob(['../posts/*/index.md', '../posts/*.md'], { as: 'raw', eager: true }) as Record<string, string>

function getBasePath(path: string): string {
    if (path.includes('/index.md')) {
        return path.replace('/index.md', '')
    }
    return path.replace(/\/[^/]+\.md$/, '')
}

export function getAllPosts(): Post[] {
    const posts = Object.entries(modules)
        .map(([path, raw]) => {
            const slug = extractSlugFromPath(path)
            const { data, content } = parseFrontmatter(raw)
            return {
                slug,
                title: (data.title as string) || slug,
                date: data.date as string | undefined,
                tags: (data.tags as string[]) || [],
                topic: data.topic as string | undefined,
                content,
                excerpt: generateExcerpt(content),
                toc: generateToc(content),
                basePath: getBasePath(path),
            } as Post
        })
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

    return posts
}

export function getPostBySlug(slug: string): Post | undefined {
    return getAllPosts().find((p) => p.slug === slug)
}

export function searchPosts(query: string): Post[] {
    if (!query.trim()) return getAllPosts()
    const lowerQuery = query.toLowerCase()
    return getAllPosts().filter(post => {
        const titleMatch = post.title.toLowerCase().includes(lowerQuery)
        const contentMatch = post.content.toLowerCase().includes(lowerQuery)
        const tagMatch = post.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) || false
        const topicMatch = post.topic?.toLowerCase().includes(lowerQuery) || false
        return titleMatch || contentMatch || tagMatch || topicMatch
    })
}

export function getUniqueTopics(): string[] {
    const topics = new Set<string>()
    for (const post of getAllPosts()) {
        if (post.topic) topics.add(post.topic)
    }
    return Array.from(topics).sort()
}
