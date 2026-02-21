type FooterProps = {
	text?: string;
};

export function Footer({ text = "Built with love and paper" }: FooterProps) {
	return (
		<footer className="footer">
			<p>{text}</p>
		</footer>
	);
}
