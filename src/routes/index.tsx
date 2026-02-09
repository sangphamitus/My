import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<div className="page-wrap">
			<div className="paper">
				<h1>Welcome to My News</h1>
				<p className="text-lg text-slate-300 mt-4">
					A simple, beautiful, and reader-friendly blog with paper-like styling.
				</p>
				<div className="mt-6 space-y-4">
					<p>Explore my thoughts and articles on various topics.</p>
					<Link
						to="/blogs"
						className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
					>
						Read Blogs →
					</Link>
				</div>
			</div>
		</div>
	);
}
