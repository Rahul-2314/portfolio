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

	// Lock body scroll when drawer is open
	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	const close = () => setMenuOpen(false);

	return (
		<>
			{/* ── Main nav bar ── */}
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
					borderBottom: scrolled
						? "1px solid rgba(34,211,238,0.15)"
						: "1px solid rgba(255,255,255,0.09)",
					transition: "background .3s, border-color .3s",
					display: "flex",
					alignItems: "center",
				}}
			>
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
					{/* rc.dev wordmark */}
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
							borderLeft: "2px solid var(--cyan)",
							paddingLeft: 10,
							lineHeight: 1,
						}}
					>
						rc.dev
					</a>

					{/* Desktop nav — absolutely centred */}
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

					{/* Resume pill */}
					<a
						href={SITE.resumePath}
						target="_blank"
						rel="noreferrer"
						className="btn btn-outline nav-resume"
						download="Rahul_Chowdhury_Resume.pdf"
						style={{ padding: "7px 16px", fontSize: "0.67rem", flexShrink: 0 }}
					>
						<DownloadIcon size={11} /> Resume
					</a>

					{/* Hamburger */}
					<button
						className="nav-ham"
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label="Toggle menu"
						style={{
							display: "none",
							background: "none",
							border: "1.5px solid var(--bdr2)",
							color: menuOpen ? "var(--cyan)" : "var(--sub)",
							borderColor: menuOpen ? "var(--cyan)" : "var(--bdr2)",
							padding: "5px 10px",
							borderRadius: 7,
							cursor: "pointer",
							fontSize: "1rem",
							transition: "color .2s, border-color .2s",
						}}
					>
						{/* Animated hamburger → X */}
						<div
							style={{
								width: 18,
								height: 12,
								margin: "4px",
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
							}}
						>
							{/* Top Bar */}
							<span
								style={{
									display: "block",
									height: "1.5px",
									background: "currentColor",
									borderRadius: 2,
									transformOrigin: "center",
									transition: "transform .25s ease, opacity .2s",
									transform: menuOpen
										? "rotate(45deg) translate(4px, 3px)"
										: "none",
								}}
							/>

							{/* Middle Bar */}
							<span
								style={{
									display: "block",
									height: "1.5px",
									background: "currentColor",
									borderRadius: 2,
									transition: "opacity .2s",
									opacity: menuOpen ? 0 : 1,
								}}
							/>

							{/* Bottom Bar */}
							<span
								style={{
									display: "block",
									height: "1.5px",
									background: "currentColor",
									borderRadius: 2,
									transformOrigin: "center",
									transition: "transform .25s ease, opacity .2s",
									transform: menuOpen
										? "rotate(-45deg) translate(4px, -3px)"
										: "none",
								}}
							/>
						</div>
					</button>
				</div>
			</nav>

			{/* ── Mobile drawer — full-screen with blur backdrop ── */}
			{menuOpen && (
				<>
					{/* Backdrop */}
					<div
						onClick={close}
						style={{
							position: "fixed",
							inset: 0,
							zIndex: 280,
							background: "rgba(6,10,17,0.6)",
							backdropFilter: "blur(4px)",
							animation: "fadeIn .2s ease",
						}}
					/>

					{/* Drawer panel — slides in from right */}
					<div
						style={{
							position: "fixed",
							top: 0,
							right: 0,
							bottom: 0,
							width: "min(320px, 85vw)",
							zIndex: 290,
							background: "rgba(11,18,32,0.98)",
							borderLeft: "1px solid rgba(34,211,238,0.15)",
							backdropFilter: "blur(24px)",
							display: "flex",
							flexDirection: "column",
							padding: "0 0 2rem",
							animation: "slideIn .28s cubic-bezier(0.22, 1, 0.36, 1)",
							boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
						}}
					>
						{/* Drawer header */}
						<div
							style={{
								height: 60,
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								padding: "0 1.75rem",
								borderBottom: "1px solid rgba(255,255,255,0.07)",
							}}
						>
							<a
								href="#hero"
								onClick={close}
								style={{
									fontFamily: "var(--FM)",
									fontSize: "0.95rem",
									fontWeight: 500,
									color: "var(--cyan)",
									textDecoration: "none",
									borderLeft: "2px solid var(--cyan)",
									paddingLeft: 10,
									lineHeight: 1,
								}}
							>
								rc.dev
							</a>
							<button
								onClick={close}
								style={{
									background: "none",
									border: "1.5px solid rgba(34,211,238,0.25)",
									color: "var(--cyan)",
									width: 32,
									height: 32,
									borderRadius: 8,
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "0.9rem",
									transition: "background .2s",
								}}
								onMouseEnter={(e) =>
									((e.currentTarget as HTMLElement).style.background =
										"rgba(34,211,238,0.1)")
								}
								onMouseLeave={(e) =>
									((e.currentTarget as HTMLElement).style.background = "none")
								}
							>
								✕
							</button>
						</div>

						{/* Nav links — staggered */}
						<nav
							style={{
								flex: 1,
								padding: "1.5rem 1.75rem",
								display: "flex",
								flexDirection: "column",
								gap: 2,
							}}
						>
							{NAV_LINKS.map((n, i) => (
								<a
									key={n}
									href={`#${n.toLowerCase()}`}
									onClick={close}
									style={{
										display: "flex",
										alignItems: "center",
										gap: 14,
										padding: "0.85rem 0.5rem",
										borderBottom:
											i < NAV_LINKS.length - 1
												? "1px solid rgba(255,255,255,0.05)"
												: "none",
										textDecoration: "none",
										opacity: 0,
										animation: `drawerItem .3s cubic-bezier(0.22,1,0.36,1) ${0.06 + i * 0.05}s forwards`,
										transition: "color .18s",
									}}
									onMouseEnter={(e) => {
										(e.currentTarget as HTMLElement).style.color =
											"var(--cyan)";
										(
											(e.currentTarget as HTMLElement).querySelector(
												".nav-num",
											) as HTMLElement
										).style.color = "var(--cyan)";
									}}
									onMouseLeave={(e) => {
										(e.currentTarget as HTMLElement).style.color =
											"var(--text)";
										(
											(e.currentTarget as HTMLElement).querySelector(
												".nav-num",
											) as HTMLElement
										).style.color = "var(--faint)";
									}}
								>
									{/* Number */}
									<span
										className="nav-num"
										style={{
											fontFamily: "var(--FM)",
											fontSize: "0.58rem",
											color: "var(--faint)",
											letterSpacing: "0.1em",
											width: 20,
											transition: "color .18s",
											flexShrink: 0,
										}}
									>
										{String(i + 1).padStart(2, "0")}
									</span>

									{/* Link text */}
									<span
										style={{
											fontFamily: "var(--FM)",
											fontSize: "0.9rem",
											letterSpacing: "0.1em",
											color: "var(--text)",
											flex: 1,
										}}
									>
										{n}
									</span>

									{/* Arrow */}
									<svg
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="var(--faint)"
										strokeWidth="2"
									>
										<line x1="5" y1="12" x2="19" y2="12" />
										<polyline points="12 5 19 12 12 19" />
									</svg>
								</a>
							))}
						</nav>

						{/* Drawer footer — resume button */}
						<div style={{ padding: "0 1.75rem" }}>
							<div
								style={{
									height: 1,
									marginBottom: "1.5rem",
									background:
										"linear-gradient(90deg, rgba(34,211,238,0.3), transparent)",
								}}
							/>
							<a
								href={SITE.resumePath}
								target="_blank"
								rel="noreferrer"
								className="btn btn-primary"
								onClick={close}
								style={{
									width: "100%",
									justifyContent: "center",
									borderRadius: 10,
									opacity: 0,
									animation:
										"drawerItem .3s cubic-bezier(0.22,1,0.36,1) 0.42s forwards",
								}}
							>
								<DownloadIcon size={13} /> Download Resume
							</a>

							{/* social row */}
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									gap: 10,
									marginTop: "1.25rem",
									opacity: 0,
									animation:
										"drawerItem .3s cubic-bezier(0.22,1,0.36,1) 0.48s forwards",
								}}
							>
								{[
									{ href: SITE.github, label: "GH", emoji: "🐙" },
									{ href: SITE.linkedin, label: "LI", emoji: "💼" },
									{ href: `mailto:${SITE.email}`, label: "✉", emoji: "✉️" },
								].map(({ href, label, emoji }) => (
									<a
										key={label}
										href={href}
										target="_blank"
										rel="noreferrer"
										style={{
											width: 38,
											height: 38,
											borderRadius: 10,
											border: "1px solid var(--bdr2)",
											background: "var(--bg2)",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											textDecoration: "none",
											fontSize: "0.9rem",
											transition: "border-color .18s, background .18s",
										}}
										onMouseEnter={(e) => {
											(e.currentTarget as HTMLElement).style.borderColor =
												"var(--cyan)";
											(e.currentTarget as HTMLElement).style.background =
												"var(--cyan10)";
										}}
										onMouseLeave={(e) => {
											(e.currentTarget as HTMLElement).style.borderColor =
												"var(--bdr2)";
											(e.currentTarget as HTMLElement).style.background =
												"var(--bg2)";
										}}
									>
										{emoji}
									</a>
								))}
							</div>
						</div>
					</div>
				</>
			)}

			<style>{`
        /* Desktop: show links, hide hamburger */
        @media (min-width: 821px) {
          .nav-links  { display: flex !important; }
          .nav-resume { display: inline-flex !important; }
          .nav-ham    { display: none !important; }
        }

        /* Mobile: hide links, show hamburger */
        @media (max-width: 820px) {
          .nav-links  { display: none !important; }
          .nav-resume { display: none !important; }
          .nav-ham    { display: flex !important; align-items: center; justify-content: center; }
        }

        /* Backdrop fade */
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Drawer slides in from right */
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }

        /* Each drawer item fades + slides up */
        @keyframes drawerItem {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
		</>
	);
}
