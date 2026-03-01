import { type Blog, getAllBlogs } from "./blogs";
import { getAllNotes, type Note } from "./notes";

export type TopicStatus = "todo" | "in-progress" | "pending" | "done" | "stop";

export type Topic = {
	slug: string;
	name: string;
	status: TopicStatus;
	description?: string;
	blogs: Blog[];
	notes: Note[];
	lastUpdated: string;
};

export const topicStatusLabels: Record<TopicStatus, string> = {
	todo: "To Do",
	"in-progress": "In Progress",
	pending: "Pending",
	done: "Done",
	stop: "Stopped",
};

export const topicStatusColors: Record<
	TopicStatus,
	{ bg: string; text: string }
> = {
	todo: { bg: "var(--status-todo-bg)", text: "var(--status-todo-text)" },
	"in-progress": {
		bg: "var(--status-progress-bg)",
		text: "var(--status-progress-text)",
	},
	pending: {
		bg: "var(--status-pending-bg)",
		text: "var(--status-pending-text)",
	},
	done: { bg: "var(--status-done-bg)", text: "var(--status-done-text)" },
	stop: { bg: "var(--status-stop-bg)", text: "var(--status-stop-text)" },
};

type TopicConfig = {
	name: string;
	status: TopicStatus;
	description?: string;
};

const topicConfigs: Record<string, TopicConfig> = {
	"DIY-VPS": {
		name: "DIY VPS",
		status: "in-progress",
		description: "DIY VPS projects and tutorials",
	},
	DBMS: {
		name: "DBMS",
		status: "in-progress",
		description:
			"As I want to know more about the database, I will be learning about the database.",
	},
};

export function getAllTopics(): Topic[] {
	const blogs = getAllBlogs();
	const notes = getAllNotes();

	const topicMap = new Map<string, Topic>();

	// Process configured topics first
	for (const [slug, config] of Object.entries(topicConfigs)) {
		topicMap.set(slug, {
			slug,
			name: config.name,
			status: config.status,
			description: config.description,
			blogs: [],
			notes: [],
			lastUpdated: "",
		});
	}

	// Add blogs to topics
	for (const blog of blogs) {
		const topicSlug = blog.topic;
		if (!topicSlug) continue;

		if (!topicMap.has(topicSlug)) {
			topicMap.set(topicSlug, {
				slug: topicSlug,
				name: topicSlug
					.split("-")
					.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
					.join(" "),
				status: "todo",
				blogs: [],
				notes: [],
				lastUpdated: "",
			});
		}
		topicMap.get(topicSlug)!.blogs.push(blog);
	}

	// Add notes to topics
	for (const note of notes) {
		const topicSlug = note.topic;
		if (!topicSlug) continue;

		if (!topicMap.has(topicSlug)) {
			topicMap.set(topicSlug, {
				slug: topicSlug,
				name: topicSlug
					.split("-")
					.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
					.join(" "),
				status: "todo",
				blogs: [],
				notes: [],
				lastUpdated: "",
			});
		}
		topicMap.get(topicSlug)!.notes.push(note);
	}

	// Calculate last updated date and filter empty topics
	const topics: Topic[] = [];
	for (const topic of topicMap.values()) {
		if (topic.blogs.length === 0 && topic.notes.length === 0) continue;

		const dates = [
			...topic.blogs.map((p) => p.date || ""),
			...topic.notes.map((n) => n.date || ""),
		]
			.filter(Boolean)
			.sort()
			.reverse();

		topic.lastUpdated = dates[0] || "";
		topics.push(topic);
	}

	// Sort by last updated
	return topics.sort((a, b) =>
		(b.lastUpdated || "").localeCompare(a.lastUpdated || ""),
	);
}

export function getTopicBySlug(slug: string): Topic | undefined {
	return getAllTopics().find((t) => t.slug === slug);
}

export function getTopicsGroupedByStatus(): Record<TopicStatus, Topic[]> {
	const topics = getAllTopics();
	const grouped: Record<TopicStatus, Topic[]> = {
		todo: [],
		"in-progress": [],
		pending: [],
		done: [],
		stop: [],
	};

	for (const topic of topics) {
		grouped[topic.status].push(topic);
	}

	return grouped;
}
