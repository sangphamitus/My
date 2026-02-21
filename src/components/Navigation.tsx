import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = {
	to: string;
	label: string;
	exact?: boolean;
};

const navItems: NavItem[] = [
	{ to: "/", label: "Home", exact: true },
	{ to: "/blogs", label: "Blog" },
	{ to: "/notes", label: "Notes" },
	{ to: "/topics", label: "Topics" },
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
	brandName = "My Paper",
}: NavigationProps) {
	return (
		<nav className="nav">
			<div className="nav-inner">
				<Link to="/" className="nav-brand">
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
