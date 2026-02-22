import { createFileRoute, useParams } from "@tanstack/react-router";
import { MarkdownContent } from "../../components/MarkdownContent";
import { TableOfContents } from "../../components/TableOfContents";
import { ArticleHeader, BackLink, NotFound, Paper } from "../../components/ui";
import { getPostBySlug } from "../../lib/posts";

export const Route = createFileRoute("/blogs/$slug")({
	component: PostPage,
});

function PostPage() {
	const params = useParams({ from: "/blogs/$slug" });
	const slug = params.slug || "";
	const post = getPostBySlug(slug);

	if (!post) {
		return (
			<NotFound
				title="Post not found"
				message="The post you're looking for doesn't exist."
				linkTo="/blogs"
				linkLabel="Back to Blog"
			/>
		);
	}

	return (
		<div>
			<BackLink to="/blogs" label="Back to Blog" />

			<Paper>
				<ArticleHeader
					title={post.title}
					date={post.date}
					topic={post.topic}
					tags={post.tags}
				/>

				{post.toc.length > 0 && <TableOfContents items={post.toc} />}

				<MarkdownContent content={post.content} basePath={post.basePath} />
			</Paper>
		</div>
	);
}
