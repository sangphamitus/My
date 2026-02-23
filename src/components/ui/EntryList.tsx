import { EntryItem } from "./EntryItem";

export type EntryData = {
	slug: string;
	title: string;
	date?: string;
	topic?: string;
	tags?: string[];
	excerpt?: string;
};

type EntryListProps = {
	items: EntryData[];
	basePath: "/blogs" | "/notes";
};

export function EntryList({ items, basePath }: EntryListProps) {
	return (
		<ul className="entry-list">
			{items.map((item) => (
				<EntryItem
					key={item.slug}
					slug={item.slug}
					title={item.title}
					date={item.date}
					topic={item.topic}
					tags={item.tags}
					excerpt={item.excerpt}
					basePath={basePath}
				/>
			))}
		</ul>
	);
}
