import { PostItem } from "./PostItem";

type PostData = {
	slug: string;
	title: string;
	date?: string;
	topic?: string;
	tags?: string[];
	excerpt?: string;
};

type PostListProps = {
	posts: PostData[];
	basePath: string;
};

export function PostList({ posts, basePath }: PostListProps) {
	return (
		<ul className="post-list">
			{posts.map((post) => (
				<PostItem
					key={post.slug}
					slug={post.slug}
					title={post.title}
					date={post.date}
					topic={post.topic}
					tags={post.tags}
					excerpt={post.excerpt}
					basePath={basePath}
				/>
			))}
		</ul>
	);
}
