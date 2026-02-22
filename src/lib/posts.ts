import { parseFrontmatter, generateExcerpt, extractTopicAndSlugFromPath, generateToc, type TocItem } from '../common/markdown'

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

/** Topic-based: posts/<topic>/<slug>/index.md. Flat: posts/<slug>/index.md or posts/<slug>.md */
const modules = import.meta.glob(
    ['../posts/*/*/index.md', '../posts/*/*.md', '../posts/*/index.md', '../posts/*.md'],
    { as: 'raw', eager: true }
) as Record<string, string>

function getImageBasePath(slug: string): string {
    return `/posts/${slug}`
}

export function getAllPosts(): Post[] {
    const posts = Object.entries(modules)
        .map(([path, raw]) => {
            const { topic: pathTopic, slug } = extractTopicAndSlugFromPath(path, 'posts')
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
