import { TagList } from "./TagList";
import { TopicLink } from "./TopicLink";

type ArticleHeaderProps = {
	title: string;
	date?: string;
	topic?: string;
	tags?: string[];
};

export function ArticleHeader({ title, date, topic, tags }: ArticleHeaderProps) {
	return (
		<header className="article-header">
			<h1 className="article-title">{title}</h1>
			<div className="article-meta">
				{date && <span>{date}</span>}
				{topic && <TopicLink topic={topic} />}
				{tags && <TagList tags={tags} />}
			</div>
		</header>
	);
}
