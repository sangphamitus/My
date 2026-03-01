type ReadingStatsProps = {
	readTimeMinutes?: number;
	wordCount?: number;
	/** "default" = both stats with icons (article header); "compact" = read time only (list); "compactFull" = both, smaller (list) */
	variant?: "default" | "compact" | "compactFull";
};

function ClockIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			<circle cx="12" cy="12" r="10" />
			<polyline points="12 6 12 12 16 14" />
		</svg>
	);
}

function DocumentIcon({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
			<polyline points="14 2 14 8 20 8" />
			<line x1="16" y1="13" x2="8" y2="13" />
			<line x1="16" y1="17" x2="8" y2="17" />
			<polyline points="10 9 9 9 8 9" />
		</svg>
	);
}

export function ReadingStats({
	readTimeMinutes,
	wordCount,
	variant = "default",
}: ReadingStatsProps) {
	const hasTime = readTimeMinutes != null && readTimeMinutes > 0;
	const hasWords = wordCount != null && wordCount > 0;
	const showAny = hasTime || hasWords;

	if (!showAny) return null;

	if (variant === "compact") {
		return (
			<span className="reading-stats reading-stats--compact">
				{hasTime && (
					<span className="reading-stats-item">
						<ClockIcon className="reading-stats-icon" />
						<span>{readTimeMinutes} min read</span>
					</span>
				)}
			</span>
		);
	}

	if (variant === "compactFull" && showAny) {
		return (
			<span className="reading-stats reading-stats--compact reading-stats--compactFull" aria-label="Reading stats">
				{hasTime && (
					<span className="reading-stats-item">
						<ClockIcon className="reading-stats-icon" />
						<span>{readTimeMinutes} min</span>
					</span>
				)}
				{hasTime && hasWords && <span className="reading-stats-sep" aria-hidden />}
				{hasWords && (
					<span className="reading-stats-item">
						<DocumentIcon className="reading-stats-icon" />
						<span>{wordCount.toLocaleString()} words</span>
					</span>
				)}
			</span>
		);
	}

	return (
		<span className="reading-stats reading-stats--default" aria-label="Reading stats">
			{hasTime && (
				<span className="reading-stats-item">
					<ClockIcon className="reading-stats-icon" />
					<span>{readTimeMinutes} min</span>
				</span>
			)}
			{hasTime && hasWords && <span className="reading-stats-sep" aria-hidden />}
			{hasWords && (
				<span className="reading-stats-item">
					<DocumentIcon className="reading-stats-icon" />
					<span>{wordCount.toLocaleString()} words</span>
				</span>
			)}
		</span>
	);
}
