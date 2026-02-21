import { Link } from "@tanstack/react-router";
import { StatusBadge } from "./StatusBadge";
import type { Topic } from "../../lib/topics";

type TopicCardProps = {
	topic: Topic;
	showLastUpdated?: boolean;
};

export function TopicCard({ topic, showLastUpdated = true }: TopicCardProps) {
	return (
		<Link to={`/topics/${topic.slug}`} className="topic-card">
			<div className="topic-card-header">
				<h3 className="topic-card-title">{topic.name}</h3>
				<StatusBadge status={topic.status} />
			</div>
			{topic.description && (
				<p className="topic-card-desc">{topic.description}</p>
			)}
			<div className="topic-card-meta">
				<span>{topic.posts.length} posts</span>
				<span>·</span>
				<span>{topic.notes.length} notes</span>
				{showLastUpdated && topic.lastUpdated && (
					<>
						<span>·</span>
						<span>Updated {topic.lastUpdated}</span>
					</>
				)}
			</div>
		</Link>
	);
}

type TopicGridProps = {
	topics: Topic[];
	showLastUpdated?: boolean;
};

export function TopicGrid({ topics, showLastUpdated = true }: TopicGridProps) {
	return (
		<div className="topics-grid">
			{topics.map((topic) => (
				<TopicCard
					key={topic.slug}
					topic={topic}
					showLastUpdated={showLastUpdated}
				/>
			))}
		</div>
	);
}
