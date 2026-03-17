"use client";

import { useReveal } from "@/lib/hooks";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import GitHubGraph from "@/components/Githubgraph";
import BlogSection from "@/components/Blogsection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
	// wire up the scroll-reveal observer for all .rv elements
	useReveal();

	return (
		<>
			<Navbar />
			<main>
				<Hero />
				<hr className="rule" />
				<About />
				<hr className="rule" />
				<Skills />
				<hr className="rule" />
				<Projects />
				<hr className="rule" />
				<Experience />
				<hr className="rule" />
				<GitHubGraph />
				<hr className="rule" />
				<BlogSection />
				<hr className="rule" />
				<Contact />
			</main>
			<Footer />
		</>
	);
}
