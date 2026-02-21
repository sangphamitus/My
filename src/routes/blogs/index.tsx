import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { getAllPosts, getUniqueTopics } from "../../lib/posts";
import { SearchInput } from "../../components/SearchInput";

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

	return (
		<div>
			<div className="paper">
				<h1>Blog</h1>
				<p className="post-excerpt" style={{ marginTop: "-0.5rem" }}>
					Thoughts, ideas, and longer explorations.
				</p>

				<div className="filter-section" style={{ marginTop: "1.5rem" }}>
					<SearchInput
						value={searchQuery}
						onChange={setSearchQuery}
						placeholder="Search posts..."
					/>
				</div>

				{allTopics.length > 0 && (
					<div className="filter-section">
						<span className="filter-label">Filter by topic</span>
						<div className="filter-tags">
							<button
								type="button"
								className={`filter-tag ${activeTopic === null ? "active" : ""}`}
								onClick={() => setActiveTopic(null)}
							>
								All
							</button>
							{allTopics.map((topic) => (
								<button
									type="button"
									key={topic}
									className={`filter-tag ${activeTopic === topic ? "active" : ""}`}
									onClick={() => setActiveTopic(topic)}
								>
									{topic}
								</button>
							))}
						</div>
					</div>
				)}

				{allTags.length > 0 && (
					<div className="filter-section">
						<span className="filter-label">Filter by tag</span>
						<div className="filter-tags">
							<button
								type="button"
								className={`filter-tag ${activeTag === null ? "active" : ""}`}
								onClick={() => setActiveTag(null)}
							>
								All
							</button>
							{allTags.map((tag) => (
								<button
									type="button"
									key={tag}
									className={`filter-tag ${activeTag === tag ? "active" : ""}`}
									onClick={() => setActiveTag(tag)}
								>
									{tag}
								</button>
							))}
						</div>
					</div>
				)}

				{filteredPosts.length === 0 ? (
					<p className="empty-state">
						{searchQuery
							? `No posts matching "${searchQuery}".`
							: activeTopic
								? `No posts in topic "${activeTopic}".`
								: activeTag
									? `No posts with tag "${activeTag}".`
									: "No posts yet."}
					</p>
				) : (
					<ul className="post-list">
						{filteredPosts.map((post) => (
							<li key={post.slug} className="post-item">
								<Link to={`/blogs/${post.slug}`} className="post-title">
									{post.title}
								</Link>
								<div className="post-meta">
									{post.date && <span className="post-date">{post.date}</span>}
									{post.topic && (
										<Link
											to={`/topics/${post.topic}`}
											className="topic-link"
										>
											{post.topic}
										</Link>
									)}
									{post.tags && post.tags.length > 0 && (
										<div className="tags">
											{post.tags.map((tag) => (
												<span key={tag} className="tag">
													{tag}
												</span>
											))}
										</div>
									)}
								</div>
								{post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
