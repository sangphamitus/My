import { Link } from "@tanstack/react-router";
import { TagList } from "./TagList";
import { TopicLink } from "./TopicLink";
import { ReadingStats } from "./ReadingStats";

type EntryItemProps = {
	slug: string;
	title: string;
	date?: string;
	topic?: string;
	tags?: string[];
	excerpt?: string;
	readTimeMinutes?: number;
	wordCount?: number;
	basePath: "/blogs" | "/notes";
};

export function EntryItem({
	slug,
	title,
	date,
	topic,
	tags,
	excerpt,
	readTimeMinutes,
	wordCount,
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
				<ReadingStats
					readTimeMinutes={readTimeMinutes}
					wordCount={wordCount}
					variant="compactFull"
				/>
				{topic && <TopicLink topic={topic} />}
				{tags && <TagList tags={tags} />}
			</div>
			{excerpt && <p className="entry-excerpt">{excerpt}</p>}
		</li>
	);
}
