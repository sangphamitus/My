import { Link } from "@tanstack/react-router";

type SectionHeaderProps = {
	title: string;
	linkTo?: string;
	linkText?: string;
};

export function SectionHeader({
	title,
	linkTo,
	linkText = "View all →",
}: SectionHeaderProps) {
	return (
		<div className="section-header">
			<h2 className="section-title">{title}</h2>
			{linkTo && (
				<Link to={linkTo} className="section-link">
					{linkText}
				</Link>
			)}
		</div>
	);
}
