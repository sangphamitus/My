import { createFileRoute, useParams } from "@tanstack/react-router";
import {
	BackLink,
	EmptyState,
	NotFound,
	Paper,
	PostList,
	SectionHeader,
	StatusBadge,
	Timeline,
} from "../../components/ui";
import { getTopicBySlug } from "../../lib/topics";

export const Route = createFileRoute("/topics/$slug")({
	component: TopicPage,
});

function TopicPage() {
	const params = useParams({ from: "/topics/$slug" });
	const slug = params.slug || "";
	const topic = getTopicBySlug(slug);

	if (!topic) {
		return (
			<NotFound
				title="Topic not found"
				message="The topic you're looking for doesn't exist."
				linkTo="/topics"
				linkLabel="Back to Topics"
			/>
		);
	}

	return (
		<div>
			<BackLink to="/topics" label="Back to Topics" />

			<Paper>
				<div className="topic-header">
					<h1>{topic.name}</h1>
					<StatusBadge status={topic.status} />
				</div>
				{topic.description && (
					<p className="post-excerpt" style={{ marginTop: "0.5rem" }}>
						{topic.description}
					</p>
				)}
			</Paper>

			{topic.posts.length > 0 && (
				<Paper>
					<SectionHeader title={`Posts (${topic.posts.length})`} />
					<PostList posts={topic.posts} basePath="/blogs" />
				</Paper>
			)}

			{topic.notes.length > 0 && (
				<Paper>
					<SectionHeader title={`Notes (${topic.notes.length})`} />
					<Timeline items={topic.notes} basePath="/notes" compact />
				</Paper>
			)}

			{topic.posts.length === 0 && topic.notes.length === 0 && (
				<Paper>
					<EmptyState message="No content in this topic yet." />
				</Paper>
			)}
		</div>
	);
}
