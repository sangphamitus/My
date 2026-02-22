import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SearchInput } from "../../components/SearchInput";
import {
	EmptyState,
	FilterTags,
	PageHeader,
	Paper,
	EntryList,
} from "../../components/ui";
import { getAllBlogs, getUniqueTopics } from "../../lib/blogs";

export const Route = createFileRoute("/blogs/")({
	component: BlogsPage,
});

function BlogsPage() {
	const blogs = getAllBlogs();
	const allTopics = getUniqueTopics();
	const [activeTag, setActiveTag] = useState<string | null>(null);
	const [activeTopic, setActiveTopic] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	const allTags = useMemo(() => {
		const tagSet = new Set<string>();
		blogs.forEach((blog) => {
			blog.tags?.forEach((tag) => tagSet.add(tag));
		});
		return Array.from(tagSet).sort();
	}, [blogs]);

	const filteredBlogs = useMemo(() => {
		let result = blogs;

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter((blog) => {
				const titleMatch = blog.title.toLowerCase().includes(query);
				const contentMatch = blog.content.toLowerCase().includes(query);
				const tagMatch =
					blog.tags?.some((tag) => tag.toLowerCase().includes(query)) || false;
				return titleMatch || contentMatch || tagMatch;
			});
		}

		if (activeTag) {
			result = result.filter((blog) => blog.tags?.includes(activeTag));
		}

		if (activeTopic) {
			result = result.filter((blog) => blog.topic === activeTopic);
		}

		return result;
	}, [blogs, activeTag, activeTopic, searchQuery]);

	const getEmptyMessage = () => {
		if (searchQuery) return `No blogs matching "${searchQuery}".`;
		if (activeTopic) return `No blogs in topic "${activeTopic}".`;
		if (activeTag) return `No blogs with tag "${activeTag}".`;
		return "No blogs yet.";
	};

	return (
		<div>
			<Paper>
				<PageHeader
					title="Blogs"
					description="Thoughts, ideas, and longer explorations."
				/>

				<div className="filter-section" style={{ marginTop: "1.5rem" }}>
					<SearchInput
						value={searchQuery}
						onChange={setSearchQuery}
						placeholder="Search blogs..."
					/>
				</div>

				<FilterTags
					label="Filter by topic"
					items={allTopics}
					activeItem={activeTopic}
					onSelect={setActiveTopic}
				/>

				<FilterTags
					label="Filter by tag"
					items={allTags}
					activeItem={activeTag}
					onSelect={setActiveTag}
				/>

				{filteredBlogs.length === 0 ? (
					<EmptyState message={getEmptyMessage()} />
				) : (
					<EntryList items={filteredBlogs} basePath="/blogs" />
				)}
			</Paper>
		</div>
	);
}
