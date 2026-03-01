import { useEffect, useState } from "react";

const SHOW_AFTER_PX = 400;

export function BackToTop() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const update = () => setVisible(window.scrollY > SHOW_AFTER_PX);
		update();
		window.addEventListener("scroll", update, { passive: true });
		return () => window.removeEventListener("scroll", update);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (!visible) return null;

	return (
		<button
			type="button"
			className="back-to-top"
			onClick={scrollToTop}
			aria-label="Back to top"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden
			>
				<path d="M12 19V5M5 12l7-7 7 7" />
			</svg>
		</button>
	);
}
