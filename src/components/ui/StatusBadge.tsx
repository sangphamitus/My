import { topicStatusLabels, type TopicStatus } from "../../lib/topics";

type StatusBadgeProps = {
	status: TopicStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
	return (
		<span className={`status-badge status-${status}`}>
			{topicStatusLabels[status]}
		</span>
	);
}
