import { TagList } from "./TagList";
import { TopicLink } from "./TopicLink";
import { ReadingStats } from "./ReadingStats";

type ArticleHeaderProps = {
	title: string;
	date?: string;
	topic?: string;
	tags?: string[];
	wordCount?: number;
	readTimeMinutes?: number;
};

export function ArticleHeader({ title, date, topic, tags, wordCount, readTimeMinutes }: ArticleHeaderProps) {
	return (
		<header className="article-header">
			<h1 className="article-title">{title}</h1>
			<div className="article-meta">
				{date && <span>{date}</span>}
				<ReadingStats
					readTimeMinutes={readTimeMinutes}
					wordCount={wordCount}
					variant="default"
				/>
				{topic && <TopicLink topic={topic} />}
				{tags && <TagList tags={tags} />}
			</div>
		</header>
	);
}
