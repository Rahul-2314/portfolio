"use client";
import { ABOUT_INFO, ACHIEVEMENTS } from "@/lib/data";

export default function About() {
	return (
		<section className="section" id="about">
			<p className="eyebrow rv">// about me</p>
			<h2 className="s-title rv">Who I Am</h2>
			<div className="s-bar rv" />

			<div className="about-grid">
				{/* bio + chips */}
				<div className="rv">
					{[
						<>
							I&apos;m a{" "}
							<strong style={{ color: "var(--text)", fontWeight: 500 }}>
								Full-Stack MERN Developer
							</strong>{" "}
							and BTech CSE Undergrad at UEM Jaipur, currently exploring the
							intersection of scalable backend systems and applied AI. My
							journey started with competitive programming and evolved into
							building things real people use.
						</>,
						<>
							On the product side, I&apos;ve shipped a{" "}
							<strong style={{ color: "var(--text)", fontWeight: 500 }}>
								URL shortener handling 10k+ links
							</strong>{" "}
							with a full analytics pipeline, and a{" "}
							<strong style={{ color: "var(--text)", fontWeight: 500 }}>
								multilingual AI chatbot
							</strong>{" "}
							with persistent thread memory. On the AI side, I&apos;ve been
							diving deep into RAG architectures, agentic AI patterns (ReAct,
							multi-agent collaboration, planning agents), and LLM fine-tuning
							workflows.
						</>,
						<>
							I care about clean architecture, meaningful abstractions, and
							systems that hold up under pressure. Currently looking for{" "}
							<strong style={{ color: "var(--text)", fontWeight: 500 }}>
								internship opportunities
							</strong>{" "}
							in full-stack or AI/ML engineering.
						</>,
					].map((para, i) => (
						<p
							key={i}
							style={{
								fontSize: "0.92rem",
								lineHeight: 1.9,
								color: "var(--sub)",
								marginBottom: "1.1rem",
								fontWeight: 300,
							}}
						>
							{para}
						</p>
					))}

					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							gap: 7,
							marginTop: "1.5rem",
						}}
					>
						{ACHIEVEMENTS.map((a) => (
							<span key={a} className="skill-pill" style={{ borderRadius: 8 }}>
								{a}
							</span>
						))}
					</div>
				</div>

				{/* info table */}
				<div className="rv d1">
					{ABOUT_INFO.map(({ label, value }) => (
						<div
							key={label}
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "baseline",
								gap: "1rem",
								padding: "13px 0",
								borderBottom: "1px solid var(--bdr2)",
							}}
						>
							<span
								style={{
									fontFamily: "var(--FM)",
									fontSize: "0.64rem",
									color: "var(--faint)",
									letterSpacing: "0.08em",
									flexShrink: 0,
								}}
							>
								{label}
							</span>
							<span
								style={{
									fontSize: "0.85rem",
									color: "var(--sub)",
									textAlign: "right",
								}}
							>
								{value}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
