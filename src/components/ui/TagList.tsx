type TagListProps = {
	tags: string[];
	size?: "sm" | "md";
};

export function TagList({ tags, size = "sm" }: TagListProps) {
	if (!tags || tags.length === 0) return null;

	return (
		<div className="tags">
			{tags.map((tag) => (
				<span key={tag} className={`tag ${size === "md" ? "tag-md" : ""}`}>
					{tag}
				</span>
			))}
		</div>
	);
}
