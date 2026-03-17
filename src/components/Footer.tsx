import { SITE } from "@/lib/data";

export default function Footer() {
	return (
		<footer
			style={{
				maxWidth: 1100,
				margin: "0 auto",
				padding: "2rem clamp(1.25rem,5vw,3.5rem)",
				borderTop: "1px solid var(--bdr2)",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				flexWrap: "wrap",
				gap: "1rem",
			}}
		>
			<p
				style={{
					fontFamily: "var(--FM)",
					fontSize: "0.65rem",
					color: "var(--muted)",
				}}
			>
				© 2025 <span style={{ color: "var(--cyan)" }}>{SITE.name}</span> —
				Designed &amp; built with Next.js
			</p>
			<p
				style={{
					fontFamily: "var(--FM)",
					fontSize: "0.65rem",
					color: "var(--muted)",
				}}
			>
				Jaipur, India ·{" "}
				<span style={{ color: "var(--cyan)" }}>Open to Opportunities</span>
			</p>
		</footer>
	);
}
