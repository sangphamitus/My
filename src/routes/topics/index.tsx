import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { getAllTopics, topicStatusLabels, type TopicStatus } from "../../lib/topics";
import {
	Paper,
	PageHeader,
	FilterTags,
	TopicGrid,
	EmptyState,
} from "../../components/ui";

export const Route = createFileRoute("/topics/")({
	component: TopicsPage,
});

const statusOrder: TopicStatus[] = [
	"in-progress",
	"todo",
	"pending",
	"done",
	"stop",
];

function TopicsPage() {
	const topics = getAllTopics();
	const [activeStatus, setActiveStatus] = useState<TopicStatus | null>(null);

	const filteredTopics = activeStatus
		? topics.filter((t) => t.status === activeStatus)
		: topics;

	const sortedTopics = [...filteredTopics].sort((a, b) => {
		const aIdx = statusOrder.indexOf(a.status);
		const bIdx = statusOrder.indexOf(b.status);
		if (aIdx !== bIdx) return aIdx - bIdx;
		return (b.lastUpdated || "").localeCompare(a.lastUpdated || "");
	});

	return (
		<div>
			<Paper>
				<PageHeader
					title="Topics"
					description="Projects and areas I'm exploring, organized by status."
				/>

				<div style={{ marginTop: "1.5rem" }}>
					<FilterTags
						label="Filter by status"
						items={statusOrder}
						activeItem={activeStatus}
						onSelect={setActiveStatus}
						getLabel={(status) => topicStatusLabels[status]}
						getClassName={(status) => `status-filter-${status}`}
					/>
				</div>

				{sortedTopics.length === 0 ? (
					<EmptyState message="No topics found." />
				) : (
					<TopicGrid topics={sortedTopics} />
				)}
			</Paper>
		</div>
	);
}
