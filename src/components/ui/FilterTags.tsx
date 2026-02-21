type FilterTagsProps<T extends string> = {
	label: string;
	items: T[];
	activeItem: T | null;
	onSelect: (item: T | null) => void;
	allLabel?: string;
	getLabel?: (item: T) => string;
	getClassName?: (item: T) => string;
};

export function FilterTags<T extends string>({
	label,
	items,
	activeItem,
	onSelect,
	allLabel = "All",
	getLabel = (item) => item,
	getClassName,
}: FilterTagsProps<T>) {
	if (items.length === 0) return null;

	return (
		<div className="filter-section">
			<span className="filter-label">{label}</span>
			<div className="filter-tags">
				<button
					type="button"
					className={`filter-tag ${activeItem === null ? "active" : ""}`}
					onClick={() => onSelect(null)}
				>
					{allLabel}
				</button>
				{items.map((item) => (
					<button
						type="button"
						key={item}
						className={`filter-tag ${getClassName?.(item) || ""} ${activeItem === item ? "active" : ""}`}
						onClick={() => onSelect(item)}
					>
						{getLabel(item)}
					</button>
				))}
			</div>
		</div>
	);
}
