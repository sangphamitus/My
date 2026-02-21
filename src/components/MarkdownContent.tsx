import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

type Props = {
	content: string;
	basePath?: string;
};

function generateId(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-");
}

export function MarkdownContent({ content, basePath }: Props) {
	const components: Components = {
		h2: ({ children }) => {
			const text = String(children);
			const id = generateId(text);
			return <h2 id={id}>{children}</h2>;
		},
		h3: ({ children }) => {
			const text = String(children);
			const id = generateId(text);
			return <h3 id={id}>{children}</h3>;
		},
		h4: ({ children }) => {
			const text = String(children);
			const id = generateId(text);
			return <h4 id={id}>{children}</h4>;
		},
		img: ({ src, alt }) => {
			let imageSrc = src || "";
			if (basePath && src && !src.startsWith("http") && !src.startsWith("/")) {
				imageSrc = `${basePath}/${src}`;
			}
			return <img src={imageSrc} alt={alt || ""} loading="lazy" />;
		},
	};

	return (
		<div className="article-content">
			<ReactMarkdown components={components}>{content}</ReactMarkdown>
		</div>
	);
}
