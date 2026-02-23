import { Link } from "@tanstack/react-router";

type TopicLinkProps = {
	topic: string;
};

export function TopicLink({ topic }: TopicLinkProps) {
	return (
		<Link to="/topics/$slug" params={{ slug: topic }} className="topic-link">
			{topic}
		</Link>
	);
}
