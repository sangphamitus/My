/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				/* ppsacrafts.io.vn palette */
				parchment: "#F5EDD8",
				linen: "#EDE0C8",
				craftbrown: "#A0744A",
				sepia: "#4A3728",
				sage: "#B5C4A6",
				dustyrose: "#CFA98C",
				/* dark theme */
				umber: "#1E1610",
				mahogany: "#2C2017",
				copper: "#C9916A",
				cream: "#F0E6D0",
				moss: "#7A9470",
				clay: "#B8855E",
			},
			fontFamily: {
				sans: [
					"Segoe UI",
					"Helvetica Neue",
					"-apple-system",
					"BlinkMacSystemFont",
					"sans-serif",
				],
				serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
				mono: ["Monaco", "Menlo", "Ubuntu Mono", "monospace"],
			},
			fontSize: {
				xs: ["0.75rem", { lineHeight: "1rem" }],
				sm: ["0.875rem", { lineHeight: "1.25rem" }],
				base: ["1rem", { lineHeight: "1.6rem" }],
				lg: ["1.125rem", { lineHeight: "1.75rem" }],
				xl: ["1.25rem", { lineHeight: "1.75rem" }],
				"2xl": ["1.5rem", { lineHeight: "2rem" }],
				"3xl": ["1.875rem", { lineHeight: "2.25rem" }],
				"4xl": ["2.25rem", { lineHeight: "2.5rem" }],
				"5xl": ["3rem", { lineHeight: "1.2" }],
			},
			boxShadow: {
				paper:
					"0 20px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
				"paper-light":
					"0 10px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
			},
			backgroundImage: {
				"gradient-paper":
					"linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
				"gradient-paper-light":
					"linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 248, 248, 0.95) 100%)",
			},
		},
	},
	plugins: [],
};
