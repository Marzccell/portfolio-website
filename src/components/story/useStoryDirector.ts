"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/** Motion enhances readable HTML. Every scene restores its styles on cleanup. */
export function useStoryDirector(
  rootRef: RefObject<HTMLElement | null>,
  paused = false,
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          desktop: "(min-width: 1000px) and (min-height: 700px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (scope) => {
          if (paused || scope.conditions?.reduced) return;
          const desktop = scope.conditions?.desktop;
          let lenis: Lenis | undefined;
          const ticker = (time: number) => lenis?.raf(time * 1000);
          if (desktop) {
            lenis = new Lenis({
              anchors: true,
              lerp: 0.1,
              autoRaf: false,
              smoothWheel: true,
            });
            lenis.on("scroll", ScrollTrigger.update);
            gsap.ticker.add(ticker);
          }
          gsap.from(
            ".hero-eyebrow, .hero-name, .hero-surname, .hero-description, .hero-actions",
            {
              y: 36,
              opacity: 0,
              stagger: 0.1,
              duration: 0.9,
              ease: "power3.out",
              clearProps: "all",
            },
          );
          gsap.from(".orbit-art", {
            scale: 0.88,
            opacity: 0,
            rotation: -14,
            duration: 1.4,
            ease: "power3.out",
            clearProps: "opacity,transform",
          });
          gsap.to(".orbit-lines", {
            rotation: 360,
            transformOrigin: "300px 300px",
            duration: 65,
            ease: "none",
            repeat: -1,
          });
          gsap.to(".orbit-art", {
            y: desktop ? 85 : 30,
            rotation: 12,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
          gsap.to(".hero-copy", {
            y: -40,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "40% top",
              end: "bottom top",
              scrub: true,
            },
          });
          gsap.fromTo(
            "[data-word]",
            { opacity: 0.22 },
            {
              opacity: 1,
              stagger: 0.12,
              scrollTrigger: {
                trigger: ".intro-statement",
                start: "top 80%",
                end: "bottom 48%",
                scrub: 0.7,
              },
            },
          );
          gsap.to(".intro-star", {
            rotation: 130,
            ease: "none",
            scrollTrigger: {
              trigger: ".intro",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
          const revealElements = gsap.utils.toArray<HTMLElement>(
            "[data-reveal]",
            root,
          );
          revealElements.forEach((element) =>
            gsap.from(element, {
              opacity: 0,
              y: 28,
              duration: 0.75,
              ease: "power2.out",
              scrollTrigger: { trigger: element, start: "top 90%", once: true },
              clearProps: "opacity,transform",
            }),
          );

          if (desktop) {
            root.classList.add("work-directed");
            const slides = gsap.utils.toArray<HTMLElement>(
              "[data-work-slide]",
              root,
            );
            const counter = root.querySelector("[data-work-current]");
            gsap.set(slides.slice(1), { autoAlpha: 0, y: 60 });
            const work = gsap.timeline({
              onUpdate: () => {
                const active = slides.reduce(
                  (best, slide, index) =>
                    Number(gsap.getProperty(slide, "opacity")) >
                    Number(gsap.getProperty(slides[best], "opacity"))
                      ? index
                      : best,
                  0,
                );
                if (counter)
                  counter.textContent = String(active + 1).padStart(2, "0");
              },
              scrollTrigger: {
                trigger: ".work",
                start: "top 80px",
                end: "bottom bottom",
                scrub: 0.65,
              },
            });
            work.to({}, { duration: 0.65 });
            slides.slice(1).forEach((slide, index) => {
              work.to(
                slides[index],
                { autoAlpha: 0, y: -45, scale: 0.97, duration: 0.5 },
                ">",
              );
              work.to(
                slide,
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.65 },
                "<0.25",
              );
              work.to({}, { duration: 0.8 });
            });
            work.to({}, { duration: 0.35 });
          }
          const refresh = () => {
            lenis?.resize();
            ScrollTrigger.refresh();
          };
          const frame = window.requestAnimationFrame(refresh);
          document.fonts.ready.then(() => {
            if (root.isConnected) refresh();
          });
          return () => {
            window.cancelAnimationFrame(frame);
            lenis?.destroy();
            gsap.ticker.remove(ticker);
            root.classList.remove("work-directed");
            const counter = root.querySelector("[data-work-current]");
            if (counter) counter.textContent = "01";
          };
        },
      );
    }, root);
    return () => {
      media.revert();
      context.revert();
    };
  }, [rootRef, paused]);
}
