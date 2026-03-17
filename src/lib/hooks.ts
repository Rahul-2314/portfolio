"use client";

import { useEffect, useRef, useState } from "react";

// Typewriter — cycles through an array of phrases, deletes and types the next
export function useTypewriter(
	phrases: string[],
	typingSpeed = 72,
	deletingSpeed = 36,
	pauseAfterWord = 2200,
) {
	const [text, setText] = useState("");
	// use a ref for the mutable state so we don't re-create the effect
	const state = useRef({ phraseIndex: 0, charIndex: 0, deleting: false });

	useEffect(() => {
		const tick = () => {
			const s = state.current;
			const ph = phrases[s.phraseIndex];

			if (!s.deleting && s.charIndex < ph.length) {
				s.charIndex++;
				setText(ph.slice(0, s.charIndex));
				return setTimeout(tick, typingSpeed);
			}

			// finished typing — pause then start deleting
			if (!s.deleting) {
				s.deleting = true;
				return setTimeout(tick, pauseAfterWord);
			}

			if (s.deleting && s.charIndex > 0) {
				s.charIndex--;
				setText(ph.slice(0, s.charIndex));
				return setTimeout(tick, deletingSpeed);
			}

			// finished deleting — move to next phrase
			s.deleting = false;
			s.phraseIndex = (s.phraseIndex + 1) % phrases.length;
			setTimeout(tick, 300);
		};

		const timer = setTimeout(tick, 900);
		return () => clearTimeout(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return text;
}

// Scroll-reveal — watches for .rv elements entering the viewport and adds .vis
export function useReveal(threshold = 0.07) {
	useEffect(() => {
		const elements = document.querySelectorAll(".rv");

		const observer = new IntersectionObserver(
			(entries) =>
				entries.forEach((entry) => {
					if (entry.isIntersecting) entry.target.classList.add("vis");
				}),
			{ threshold },
		);

		elements.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});
}
