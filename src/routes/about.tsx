import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: About,
});
function About() {
	return (
		<div className="page-wrap">
			<div className="paper">
				<h1>About</h1>
				<p>
					This is a minimal blog demo created with Vite + TanStack Router +
					Tailwind CSS.
				</p>
				<h2>Features</h2>
				<ul>
					<li>Markdown support for blog posts</li>
					<li>Tag system for organizing content</li>
					<li>Dark and light theme support</li>
					<li>Paper-like design with responsive layout</li>
					<li>Fast and lightweight</li>
				</ul>
			</div>
		</div>
	);
}
