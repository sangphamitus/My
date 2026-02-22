import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Paper } from "../components/ui";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	return (
		<Paper>
			<PageHeader title="About" />
			<div className="about-content">
				<h2>About Me</h2>
				<p>
					I'm Merlin, a software developer focused on full-stack and mobile
					development. I enjoy turning ideas into working products and keep
					learning across the stack— from React and TypeScript on the front to
					backend and cross-platform apps.
				</p>
				<p>
					I studied Information Technology at Vietnam National University –
					University of Science. Professionally I've worked on web and React
					Native apps: booking platforms, crew and operations tools, and
					Atlassian plugins. I also did research on multi-object tracking (MEX),
					published at ATC 2024.
				</p>
				<p>
					You can find me on{" "}
					<a
						href="https://linkedin.com/in/ppsang"
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn
					</a>{" "}
					and{" "}
					<a
						href="https://github.com/sangphamitus"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</a>
					.
				</p>

				<h2>About This Site (Bored Site)</h2>
				<p>
					This is my personal corner on the web—a place for thoughts, notes, and
					the occasional blog when there’s nothing else to do. No fancy stuff,
					just a quiet space to write and organize what I’m learning and
					building.
				</p>

				<h3>What You'll Find Here</h3>
				<ul>
					<li>
						<strong>Blogs</strong> — Longer articles on topics I care about
					</li>
					<li>
						<strong>Notes</strong> — A timeline of what I’m working on or
						learning
					</li>
					<li>
						<strong>Topics</strong> — Projects and areas, grouped by status
					</li>
				</ul>
			</div>
		</Paper>
	);
}
