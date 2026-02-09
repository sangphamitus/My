import matter from 'gray-matter'

export type Post = {
    slug: string
    title: string
    date?: string
    tags?: string[]
    content: string
}

const modules = import.meta.glob('../posts/*.md', { as: 'raw', eager: true }) as Record<string, string>

export function getAllPosts(): Post[] {
    const posts = Object.entries(modules)
        .map(([path, raw]) => {
            const slug = path.split('/').pop()!.replace(/\.md$/, '')
            const { data, content } = matter(raw)
            return {
                slug,
                title: data.title || slug,
                date: data.date,
                tags: data.tags || [],
                content,
            } as Post
        })
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

    return posts
}

export function getPostBySlug(slug: string): Post | undefined {
    return getAllPosts().find((p) => p.slug === slug)
}
