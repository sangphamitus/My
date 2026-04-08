export type FrontmatterData = Record<string, unknown>

export type ParsedMarkdown = {
    data: FrontmatterData
    content: string
}

export type TocItem = {
    id: string
    text: string
    level: number
}

export function slugToTitle(slug: string): string {
    const spaced = slug.replace(/-/g, ' ')
    return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

export function parseFrontmatter(raw: string): ParsedMarkdown {
    const normalized = raw.replace(/\r\n/g, '\n')
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
    const match = normalized.match(frontmatterRegex)

    if (!match) {
        return { data: {}, content: normalized }
    }

    const [, frontmatter, content] = match
    const data: FrontmatterData = {}

    let currentKey = ''
    let isArray = false

    for (const line of frontmatter.split('\n')) {
        const keyMatch = line.match(/^(\w+):\s*(.*)$/)
        if (keyMatch) {
            const [, key, value] = keyMatch
            currentKey = key
            if (value.trim() === '') {
                isArray = true
                data[key] = []
            } else {
                isArray = false
                data[key] = value.replace(/^["']|["']$/g, '')
            }
        } else if (isArray && line.trim().startsWith('-')) {
            const arrayValue = line.trim().slice(1).trim()
            ;(data[currentKey] as string[]).push(arrayValue)
        }
    }

    return { data, content: content.trim() }
}

export function generateExcerpt(content: string, maxLength: number = 150): string {
    const plainText = content.replace(/[#*`[\]!]/g, '').replace(/\n+/g, ' ').trim()
    if (plainText.length <= maxLength) return plainText
    return plainText.substring(0, maxLength).trim() + '...'
}

/** Count words in plain text (strips markdown, splits on whitespace). */
export function countWords(text: string): number {
    const plain = text.replace(/[#*`[\]!()]/g, '').replace(/\n+/g, ' ').trim()
    if (!plain) return 0
    return plain.split(/\s+/).filter(Boolean).length
}

/** Estimate read time in minutes. Default ~200 words per minute. */
export function estimateReadTimeMinutes(text: string, wordsPerMinute: number = 200): number {
    const words = countWords(text)
    return Math.max(1, Math.ceil(words / wordsPerMinute))
}

export function extractSlugFromPath(path: string): string {
    const parts = path.split('/')
    const filename = parts.pop()!
    if (filename === 'index.md') {
        return parts.pop()!
    }
    return filename.replace(/\.md$/, '')
}

/** For topic-based dirs: blogs/<topic>/<slug>/index.md or notes/<topic>/<slug>.md. Returns topic from path when present. */
export function extractTopicAndSlugFromPath(
    path: string,
    contentKind: 'blogs' | 'notes'
): { topic?: string; slug: string } {
    const parts = path.split('/').filter(Boolean)
    const baseIndex = parts.indexOf(contentKind)
    if (baseIndex === -1) return { slug: extractSlugFromPath(path) }

    const afterBase = parts.slice(baseIndex + 1)
    if (afterBase.length >= 2) {
        const last = afterBase[afterBase.length - 1]
        if (last === 'index.md') {
            const slugPart = afterBase[afterBase.length - 2]
            const topicPart = afterBase.length === 2 ? undefined : afterBase[0]
            return { topic: topicPart, slug: slugPart }
        }
        if (last.endsWith('.md')) {
            return { topic: afterBase[0], slug: last.replace(/\.md$/, '') }
        }
    }
    if (afterBase.length === 1) {
        const first = afterBase[0]
        if (first.endsWith('.md')) return { slug: first.replace(/\.md$/, '') }
        return { slug: first }
    }
    return { slug: extractSlugFromPath(path) }
}

export function generateToc(content: string): TocItem[] {
    const headingRegex = /^(#{2,4})\s+(.+)$/gm
    const toc: TocItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length
        const text = match[2].trim()
        const id = text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
        
        toc.push({ id, text, level })
    }

    return toc
}

export function searchContent(items: Array<{ title: string; content: string; tags?: string[] }>, query: string): boolean[] {
    const lowerQuery = query.toLowerCase()
    return items.map(item => {
        const titleMatch = item.title.toLowerCase().includes(lowerQuery)
        const contentMatch = item.content.toLowerCase().includes(lowerQuery)
        const tagMatch = item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) || false
        return titleMatch || contentMatch || tagMatch
    })
}
