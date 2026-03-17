// Next.js 15+ requires params to be awaited — it's now a Promise
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_CONTENT } from "@/lib/blogContent";
import { BLOG_POSTS } from "@/lib/data";

export function generateStaticParams() {
	return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

// ─── Sub-components ────────────────────────────────────────────────────────

function CodeBlock({ lang, text }: { lang: string; text: string }) {
	return (
		<div
			style={{
				margin: "2rem 0",
				background: "var(--bg2)",
				border: "1px solid var(--bdr2)",
				borderRadius: 12,
				overflow: "hidden",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "8px 16px",
					borderBottom: "1px solid var(--bdr2)",
					background: "rgba(255,255,255,0.03)",
				}}
			>
				<span
					style={{
						fontFamily: "var(--FM)",
						fontSize: "0.62rem",
						letterSpacing: "0.1em",
						color: "var(--cyan)",
						textTransform: "uppercase",
					}}
				>
					{lang}
				</span>
				<div style={{ display: "flex", gap: 5 }}>
					{["#f87171", "#fbbf24", "#34d399"].map((c) => (
						<div
							key={c}
							style={{
								width: 8,
								height: 8,
								borderRadius: "50%",
								background: c,
								opacity: 0.7,
							}}
						/>
					))}
				</div>
			</div>
			<pre
				style={{
					padding: "1.25rem 1.5rem",
					margin: 0,
					overflowX: "auto",
					fontFamily: "var(--FM)",
					fontSize: "0.82rem",
					lineHeight: 1.7,
					color: "#e2e8f0",
					whiteSpace: "pre",
				}}
			>
				<code>{text}</code>
			</pre>
		</div>
	);
}

function Callout({ text }: { text: string }) {
	return (
		<div
			style={{
				margin: "2rem 0",
				padding: "1rem 1.25rem",
				background: "rgba(34,211,238,0.06)",
				border: "1px solid rgba(34,211,238,0.22)",
				borderLeft: "3px solid var(--cyan)",
				borderRadius: "0 10px 10px 0",
			}}
		>
			<p
				style={{
					fontSize: "0.92rem",
					lineHeight: 1.8,
					color: "var(--sub)",
					fontWeight: 300,
				}}
			>
				💡 {text}
			</p>
		</div>
	);
}

// ─── Page — async so we can await params ───────────────────────────────────
export default async function BlogPost({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	// unwrap the Promise — required in Next.js 15+
	const { slug } = await params;

	const post = BLOG_CONTENT.find((p) => p.slug === slug);
	if (!post) notFound();

	return (
		<>
			{/* ── Navbar ── */}
			<nav
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					zIndex: 300,
					height: 60,
					background: "rgba(6,10,17,0.92)",
					backdropFilter: "blur(20px)",
					borderBottom: "1px solid rgba(255,255,255,0.09)",
					display: "flex",
					alignItems: "center",
					padding: "0 clamp(1.25rem,5vw,3.5rem)",
				}}
			>
				{/*
          Back link uses href="/#blog" — the hash makes the browser
          jump directly to the blog section instead of scrolling from the top.
        */}
				<Link
					href="/#blog"
					style={{
						display: "flex",
						alignItems: "center",
						gap: 8,
						fontFamily: "var(--FM)",
						fontSize: "0.72rem",
						letterSpacing: "0.1em",
						color: "var(--muted)",
						textDecoration: "none",
						transition: "color .18s",
					}}
				>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<line x1="19" y1="12" x2="5" y2="12" />
						<polyline points="12 19 5 12 12 5" />
					</svg>
					Back to blog
				</Link>

				<a
					href="/"
					style={{
						marginLeft: "auto",
						fontFamily: "var(--FM)",
						fontSize: "0.9rem",
						fontWeight: 500,
						color: "var(--cyan)",
						textDecoration: "none",
						borderLeft: "2px solid var(--cyan)",
						paddingLeft: 10,
					}}
				>
					rc.dev
				</a>
			</nav>

			{/* ── Article ── */}
			<article
				style={{
					maxWidth: 720,
					margin: "0 auto",
					padding: "100px clamp(1.25rem,5vw,2rem) 6rem",
				}}
			>
				{/* tag + meta */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 10,
						marginBottom: "1.5rem",
					}}
				>
					<span
						style={{
							fontFamily: "var(--FM)",
							fontSize: "0.62rem",
							letterSpacing: "0.1em",
							padding: "4px 12px",
							borderRadius: 4,
							background: "rgba(129,140,248,0.09)",
							color: "#a5b4fc",
							border: "1px solid rgba(129,140,248,0.18)",
						}}
					>
						{post.tag}
					</span>
					<span
						style={{
							fontFamily: "var(--FM)",
							fontSize: "0.62rem",
							color: "var(--muted)",
						}}
					>
						{post.readMin} min read
					</span>
					<span
						style={{
							fontFamily: "var(--FM)",
							fontSize: "0.62rem",
							color: "var(--muted)",
						}}
					>
						· {post.date}
					</span>
				</div>

				{/* title */}
				<h1
					style={{
						fontFamily: "'Playfair Display', serif",
						fontWeight: 800,
						fontSize: "clamp(1.9rem,4vw,2.8rem)",
						lineHeight: 1.2,
						letterSpacing: "-0.02em",
						color: "var(--text)",
						marginBottom: "3rem",
						paddingBottom: "2rem",
						borderBottom: "1px solid var(--bdr2)",
					}}
				>
					{post.title}
				</h1>

				{/* content */}
				{post.content.map((section, i) => {
					switch (section.type) {
						case "intro":
							return (
								<p
									key={i}
									style={{
										fontSize: "1.08rem",
										lineHeight: 1.9,
										color: "var(--sub)",
										fontWeight: 300,
										marginBottom: "2.5rem",
										paddingLeft: "1.2rem",
										borderLeft: "2px solid rgba(34,211,238,0.35)",
										fontStyle: "italic",
									}}
								>
									{section.text}
								</p>
							);
						case "h2":
							return (
								<h2
									key={i}
									style={{
										fontFamily: "'Syne', sans-serif",
										fontWeight: 700,
										fontSize: "clamp(1.15rem,2.5vw,1.35rem)",
										color: "var(--text)",
										marginTop: "2.5rem",
										marginBottom: "0.9rem",
										lineHeight: 1.3,
									}}
								>
									{section.text}
								</h2>
							);
						case "p":
							return (
								<p
									key={i}
									style={{
										fontSize: "0.98rem",
										lineHeight: 1.9,
										color: "var(--sub)",
										fontWeight: 300,
										marginBottom: "1.4rem",
									}}
								>
									{section.text}
								</p>
							);
						case "code":
							return (
								<CodeBlock key={i} lang={section.lang} text={section.text} />
							);
						case "callout":
							return <Callout key={i} text={section.text} />;
						case "list":
							return (
								<ul
									key={i}
									style={{
										listStyle: "none",
										display: "flex",
										flexDirection: "column",
										gap: 10,
										margin: "1.4rem 0",
									}}
								>
									{section.items.map((item, j) => (
										<li
											key={j}
											style={{
												display: "flex",
												alignItems: "flex-start",
												gap: 12,
												fontSize: "0.96rem",
												lineHeight: 1.75,
												color: "var(--sub)",
												fontWeight: 300,
											}}
										>
											<span
												style={{
													color: "var(--cyan)",
													fontSize: "0.9rem",
													marginTop: 2,
													flexShrink: 0,
												}}
											>
												›
											</span>
											{item}
										</li>
									))}
								</ul>
							);
						case "hr":
							return (
								<hr
									key={i}
									style={{
										border: "none",
										height: 1,
										margin: "2.5rem 0",
										background:
											"linear-gradient(90deg, transparent, var(--bdr3), transparent)",
									}}
								/>
							);
						default:
							return null;
					}
				})}

				{/* footer */}
				<div
					style={{
						marginTop: "4rem",
						paddingTop: "2rem",
						borderTop: "1px solid var(--bdr2)",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						flexWrap: "wrap",
						gap: "1rem",
					}}
				>
					<Link
						href="/#blog"
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: 8,
							fontFamily: "var(--FM)",
							fontSize: "0.72rem",
							letterSpacing: "0.08em",
							color: "var(--cyan)",
							textDecoration: "none",
							background: "var(--cyan10)",
							border: "1px solid rgba(34,211,238,0.22)",
							padding: "8px 16px",
							borderRadius: 100,
						}}
					>
						← All posts
					</Link>
					<span
						style={{
							fontFamily: "var(--FM)",
							fontSize: "0.62rem",
							color: "var(--faint)",
						}}
					>
						by Rahul Chowdhury
					</span>
				</div>
			</article>

			<style>{`
        :root {
          --bg: #060a11; --bg2: #0b1220; --bg3: #101928;
          --cyan: #22d3ee; --cyan10: rgba(34,211,238,0.10);
          --vio: #818cf8; --text: #f1f5f9; --sub: #94a3b8;
          --muted: #64748b; --faint: #475569;
          --bdr2: rgba(255,255,255,0.16); --bdr3: rgba(255,255,255,0.24);
          --FM: 'JetBrains Mono', monospace;
        }
        body {
          background-color: var(--bg); color: var(--text);
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        code {
          font-family: var(--FM); font-size: 0.84em;
          color: var(--cyan); background: rgba(34,211,238,0.07);
          padding: 1px 5px; border-radius: 4px;
        }
        pre code { color: inherit; background: none; padding: 0; }
      `}</style>
		</>
	);
}
