import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/playground")({
	component: Playground,
});

function Playground() {
	return (
		<div className="page-wrap">
			<div className="paper">
				<h1>Playground</h1>
				<p>Try out components and experiments here.</p>
				<div className="mt-8 space-y-6">
					<div>
						<h2>Sample Code Block</h2>
						<pre>
							<code>{`function hello() {
  console.log('Hello, World!');
}`}</code>
						</pre>
					</div>
					<div>
						<h2>Sample List</h2>
						<ul>
							<li>Item one</li>
							<li>
								Item two with <code>inline code</code>
							</li>
							<li>Item three</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
