import { Link } from "@tanstack/react-router";
import { TagList } from "./TagList";
import { TopicLink } from "./TopicLink";

type EntryItemProps = {
	slug: string;
	title: string;
	date?: string;
	topic?: string;
	tags?: string[];
	excerpt?: string;
	basePath: "/blogs" | "/notes";
};

export function EntryItem({
	slug,
	title,
	date,
	topic,
	tags,
	excerpt,
	basePath,
}: EntryItemProps) {
	return (
		<li className="entry-item">
			<Link
				to={basePath === "/blogs" ? "/blogs/$slug" : "/notes/$slug"}
				params={{ slug }}
				className="entry-title"
			>
				{title}
			</Link>
			<div className="entry-meta">
				{date && <span className="entry-date">{date}</span>}
				{topic && <TopicLink topic={topic} />}
				{tags && <TagList tags={tags} />}
			</div>
			{excerpt && <p className="entry-excerpt">{excerpt}</p>}
		</li>
	);
}
