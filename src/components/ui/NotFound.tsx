import { Link } from "@tanstack/react-router";

type NotFoundProps = {
	title?: string;
	message?: string;
	linkTo: string;
	linkLabel: string;
};

export function NotFound({
	title = "Not found",
	message = "The page you're looking for doesn't exist.",
	linkTo,
	linkLabel,
}: NotFoundProps) {
	return (
		<div className="paper not-found">
			<h1>{title}</h1>
			<p>{message}</p>
			<Link to={linkTo} className="not-found-link">
				{linkLabel}
			</Link>
		</div>
	);
}
