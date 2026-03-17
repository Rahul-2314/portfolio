"use client";
import { SKILLS } from "@/lib/data";

export default function Skills() {
	return (
		<section className="section" id="skills">
			<p className="eyebrow rv">// tech stack</p>
			<h2 className="s-title rv">Skills & Technologies</h2>
			<div className="s-bar rv" />

			<div className="sk-grid rv d1">
				{SKILLS.map(({ category, items }) => (
					<div key={category} className="card" style={{ padding: "1.8rem" }}>
						<div className="card-shimmer" />
						<p
							style={{
								fontFamily: "var(--FM)",
								fontSize: "0.63rem",
								letterSpacing: "0.14em",
								color: "var(--cyan)",
								marginBottom: "1rem",
								textTransform: "uppercase",
							}}
						>
							{category}
						</p>
						<div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
							{items.map((pill) => (
								<span key={pill} className="skill-pill">
									{pill}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
