import { createFileRoute } from "@tanstack/react-router";
import { getAllPosts } from "../lib/posts";
import { getAllNotes } from "../lib/notes";
import { getAllTopics } from "../lib/topics";
import {
	Paper,
	PageHeader,
	SectionHeader,
	PostList,
	Timeline,
	TopicGrid,
	EmptyState,
} from "../components/ui";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const posts = getAllPosts().slice(0, 3);
	const notes = getAllNotes().slice(0, 5);
	const topics = getAllTopics().slice(0, 4);

	return (
		<div>
			<Paper variant="intro">
				<PageHeader
					title="Welcome"
					description="A quiet space for thoughts, ideas, and notes."
					variant="centered"
				/>
			</Paper>

			{topics.length > 0 && (
				<Paper>
					<SectionHeader title="Active Topics" linkTo="/topics" />
					<TopicGrid topics={topics} showLastUpdated={false} />
				</Paper>
			)}

			<Paper>
				<SectionHeader title="Recent Posts" linkTo="/blogs" />
				{posts.length === 0 ? (
					<EmptyState message="No posts yet." />
				) : (
					<PostList posts={posts} basePath="/blogs" />
				)}
			</Paper>

			<Paper>
				<SectionHeader title="Recent Notes" linkTo="/notes" />
				{notes.length === 0 ? (
					<EmptyState message="No notes yet." />
				) : (
					<Timeline items={notes} basePath="/notes" compact />
				)}
			</Paper>
		</div>
	);
}
