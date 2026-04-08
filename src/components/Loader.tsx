import { useEffect } from "react";

/**
 * Removes the static HTML loader (#page-loader) that is embedded in
 * index.html and shown before React hydrates. Call this once at the
 * root of the app; it renders nothing itself.
 */
export function Loader() {
	useEffect(() => {
		const el = document.getElementById("page-loader");
		if (!el) return;
		el.classList.add("fading");
		const t = setTimeout(() => el.remove(), 380);
		return () => clearTimeout(t);
	}, []);

	return null;
}
