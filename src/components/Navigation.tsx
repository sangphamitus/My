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
	brandName = "Crafts",
}: NavigationProps) {
	return (
		<nav className="nav">
			<div className="nav-inner">
				<Link to="/" className="nav-brand">
					<span className="nav-brand-icon" aria-hidden>
						{/* Yarn ball craft icon */}
						<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
							<ellipse cx="16" cy="16" rx="13" ry="5" stroke="currentColor" strokeWidth="1.25" opacity="0.6" />
							<ellipse cx="16" cy="16" rx="13" ry="5" stroke="currentColor" strokeWidth="1.25" opacity="0.6" transform="rotate(60 16 16)" />
							<ellipse cx="16" cy="16" rx="13" ry="5" stroke="currentColor" strokeWidth="1.25" opacity="0.6" transform="rotate(120 16 16)" />
							<circle cx="16" cy="16" r="2.5" fill="currentColor" opacity="0.75" />
							<path d="M27 7 Q30 4 29 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.6" />
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
