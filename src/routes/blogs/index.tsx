import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllPosts } from "../../lib/posts";

export const Route = createFileRoute("/blogs/")({
	component: Blogs,
});
function Blogs() {
	const posts = getAllPosts();

	return (
		<div className="page-wrap">
			<div className="paper">
				<h1>Blogs</h1>
				{posts.length === 0 && <p>No posts yet.</p>}
				<ul className="blog-list">
					{posts.map((p) => (
						<li key={p.slug}>
							<Link to={`/blogs/${p.slug}`}>{p.title}</Link>
							{p.date && <span>{p.date}</span>}
							{p.tags && p.tags.length > 0 && (
								<div className="blog-tags">
									{p.tags.map((tag) => (
										<span key={tag} className="blog-tag">
											{tag}
										</span>
									))}
								</div>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
