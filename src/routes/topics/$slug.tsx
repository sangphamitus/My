import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { getTopicBySlug, topicStatusLabels } from "../../lib/topics";

export const Route = createFileRoute("/topics/$slug")({
	component: TopicPage,
});

function TopicPage() {
	const params = useParams({ from: "/topics/$slug" });
	const slug = params.slug || "";
	const topic = getTopicBySlug(slug);

	if (!topic) {
		return (
			<div className="paper not-found">
				<h1>Topic not found</h1>
				<p>The topic you're looking for doesn't exist.</p>
				<Link to="/topics" className="not-found-link">
					Back to Topics
				</Link>
			</div>
		);
	}

	return (
		<div>
			<Link to="/topics" className="back-link">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<line x1="19" y1="12" x2="5" y2="12" />
					<polyline points="12 19 5 12 12 5" />
				</svg>
				Back to Topics
			</Link>

			<div className="paper">
				<div className="topic-header">
					<h1>{topic.name}</h1>
					<span className={`status-badge status-${topic.status}`}>
						{topicStatusLabels[topic.status]}
					</span>
				</div>
				{topic.description && (
					<p className="post-excerpt" style={{ marginTop: "0.5rem" }}>
						{topic.description}
					</p>
				)}
			</div>

			{topic.posts.length > 0 && (
				<div className="paper">
					<div className="section-header">
						<h2 className="section-title">Posts ({topic.posts.length})</h2>
					</div>
					<ul className="post-list">
						{topic.posts.map((post) => (
							<li key={post.slug} className="post-item">
								<Link to={`/blogs/${post.slug}`} className="post-title">
									{post.title}
								</Link>
								<div className="post-meta">
									{post.date && <span className="post-date">{post.date}</span>}
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
								{post.excerpt && (
									<p className="post-excerpt">{post.excerpt}</p>
								)}
							</li>
						))}
					</ul>
				</div>
			)}

			{topic.notes.length > 0 && (
				<div className="paper">
					<div className="section-header">
						<h2 className="section-title">Notes ({topic.notes.length})</h2>
					</div>
					<div className="timeline timeline-compact">
						{topic.notes.map((note) => (
							<div key={note.slug} className="timeline-item">
								<div className="timeline-dot" />
								<div className="timeline-content">
									<Link to={`/notes/${note.slug}`} className="timeline-title">
										{note.title}
									</Link>
									<div className="timeline-meta">
										{note.date && (
											<span className="timeline-date">
												{new Date(note.date).toLocaleDateString("en-US", {
													month: "short",
													day: "numeric",
												})}
											</span>
										)}
										{note.tags && note.tags.length > 0 && (
											<div className="tags">
												{note.tags.map((tag) => (
													<span key={tag} className="tag">
														{tag}
													</span>
												))}
											</div>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{topic.posts.length === 0 && topic.notes.length === 0 && (
				<div className="paper">
					<p className="empty-state">No content in this topic yet.</p>
				</div>
			)}
		</div>
	);
}
