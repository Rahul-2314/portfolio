// One place to update everything on the site.
// Change your name, links, projects, skills — all from here.

export const SITE = {
	name: "Rahul Chowdhury",
	email: "chowdhuryrahul865@gmail.com",
	phone: "+91 89276 30397",
	location: "Jaipur, Rajasthan, India",
	github: "https://github.com/Rahul-2314",
	linkedin: "https://www.linkedin.com/in/rahul-chowdhury-45b61828b/",
	twitter: "https://twitter.com/rahul_x14",
	twitterHandle: "@rahul_x14",
	githubUsername: "Rahul-2314",
	resumePath: "/Rahul_Resume_Internship.pdf",
	profileImg: "/profile.png",
};

export const TYPEWRITER_PHRASES = [
	"Full-Stack MERN Developer",
	"BTech CSE Undergrad",
	"AI & ML Enthusiast",
	"System Design Enthusiast",
	"Open Source Contributor",
];

export const HERO_STATS = [
	{ value: "200", suffix: "+", label: "DSA Problems" },
	{ value: "150", suffix: "+", label: "GitHub Commits" },
	{ value: "8.27", suffix: "", label: "CGPA" },
];

// Skills, grouped by domain.
// Added a full AI / ML section to reflect the work in NeoGPT and beyond.
export const SKILLS: { category: string; items: string[] }[] = [
	{
		category: "Languages",
		items: ["JavaScript (ES6+)", "TypeScript", "Python", "C++", "HTML5 / CSS3"],
	},
	{
		category: "Frontend",
		items: ["React", "Next.js", "Tailwind CSS", "Redux", "React Router"],
	},
	{
		category: "Backend & Databases",
		items: ["Node.js", "Express.js", "Next.js", "MongoDB", "MySQL", "Redis (Basics)"],
	},
	{
		category: "AI & Machine Learning",
		items: [
			"Machine Learning",
			"Deep Learning",
			"NLP",
			"LLM",
			"Generative AI",
			"Agentic AI",
			"RAG (Advanced)",
			"Prompt Engineering",
			"Groq Cloud",
			"LLM Fine-tuning",
			"AI Agent Orchestration",
			"ReAct Pattern",
			"Multi-Agent Collaboration",
			"Tool Use",
			"Planning Agents",
		],
	},
	{
		category: "DevOps & Tools",
		items: [
			"Docker",
			"Git / GitHub",
			"Postman",
			"Kafka (Basics)",
			"AWS Basics",
			"CI/CD",
		],
	},
	{
		category: "System Design",
		items: [
			"REST API Design",
			"Rate Limiting",
			"Caching",
			"Load Balancing",
			"Sharding",
			"Scaling Concepts",
		],
	},
];

export type Project = {
	num: string;
	title: string;
	subtitle: string;
	description: string;
	longDesc: string;
	stack: string[];
	date: string;
	githubUrl: string;
	liveUrl: string;
	featured: boolean;
};

export const PROJECTS: Project[] = [
	{
		num: "01",
		title: "NeoGPT",
		subtitle: "Multilingual AI Chatbot",
		description:
			"Multilingual conversational AI with persistent thread-based memory using Groq LLM + MongoDB. Real-time web search via Tavily API, automatic tool invocation, and in-memory caching for instant context restoration.",
		longDesc:
			"Built NeoGPT because I was frustrated that every AI chatbot loses your entire conversation on refresh. Under the hood, each thread lives in MongoDB with its own URL route — share a link and resume exactly where you left off. Groq LLM handles inference at surprisingly low latency. Tavily kicks in automatically when the model decides it needs fresh data from the web. I layered a Redis cache in front of MongoDB so resuming hot threads takes under 50ms. The frontend syncs thread state via URL routing, which means the browser back button actually works the way you'd expect.",
		stack: ["MERN", "Groq LLM", "Tavily API", "Redis", "MongoDB"],
		date: "Jun – Sep 2025",
		githubUrl: "https://github.com/Rahul-2314/NeoGPT",
		liveUrl: "https://neogpt-blue.vercel.app",
		featured: true,
	},
	{
		num: "02",
		title: "Linkite",
		subtitle: "URL Shortener & Analytics Platform",
		description:
			"Full-stack URL shortener handling 10k+ links — real-time analytics dashboards, QR generation, JWT auth, Stripe payments for premium API limits, and a one-click browser extension.",
		longDesc:
			"Linkite started as a weekend experiment and turned into the project I'm most proud of. Short IDs use a custom base-62 encoder (collision probability stays negligible past 10k links). Every submitted URL goes through three security stages: HTTPS validation, Google Safe Browsing API lookup, and a live GET request to catch sketchy redirects. The analytics pipeline tracks clicks, devices, countries, and referrers in real time. Premium users get elevated API rate limits — Razorpay webhooks update those limits in Redis the instant a payment goes through. I also shipped a browser extension in plain HTML/CSS/JS that shortens whatever tab you're on with a single click.",
		stack: ["MERN", "JWT", "Razorpay", "Safe Browsing API", "Redis"],
		date: "Jan – Apr 2025",
		githubUrl: "https://github.com/Rahul-2314/Linkite",
		liveUrl: "https://linkite.vercel.app",
		featured: true,
	},
	{
		num: "03",
		title: "Portfolio v1",
		subtitle: "Personal Portfolio Website",
		description:
			"First serious React project — Redux for state, React Router for navigation, EmailJS for a backend-free contact form. Deployed on Netlify.",
		longDesc:
			"My first real React project beyond tutorials. Used Redux for global state (overkill for a portfolio, but great practice), React Router for page transitions, and EmailJS so the contact form works without spinning up a server. Learned a lot about CSS animations, responsive grids, and Netlify deployments here — it's the project that made me realise I actually enjoyed frontend work.",
		stack: ["React", "Redux", "React Router", "EmailJS"],
		date: "Aug 2023",
		githubUrl: "https://github.com/Rahul-2314/portfolio",
		liveUrl: "https://rahulchowdhury.netlify.app",
		featured: false,
	},
];

export type TimelineItem = {
	period: string;
	role: string;
	org: string;
	certUrl: string;
	points: string[];
};

export const TIMELINE: TimelineItem[] = [
	{
		period: "Nov 2024 – Jul 2025",
		role: "Full-Stack Development (MERN) & System Design",
		org: "100xDevs",
		certUrl: "https://100xdevs.com",
		points: [
			"Completed 0→1 and 1→100 roadmaps: advanced JS, TypeScript, Node.js, SQL/NoSQL.",
			"System design: rate limiting, Redis caching, load balancing, sharding, Kafka, resiliency patterns.",
			"Production projects: Paytm wallet clone, real-time WebSocket systems, serverless backends.",
			"DevOps: Docker, Kubernetes, CI/CD, AWS (EC2, S3, LB), Prometheus & Grafana.",
		],
	},
	{
		period: "Jun – Jul 2024",
		role: "The Joy of Computing using Python [Elite + Silver]",
		org: "NPTEL",
		certUrl: "https://nptel.ac.in/noc/certificate/",
		points: [
			"Advanced Python: OOP design patterns, NLP with NLTK, complex data structures.",
			"Built a text classifier and custom algorithm implementations as hands-on projects.",
		],
	},
	{
		period: "May – Jun 2024",
		role: "Programming in C",
		org: "Infosys Springboard",
		certUrl: "https://infyspringboard.onwingspan.com",
		points: [
			"Mastered pointers, dynamic memory allocation, and file handling in C.",
			"Built projects showcasing linked lists, stacks, and memory management patterns.",
		],
	},
];

export type BlogPost = {
	num: string;
	slug: string;
	title: string;
	date: string;
	readMin: number;
	tag: string;
	excerpt: string;
};

export const BLOG_POSTS: BlogPost[] = [
	{
		num: "01",
		slug: "how-i-built-linkite-url-shortener",
		title: "How I Built Linkite — Architecture of a Production URL Shortener",
		date: "Feb 2025",
		readMin: 8,
		tag: "System Design",
		excerpt:
			"Short IDs, Redis caching, three-stage URL security, real-time analytics — everything that went into building a URL shortener I'd actually trust at scale.",
	},
	{
		num: "02",
		slug: "neogpt-persistent-chat-memory-groq",
		title: "Making AI Remember: Persistent Chat Threads in NeoGPT",
		date: "Jul 2025",
		readMin: 7,
		tag: "AI / LLM",
		excerpt:
			"Most chatbots forget everything on refresh. Here's how I built thread-based memory into NeoGPT using MongoDB, Redis, and Groq LLM — so conversations actually feel continuous.",
	},
	{
		num: "03",
		slug: "redis-caching-patterns-every-mern-dev",
		title: "Redis Caching Patterns Every MERN Developer Should Know",
		date: "Mar 2025",
		readMin: 6,
		tag: "Backend",
		excerpt:
			"Cache-aside, write-through, TTL tuning, eviction policies — practical patterns I learned building Linkite and NeoGPT.",
	},
];

export const ABOUT_INFO = [
	{ label: "Degree", value: "BTech CSE (AIML) — UEM Jaipur" },
	{ label: "Status", value: "BTech CSE Undergrad" },
	{ label: "CGPA", value: "8.27 / 10  (up to 5th sem)" },
	{ label: "Location", value: "Jaipur, Rajasthan, India" },
	{ label: "Email", value: "chowdhuryrahul865@gmail.com" },
	{ label: "Phone", value: "+91 89276 30397" },
	{ label: "Open to", value: "Internships 🟢" },
];

export const ACHIEVEMENTS = [
	"★  Ninja Dominator — Code360",
	"★  5× College Topper — Code360",
	"✓  NPTEL Elite + Silver",
	"↗  150+ GitHub Contributions",
];
