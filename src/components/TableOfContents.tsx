import type { TocItem } from "../common/markdown";

type Props = {
	items: TocItem[];
	/** ID of the section currently in view (for highlight) */
	activeId?: string | null;
};

export function TableOfContents({ items, activeId }: Props) {
	if (items.length === 0) return null;

	return (
		<nav className="toc">
			<div className="toc-title">On this page</div>
			<ul className="toc-list">
				{items.map((item) => (
					<li
						key={item.id}
						className="toc-item"
						style={{ paddingLeft: `${(item.level - 2) * 0.75}rem` }}
					>
						<a
							href={`#${item.id}`}
							className={`toc-link ${activeId === item.id ? "toc-link-active" : ""}`}
						>
							{item.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
