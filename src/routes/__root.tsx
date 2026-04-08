import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Footer } from "../components/Footer";
import { Loader } from "../components/Loader";
import { Navigation } from "../components/Navigation";
import { NotFound } from "../components/ui";
import { useTheme } from "../hooks";

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: () => {
		return (
			<div className="app-container">
				<div className="main-content">
					<NotFound
						title="404"
						message="Page not found"
						linkTo="/"
						linkLabel="Go Home"
					/>
				</div>
			</div>
		);
	},
});

function RootComponent() {
	const { isDark, toggleTheme } = useTheme();

	return (
		<>
			<Loader />
			<div className="app-container">
				<Navigation isDark={isDark} onToggleTheme={toggleTheme} />
				<main className="main-content">
					<Outlet />
				</main>
				<Footer />
				<TanStackRouterDevtools position="bottom-right" />
			</div>
		</>
	);
}
