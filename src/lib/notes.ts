import { parseFrontmatter, generateExcerpt, extractSlugFromPath, generateToc, type TocItem } from '../common/markdown'

export type Note = {
    slug: string
    title: string
    date: string
    tags?: string[]
    topic?: string
    content: string
    excerpt?: string
    toc: TocItem[]
    basePath: string
}

const modules = import.meta.glob(['../notes/*/index.md', '../notes/*.md'], { as: 'raw', eager: true }) as Record<string, string>

function getBasePath(path: string): string {
    if (path.includes('/index.md')) {
        return path.replace('/index.md', '')
    }
    return path.replace(/\/[^/]+\.md$/, '')
}

export function getAllNotes(): Note[] {
    const notes = Object.entries(modules)
        .map(([path, raw]) => {
            const slug = extractSlugFromPath(path)
            const { data, content } = parseFrontmatter(raw)
            return {
                slug,
                title: (data.title as string) || slug,
                date: (data.date as string) || '',
                tags: (data.tags as string[]) || [],
                topic: data.topic as string | undefined,
                content,
                excerpt: generateExcerpt(content),
                toc: generateToc(content),
                basePath: getBasePath(path),
            } as Note
        })
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

    return notes
}

export function getNoteBySlug(slug: string): Note | undefined {
    return getAllNotes().find((n) => n.slug === slug)
}

export function searchNotes(query: string): Note[] {
    if (!query.trim()) return getAllNotes()
    const lowerQuery = query.toLowerCase()
    return getAllNotes().filter(note => {
        const titleMatch = note.title.toLowerCase().includes(lowerQuery)
        const contentMatch = note.content.toLowerCase().includes(lowerQuery)
        const tagMatch = note.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) || false
        const topicMatch = note.topic?.toLowerCase().includes(lowerQuery) || false
        return titleMatch || contentMatch || tagMatch || topicMatch
    })
}

export type GroupedNotes = {
    year: string
    months: {
        month: string
        notes: Note[]
    }[]
}

export function getNotesGroupedByDate(): GroupedNotes[] {
    const notes = getAllNotes()
    const grouped = new Map<string, Map<string, Note[]>>()

    for (const note of notes) {
        if (!note.date) continue
        const date = new Date(note.date)
        const year = date.getFullYear().toString()
        const month = date.toLocaleString('en-US', { month: 'long' })

        if (!grouped.has(year)) {
            grouped.set(year, new Map())
        }
        const yearMap = grouped.get(year)!
        if (!yearMap.has(month)) {
            yearMap.set(month, [])
        }
        yearMap.get(month)!.push(note)
    }

    const result: GroupedNotes[] = []
    for (const [year, monthsMap] of grouped) {
        const months = Array.from(monthsMap.entries()).map(([month, notes]) => ({
            month,
            notes,
        }))
        result.push({ year, months })
    }

    return result
}

export function getUniqueTopics(): string[] {
    const topics = new Set<string>()
    for (const note of getAllNotes()) {
        if (note.topic) topics.add(note.topic)
    }
    return Array.from(topics).sort()
}
