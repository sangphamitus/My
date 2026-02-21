import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SearchInput } from "../../components/SearchInput";
import {
	getAllNotes,
	getNotesGroupedByDate,
	getUniqueTopics,
} from "../../lib/notes";

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

	return (
		<div>
			<div className="paper">
				<h1>Notes</h1>
				<p className="post-excerpt" style={{ marginTop: "-0.5rem" }}>
					A timeline of what I'm working on, learning, and exploring.
				</p>

				<div className="filter-section" style={{ marginTop: "1.5rem" }}>
					<SearchInput
						value={searchQuery}
						onChange={setSearchQuery}
						placeholder="Search notes..."
					/>
				</div>

				{allTopics.length > 0 && (
					<div className="filter-section">
						<span className="filter-label">Filter by topic</span>
						<div className="filter-tags">
							<button
								type="button"
								className={`filter-tag ${activeTopic === null ? "active" : ""}`}
								onClick={() => setActiveTopic(null)}
							>
								All
							</button>
							{allTopics.map((topic) => (
								<button
									type="button"
									key={topic}
									className={`filter-tag ${activeTopic === topic ? "active" : ""}`}
									onClick={() => setActiveTopic(topic)}
								>
									{topic}
								</button>
							))}
						</div>
					</div>
				)}

				{allTags.length > 0 && (
					<div className="filter-section">
						<span className="filter-label">Filter by tag</span>
						<div className="filter-tags">
							<button
								type="button"
								className={`filter-tag ${activeTag === null ? "active" : ""}`}
								onClick={() => setActiveTag(null)}
							>
								All
							</button>
							{allTags.map((tag) => (
								<button
									type="button"
									key={tag}
									className={`filter-tag ${activeTag === tag ? "active" : ""}`}
									onClick={() => setActiveTag(tag)}
								>
									{tag}
								</button>
							))}
						</div>
					</div>
				)}

				{isFiltering ? (
					filteredNotes.length === 0 ? (
						<p className="empty-state">
							{searchQuery
								? `No notes matching "${searchQuery}".`
								: activeTopic
									? `No notes in topic "${activeTopic}".`
									: `No notes with tag "${activeTag}".`}
						</p>
					) : (
						<ul className="post-list">
							{filteredNotes.map((note) => (
								<li key={note.slug} className="post-item">
									<Link to={`/notes/${note.slug}`} className="post-title">
										{note.title}
									</Link>
									<div className="post-meta">
										{note.date && (
											<span className="post-date">{note.date}</span>
										)}
										{note.topic && (
											<Link to={`/topics/${note.topic}`} className="topic-link">
												{note.topic}
											</Link>
										)}
										{note.tags && note.tags.length > 0 && (
											<div className="tags">
												{note.tags.map((tag) => (
													<span key={tag} className="tag">
														{tag}
													</span>
												))}
											</div>
										)}
									</div>
								</li>
							))}
						</ul>
					)
				) : groupedNotes.length === 0 ? (
					<p className="empty-state">No notes yet.</p>
				) : (
					<div className="timeline">
						{groupedNotes.map((yearGroup) => (
							<div key={yearGroup.year} className="timeline-year">
								<div className="timeline-year-label">{yearGroup.year}</div>
								{yearGroup.months.map((monthGroup) => (
									<div key={monthGroup.month} className="timeline-month">
										<div className="timeline-month-label">
											{monthGroup.month}
										</div>
										<div className="timeline-items">
											{monthGroup.notes.map((note) => (
												<div key={note.slug} className="timeline-item">
													<div className="timeline-dot" />
													<div className="timeline-content">
														<Link
															to={`/notes/${note.slug}`}
															className="timeline-title"
														>
															{note.title}
														</Link>
														<div className="timeline-meta">
															<span className="timeline-date">
																{new Date(note.date).toLocaleDateString(
																	"en-US",
																	{
																		month: "short",
																		day: "numeric",
																	},
																)}
															</span>
															{note.topic && (
																<Link
																	to={`/topics/${note.topic}`}
																	className="topic-link"
																>
																	{note.topic}
																</Link>
															)}
															{note.tags && note.tags.length > 0 && (
																<div className="tags">
																	{note.tags.map((tag) => (
																		<span key={tag} className="tag">
																			{tag}
																		</span>
																	))}
																</div>
															)}
														</div>
														{note.excerpt && (
															<p className="timeline-excerpt">{note.excerpt}</p>
														)}
													</div>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
