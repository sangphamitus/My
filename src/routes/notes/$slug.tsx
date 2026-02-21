import { createFileRoute, useParams } from "@tanstack/react-router";
import { getNoteBySlug } from "../../lib/notes";
import { TableOfContents } from "../../components/TableOfContents";
import { MarkdownContent } from "../../components/MarkdownContent";
import { Paper, BackLink, ArticleHeader, NotFound } from "../../components/ui";

export const Route = createFileRoute("/notes/$slug")({
	component: NotePage,
});

function NotePage() {
	const params = useParams({ from: "/notes/$slug" });
	const slug = params.slug || "";
	const note = getNoteBySlug(slug);

	if (!note) {
		return (
			<NotFound
				title="Note not found"
				message="The note you're looking for doesn't exist."
				linkTo="/notes"
				linkLabel="Back to Notes"
			/>
		);
	}

	return (
		<div>
			<BackLink to="/notes" label="Back to Notes" />

			<Paper>
				<ArticleHeader
					title={note.title}
					date={note.date}
					topic={note.topic}
					tags={note.tags}
				/>

				{note.toc.length > 0 && <TableOfContents items={note.toc} />}

				<MarkdownContent content={note.content} basePath={note.basePath} />
			</Paper>
		</div>
	);
}
