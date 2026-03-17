"use client";
import { TIMELINE } from "@/lib/data";
import { CertIcon } from "@/components/Icons";

export default function Experience() {
	return (
		<section className="section" id="experience">
			<p className="eyebrow rv">// journey</p>
			<h2 className="s-title rv">Certifications & Training</h2>
			<div className="s-bar rv" />

			<div style={{ position: "relative", paddingLeft: 26 }} className="rv d1">
				{/* vertical line fades out at the bottom */}
				<div
					style={{
						position: "absolute",
						left: 3,
						top: 8,
						bottom: 8,
						width: 1,
						background:
							"linear-gradient(to bottom, var(--cyan) 0%, transparent 100%)",
					}}
				/>

				{TIMELINE.map((item, i) => (
					<div
						key={item.org}
						style={{
							position: "relative",
							paddingBottom: i < TIMELINE.length - 1 ? "2.8rem" : 0,
						}}
					>
						{/* timeline dot */}
						<span
							style={{
								position: "absolute",
								left: -26,
								top: 7,
								width: 8,
								height: 8,
								borderRadius: "50%",
								background: "var(--cyan)",
								outline: "3px solid rgba(34,211,238,0.18)",
								display: "block",
							}}
						/>

						<p
							style={{
								fontFamily: "var(--FM)",
								fontSize: "0.66rem",
								color: "var(--cyan)",
								letterSpacing: "0.1em",
								marginBottom: "0.25rem",
							}}
						>
							{item.period}
						</p>

						{/* role + certificate link inline */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 12,
								flexWrap: "wrap",
								marginBottom: "0.15rem",
							}}
						>
							<p
								style={{
									fontFamily: "'Syne',sans-serif",
									fontSize: "1.02rem",
									fontWeight: 600,
									color: "var(--text)",
								}}
							>
								{item.role}
							</p>
							<a
								href={item.certUrl}
								target="_blank"
								rel="noreferrer"
								style={{
									display: "inline-flex",
									alignItems: "center",
									gap: 5,
									fontFamily: "var(--FM)",
									fontSize: "0.6rem",
									letterSpacing: "0.08em",
									color: "var(--cyan)",
									background: "var(--cyan10)",
									border: "1px solid rgba(34,211,238,0.22)",
									borderRadius: 100,
									padding: "2px 10px",
									textDecoration: "none",
									transition: "background .18s, border-color .18s",
									flexShrink: 0,
								}}
								onMouseEnter={(e) => {
									(e.currentTarget as HTMLElement).style.background =
										"rgba(34,211,238,0.18)";
									(e.currentTarget as HTMLElement).style.borderColor =
										"var(--cyan)";
								}}
								onMouseLeave={(e) => {
									(e.currentTarget as HTMLElement).style.background =
										"var(--cyan10)";
									(e.currentTarget as HTMLElement).style.borderColor =
										"rgba(34,211,238,0.22)";
								}}
							>
								<CertIcon size={10} /> View Certificate
							</a>
						</div>

						<p
							style={{
								fontSize: "0.82rem",
								color: "var(--muted)",
								marginBottom: "0.9rem",
							}}
						>
							{item.org}
						</p>

						<ul
							style={{
								listStyle: "none",
								display: "flex",
								flexDirection: "column",
								gap: 5,
							}}
						>
							{item.points.map((pt) => (
								<li
									key={pt}
									style={{
										fontSize: "0.85rem",
										lineHeight: 1.65,
										color: "var(--sub)",
										paddingLeft: "1rem",
										position: "relative",
										fontWeight: 300,
									}}
								>
									<span
										style={{
											position: "absolute",
											left: 0,
											color: "var(--cyan)",
										}}
									>
										›
									</span>
									{pt}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
}
