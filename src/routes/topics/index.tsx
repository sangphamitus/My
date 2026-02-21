import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
	getAllTopics,
	topicStatusLabels,
	type TopicStatus,
} from "../../lib/topics";

export const Route = createFileRoute("/topics/")({
	component: TopicsPage,
});

const statusOrder: TopicStatus[] = [
	"in-progress",
	"todo",
	"pending",
	"done",
	"stop",
];

function TopicsPage() {
	const topics = getAllTopics();
	const [activeStatus, setActiveStatus] = useState<TopicStatus | null>(null);

	const filteredTopics = activeStatus
		? topics.filter((t) => t.status === activeStatus)
		: topics;

	const sortedTopics = [...filteredTopics].sort((a, b) => {
		const aIdx = statusOrder.indexOf(a.status);
		const bIdx = statusOrder.indexOf(b.status);
		if (aIdx !== bIdx) return aIdx - bIdx;
		return (b.lastUpdated || "").localeCompare(a.lastUpdated || "");
	});

	return (
		<div>
			<div className="paper">
				<h1>Topics</h1>
				<p className="post-excerpt" style={{ marginTop: "-0.5rem" }}>
					Projects and areas I'm exploring, organized by status.
				</p>

				<div className="filter-section" style={{ marginTop: "1.5rem" }}>
					<span className="filter-label">Filter by status</span>
					<div className="filter-tags">
						<button
							type="button"
							className={`filter-tag ${activeStatus === null ? "active" : ""}`}
							onClick={() => setActiveStatus(null)}
						>
							All
						</button>
						{statusOrder.map((status) => (
							<button
								type="button"
								key={status}
								className={`filter-tag status-filter-${status} ${activeStatus === status ? "active" : ""}`}
								onClick={() => setActiveStatus(status)}
							>
								{topicStatusLabels[status]}
							</button>
						))}
					</div>
				</div>

				{sortedTopics.length === 0 ? (
					<p className="empty-state">No topics found.</p>
				) : (
					<div className="topics-grid">
						{sortedTopics.map((topic) => (
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
									{topic.lastUpdated && (
										<>
											<span>·</span>
											<span>Updated {topic.lastUpdated}</span>
										</>
									)}
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
