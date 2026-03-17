"use client";
import { useState } from "react";
import { SITE } from "@/lib/data";
import { MailIcon, PhoneIcon, PinIcon, ClockIcon } from "@/components/Icons";

function ContactForm() {
	const [fields, setFields] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [status, setStatus] = useState<null | "ok" | "err">(null);
	const [sending, setSending] = useState(false);

	const update = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => setFields({ ...fields, [e.target.name]: e.target.value });

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSending(true);
		setStatus(null);
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(fields),
			});
			if (res.ok) {
				setStatus("ok");
				setFields({ name: "", email: "", subject: "", message: "" });
			} else setStatus("err");
		} catch {
			setStatus("err");
		}
		setSending(false);
	};

	const input: React.CSSProperties = {
		background: "var(--bg2)",
		border: "1px solid var(--bdr2)",
		borderRadius: 8,
		padding: "10px 13px",
		fontSize: "0.86rem",
		color: "var(--text)",
		fontFamily: "var(--FB)",
		fontWeight: 300,
		outline: "none",
		width: "100%",
		transition: "border-color .18s",
	};

	const focusOn = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => (e.target.style.borderColor = "rgba(34,211,238,0.35)");
	const focusOff = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => (e.target.style.borderColor = "var(--bdr2)");

	return (
		<form onSubmit={submit}>
			<div
				style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
				className="form-2col"
			>
				{[
					["Name", "name", "Your name", "text"],
					["Email", "email", "you@email.com", "email"],
				].map(([lbl, nm, ph, tp]) => (
					<div
						key={nm}
						style={{
							display: "flex",
							flexDirection: "column",
							gap: 5,
							marginBottom: "0.9rem",
						}}
					>
						<label
							style={{
								fontFamily: "var(--FM)",
								fontSize: "0.6rem",
								letterSpacing: "0.12em",
								color: "var(--faint)",
								textTransform: "uppercase",
							}}
						>
							{lbl}
						</label>
						<input
							style={input}
							name={nm}
							type={tp}
							placeholder={ph}
							value={(fields as Record<string, string>)[nm]}
							onChange={update}
							onFocus={focusOn}
							onBlur={focusOff}
							required
						/>
					</div>
				))}
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 5,
					marginBottom: "0.9rem",
				}}
			>
				<label
					style={{
						fontFamily: "var(--FM)",
						fontSize: "0.6rem",
						letterSpacing: "0.12em",
						color: "var(--faint)",
						textTransform: "uppercase",
					}}
				>
					Subject
				</label>
				<input
					style={input}
					name="subject"
					placeholder="Internship / Collaboration"
					value={fields.subject}
					onChange={update}
					onFocus={focusOn}
					onBlur={focusOff}
					required
				/>
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 5,
					marginBottom: "1rem",
				}}
			>
				<label
					style={{
						fontFamily: "var(--FM)",
						fontSize: "0.6rem",
						letterSpacing: "0.12em",
						color: "var(--faint)",
						textTransform: "uppercase",
					}}
				>
					Message
				</label>
				<textarea
					style={{ ...input, resize: "vertical", minHeight: 108 }}
					name="message"
					placeholder="Tell me about the opportunity…"
					value={fields.message}
					onChange={update}
					onFocus={focusOn}
					onBlur={focusOff}
					required
				/>
			</div>

			<button
				type="submit"
				className="btn btn-primary"
				disabled={sending}
				style={{ width: "100%", justifyContent: "center", borderRadius: 8 }}
			>
				{sending ? "Sending…" : "Send Message →"}
			</button>

			{status === "ok" && (
				<p
					style={{
						fontFamily: "var(--FM)",
						fontSize: "0.7rem",
						color: "#4ade80",
						marginTop: "0.6rem",
					}}
				>
					✓ Sent! I&apos;ll reply within 24 hours.
				</p>
			)}
			{status === "err" && (
				<p
					style={{
						fontFamily: "var(--FM)",
						fontSize: "0.7rem",
						color: "#f87171",
						marginTop: "0.6rem",
					}}
				>
					✗ Something went wrong — email me directly.
				</p>
			)}

			<style>{`@media(max-width:460px){ .form-2col { grid-template-columns: 1fr !important; } }`}</style>
		</form>
	);
}

export default function Contact() {
	return (
		<section className="section" id="contact">
			<p className="eyebrow rv">// get in touch</p>
			<h2 className="s-title rv">Contact</h2>
			<div className="s-bar rv" />

			<div className="contact-grid">
				<div className="rv">
					<p
						style={{
							fontSize: "0.9rem",
							lineHeight: 1.88,
							color: "var(--sub)",
							marginBottom: "1.8rem",
							fontWeight: 300,
						}}
					>
						I&apos;m actively looking for internship roles in full-stack or
						AI/ML engineering. If you have an opening, want to collaborate on
						something interesting, or just want to talk tech — reach out.
					</p>

					<div style={{ display: "flex", flexDirection: "column" }}>
						{[
							{
								icon: <MailIcon size={13} />,
								text: SITE.email,
								href: `mailto:${SITE.email}`,
							},
							{
								icon: <PhoneIcon size={13} />,
								text: SITE.phone,
								href: `tel:${SITE.phone}`,
							},
							{ icon: <PinIcon size={13} />, text: SITE.location, href: null },
							{
								icon: <ClockIcon size={13} />,
								text: "Response within 24 hours",
								href: null,
							},
						].map(({ icon, text, href }) => (
							<div
								key={text}
								style={{
									display: "flex",
									alignItems: "center",
									gap: 14,
									padding: "12px 0",
									borderBottom: "1px solid var(--bdr2)",
									fontFamily: "var(--FM)",
									fontSize: "0.74rem",
									color: "var(--sub)",
								}}
							>
								<span style={{ color: "var(--cyan)", display: "flex" }}>
									{icon}
								</span>
								{href ? (
									<a
										href={href}
										style={{
											color: "var(--sub)",
											textDecoration: "none",
											transition: "color .18s",
										}}
										onMouseEnter={(e) =>
											((e.currentTarget as HTMLElement).style.color =
												"var(--cyan)")
										}
										onMouseLeave={(e) =>
											((e.currentTarget as HTMLElement).style.color =
												"var(--sub)")
										}
									>
										{text}
									</a>
								) : (
									<span>{text}</span>
								)}
							</div>
						))}
					</div>
				</div>

				<div className="rv d1">
					<ContactForm />
				</div>
			</div>
		</section>
	);
}
