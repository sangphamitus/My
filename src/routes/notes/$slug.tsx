import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { getNoteBySlug } from "../../lib/notes";
import { TableOfContents } from "../../components/TableOfContents";
import { MarkdownContent } from "../../components/MarkdownContent";

export const Route = createFileRoute("/notes/$slug")({
	component: NotePage,
});

function NotePage() {
	const params = useParams({ from: "/notes/$slug" });
	const slug = params.slug || "";
	const note = getNoteBySlug(slug);

	if (!note) {
		return (
			<div className="paper not-found">
				<h1>Note not found</h1>
				<p>The note you're looking for doesn't exist.</p>
				<Link to="/notes" className="not-found-link">
					Back to Notes
				</Link>
			</div>
		);
	}

	return (
		<div>
			<Link to="/notes" className="back-link">
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
				Back to Notes
			</Link>

			<article className="paper">
				<header className="article-header">
					<h1 className="article-title">{note.title}</h1>
					<div className="article-meta">
						{note.date && <span>{note.date}</span>}
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
				</header>

				{note.toc.length > 0 && <TableOfContents items={note.toc} />}

				<MarkdownContent content={note.content} basePath={note.basePath} />
			</article>
		</div>
	);
}
