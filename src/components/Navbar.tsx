"use client";

import { useState, useEffect } from "react";
import { SITE } from "@/lib/data";
import { DownloadIcon } from "@/components/Icons";

const NAV_LINKS = [
	"About",
	"Skills",
	"Projects",
	"Experience",
	"GitHub",
	"Blog",
	"Contact",
];

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const close = () => setMenuOpen(false);

	return (
		<>
			<nav
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					zIndex: 300,
					height: 60,
					background: scrolled ? "rgba(6,10,17,0.94)" : "rgba(6,10,17,0.72)",
					backdropFilter: "blur(20px) saturate(1.6)",
					borderBottom: "1px solid rgba(255,255,255,0.09)",
					transition: "background .3s",
					display: "flex",
					alignItems: "center",
				}}
			>
				{/* inner container keeps everything within the 1100px column */}
				<div
					style={{
						maxWidth: 1100,
						width: "100%",
						margin: "0 auto",
						padding: "0 clamp(1.25rem,4vw,2.5rem)",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						position: "relative",
					}}
				>
					{/* rc.dev — plain wordmark, clearly a logo not a button */}
					<a
						href="#hero"
						style={{
							fontFamily: "var(--FM)",
							fontSize: "1rem",
							fontWeight: 500,
							color: "var(--cyan)",
							textDecoration: "none",
							letterSpacing: "0.04em",
							flexShrink: 0,
							// subtle left-border accent instead of a full box
							borderLeft: "2px solid var(--cyan)",
							paddingLeft: 10,
							lineHeight: 1,
						}}
					>
						rc.dev
					</a>

					{/* desktop links — absolutely centred in the container */}
					<ul
						className="nav-links"
						style={{
							position: "absolute",
							left: "50%",
							transform: "translateX(-50%)",
							display: "flex",
							gap: "2rem",
							listStyle: "none",
						}}
					>
						{NAV_LINKS.map((n) => (
							<li key={n}>
								<a
									href={`#${n.toLowerCase()}`}
									style={{
										fontFamily: "var(--FM)",
										fontSize: "0.67rem",
										letterSpacing: "0.12em",
										color: "var(--muted)",
										textDecoration: "none",
										transition: "color .18s",
									}}
									onMouseEnter={(e) =>
										((e.currentTarget as HTMLElement).style.color =
											"var(--text)")
									}
									onMouseLeave={(e) =>
										((e.currentTarget as HTMLElement).style.color =
											"var(--muted)")
									}
								>
									{n}
								</a>
							</li>
						))}
					</ul>

					{/* resume pill — clearly a CTA button, different from the logo */}
					<a
						href={SITE.resumePath}
						target="_blank"
						rel="noreferrer"
						className="btn btn-outline nav-resume"
						style={{ padding: "7px 16px", fontSize: "0.67rem", flexShrink: 0 }}
					>
						<DownloadIcon size={11} /> Resume
					</a>

					{/* hamburger — only visible on mobile */}
					<button
						className="nav-ham"
						onClick={() => setMenuOpen(!menuOpen)}
						style={{
							display: "none",
							background: "none",
							border: "1.5px solid var(--bdr2)",
							color: "var(--sub)",
							padding: "5px 10px",
							borderRadius: 7,
							cursor: "pointer",
							fontSize: "1rem",
						}}
					>
						{menuOpen ? "✕" : "☰"}
					</button>
				</div>

				{/* mobile drawer */}
				{menuOpen && (
					<div
						style={{
							position: "absolute",
							top: 60,
							left: 0,
							right: 0,
							background: "rgba(6,10,17,0.98)",
							borderBottom: "1px solid var(--bdr2)",
							padding: "1.5rem clamp(1.25rem,5vw,3.5rem) 2rem",
							display: "flex",
							flexDirection: "column",
							gap: "1.4rem",
							zIndex: 299,
							animation: "fadeUp .2s ease",
						}}
					>
						{NAV_LINKS.map((n) => (
							<a
								key={n}
								href={`#${n.toLowerCase()}`}
								onClick={close}
								style={{
									fontFamily: "var(--FM)",
									fontSize: "0.88rem",
									letterSpacing: "0.1em",
									color: "var(--sub)",
									textDecoration: "none",
								}}
							>
								{n}
							</a>
						))}
						<a
							href={SITE.resumePath}
							target="_blank"
							rel="noreferrer"
							className="btn btn-primary"
							style={{ width: "fit-content", marginTop: "0.5rem" }}
							onClick={close}
						>
							<DownloadIcon size={12} /> Download Resume
						</a>
					</div>
				)}
			</nav>

			<style>{`
        @media (max-width: 820px) {
          .nav-links  { display: none !important; }
          .nav-resume { display: none !important; }
          .nav-ham    { display: flex !important; align-items: center; justify-content: center; }
        }
      `}</style>
		</>
	);
}
