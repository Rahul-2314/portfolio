// Full blog post content — written as if I'm explaining things to a fellow dev.
// Each post maps to a slug from data.ts.

export type BlogContent = {
	slug: string;
	title: string;
	date: string;
	tag: string;
	readMin: number;
	content: Section[];
};

type Section =
	| { type: "intro"; text: string }
	| { type: "h2"; text: string }
	| { type: "p"; text: string }
	| { type: "code"; lang: string; text: string }
	| { type: "callout"; text: string }
	| { type: "list"; items: string[] }
	| { type: "hr" };

export const BLOG_CONTENT: BlogContent[] = [
	// ─────────────────────────────────────────────────────────────────────────
	{
		slug: "how-i-built-linkite-url-shortener",
		title: "How I Built Linkite — Architecture of a Production URL Shortener",
		date: "February 2025",
		tag: "System Design",
		readMin: 8,
		content: [
			{
				type: "intro",
				text: "I built Linkite because every existing shortener I tried either lacked analytics, had sketchy security, or didn't let me control rate limits. So I decided to build one myself — and document every decision along the way.",
			},
			{ type: "h2", text: "The ID generation problem" },
			{
				type: "p",
				text: "The first thing you have to solve in a URL shortener is: how do you generate short IDs that don't collide? The naive approach — random strings — works until it doesn't. At 10k links, you start thinking about collision probability more seriously.",
			},
			{
				type: "p",
				text: "I went with a base-62 encoder (nanoid under the hood) with 7-character IDs. That gives you about 3.5 trillion unique combinations — more than enough for anything I'll ever build. If the generated ID is already taken, I just regenerate. Simple.",
			},
			{
				type: "code",
				lang: "javascript",
				text: `import { nanoid } from 'nanoid';

async function generateUniqueId(db) {
  let id;
  let attempts = 0;

  do {
    id = nanoid(7);   // 7 chars, base-62
    attempts++;
    if (attempts > 5) throw new Error('ID generation failed');
  } while (await db.links.findOne({ shortId: id }));

  return id;
}`,
			},
			{ type: "h2", text: "Three-stage URL security" },
			{
				type: "p",
				text: "This is the part I spent the most time on. A URL shortener is basically a redirect machine — if you don't validate inputs properly, you're just helping bad actors hide malicious links. I built three consecutive checks before any URL gets stored:",
			},
			{
				type: "list",
				items: [
					"Stage 1 — HTTPS check: reject any URL that isn't HTTPS. HTTP links in 2025 are a red flag anyway.",
					"Stage 2 — Google Safe Browsing API: check against Google's threat database. Takes ~100ms but catches a huge surface area of malware, phishing, and social engineering links.",
					"Stage 3 — Live GET request: actually fetch the URL and follow redirects. If the final destination is suspicious or the request times out, reject. This catches chains of redirects that lead somewhere sketchy.",
				],
			},
			{
				type: "callout",
				text: "The three checks add ~200ms to link creation. That's fine — link creation is a write-once operation, and no user minds a 200ms wait when they're shortening a URL.",
			},
			{ type: "h2", text: "Redis for hot-path caching" },
			{
				type: "p",
				text: "The read path (redirecting short → long URL) needs to be fast. I'm not going to MongoDB on every redirect — that's too slow and too expensive at any real scale.",
			},
			{
				type: "p",
				text: "Redis sits in front of MongoDB. On every redirect, I check Redis first. Cache hit: ~2ms. Cache miss: go to Mongo, fetch, write back to Redis with a 24-hour TTL. Popular links stay warm in Redis indefinitely because they keep getting hit before TTL expires.",
			},
			{
				type: "code",
				lang: "javascript",
				text: `async function resolveShortUrl(shortId) {
  // check Redis first — should be a hit for any active link
  const cached = await redis.get(\`link:\${shortId}\`);
  if (cached) return JSON.parse(cached);

  // miss: fall back to MongoDB
  const link = await db.links.findOne({ shortId });
  if (!link) return null;

  // write back to Redis so the next request is fast
  await redis.setex(\`link:\${shortId}\`, 86400, JSON.stringify(link));
  return link;
}`,
			},
			{ type: "h2", text: "Real-time analytics" },
			{
				type: "p",
				text: "Every click writes an event to a lightweight queue: timestamp, IP, user-agent, referrer. A background worker processes the queue and aggregates stats into the analytics collection. The dashboard polls every 30 seconds for live data. Nothing fancy — but it works reliably and doesn't slow down the redirect path.",
			},
			{ type: "h2", text: "The browser extension" },
			{
				type: "p",
				text: "I shipped a browser extension in plain HTML/CSS/JS (no framework). It reads the current tab URL via the Chrome extension API, fires a POST to the Linkite API, and shows you the short link with a one-click copy button. Total size: 14kb. I deliberately kept it framework-free to keep the install footprint small.",
			},
			{ type: "h2", text: "What I'd do differently" },
			{
				type: "p",
				text: "If I were starting over, I'd use a proper background job queue (BullMQ or similar) for the analytics pipeline instead of the DIY queue I built. I'd also add better rate limiting on link creation per IP to prevent abuse. The core architecture, though — I'm happy with it.",
			},
		],
	},

	// ─────────────────────────────────────────────────────────────────────────
	{
		slug: "neogpt-persistent-chat-memory-groq",
		title: "Making AI Remember: Persistent Chat Threads in NeoGPT",
		date: "July 2025",
		tag: "AI / LLM",
		readMin: 7,
		content: [
			{
				type: "intro",
				text: "I wanted to build a chatbot that actually remembered what you talked about — not just within a session, but across days and devices. NeoGPT was the result. Here's how I made it work.",
			},
			{ type: "h2", text: "The problem with stateless chatbots" },
			{
				type: "p",
				text: "Most chatbots you interact with have no persistent memory. Close the tab, lose your context. Start a new session, start from scratch. For casual questions that's fine. But for anything where you're building on previous exchanges — debugging, research, long-form writing — it's a real productivity killer.",
			},
			{
				type: "p",
				text: "NeoGPT solves this by treating every conversation as a named thread with its own URL. You can share that URL with someone else or open it on your phone and resume exactly where you left off.",
			},
			{ type: "h2", text: "Thread schema in MongoDB" },
			{
				type: "p",
				text: "Each thread is a single MongoDB document. The messages array grows as the conversation continues. I keep the full message history in the document — no separate messages collection — because threads are always read and written together.",
			},
			{
				type: "code",
				lang: "javascript",
				text: `// a thread document looks roughly like this
{
  _id: ObjectId,
  threadId: "t_abc123",    // URL-safe ID
  userId: "...",           // optional auth
  title: "Debug session",  // auto-generated from first message
  createdAt: Date,
  updatedAt: Date,
  messages: [
    { role: "user",      content: "...", timestamp: Date },
    { role: "assistant", content: "...", timestamp: Date },
    // ... up to context limit
  ]
}`,
			},
			{ type: "h2", text: "In-memory caching with Redis" },
			{
				type: "p",
				text: "MongoDB reads are fast, but not fast enough for a chat interface where you want sub-100ms response starts. I cache full thread objects in Redis with a 1-hour TTL. When a user resumes a conversation, the thread loads from Redis in ~5ms. If the cache expires, we fall back to MongoDB and re-warm the cache.",
			},
			{
				type: "callout",
				text: "One thing I got wrong initially: I was caching individual messages rather than the whole thread document. That meant 20+ Redis lookups to reconstruct a thread. Caching the whole document and invalidating on update is much simpler and faster.",
			},
			{ type: "h2", text: "Groq for fast inference" },
			{
				type: "p",
				text: "I chose Groq over OpenAI primarily for latency. Groq's hardware runs inference noticeably faster — first token arrives in ~300ms on most queries. For a chat interface, that speed difference between 300ms and 1s is huge psychologically. I'm using the mixtral-8x7b model which handles multilingual input well.",
			},
			{
				type: "code",
				lang: "javascript",
				text: `import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function generateResponse(messages) {
  const completion = await groq.chat.completions.create({
    model: "mixtral-8x7b-32768",
    messages,
    stream: true,   // stream tokens for perceived speed
    temperature: 0.7,
  });

  return completion;
}`,
			},
			{ type: "h2", text: "Tavily web search — automatic tool invocation" },
			{
				type: "p",
				text: "I integrated Tavily so the model can decide on its own when to search the web. The prompt instructs the model to emit a structured JSON block when it needs fresh information. My backend parses that block, calls the Tavily API, injects the results back into the conversation context, and sends a follow-up request to the model. The user sees a smooth 'Searching the web...' indicator while this happens.",
			},
			{ type: "h2", text: "URL-based thread routing" },
			{
				type: "p",
				text: "Every thread gets a URL like /chat/t_abc123. Next.js App Router handles this with a dynamic [threadId] segment. The client loads the thread from the cache/DB on mount. New threads are created lazily — the URL updates (without a page reload) the moment you send your first message. This means you never lose a conversation even if you forget to name it.",
			},
			{ type: "h2", text: "What's next" },
			{
				type: "p",
				text: "I want to add vector search over past threads so you can ask 'did I talk about X before?' and get semantic search results across all your conversations. That's the next thing I'm building.",
			},
		],
	},

	// ─────────────────────────────────────────────────────────────────────────
	{
		slug: "redis-caching-patterns-every-mern-dev",
		title: "Redis Caching Patterns Every MERN Developer Should Know",
		date: "March 2025",
		tag: "Backend",
		readMin: 6,
		content: [
			{
				type: "intro",
				text: "I added Redis to both Linkite and NeoGPT, and each time I learned something new about when and how to cache. These are the patterns I wish I'd read before I started — explained with actual code from my projects, not toy examples.",
			},
			{ type: "h2", text: "Cache-aside (lazy loading)" },
			{
				type: "p",
				text: "Cache-aside is the pattern you reach for most often. The application checks the cache before hitting the database. On a miss, it reads from the database and writes the result to the cache. Simple, effective, and easy to reason about.",
			},
			{
				type: "code",
				lang: "javascript",
				text: `// classic cache-aside — what I use in Linkite for URL resolution
async function getLink(shortId) {
  const key = \`link:\${shortId}\`;

  // try cache first
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  // not in cache — go to DB
  const link = await db.links.findOne({ shortId });
  if (!link) return null;

  // store in cache for next time, expire in 24 hours
  await redis.setex(key, 86400, JSON.stringify(link));
  return link;
}`,
			},
			{
				type: "callout",
				text: "Cache-aside is read-optimised. Writes still go directly to the database. If you write a lot and consistency is critical, you need a different pattern.",
			},
			{ type: "h2", text: "Write-through" },
			{
				type: "p",
				text: "Write-through keeps the cache in sync with every write. When you update the database, you also update the cache. More writes, but you never serve stale data. I use this in NeoGPT for thread objects — when a new message comes in, I update MongoDB and the Redis cache at the same time.",
			},
			{
				type: "code",
				lang: "javascript",
				text: `async function appendMessage(threadId, message) {
  // update MongoDB
  await db.threads.updateOne(
    { threadId },
    { $push: { messages: message }, $set: { updatedAt: new Date() } }
  );

  // update Redis cache immediately — no stale reads
  const thread = await db.threads.findOne({ threadId });
  await redis.setex(\`thread:\${threadId}\`, 3600, JSON.stringify(thread));
}`,
			},
			{ type: "h2", text: "TTL strategy — not all data ages equally" },
			{
				type: "p",
				text: "One mistake I made early on: giving everything the same TTL. A URL that gets clicked 1000 times a day deserves a much longer TTL than one that was created and never touched again. Think about access patterns when you set TTLs:",
			},
			{
				type: "list",
				items: [
					"Short-lived sessions (auth tokens): 15–60 minutes",
					"User profile data: 1–6 hours",
					"URL redirect targets: 24 hours (they rarely change)",
					"Chat thread context: 1 hour after last message",
					"Analytics aggregates: 5–15 minutes",
				],
			},
			{ type: "h2", text: "Eviction policies" },
			{
				type: "p",
				text: "Redis has several eviction policies that kick in when memory is full. The one I recommend for most MERN apps is allkeys-lru — evict the least recently used key from anywhere. It means your hottest data stays in cache automatically without you having to manually manage what to keep.",
			},
			{
				type: "p",
				text: "Set it in your Redis config with: maxmemory-policy allkeys-lru. And always set a maxmemory limit — without it, Redis will happily eat all available RAM.",
			},
			{ type: "h2", text: "One thing to watch out for: cache stampede" },
			{
				type: "p",
				text: "If a cached item expires and you get a burst of requests at that exact moment, all of them will miss the cache, all go to the DB simultaneously, and suddenly your database is handling 50 concurrent identical queries. This is called a cache stampede.",
			},
			{
				type: "p",
				text: "The simplest fix: jitter your TTLs. Instead of setex(key, 3600, value), use setex(key, 3600 + Math.random() * 300, value). Stagger expirations so not everything expires at once. For high-traffic keys, you can also implement a 'lock' pattern where only one process regenerates the cache while others serve the stale value.",
			},
			{ type: "h2", text: "Final thought" },
			{
				type: "p",
				text: "Caching is one of those things where a little bit goes a long way. Even a simple cache-aside layer in front of MongoDB makes a measurable difference in response times. Start simple, measure, then tune your TTLs and patterns based on real access data.",
			},
		],
	},
];
