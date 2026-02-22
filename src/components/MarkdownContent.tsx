import type { ReactNode } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import { ArticleImage } from "./ArticleImage";

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
	const components = {
		h2: ({ children }: { children?: ReactNode }) => {
			const text = String(children);
			const id = generateId(text);
			return <h2 id={id}>{children}</h2>;
		},
		h3: ({ children }: { children?: ReactNode }) => {
			const text = String(children);
			const id = generateId(text);
			return <h3 id={id}>{children}</h3>;
		},
		h4: ({ children }: { children?: ReactNode }) => {
			const text = String(children);
			const id = generateId(text);
			return <h4 id={id}>{children}</h4>;
		},
		img: (props: { src?: string; alt?: string }) => (
			<ArticleImage
				src={props.src ?? ""}
				alt={props.alt ?? ""}
				basePath={basePath}
			/>
		),
	} as unknown as Components;

	return (
		<div className="article-content">
			<ReactMarkdown components={components}>{content}</ReactMarkdown>
		</div>
	);
}
