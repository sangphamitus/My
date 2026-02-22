export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="footer">
			<p>© {year} Sang Pham-Phuoc</p>
			<p>Web made with passion and love</p>
		</footer>
	);
}
