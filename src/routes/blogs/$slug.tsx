import { createFileRoute, useParams } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "../../lib/posts";

export const Route = createFileRoute("/blogs/$slug")({
	component: PostPage,
});

function PostPage() {
	const params = useParams() as { slug?: string };
	const slug = params.slug || "";
	const post = getPostBySlug(slug);

	if (!post) {
		return (
			<div className="page-wrap">
				<div className="paper">
					<h1>Post not found</h1>
				</div>
			</div>
		);
	}

	return (
		<div className="page-wrap">
			<div className="paper">
				<h1>{post.title}</h1>
				{post.date && <div className="muted">{post.date}</div>}
				<div className="content">
					<ReactMarkdown>{post.content}</ReactMarkdown>
				</div>
			</div>
		</div>
	);
}
