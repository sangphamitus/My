import { createFileRoute } from "@tanstack/react-router";
import { getAllBlogs } from "../lib/blogs";
import { getAllNotes } from "../lib/notes";
import { getAllTopics } from "../lib/topics";
import {
	Paper,
	PageHeader,
	SectionHeader,
	EntryList,
	Timeline,
	TopicGrid,
	EmptyState,
} from "../components/ui";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const blogs = getAllBlogs().slice(0, 3);
	const notes = getAllNotes().slice(0, 5);
	const topics = getAllTopics().slice(0, 4);

	return (
		<div>
			<Paper variant="intro">
				<PageHeader
					title="The Crafts Site"
					description="A quiet corner for thoughts, notes, and the occasional blog. Nothing fancy."
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
				<SectionHeader title="Recent Blogs" linkTo="/blogs" />
				{blogs.length === 0 ? (
					<EmptyState message="No blogs yet." />
				) : (
					<EntryList items={blogs} basePath="/blogs" />
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
