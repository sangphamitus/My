import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState } from "react";

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: () => {
		return (
			<div>
				<p>This is the notFoundComponent configured on root route</p>
				<Link to="/">Start Over</Link>
			</div>
		);
	},
});

function RootComponent() {
	const [isDark, setIsDark] = useState(true);

	const toggleTheme = () => {
		setIsDark(!isDark);
		if (!isDark) {
			document.documentElement.classList.remove("light");
		} else {
			document.documentElement.classList.add("light");
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900">
			<nav className="border-b border-slate-700/50 px-6 py-4 backdrop-blur-xl bg-slate-900/30">
				<div className="max-w-6xl mx-auto flex items-center justify-between">
					<div className="flex gap-1 items-center">
						<Link
							to="/"
							className="nav-link"
							activeProps={{
								className: "active",
							}}
							activeOptions={{ exact: true }}
						>
							Home
						</Link>
						<Link
							to="/about"
							className="nav-link"
							activeProps={{
								className: "active",
							}}
						>
							About
						</Link>
						<Link
							to="/blogs"
							className="nav-link"
							activeProps={{
								className: "active",
							}}
						>
							Blogs
						</Link>
						<Link
							to="/playground"
							className="nav-link"
							activeProps={{
								className: "active",
							}}
						>
							Playground
						</Link>
					</div>
					<button
						onClick={toggleTheme}
						className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors text-sm font-medium"
						title="Toggle theme"
					>
						{isDark ? "☀️" : "🌙"}
					</button>
				</div>
			</nav>
			<main className="flex-1 px-4 py-8 max-w-6xl mx-auto w-full">
				<Outlet />
			</main>
			<TanStackRouterDevtools position="bottom-right" />
		</div>
	);
}
