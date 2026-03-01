import { parseFrontmatter, generateExcerpt, extractTopicAndSlugFromPath, generateToc, countWords, estimateReadTimeMinutes, type TocItem } from '../common/markdown'

export type Reference = {
    title: string
    url: string
}

export type Blog = {
    slug: string
    title: string
    date?: string
    tags?: string[]
    topic?: string
    content: string
    excerpt?: string
    toc: TocItem[]
    basePath: string
    wordCount: number
    readTimeMinutes: number
    references?: Reference[]
}

/** Topic-based: blogs/<topic>/<slug>/index.md. Flat: blogs/<slug>/index.md or blogs/<slug>.md */
const modules = import.meta.glob(
    ['../blogs/*/*/index.md', '../blogs/*/*.md', '../blogs/*/index.md', '../blogs/*.md'],
    { as: 'raw', eager: true }
) as Record<string, string>

function getImageBasePath(slug: string): string {
    return `/blogs/${slug}`
}

function parseReferences(raw: unknown): Reference[] {
    if (!Array.isArray(raw)) return []
    const out: Reference[] = []
    for (const item of raw) {
        const s = typeof item === 'string' ? item.replace(/^["']|["']$/g, '').trim() : ''
        if (!s) continue
        const pipe = s.indexOf('|')
        if (pipe >= 0) {
            const title = s.slice(0, pipe).trim()
            const url = s.slice(pipe + 1).trim()
            if (url) out.push({ title: title || url, url })
        } else if (s.startsWith('http://') || s.startsWith('https://')) {
            try {
                const name = new URL(s).hostname.replace(/^www\./, '')
                out.push({ title: name, url: s })
            } catch {
                out.push({ title: 'Link', url: s })
            }
        }
    }
    return out
}

export function getAllBlogs(): Blog[] {
    const blogs = Object.entries(modules)
        .map(([path, raw]) => {
            const { topic: pathTopic, slug } = extractTopicAndSlugFromPath(path, 'blogs')
            const { data, content } = parseFrontmatter(raw)
            const frontmatterTopic = data.topic as string | undefined
            return {
                slug,
                title: (data.title as string) || slug,
                date: data.date as string | undefined,
                tags: (data.tags as string[]) || [],
                topic: pathTopic ?? frontmatterTopic,
                content,
                excerpt: generateExcerpt(content),
                toc: generateToc(content),
                basePath: getImageBasePath(slug),
                wordCount: countWords(content),
                readTimeMinutes: estimateReadTimeMinutes(content),
                references: parseReferences(data.references),
            } as Blog
        })
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

    return blogs
}

export function getBlogBySlug(slug: string): Blog | undefined {
    return getAllBlogs().find((b) => b.slug === slug)
}

export function searchBlogs(query: string): Blog[] {
    if (!query.trim()) return getAllBlogs()
    const lowerQuery = query.toLowerCase()
    return getAllBlogs().filter(blog => {
        const titleMatch = blog.title.toLowerCase().includes(lowerQuery)
        const contentMatch = blog.content.toLowerCase().includes(lowerQuery)
        const tagMatch = blog.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) || false
        const topicMatch = blog.topic?.toLowerCase().includes(lowerQuery) || false
        return titleMatch || contentMatch || tagMatch || topicMatch
    })
}

export function getUniqueTopics(): string[] {
    const topics = new Set<string>()
    for (const blog of getAllBlogs()) {
        if (blog.topic) topics.add(blog.topic)
    }
    return Array.from(topics).sort()
}
