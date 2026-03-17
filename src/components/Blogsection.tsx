"use client";

import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";

// Colour map for tags
const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> =
	{
		"System Design": {
			bg: "rgba(34,211,238,0.08)",
			text: "var(--cyan)",
			border: "rgba(34,211,238,0.22)",
		},
		"AI / LLM": {
			bg: "rgba(129,140,248,0.09)",
			text: "#a5b4fc",
			border: "rgba(129,140,248,0.20)",
		},
		Backend: {
			bg: "rgba(74,222,128,0.08)",
			text: "#6ee7b7",
			border: "rgba(74,222,128,0.20)",
		},
	};

export default function BlogSection() {
	return (
		<section className="section" id="blog">
			<p className="eyebrow rv">// thoughts</p>
			<h2 className="s-title rv">Blog</h2>
			<div className="s-bar rv" />

			<div className="rv d1 blog-list">
				{BLOG_POSTS.map((post) => {
					const tc = TAG_COLORS[post.tag] ?? TAG_COLORS["Backend"];

					return (
						<Link
							key={post.slug}
							href={`/blog/${post.slug}`}
							style={{ textDecoration: "none", display: "block" }}
						>
							<div
								className="blog-row"
								style={{
									display: "grid",
									gridTemplateColumns: "52px 1fr",
									gap: "0 2rem",
									alignItems: "start",
									padding: "2.2rem 0",
									borderBottom: "1px solid var(--bdr2)",
									cursor: "pointer",
									transition: "padding-left .2s",
								}}
								onMouseEnter={(e) =>
									((e.currentTarget as HTMLElement).style.paddingLeft = "8px")
								}
								onMouseLeave={(e) =>
									((e.currentTarget as HTMLElement).style.paddingLeft = "0px")
								}
							>
								{/* index number */}
								<span
									style={{
										fontFamily: "var(--FM)",
										fontSize: "0.78rem",
										color: "var(--sub)",
										paddingTop: 5,
										fontWeight: 500,
									}}
								>
									{post.num}
								</span>

								<div>
									{/* tag + read time */}
									<div
										style={{
											display: "flex",
											alignItems: "center",
											gap: 10,
											marginBottom: "0.6rem",
											flexWrap: "wrap",
										}}
									>
										<span
											style={{
												fontFamily: "var(--FM)",
												fontSize: "0.65rem",
												letterSpacing: "0.08em",
												padding: "3px 11px",
												borderRadius: 100,
												display: "inline-block",
												background: tc.bg,
												color: tc.text,
												border: `1px solid ${tc.border}`,
											}}
										>
											{post.tag}
										</span>
										<span
											style={{
												fontFamily: "var(--FM)",
												fontSize: "0.65rem",
												color: "var(--muted)",
											}}
										>
											{post.readMin} min read
										</span>
										<span
											style={{
												fontFamily: "var(--FM)",
												fontSize: "0.65rem",
												color: "var(--faint)",
											}}
										>
											· {post.date}
										</span>
									</div>

									{/* title — clearly larger, bold */}
									<p
										className="blog-title"
										style={{
											fontFamily: "'Syne', sans-serif",
											fontSize: "1.1rem",
											fontWeight: 700,
											color: "var(--text)",
											marginBottom: "0.6rem",
											lineHeight: 1.35,
											transition: "color .2s",
										}}
									>
										{post.title}
									</p>

									{/* excerpt — noticeably bigger than before */}
									<p
										style={{
											fontSize: "0.94rem",
											lineHeight: 1.78,
											color: "var(--sub)",
											fontWeight: 300,
											maxWidth: 640,
										}}
									>
										{post.excerpt}
									</p>

									{/* "Read article" call-to-action */}
									<div
										style={{
											display: "inline-flex",
											alignItems: "center",
											gap: 6,
											marginTop: "0.8rem",
											fontFamily: "var(--FM)",
											fontSize: "0.66rem",
											letterSpacing: "0.08em",
											color: "var(--cyan)",
											transition: "gap .2s",
										}}
										className="blog-read-cta"
									>
										Read article
										<svg
											width="12"
											height="12"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2.2"
										>
											<line x1="5" y1="12" x2="19" y2="12" />
											<polyline points="12 5 19 12 12 19" />
										</svg>
									</div>
								</div>
							</div>
						</Link>
					);
				})}
			</div>

			<style>{`
        /* first row gets a top border too */
        .blog-list > a:first-child .blog-row { border-top: 1px solid var(--bdr2); }

        /* hover: title turns cyan */
        .blog-row:hover .blog-title { color: var(--cyan) !important; }

        /* hide number column on very small screens */
        @media (max-width: 480px) {
          .blog-row { grid-template-columns: 1fr !important; }
          .blog-row > span:first-child { display: none; }
        }
      `}</style>
		</section>
	);
}
