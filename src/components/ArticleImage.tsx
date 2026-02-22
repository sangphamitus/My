import { useState } from "react";

type ArticleImageProps = {
	src: string;
	alt: string;
	basePath?: string;
};

export function ArticleImage({ src, alt, basePath }: ArticleImageProps) {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	let imageSrc = src || "";
	if (basePath && src && !src.startsWith("http") && !src.startsWith("/")) {
		imageSrc = `${basePath}/${src}`;
	}

	if (error) {
		return (
			<div className="article-image article-image--error" role="img" aria-label={alt || "Image"}>
				<span className="article-image-error-text">Image could not be loaded</span>
			</div>
		);
	}

	return (
		<span className="article-image-wrapper">
			{!loaded && (
				<div className="article-image-placeholder" aria-hidden>
					<span className="article-image-placeholder-pulse" />
				</div>
			)}
			<img
				src={imageSrc}
				alt={alt || ""}
				loading="lazy"
				className={`article-image-img ${loaded ? "article-image-img--loaded" : ""}`}
				onLoad={() => setLoaded(true)}
				onError={() => setError(true)}
			/>
		</span>
	);
}
