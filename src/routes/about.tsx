import { createFileRoute } from "@tanstack/react-router";
import { Paper, PageHeader } from "../components/ui";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	return (
		<Paper>
			<PageHeader title="About" />
			<div className="about-content">
				<p>
					Welcome to my personal space on the web. This is where I share my
					thoughts, document my learning journey, and keep notes on what I'm
					working on.
				</p>

				<h2>What You'll Find Here</h2>
				<ul>
					<li>
						<strong>Blog</strong> — Long-form articles on topics I find
						interesting
					</li>
					<li>
						<strong>Notes</strong> — A timeline of quick notes and logs of what
						I'm working on or learning
					</li>
					<li>
						<strong>Topics</strong> — Projects and areas organized by status
					</li>
				</ul>

				<h2>About This Site</h2>
				<p>
					This site is built with simplicity in mind, inspired by the feel of
					paper. It supports both light and dark themes, and all content is
					written in Markdown.
				</p>

				<h3>Tech Stack</h3>
				<ul>
					<li>React with TypeScript</li>
					<li>TanStack Router for file-based routing</li>
					<li>Tailwind CSS for styling</li>
					<li>Vite for development</li>
					<li>Markdown for content</li>
				</ul>
			</div>
		</Paper>
	);
}
