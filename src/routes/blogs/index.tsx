import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SearchInput } from "../../components/SearchInput";
import {
	EmptyState,
	FilterTags,
	PageHeader,
	Paper,
	PostList,
} from "../../components/ui";
import { getAllPosts, getUniqueTopics } from "../../lib/posts";

export const Route = createFileRoute("/blogs/")({
	component: BlogsPage,
});

function BlogsPage() {
	const posts = getAllPosts();
	const allTopics = getUniqueTopics();
	const [activeTag, setActiveTag] = useState<string | null>(null);
	const [activeTopic, setActiveTopic] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	const allTags = useMemo(() => {
		const tagSet = new Set<string>();
		posts.forEach((post) => {
			post.tags?.forEach((tag) => tagSet.add(tag));
		});
		return Array.from(tagSet).sort();
	}, [posts]);

	const filteredPosts = useMemo(() => {
		let result = posts;

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter((post) => {
				const titleMatch = post.title.toLowerCase().includes(query);
				const contentMatch = post.content.toLowerCase().includes(query);
				const tagMatch =
					post.tags?.some((tag) => tag.toLowerCase().includes(query)) || false;
				return titleMatch || contentMatch || tagMatch;
			});
		}

		if (activeTag) {
			result = result.filter((post) => post.tags?.includes(activeTag));
		}

		if (activeTopic) {
			result = result.filter((post) => post.topic === activeTopic);
		}

		return result;
	}, [posts, activeTag, activeTopic, searchQuery]);

	const getEmptyMessage = () => {
		if (searchQuery) return `No posts matching "${searchQuery}".`;
		if (activeTopic) return `No posts in topic "${activeTopic}".`;
		if (activeTag) return `No posts with tag "${activeTag}".`;
		return "No posts yet.";
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
						placeholder="Search posts..."
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

				{filteredPosts.length === 0 ? (
					<EmptyState message={getEmptyMessage()} />
				) : (
					<PostList posts={filteredPosts} basePath="/blogs" />
				)}
			</Paper>
		</div>
	);
}
