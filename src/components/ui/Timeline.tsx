import { Link } from "@tanstack/react-router";
import { TagList } from "./TagList";
import { TopicLink } from "./TopicLink";
import type { GroupedNotes } from "../../lib/notes";

type TimelineItemData = {
	slug: string;
	title: string;
	date: string;
	topic?: string;
	tags?: string[];
	excerpt?: string;
};

type TimelineItemProps = {
	item: TimelineItemData;
	basePath: "/blogs" | "/notes";
	showExcerpt?: boolean;
};

export function TimelineItem({ item, basePath, showExcerpt = true }: TimelineItemProps) {
	return (
		<div className="timeline-item">
			<div className="timeline-dot" />
			<div className="timeline-content">
				<Link
					to={basePath === "/blogs" ? "/blogs/$slug" : "/notes/$slug"}
					params={{ slug: item.slug }}
					className="timeline-title"
				>
					{item.title}
				</Link>
				<div className="timeline-meta">
					{item.date && (
						<span className="timeline-date">
							{new Date(item.date).toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
							})}
						</span>
					)}
					{item.topic && <TopicLink topic={item.topic} />}
					{item.tags && <TagList tags={item.tags} />}
				</div>
				{showExcerpt && item.excerpt && (
					<p className="timeline-excerpt">{item.excerpt}</p>
				)}
			</div>
		</div>
	);
}

type TimelineProps = {
	items: TimelineItemData[];
	basePath: "/blogs" | "/notes";
	compact?: boolean;
};

export function Timeline({ items, basePath, compact = false }: TimelineProps) {
	return (
		<div className={`timeline ${compact ? "timeline-compact" : ""}`}>
			{items.map((item) => (
				<TimelineItem
					key={item.slug}
					item={item}
					basePath={basePath}
					showExcerpt={!compact}
				/>
			))}
		</div>
	);
}

type GroupedTimelineProps = {
	groups: GroupedNotes[];
	basePath: "/blogs" | "/notes";
};

export function GroupedTimeline({ groups, basePath }: GroupedTimelineProps) {
	return (
		<div className="timeline">
			{groups.map((yearGroup) => (
				<div key={yearGroup.year} className="timeline-year">
					<div className="timeline-year-label">{yearGroup.year}</div>
					{yearGroup.months.map((monthGroup) => (
						<div key={monthGroup.month} className="timeline-month">
							<div className="timeline-month-label">{monthGroup.month}</div>
							<div className="timeline-items">
								{monthGroup.notes.map((note) => (
									<TimelineItem
										key={note.slug}
										item={note}
										basePath={basePath}
										showExcerpt
									/>
								))}
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
