type PageHeaderProps = {
	title: string;
	description?: string;
	variant?: "default" | "centered";
};

export function PageHeader({ title, description, variant = "default" }: PageHeaderProps) {
	if (variant === "centered") {
		return (
			<>
				<h1 className="intro-title">{title}</h1>
				{description && <p className="intro-text">{description}</p>}
			</>
		);
	}

	return (
		<>
			<h1>{title}</h1>
			{description && (
				<p className="entry-excerpt" style={{ marginTop: "-0.5rem" }}>
					{description}
				</p>
			)}
		</>
	);
}
