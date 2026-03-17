"use client";

import { useState } from "react";
import { SITE, HERO_STATS, TYPEWRITER_PHRASES } from "@/lib/data";
import { useTypewriter } from "@/lib/hooks";
import {
  GitHubIcon, LinkedInIcon, TwitterIcon,
  MailIcon, PhoneIcon, DownloadIcon, ArrowIcon,
} from "@/components/Icons";

export default function Hero() {
  const [imgFailed, setImgFailed] = useState(false);
  const role = useTypewriter(TYPEWRITER_PHRASES);

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: "80px clamp(1.25rem, 6vw, 4.5rem) 4rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* ambient glow */}
      <div aria-hidden style={{
        position: "absolute", top: "-10%", right: "-5%",
        width: "52vw", height: "80vh", pointerEvents: "none",
        background: "radial-gradient(ellipse at top right, rgba(34,211,238,0.055) 0%, rgba(129,140,248,0.025) 38%, transparent 62%)",
      }} />

      <div
        style={{ maxWidth: 1100, width: "100%", margin: "0 auto", position: "relative", zIndex: 1 }}
        className="hero-grid"
      >
        {/* ── LEFT: text ── */}
        <div className="hero-text">

          <p className="hero-el" style={{
            fontFamily: "var(--FM)", fontSize: "0.78rem",
            color: "var(--muted)", letterSpacing: "0.1em",
            marginBottom: "0.6rem", animationDelay: "0.15s",
          }}>
            Hi, I&apos;m
          </p>

          <h1 className="hero-el" style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 800,
            fontSize: "clamp(2.8rem, 7vw, 5.2rem)",
            lineHeight: 1.05, letterSpacing: "-0.01em",
            paddingBottom: "0.1em", overflow: "visible",
            marginBottom: "1.4rem",
            background: "linear-gradient(135deg, var(--text) 0%, rgba(226,232,240,0.78) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            animationDelay: "0.28s",
          }}>
            Rahul<br />Chowdhury
          </h1>

          {/* typewriter row */}
          <div className="hero-el hero-tw-row" style={{
            display: "flex", alignItems: "center", gap: 12,
            marginBottom: "1.6rem", animationDelay: "0.42s",
          }}>
            <span style={{ width: 26, height: "1.5px", background: "var(--cyan)", flexShrink: 0, display: "block" }} />
            <span style={{
              fontFamily: "var(--FM)", fontSize: "0.8rem",
              color: "var(--sub)", letterSpacing: "0.05em", minHeight: "1.3em",
            }}>
              {role}
              <span style={{
                display: "inline-block", width: "1.5px", height: "0.85em",
                background: "var(--cyan)", marginLeft: 2, verticalAlign: "middle",
                animation: "blink 1s step-end infinite",
              }} />
            </span>
          </div>

          {/* bio */}
          <div className="hero-el hero-bio-wrap" style={{ animationDelay: "0.55s" }}>
            <p style={{ fontSize: "0.94rem", lineHeight: 1.9, color: "var(--sub)", fontWeight: 300 }}>
              BTech CSE (AIML) undergrad at UEM Jaipur. I build{" "}
              <strong style={{ color: "var(--text)", fontWeight: 500 }}>
                production-grade MERN applications
              </strong>{" "}
              and ship applied AI systems — RAG pipelines, agentic architectures,
              LLM integrations. Clean design, systems that scale.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="hero-el hero-btns" style={{
            display: "flex", gap: 10,
            marginBottom: "2.5rem", animationDelay: "0.68s",
          }}>
            <a href="#projects" className="btn btn-primary">View Projects <ArrowIcon /></a>
            <a href={SITE.resumePath} target="_blank" rel="noreferrer" className="btn btn-outline">
              <DownloadIcon /> Resume
            </a>
            <a href="#contact" className="btn btn-ghost">Let&apos;s Talk</a>
          </div>

          {/* stats — always single row, shrinks on mobile */}
          <div className="hero-el hero-stats-row" style={{ animationDelay: "0.80s" }}>
            {HERO_STATS.map((s, i) => (
              <div key={s.label} className="hero-stat-item">
                {i > 0 && <div className="stat-divider" />}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className="stat-val">
                    {s.value}<span style={{ color: "var(--cyan)" }}>{s.suffix}</span>
                  </span>
                  <span className="stat-label">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: badge → photo → socials ── */}
        <div className="hero-photo-col">

          {/* available badge */}
          <div className="hero-el" style={{
            display: "flex", justifyContent: "center",
            marginBottom: "1rem", animationDelay: "0.2s",
          }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "var(--FM)", fontSize: "0.66rem",
              letterSpacing: "0.14em", color: "var(--green)",
              background: "rgba(74,222,128,0.06)",
              border: "1px solid rgba(74,222,128,0.18)",
              borderRadius: 100, padding: "5px 14px",
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "var(--green)",
                boxShadow: "0 0 0 3px rgba(74,222,128,0.2)",
                animation: "avail-pulse 2.4s ease-in-out infinite",
                display: "block", flexShrink: 0,
              }} />
              Available for Internships
            </div>
          </div>

          {/* photo */}
          <div className="hero-el" style={{
            display: "flex", justifyContent: "center", animationDelay: "0.35s",
          }}>
            <div style={{ position: "relative" }}>
              <div className="photo-frame">
                {/* top shimmer */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 1,
                  background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.5), transparent)",
                  zIndex: 3,
                }} />
                {/* corner brackets */}
                {([
                  { top: -1,    left: -1,  borderWidth: "2px 0 0 2px", borderRadius: "5px 0 0 0" },
                  { top: -1,    right: -1, borderWidth: "2px 2px 0 0", borderRadius: "0 5px 0 0" },
                  { bottom: -1, left: -1,  borderWidth: "0 0 2px 2px", borderRadius: "0 0 0 5px" },
                  { bottom: -1, right: -1, borderWidth: "0 2px 2px 0", borderRadius: "0 0 5px 0" },
                ] as React.CSSProperties[]).map((s, i) => (
                  <div key={i} style={{
                    position: "absolute", width: 18, height: 18,
                    borderColor: "var(--cyan)", borderStyle: "solid",
                    opacity: 0.6, zIndex: 4, ...s,
                  }} />
                ))}
                {imgFailed ? (
                  <div style={{
                    width: "100%", height: "100%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "4rem", fontWeight: 800, color: "var(--cyan)",
                  }}>RC</div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={SITE.profileImg}
                    alt="Rahul Chowdhury"
                    onError={() => setImgFailed(true)}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                  />
                )}
              </div>

              {/* floating chip — bottom right */}
              <div style={{
                position: "absolute", right: -14, bottom: 28,
                background: "var(--bg2)", border: "1px solid var(--bdr2)",
                borderRadius: 12, padding: "9px 13px",
                display: "flex", alignItems: "center", gap: 9,
                minWidth: 150, zIndex: 5, backdropFilter: "blur(8px)",
                animation: "float 4s ease-in-out infinite",
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: "var(--cyan10)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: "0.85rem", flexShrink: 0,
                }}>🎓</div>
                <div>
                  <p style={{ fontFamily: "var(--FM)", fontSize: "0.59rem", color: "var(--cyan)", letterSpacing: "0.06em", marginBottom: 2 }}>UNIVERSITY</p>
                  <p style={{ fontSize: "0.77rem", fontWeight: 500, color: "var(--text)" }}>UEM Jaipur</p>
                </div>
              </div>

              {/* floating chip — top left */}
              <div style={{
                position: "absolute", left: -14, top: 28,
                background: "var(--bg2)", border: "1px solid var(--bdr2)",
                borderRadius: 12, padding: "9px 13px",
                display: "flex", alignItems: "center", gap: 9,
                minWidth: 144, zIndex: 5, backdropFilter: "blur(8px)",
                animation: "float 4s ease-in-out infinite", animationDelay: "2s",
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: "var(--vio10)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: "0.85rem", flexShrink: 0,
                }}>⚡</div>
                <div>
                  <p style={{ fontFamily: "var(--FM)", fontSize: "0.59rem", color: "var(--vio)", letterSpacing: "0.06em", marginBottom: 2 }}>CGPA</p>
                  <p style={{ fontSize: "0.77rem", fontWeight: 500, color: "var(--text)" }}>8.27 / 10</p>
                </div>
              </div>
            </div>
          </div>

          {/* social icons */}
          <div className="hero-el" style={{
            display: "flex", justifyContent: "center", gap: 10,
            marginTop: "1.5rem", animationDelay: "0.5s",
          }}>
            {[
              { href: SITE.github,                  icon: <GitHubIcon />,   label: "GitHub"   },
              { href: SITE.linkedin,                icon: <LinkedInIcon />, label: "LinkedIn" },
              { href: SITE.twitter,                 icon: <TwitterIcon />,  label: "Twitter"  },
              { href: `mailto:${SITE.email}`,       icon: <MailIcon />,     label: "Email"    },
              { href: `tel:${SITE.phone}`,          icon: <PhoneIcon />,    label: "Phone"    },
            ].map(({ href, icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" title={label} className="icon-btn">
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── All hero responsive + animation styles in one place ── */}
      <style>{`

        /* ─ Desktop grid ─────────────────────────────────── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 310px;
          gap: 2.5rem;
          align-items: center;
        }

        /* ─ Photo frame default size ─────────────────────── */
        .photo-frame {
          width: 295px; height: 375px;
          border-radius: 20px; overflow: hidden;
          position: relative;
          border: 1px solid rgba(34,211,238,0.22);
          background: var(--bg2);
        }

        /* ─ Staggered spring entry animation ─────────────── */
        .hero-el {
          opacity: 0;
          animation: heroFade 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: none; }
        }

        /* ─ Stats row: always single horizontal line ─────── */
        .hero-stats-row {
          display: flex;
          align-items: center;
          gap: 0;           /* gap handled by stat-item padding */
          flex-wrap: nowrap; /* NEVER wrap — keeps 3 stats in one row */
        }
        .hero-stat-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .stat-divider {
          width: 1px; height: 28px;
          background: var(--bdr2);
          flex-shrink: 0;
        }
        .stat-val {
          font-family: 'Syne', sans-serif;
          font-size: 1.5rem; font-weight: 700;
          color: var(--text); line-height: 1;
          display: block;
        }
        .stat-label {
          font-family: var(--FM);
          font-size: 0.6rem; letter-spacing: 0.1em;
          color: var(--muted); margin-top: 3px;
          display: block;
        }

        /* ─ Buttons ──────────────────────────────────────── */
        .hero-btns { flex-wrap: nowrap; }

        /* ─ Tablet breakpoint: stack layout ─────────────── */
        /* Lowered from 960px → 800px so it triggers on more devices */
        @media (max-width: 800px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
          .hero-text       { order: 2; }
          .hero-photo-col  { order: 1; }

          /* Centre flex rows */
          .hero-tw-row    { justify-content: center; }
          .hero-btns      { justify-content: center; }
          .hero-stats-row { justify-content: center; }

          /* Bio paragraph: centred with capped width */
          .hero-bio-wrap {
            display: flex;
            justify-content: center;
            margin-bottom: 2.4rem;
          }
          .hero-bio-wrap p {
            max-width: 480px;
            text-align: center;
            margin: 0 auto;
          }

          .hero-text h1 { font-size: clamp(2.6rem, 9vw, 3.8rem) !important; }
        }

        /* ─ Mobile: tighten buttons + stats ─────────────── */
        @media (max-width: 520px) {
          .hero-btns { gap: 7px !important; }
          .hero-btns .btn { padding: 8px 12px !important; font-size: 0.67rem !important; }

          /* Shrink stats text so all 3 fit in one row */
          .stat-val   { font-size: 1.2rem !important; }
          .stat-label { font-size: 0.55rem !important; }
          .hero-stat-item { gap: 1rem !important; }
        }

        @media (max-width: 400px) {
          /* Very small phones: allow 1 button to wrap if truly needed */
          .hero-btns { flex-wrap: wrap !important; }
          .hero-btns .btn { flex: 1 1 auto; justify-content: center; }
        }

        /* ─ Small phone: shrink photo ────────────────────── */
        @media (max-width: 480px) {
          .photo-frame { width: 230px !important; height: 290px !important; }
        }
      `}</style>
    </section>
  );
}
