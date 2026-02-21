import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllPosts } from "../lib/posts";
import { getAllNotes } from "../lib/notes";
import { getAllTopics, topicStatusLabels } from "../lib/topics";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const posts = getAllPosts().slice(0, 3);
	const notes = getAllNotes().slice(0, 5);
	const topics = getAllTopics().slice(0, 4);

	return (
		<div>
			<div className="paper intro">
				<h1 className="intro-title">Welcome</h1>
				<p className="intro-text">
					A quiet space for thoughts, ideas, and notes.
				</p>
			</div>

			{topics.length > 0 && (
				<div className="paper">
					<div className="section-header">
						<h2 className="section-title">Active Topics</h2>
						<Link to="/topics" className="section-link">
							View all →
						</Link>
					</div>

					<div className="topics-grid">
						{topics.map((topic) => (
							<Link
								key={topic.slug}
								to={`/topics/${topic.slug}`}
								className="topic-card"
							>
								<div className="topic-card-header">
									<h3 className="topic-card-title">{topic.name}</h3>
									<span className={`status-badge status-${topic.status}`}>
										{topicStatusLabels[topic.status]}
									</span>
								</div>
								{topic.description && (
									<p className="topic-card-desc">{topic.description}</p>
								)}
								<div className="topic-card-meta">
									<span>{topic.posts.length} posts</span>
									<span>·</span>
									<span>{topic.notes.length} notes</span>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}

			<div className="paper">
				<div className="section-header">
					<h2 className="section-title">Recent Posts</h2>
					<Link to="/blogs" className="section-link">
						View all →
					</Link>
				</div>

				{posts.length === 0 ? (
					<p className="empty-state">No posts yet.</p>
				) : (
					<ul className="post-list">
						{posts.map((post) => (
							<li key={post.slug} className="post-item">
								<Link to={`/blogs/${post.slug}`} className="post-title">
									{post.title}
								</Link>
								<div className="post-meta">
									{post.date && <span className="post-date">{post.date}</span>}
									{post.topic && (
										<Link to={`/topics/${post.topic}`} className="topic-link">
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

			<div className="paper">
				<div className="section-header">
					<h2 className="section-title">Recent Notes</h2>
					<Link to="/notes" className="section-link">
						View all →
					</Link>
				</div>

				{notes.length === 0 ? (
					<p className="empty-state">No notes yet.</p>
				) : (
					<div className="timeline timeline-compact">
						{notes.map((note) => (
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
										{note.topic && (
											<Link to={`/topics/${note.topic}`} className="topic-link">
												{note.topic}
											</Link>
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
				)}
			</div>
		</div>
	);
}
