import { Link } from "@tanstack/react-router";
import { TagList } from "./TagList";
import { TopicLink } from "./TopicLink";

type PostItemProps = {
	slug: string;
	title: string;
	date?: string;
	topic?: string;
	tags?: string[];
	excerpt?: string;
	basePath: string;
};

export function PostItem({
	slug,
	title,
	date,
	topic,
	tags,
	excerpt,
	basePath,
}: PostItemProps) {
	return (
		<li className="post-item">
			<Link to={`${basePath}/${slug}`} className="post-title">
				{title}
			</Link>
			<div className="post-meta">
				{date && <span className="post-date">{date}</span>}
				{topic && <TopicLink topic={topic} />}
				{tags && <TagList tags={tags} />}
			</div>
			{excerpt && <p className="post-excerpt">{excerpt}</p>}
		</li>
	);
}
