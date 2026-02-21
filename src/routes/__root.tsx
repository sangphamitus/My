import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect, useState } from "react";

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: () => {
		return (
			<div className="app-container">
				<div className="main-content">
					<div className="paper not-found">
						<h1>404</h1>
						<p>Page not found</p>
						<Link to="/" className="not-found-link">
							Go Home
						</Link>
					</div>
				</div>
			</div>
		);
	},
});

function RootComponent() {
	const [isDark, setIsDark] = useState(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("theme");
			if (saved) return saved === "dark";
			return window.matchMedia("(prefers-color-scheme: dark)").matches;
		}
		return false;
	});

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		localStorage.setItem("theme", isDark ? "dark" : "light");
	}, [isDark]);

	const toggleTheme = () => {
		setIsDark(!isDark);
	};

	return (
		<div className="app-container">
			<nav className="nav">
				<div className="nav-inner">
					<Link to="/" className="nav-brand">
						My Paper
					</Link>
					<div className="nav-links">
						<Link
							to="/"
							className="nav-link"
							activeProps={{ className: "nav-link active" }}
							activeOptions={{ exact: true }}
						>
							Home
						</Link>
						<Link
							to="/blogs"
							className="nav-link"
							activeProps={{ className: "nav-link active" }}
						>
							Blog
						</Link>
						<Link
							to="/notes"
							className="nav-link"
							activeProps={{ className: "nav-link active" }}
						>
							Notes
						</Link>
						<Link
							to="/topics"
							className="nav-link"
							activeProps={{ className: "nav-link active" }}
						>
							Topics
						</Link>
						<Link
							to="/about"
							className="nav-link"
							activeProps={{ className: "nav-link active" }}
						>
							About
						</Link>
						<button
							onClick={toggleTheme}
							className="theme-toggle"
							title={isDark ? "Switch to light mode" : "Switch to dark mode"}
							aria-label="Toggle theme"
						>
							{isDark ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<circle cx="12" cy="12" r="5" />
									<line x1="12" y1="1" x2="12" y2="3" />
									<line x1="12" y1="21" x2="12" y2="23" />
									<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
									<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
									<line x1="1" y1="12" x2="3" y2="12" />
									<line x1="21" y1="12" x2="23" y2="12" />
									<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
									<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
								</svg>
							)}
						</button>
					</div>
				</div>
			</nav>
			<main className="main-content">
				<Outlet />
			</main>
			<footer className="footer">
				<p>Built with love and paper</p>
			</footer>
			<TanStackRouterDevtools position="bottom-right" />
		</div>
	);
}
