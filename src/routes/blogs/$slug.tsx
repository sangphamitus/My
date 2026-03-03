import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BackToTop } from "../../components/BackToTop";
import { ArticleReferences } from "../../components/ArticleReferences";
import { MarkdownContent } from "../../components/MarkdownContent";
import { ReadingProgress } from "../../components/ReadingProgress";
import { TableOfContents } from "../../components/TableOfContents";
import { ArticleHeader, BackLink, NotFound, Paper } from "../../components/ui";
import { getBlogBySlug } from "../../lib/blogs";

export const Route = createFileRoute("/blogs/$slug")({
	component: BlogPage,
});

function BlogPage() {
	const params = useParams({ from: "/blogs/$slug" });
	const slug = params.slug || "";
	const blog = getBlogBySlug(slug);
	const articleRef = useRef<HTMLDivElement>(null);
	const bodyRef = useRef<HTMLDivElement>(null);
	const [activeTocId, setActiveTocId] = useState<string | null>(null);

	// Highlight current section in TOC as user scrolls
	useEffect(() => {
		const body = bodyRef.current;
		if (!body || !blog) return;

		const headings = body.querySelectorAll<HTMLElement>("h2[id], h3[id], h4[id]");
		if (headings.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((e) => e.isIntersecting);
				if (visible.length === 0) return;
				// Pick the heading closest to the top of the viewport
				const sorted = [...visible].sort(
					(a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0)
				);
				const id = sorted[0].target.id;
				if (id) setActiveTocId(id);
			},
			{ rootMargin: "-80px 0px -60% 0px", threshold: 0 }
		);

		headings.forEach((h) => observer.observe(h));
		return () => observer.disconnect();
	}, [blog]);

	if (!blog) {
		return (
			<NotFound
				title="Blog not found"
				message="The blog you're looking for doesn't exist."
				linkTo="/blogs"
				linkLabel="Back to Blogs"
			/>
		);
	}

	return (
		<div>
			<BackLink to="/blogs" label="Back to Blogs" />

			<div ref={articleRef}>
				<Paper>
					<ArticleHeader
						title={blog.title}
						date={blog.date}
						topic={blog.topic}
						tags={blog.tags}
						wordCount={blog.wordCount}
						readTimeMinutes={blog.readTimeMinutes}
					/>

					<div className="article-layout">
						<div ref={bodyRef} className="article-body">
							<MarkdownContent content={blog.content} basePath={blog.basePath} />
							{blog.references && blog.references.length > 0 && (
								<ArticleReferences items={blog.references} />
							)}
						</div>
						{blog.toc.length > 0 && (
							<aside className="article-toc">
								<TableOfContents items={blog.toc} activeId={activeTocId} />
							</aside>
						)}
					</div>
				</Paper>
			</div>

			<ReadingProgress articleRef={articleRef} />
			<BackToTop />
		</div>
	);
}
