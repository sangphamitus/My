import {
	extractTopicAndSlugFromPath,
	generateExcerpt,
	generateToc,
	parseFrontmatter,
	type TocItem,
} from "../common/markdown";

export type Note = {
	slug: string;
	title: string;
	date: string;
	tags?: string[];
	topic?: string;
	content: string;
	excerpt?: string;
	toc: TocItem[];
	basePath: string;
};

/** Topic-based: notes/<topic>/<slug>/index.md. Flat: notes/<slug>/index.md or notes/<slug>.md */
const modules = import.meta.glob(
	[
		"../notes/*/*/index.md",
		"../notes/*/*.md",
		"../notes/*/index.md",
		"../notes/*.md",
	],
	{ as: "raw", eager: true },
) as Record<string, string>;

function getImageBasePath(slug: string): string {
	return `/notes/${slug}`;
}

export function getAllNotes(): Note[] {
	const notes = Object.entries(modules)
		.map(([path, raw]) => {
			const { topic: pathTopic, slug } = extractTopicAndSlugFromPath(
				path,
				"notes",
			);
			const { data, content } = parseFrontmatter(raw);
			const frontmatterTopic = data.topic as string | undefined;
			return {
				slug,
				title: (data.title as string) || slug,
				date: (data.date as string) || "",
				tags: (data.tags as string[]) || [],
				topic: pathTopic ?? frontmatterTopic,
				content,
				excerpt: generateExcerpt(content),
				toc: generateToc(content),
				basePath: getImageBasePath(slug),
			} as Note;
		})
		.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

	return notes;
}

export function getNoteBySlug(slug: string): Note | undefined {
	return getAllNotes().find((n) => n.slug === slug);
}

export function searchNotes(query: string): Note[] {
	if (!query.trim()) return getAllNotes();
	const lowerQuery = query.toLowerCase();
	return getAllNotes().filter((note) => {
		const titleMatch = note.title.toLowerCase().includes(lowerQuery);
		const contentMatch = note.content.toLowerCase().includes(lowerQuery);
		const tagMatch =
			note.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) || false;
		const topicMatch = note.topic?.toLowerCase().includes(lowerQuery) || false;
		return titleMatch || contentMatch || tagMatch || topicMatch;
	});
}

export type GroupedNotes = {
	year: string;
	months: {
		month: string;
		notes: Note[];
	}[];
};

export function getNotesGroupedByDate(): GroupedNotes[] {
	const notes = getAllNotes();
	const grouped = new Map<string, Map<string, Note[]>>();

	for (const note of notes) {
		if (!note.date) continue;
		const date = new Date(note.date);
		const year = date.getFullYear().toString();
		const month = date.toLocaleString("en-US", { month: "long" });

		if (!grouped.has(year)) {
			grouped.set(year, new Map());
		}
		const yearMap = grouped.get(year)!;
		if (!yearMap.has(month)) {
			yearMap.set(month, []);
		}
		yearMap.get(month)!.push(note);
	}

	const result: GroupedNotes[] = [];
	for (const [year, monthsMap] of grouped) {
		const months = Array.from(monthsMap.entries()).map(([month, notes]) => ({
			month,
			notes,
		}));
		result.push({ year, months });
	}

	return result;
}

export function getUniqueTopics(): string[] {
	const topics = new Set<string>();
	for (const note of getAllNotes()) {
		if (note.topic) topics.add(note.topic);
	}
	return Array.from(topics).sort();
}
