import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { getAllNotes, getNotesGroupedByDate, getUniqueTopics } from "../../lib/notes";
import { SearchInput } from "../../components/SearchInput";
import {
	Paper,
	PageHeader,
	FilterTags,
	PostList,
	GroupedTimeline,
	EmptyState,
} from "../../components/ui";

export const Route = createFileRoute("/notes/")({
	component: NotesPage,
});

function NotesPage() {
	const allNotes = getAllNotes();
	const groupedNotes = getNotesGroupedByDate();
	const allTopics = getUniqueTopics();
	const [activeTag, setActiveTag] = useState<string | null>(null);
	const [activeTopic, setActiveTopic] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	const allTags = useMemo(() => {
		const tagSet = new Set<string>();
		allNotes.forEach((note) => {
			note.tags?.forEach((tag) => tagSet.add(tag));
		});
		return Array.from(tagSet).sort();
	}, [allNotes]);

	const isFiltering =
		searchQuery.trim() !== "" || activeTag !== null || activeTopic !== null;

	const filteredNotes = useMemo(() => {
		let result = allNotes;

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter((note) => {
				const titleMatch = note.title.toLowerCase().includes(query);
				const contentMatch = note.content.toLowerCase().includes(query);
				const tagMatch =
					note.tags?.some((tag) => tag.toLowerCase().includes(query)) || false;
				return titleMatch || contentMatch || tagMatch;
			});
		}

		if (activeTag) {
			result = result.filter((note) => note.tags?.includes(activeTag));
		}

		if (activeTopic) {
			result = result.filter((note) => note.topic === activeTopic);
		}

		return result;
	}, [allNotes, activeTag, activeTopic, searchQuery]);

	const getEmptyMessage = () => {
		if (searchQuery) return `No notes matching "${searchQuery}".`;
		if (activeTopic) return `No notes in topic "${activeTopic}".`;
		if (activeTag) return `No notes with tag "${activeTag}".`;
		return "No notes yet.";
	};

	return (
		<div>
			<Paper>
				<PageHeader
					title="Notes"
					description="A timeline of what I'm working on, learning, and exploring."
				/>

				<div className="filter-section" style={{ marginTop: "1.5rem" }}>
					<SearchInput
						value={searchQuery}
						onChange={setSearchQuery}
						placeholder="Search notes..."
					/>
				</div>

				<FilterTags
					label="Filter by topic"
					items={allTopics}
					activeItem={activeTopic}
					onSelect={setActiveTopic}
				/>

				<FilterTags
					label="Filter by tag"
					items={allTags}
					activeItem={activeTag}
					onSelect={setActiveTag}
				/>

				{isFiltering ? (
					filteredNotes.length === 0 ? (
						<EmptyState message={getEmptyMessage()} />
					) : (
						<PostList posts={filteredNotes} basePath="/notes" />
					)
				) : groupedNotes.length === 0 ? (
					<EmptyState message="No notes yet." />
				) : (
					<GroupedTimeline groups={groupedNotes} basePath="/notes" />
				)}
			</Paper>
		</div>
	);
}
