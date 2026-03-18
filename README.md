# Rahul-Chowdhury-Portfolio

Personal portfolio website — built with Next.js 14, TypeScript, and CSS custom properties. Dark-themed, fully responsive, and fast.

**Live →** [https://rahulchowdhury.in](https://rahulchowdhury.in)

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | CSS Custom Properties — no Tailwind, no CSS modules |
| Fonts | Playfair Display · Syne · JetBrains Mono · Inter |
| Email | Formspree |
| GitHub Graph | github-contributions-api.jogruber.de |
| Deployment | Vercel |

---

## Features

- **Dark grid background** — subtle 64px graph-paper pattern across the whole page
- **Playfair Display name** — formal serif with gradient clip for the hero heading
- **Typewriter effect** — cycles through roles with spring-eased character animation
- **Staggered hero entrance** — each element fades up with `cubic-bezier(0.22, 1, 0.36, 1)` and incremental delays
- **Live project previews** — iframe rendered at 1200px, scaled via `ResizeObserver` to fit any container width
- **GitHub contribution graph** — live calendar with hover tooltips and animated pulse border
- **Full blog routes** — `/blog/[slug]` with code blocks, callouts, and styled prose. No MDX dependency — content lives in `lib/blogContent.ts`
- **Animated mobile navbar** — right-side drawer with numbered links, blur backdrop, spring slide-in
- **Fully responsive** — tested on Realme P3 Ultra, Galaxy S8+, iPad Air, and desktop
- **Formspree contact form** — no backend required

---

## Project Structure

```
rahul-portfolio/
├── app/
│   ├── layout.tsx              # Root layout, font injection, meta tags
│   ├── page.tsx                # Home page — assembles all sections
│   ├── globals.css             # Design tokens, animations, shared utilities
│   └── blog/
│       └── [slug]/
│           └── page.tsx        # Dynamic blog post renderer
├── components/
│   ├── Navbar.tsx              # Fixed nav with animated mobile drawer
│   ├── Hero.tsx                # Hero section
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx            # Cards with live iframe previews
│   ├── Experience.tsx          # Timeline with certificate links
│   ├── GitHubGraph.tsx         # Live contribution calendar
│   ├── BlogSection.tsx         # Blog listing
│   ├── Contact.tsx             # Contact form (Formspree)
│   ├── Footer.tsx
│   └── Icons.tsx               # All SVG icons
├── lib/
│   ├── data.ts                 # ⭐ All site content — edit here
│   ├── blogContent.ts          # Full blog post content
│   └── hooks.ts                # useTypewriter, useReveal
└── public/
    ├── profile.png             # Profile photo
    └── Rahul_Resume_Internship.pdf
```

---

## Getting Started

```bash
# 1. Clone
git clone https://github.com/Rahul-2314/rahul-portfolio.git
cd rahul-portfolio

# 2. Install
npm install

# 3. Run dev server
npm run dev
# → http://localhost:3000
```

No environment variables needed for development. The contact form points to Formspree and works without any backend setup.

---

## Customisation

**All site content lives in one file** — `lib/data.ts`. Update your name, links, projects, skills, and timeline there. You never need to touch the components.

```ts
// lib/data.ts
export const SITE = {
  name:           "Your Name",
  email:          "you@email.com",
  github:         "https://github.com/your-username",
  githubUsername: "your-username",   // drives the contribution graph
  resumePath:     "/YourResume.pdf",
  profileImg:     "/profile.png",
};
```

**Blog posts** — add/edit posts in `lib/blogContent.ts`. Each post is a `BlogContent` object with typed sections (`h2`, `p`, `code`, `callout`, `list`). Add the slug to `BLOG_POSTS` in `data.ts` and the route is live automatically.

---

## Deployment

```bash
# Build
npm run build

# Deploy to Vercel (one command)
npx vercel
```

Or push to GitHub and connect the repo at [vercel.com](https://vercel.com) — zero config needed.

**Custom domain** — add in Vercel → Project → Settings → Domains, then point your DNS:

| Type | Host | Value |
|---|---|---|
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

---

## Design Decisions

**Why CSS custom properties instead of Tailwind?** The design is opinionated enough that utility classes would add noise. A flat token system (`--cyan`, `--bg2`, `--sub`) is easier to read when every component is inline-styled anyway.

**Why inline styles?** This is a single-developer project with no design system to maintain. Colocation of styles and markup makes every component self-contained and portable. The only shared CSS is in `globals.css` — design tokens, keyframes, and a handful of layout utilities.

**Why no MDX for blogs?** MDX adds a build step and a parser dependency. The blog content is structured data — a typed `Section[]` array renders cleanly and is easier to version-control than raw markdown.

---

## License

MIT — use the structure freely. Please don't deploy it as-is with my personal info.

---

<p align="center">Built by <a href="https://github.com/Rahul-2314">Rahul Chowdhury</a> · Jaipur, India</p>
