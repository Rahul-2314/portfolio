"use client";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/data";
import { GitHubIcon } from "@/components/Icons";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Week = Day[];

const LEVEL_COLORS = ["#0b1220", "#073a1e", "#0e6832", "#22a854", "#39d353"];
const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

// pad the start of the first week so Sunday is always column 0
function buildCalendar(days: Day[]): Week[] {
	const weeks: Week[] = [];
	let week: Day[] = [];

	days.forEach((d, i) => {
		const dow = new Date(d.date + "T00:00:00").getDay();
		if (i === 0 && dow > 0) {
			for (let j = 0; j < dow; j++) week.push({ date: "", count: 0, level: 0 });
		}
		week.push(d);
		if (week.length === 7) {
			weeks.push(week);
			week = [];
		}
	});

	if (week.length) {
		while (week.length < 7) week.push({ date: "", count: 0, level: 0 });
		weeks.push(week);
	}

	return weeks;
}

export default function GitHubGraph() {
	const [weeks, setWeeks] = useState<Week[]>([]);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [tip, setTip] = useState<{ text: string; x: number; y: number } | null>(
		null,
	);

	useEffect(() => {
		fetch(
			`https://github-contributions-api.jogruber.de/v4/${SITE.githubUsername}?y=last`,
		)
			.then((r) => r.json())
			.then((data) => {
				const days: Day[] = data.contributions ?? [];
				setWeeks(buildCalendar(days));
				setTotal(days.reduce((s, d) => s + d.count, 0));
				setLoading(false);
			})
			.catch(() => {
				setError(true);
				setLoading(false);
			});
	}, []);

	// compute month label positions once we have data
	const monthLabels: { label: string; wi: number }[] = [];
	weeks.forEach((w, wi) => {
		if (w[0]?.date) {
			const m = new Date(w[0].date + "T00:00:00").getMonth();
			const prev =
				wi > 0
					? new Date((weeks[wi - 1][0]?.date || "") + "T00:00:00").getMonth()
					: -1;
			if (m !== prev) monthLabels.push({ label: MONTHS[m], wi });
		}
	});

	return (
		<section className="section" id="github">
			<p className="eyebrow rv">// open source</p>
			<h2 className="s-title rv">GitHub Contributions</h2>
			<div className="s-bar rv" />

			<div
				className="card rv d1"
				style={{
					padding: "2rem",
					animation: "card-pulse 5s ease-in-out infinite",
				}}
			>
				<div className="card-shimmer" />

				{/* top accent bar */}
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						height: 2,
						background:
							"linear-gradient(90deg, transparent, var(--cyan), transparent)",
						opacity: 0.5,
						zIndex: 1,
					}}
				/>

				{/* header row */}
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: "1.5rem",
						flexWrap: "wrap",
						gap: "0.75rem",
					}}
				>
					<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
						<span style={{ color: "var(--cyan)" }}>
							<GitHubIcon size={18} />
						</span>
						<span
							style={{
								fontFamily: "var(--FM)",
								fontSize: "0.78rem",
								color: "var(--text)",
								fontWeight: 500,
							}}
						>
							@{SITE.githubUsername}
						</span>
					</div>
					{!loading && !error && (
						<span
							style={{
								fontFamily: "var(--FM)",
								fontSize: "0.68rem",
								color: "var(--sub)",
							}}
						>
							<span style={{ color: "var(--cyan)", fontWeight: 500 }}>
								{total}
							</span>{" "}
							contributions in the last year
						</span>
					)}
				</div>

				{/* loading dots */}
				{loading && (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: 100,
							gap: 8,
						}}
					>
						{[0, 1, 2].map((i) => (
							<div
								key={i}
								style={{
									width: 8,
									height: 8,
									borderRadius: "50%",
									background: "var(--cyan)",
									animation: "dot-bounce 1.2s ease-in-out infinite",
									animationDelay: `${i * 0.16}s`,
								}}
							/>
						))}
					</div>
				)}

				{error && (
					<p
						style={{
							fontFamily: "var(--FM)",
							fontSize: "0.72rem",
							color: "var(--sub)",
							textAlign: "center",
							padding: "2.5rem 0",
						}}
					>
						Could not load contribution data.
					</p>
				)}

				{!loading && !error && (
					<div
						style={{
							overflowX: "auto",
							paddingBottom: 8,
							position: "relative",
						}}
					>
						<div
							style={{
								display: "inline-block",
								minWidth: "max-content",
								position: "relative",
							}}
						>
							{/* month labels */}
							<div
								style={{
									display: "flex",
									marginBottom: 6,
									paddingLeft: 32,
									position: "relative",
									height: 16,
								}}
							>
								{monthLabels.map(({ label, wi }) => (
									<div
										key={`${label}-${wi}`}
										style={{
											position: "absolute",
											left: 32 + wi * 13,
											fontFamily: "var(--FM)",
											fontSize: "0.58rem",
											color: "var(--muted)",
										}}
									>
										{label}
									</div>
								))}
							</div>

							<div style={{ display: "flex", gap: 3 }}>
								{/* day-of-week labels */}
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: 3,
										marginRight: 4,
									}}
								>
									{["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
										<div
											key={i}
											style={{
												height: 10,
												fontFamily: "var(--FM)",
												fontSize: "0.55rem",
												color: "var(--muted)",
												lineHeight: "10px",
											}}
										>
											{d}
										</div>
									))}
								</div>

								{/* contribution squares */}
								{weeks.map((week, wi) => (
									<div
										key={wi}
										style={{ display: "flex", flexDirection: "column", gap: 3 }}
									>
										{week.map((day, di) => (
											<div
												key={di}
												style={{
													width: 10,
													height: 10,
													borderRadius: 2,
													flexShrink: 0,
													background: day.date
														? LEVEL_COLORS[day.level]
														: "transparent",
													border: day.date
														? "1px solid rgba(255,255,255,0.05)"
														: "none",
													cursor: day.date ? "pointer" : "default",
													transition: "transform .1s",
												}}
												onMouseEnter={(e) => {
													if (!day.date) return;
													(e.currentTarget as HTMLElement).style.transform =
														"scale(1.5)";
													const r = (
														e.currentTarget as HTMLElement
													).getBoundingClientRect();
													const p = (e.currentTarget as HTMLElement)
														.closest(".card")
														?.getBoundingClientRect();
													setTip({
														text: `${day.count} contribution${day.count !== 1 ? "s" : ""} · ${new Date(day.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
														x: r.left - (p?.left ?? 0),
														y: r.top - (p?.top ?? 0) - 28,
													});
												}}
												onMouseLeave={(e) => {
													(e.currentTarget as HTMLElement).style.transform =
														"scale(1)";
													setTip(null);
												}}
											/>
										))}
									</div>
								))}
							</div>

							{tip && (
								<div
									style={{
										position: "absolute",
										top: tip.y,
										left: tip.x,
										background: "var(--bg3)",
										border: "1px solid var(--bdr3)",
										borderRadius: 6,
										padding: "4px 10px",
										fontFamily: "var(--FM)",
										fontSize: "0.62rem",
										color: "var(--text)",
										whiteSpace: "nowrap",
										zIndex: 10,
										pointerEvents: "none",
										boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
									}}
								>
									{tip.text}
								</div>
							)}
						</div>

						{/* legend */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 5,
								marginTop: "1.2rem",
								justifyContent: "flex-end",
							}}
						>
							<span
								style={{
									fontFamily: "var(--FM)",
									fontSize: "0.58rem",
									color: "var(--muted)",
								}}
							>
								Less
							</span>
							{LEVEL_COLORS.map((c, i) => (
								<div
									key={i}
									style={{
										width: 10,
										height: 10,
										borderRadius: 2,
										background: c,
										border: "1px solid rgba(255,255,255,0.07)",
									}}
								/>
							))}
							<span
								style={{
									fontFamily: "var(--FM)",
									fontSize: "0.58rem",
									color: "var(--muted)",
								}}
							>
								More
							</span>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
