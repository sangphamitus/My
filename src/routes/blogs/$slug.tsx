import { createFileRoute, useParams } from "@tanstack/react-router";
import { MarkdownContent } from "../../components/MarkdownContent";
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

			<Paper>
				<ArticleHeader
					title={blog.title}
					date={blog.date}
					topic={blog.topic}
					tags={blog.tags}
				/>

				{blog.toc.length > 0 && <TableOfContents items={blog.toc} />}

				<MarkdownContent content={blog.content} basePath={blog.basePath} />
			</Paper>
		</div>
	);
}
