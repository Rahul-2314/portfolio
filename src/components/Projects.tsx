"use client";

import { useState } from "react";
import { PROJECTS } from "@/lib/data";
import { GitHubIcon, ExternalIcon } from "@/components/Icons";

// ─── Live preview panel ────────────────────────────────────────────────────
// Shows a scaled-down iframe of the live site.
// Many sites block iframes (X-Frame-Options); we show a fallback in that case.
function LivePreview({ url, title }: { url: string; title: string }) {
	const [blocked, setBlocked] = useState(false);
	const [loaded, setLoaded] = useState(false);

	// "#" means no live URL — show placeholder immediately
	if (url === "#") {
		return (
			<div
				style={{
					width: "100%",
					height: "100%",
					minHeight: 200,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: 10,
					background: "var(--bg3)",
					border: "1px dashed var(--bdr2)",
					borderRadius: 10,
					padding: "1.5rem",
				}}
			>
				<span style={{ fontSize: "1.5rem" }}>🚧</span>
				<p
					style={{
						fontFamily: "var(--FM)",
						fontSize: "0.65rem",
						color: "var(--faint)",
						letterSpacing: "0.08em",
						textAlign: "center",
					}}
				>
					Live demo coming soon
				</p>
			</div>
		);
	}

	if (blocked) {
		return (
			<a
				href={url}
				target="_blank"
				rel="noreferrer"
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: 12,
					width: "100%",
					height: "100%",
					minHeight: 200,
					background: "var(--bg3)",
					border: "1px solid var(--bdr2)",
					borderRadius: 10,
					textDecoration: "none",
					padding: "1.5rem",
					transition: "border-color .2s",
				}}
				onMouseEnter={(e) =>
					(e.currentTarget.style.borderColor = "rgba(34,211,238,0.35)")
				}
				onMouseLeave={(e) =>
					(e.currentTarget.style.borderColor = "var(--bdr2)")
				}
			>
				<span style={{ fontSize: "1.8rem" }}>🔗</span>
				<p
					style={{
						fontFamily: "var(--FM)",
						fontSize: "0.68rem",
						color: "var(--cyan)",
						letterSpacing: "0.06em",
						textAlign: "center",
					}}
				>
					Click to open live site
				</p>
				<p
					style={{
						fontFamily: "var(--FM)",
						fontSize: "0.6rem",
						color: "var(--faint)",
						textAlign: "center",
					}}
				>
					{new URL(url).hostname}
				</p>
			</a>
		);
	}

	return (
		<div
			style={{
				width: "100%",
				position: "relative",
				aspectRatio: "4 / 3",
				borderRadius: 10,
				overflow: "hidden",
				border: "1px solid var(--bdr2)",
				background: "var(--bg3)",
			}}
		>
			{/* loading shimmer */}
			{!loaded && (
				<div
					style={{
						position: "absolute",
						inset: 0,
						background:
							"linear-gradient(90deg, var(--bg2) 0%, var(--bg3) 50%, var(--bg2) 100%)",
						backgroundSize: "200% 100%",
						animation: "skeletonSlide 1.4s ease infinite",
						zIndex: 2,
					}}
				/>
			)}

			{/* The iframe is scaled down to fit the preview box.
          We render the full page at desktop width then scale it visually. */}
			<iframe
				src={url}
				title={`${title} preview`}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "1200px",
					height: "900px",
					border: "none",
					transformOrigin: "top left",
					transform: "scale(var(--iframe-scale, 0.28))",
					pointerEvents: "none", // let the outer <a> handle clicks
				}}
				sandbox="allow-scripts allow-same-origin"
				loading="lazy"
				onLoad={() => setLoaded(true)}
				onError={() => setBlocked(true)}
			/>

			{/* clickable overlay that opens the live site */}
			<a
				href={url}
				target="_blank"
				rel="noreferrer"
				style={{ position: "absolute", inset: 0, zIndex: 3, display: "block" }}
				aria-label={`Open ${title} live site`}
			/>

			{/* "Live" badge */}
			<div
				style={{
					position: "absolute",
					bottom: 10,
					right: 10,
					zIndex: 4,
					display: "flex",
					alignItems: "center",
					gap: 5,
					fontFamily: "var(--FM)",
					fontSize: "0.58rem",
					letterSpacing: "0.1em",
					color: "var(--green)",
					background: "rgba(6,10,17,0.85)",
					border: "1px solid rgba(74,222,128,0.25)",
					padding: "3px 9px",
					borderRadius: 100,
					backdropFilter: "blur(6px)",
				}}
			>
				<span
					style={{
						width: 5,
						height: 5,
						borderRadius: "50%",
						background: "var(--green)",
						display: "block",
					}}
				/>
				LIVE
			</div>

			<style>{`
        @keyframes skeletonSlide {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        /* compute scale based on preview container width */
        .preview-frame { --iframe-scale: 0.28; }
        @media (max-width: 1100px) { .preview-frame { --iframe-scale: 0.24; } }
        @media (max-width: 900px)  { .preview-frame { --iframe-scale: 0.28; } }
      `}</style>
		</div>
	);
}

// ─── Project card ──────────────────────────────────────────────────────────
export default function Projects() {
	return (
		<section className="section" id="projects">
			<p className="eyebrow rv">// selected work</p>
			<h2 className="s-title rv">Projects</h2>
			<div className="s-bar rv" />

			<div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
				{PROJECTS.map((p, i) => (
					<div
						key={p.num}
						className={`card rv d${(i % 3) + 1}`}
						style={{ padding: 0, overflow: "hidden" }}
					>
						<div className="card-shimmer" />

						{/* inner layout: info left, preview right */}
						<div className="proj-card-inner">
							{/* ── LEFT: project info ── */}
							<div style={{ padding: "2rem", flex: 1, minWidth: 0 }}>
								{/* header */}
								<div
									style={{
										display: "flex",
										alignItems: "baseline",
										gap: 10,
										flexWrap: "wrap",
										marginBottom: "0.5rem",
									}}
								>
									<span
										style={{
											fontFamily: "var(--FM)",
											fontSize: "0.65rem",
											color: "var(--sub)",
											fontWeight: 400,
										}}
									>
										{p.num}
									</span>
									<span
										style={{
											fontFamily: "'Syne',sans-serif",
											fontSize: "1.12rem",
											fontWeight: 700,
											color: "var(--text)",
										}}
									>
										{p.title}
									</span>
									<span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
										— {p.subtitle}
									</span>
									{p.featured && (
										<span
											style={{
												fontFamily: "var(--FM)",
												fontSize: "0.6rem",
												letterSpacing: "0.1em",
												padding: "2px 10px",
												borderRadius: 100,
												background: "var(--cyan10)",
												border: "1px solid var(--cyan20)",
												color: "var(--cyan)",
											}}
										>
											FEATURED
										</span>
									)}
								</div>

								{/* long description */}
								<p
									style={{
										fontSize: "0.87rem",
										lineHeight: 1.8,
										color: "var(--sub)",
										fontWeight: 300,
										marginBottom: "1rem",
									}}
								>
									{p.longDesc}
								</p>

								{/* stack pills */}
								<div
									style={{
										display: "flex",
										flexWrap: "wrap",
										gap: 6,
										marginBottom: "0.9rem",
									}}
								>
									{p.stack.map((s) => (
										<span
											key={s}
											className="skill-pill"
											style={{ fontSize: "0.63rem", padding: "3px 10px" }}
										>
											{s}
										</span>
									))}
								</div>

								{/* date + links row */}
								<div style={{ display: "flex", alignItems: "center", gap: 14 }}>
									<span
										style={{
											fontFamily: "var(--FM)",
											fontSize: "0.63rem",
											color: "var(--muted)",
										}}
									>
										{p.date}
									</span>
									<a
										href={p.githubUrl}
										target="_blank"
										rel="noreferrer"
										className="icon-btn"
										title="GitHub"
										style={{ width: 30, height: 30 }}
									>
										<GitHubIcon size={13} />
									</a>
									<a
										href={p.liveUrl}
										target="_blank"
										rel="noreferrer"
										className="icon-btn"
										title="Live Demo"
										style={{ width: 30, height: 30 }}
									>
										<ExternalIcon size={12} />
									</a>
								</div>
							</div>

							{/* ── RIGHT: live preview ── */}
							<div
								className="proj-preview preview-frame"
								style={{ padding: "1.5rem 1.5rem 1.5rem 0" }}
							>
								<LivePreview url={p.liveUrl} title={p.title} />
							</div>
						</div>
					</div>
				))}
			</div>

			<style>{`
        .proj-card-inner {
          display: grid;
          grid-template-columns: 1fr 320px;
          align-items: start;
          min-height: 240px;
        }
        .proj-preview {
          /* align preview vertically in the card */
          display: flex;
          align-items: center;
        }

        /* on tablet/mobile: stack, preview goes below */
        @media (max-width: 860px) {
          .proj-card-inner { grid-template-columns: 1fr; }
          .proj-preview {
            padding: 0 1.5rem 1.5rem !important;
            width: 100%;
          }
        }
      `}</style>
		</section>
	);
}
