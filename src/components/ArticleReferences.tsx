import type { Reference } from "../lib/blogs";

type ArticleReferencesProps = {
	items: Reference[];
};

export function ArticleReferences({ items }: ArticleReferencesProps) {
	if (items.length === 0) return null;

	return (
		<footer className="article-references">
			<h2 className="article-references-title">References</h2>
			<ol className="article-references-list">
				{items.map((ref, i) => (
					<li key={i} className="article-references-item">
						<a
							href={ref.url}
							target="_blank"
							rel="noopener noreferrer"
							className="article-references-link"
						>
							{ref.title}
						</a>
						<span className="article-references-url" aria-hidden>
							{ref.url}
						</span>
					</li>
				))}
			</ol>
		</footer>
	);
}
