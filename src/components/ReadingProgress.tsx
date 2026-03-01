import { useLayoutEffect, useState } from "react";

type ReadingProgressProps = {
	/** Ref to the article container (the wrapper around the post content) */
	articleRef: React.RefObject<HTMLElement | null>;
};

export function ReadingProgress({ articleRef }: ReadingProgressProps) {
	const [progress, setProgress] = useState(0);

	useLayoutEffect(() => {
		const el = articleRef.current;
		if (!el) return;

		const update = () => {
			const rect = el.getBoundingClientRect();
			const scrollY = window.scrollY;
			// Article position in document
			const articleTop = rect.top + scrollY;
			const articleHeight = rect.height;
			const viewportHeight = window.innerHeight;
			const range = articleHeight - viewportHeight;

			if (range <= 0) {
				// Article shorter than viewport: show full
				setProgress(1);
				return;
			}
			// 0 = article top at viewport top, 1 = article bottom at viewport bottom
			const raw = (scrollY - articleTop) / range;
			setProgress(Math.max(0, Math.min(1, raw)));
		};

		update();
		window.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		return () => {
			window.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
		};
	}, [articleRef]);

	return (
		<div className="reading-progress" role="presentation" aria-hidden>
			<div
				className="reading-progress-bar"
				style={{ width: `${progress * 100}%` }}
			/>
		</div>
	);
}
