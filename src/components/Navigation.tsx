import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = {
	to: string;
	label: string;
	exact?: boolean;
};

const navItems: NavItem[] = [
	{ to: "/", label: "Home", exact: true },
	{ to: "/topics", label: "Topics" },
	{ to: "/blogs", label: "Blogs" },
	{ to: "/notes", label: "Notes" },
	{ to: "/about", label: "About" },
];

type NavigationProps = {
	isDark: boolean;
	onToggleTheme: () => void;
	brandName?: string;
};

export function Navigation({
	isDark,
	onToggleTheme,
	brandName = "The Boring Site",
}: NavigationProps) {
	return (
		<nav className="nav">
			<div className="nav-inner">
				<Link to="/" className="nav-brand">
					<span className="nav-brand-icon" aria-hidden>
						<svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="32" height="32" rx="8" fill="currentColor" opacity="0.12" />
							<path d="M6 16h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
							<circle cx="10" cy="16" r="1.5" fill="currentColor" opacity="0.7" />
							<circle cx="16" cy="16" r="1.5" fill="currentColor" opacity="0.7" />
							<circle cx="22" cy="16" r="1.5" fill="currentColor" opacity="0.7" />
						</svg>
					</span>
					{brandName}
				</Link>
				<div className="nav-links">
					{navItems.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className="nav-link"
							activeProps={{ className: "nav-link active" }}
							activeOptions={item.exact ? { exact: true } : undefined}
						>
							{item.label}
						</Link>
					))}
					<ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
				</div>
			</div>
		</nav>
	);
}
