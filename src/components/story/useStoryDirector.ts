"use client";

import Lenis from "lenis";
import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const storySceneConfig = [
  { chapter: "intro", beats: 4 },
  { chapter: "curiosity", beats: 3 },
  { chapter: "code", beats: 3 },
  { chapter: "projects", beats: 7 },
  { chapter: "journey", beats: 6 },
  { chapter: "skills", beats: 7 },
  { chapter: "present", beats: 5 },
  { chapter: "future", beats: 6 },
  { chapter: "outro", beats: 4 },
] as const;

export type StoryChapter = (typeof storySceneConfig)[number]["chapter"];

const DESKTOP_QUERY = "(min-width: 900px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOTION_READY_CLASS = "motion-ready";

type MediaConditions = {
  desktop?: boolean;
  reducedMotion?: boolean;
};

/**
 * Directs the desktop story from one scrubbed playhead. The semantic content
 * remains the source of scroll height; the fixed stage only visualizes it.
 */
export function useStoryDirector(
  rootRef: RefObject<HTMLElement | null>,
): void {
  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root || typeof window === "undefined") {
      return;
    }

    const documentElement = document.documentElement;
    documentElement.classList.remove(MOTION_READY_CLASS);
    gsap.registerPlugin(ScrollTrigger);

    let media: gsap.MatchMedia | undefined;

    const context = gsap.context(() => {
      media = gsap.matchMedia();

      media.add(
        {
          desktop: DESKTOP_QUERY,
          reducedMotion: REDUCED_MOTION_QUERY,
        },
        (mediaContext) => {
          const conditions = (mediaContext.conditions ??
            {}) as MediaConditions;
          const shouldDirectStory =
            conditions.desktop === true &&
            conditions.reducedMotion !== true;

          documentElement.classList.remove(MOTION_READY_CLASS);

          // CSS owns the readable, naturally flowing fallback. In particular,
          // Lenis is never constructed for mobile or reduced-motion visitors.
          if (!shouldDirectStory) {
            return;
          }

          const select = <T extends Element>(selector: string): T[] =>
            Array.from(root.querySelectorAll<T>(selector));
          const first = <T extends Element>(selector: string): T | null =>
            root.querySelector<T>(selector);

          const stage = first<HTMLElement>(".story-stage");
          const chapterSections = select<HTMLElement>("[data-chapter]");
          const stageLayers = select<HTMLElement>("[data-stage-chapter]");
          const signalHead = first<HTMLElement>("[data-story-signal-head]");
          const signalPath = first<SVGPathElement>(
            "[data-story-signal-path]",
          );

          // Never activate the CSS that hides semantic copy unless the entire
          // directing surface is present. A partial render stays fully usable.
          if (
            !stage ||
            !signalHead ||
            !signalPath ||
            chapterSections.length < storySceneConfig.length ||
            stageLayers.length < storySceneConfig.length
          ) {
            return;
          }

          let lenis: Lenis | undefined;
          let master: gsap.core.Timeline | undefined;
          let refreshFrame: number | undefined;
          let removeLenisScroll: (() => void) | undefined;
          let ticker: gsap.TickerCallback | undefined;
          let refreshLenis: (() => void) | undefined;

          const disposeRuntime = () => {
            documentElement.classList.remove(MOTION_READY_CLASS);

            if (refreshFrame !== undefined) {
              window.cancelAnimationFrame(refreshFrame);
              refreshFrame = undefined;
            }

            if (refreshLenis) {
              ScrollTrigger.removeEventListener("refresh", refreshLenis);
              refreshLenis = undefined;
            }

            removeLenisScroll?.();
            removeLenisScroll = undefined;

            if (ticker) {
              gsap.ticker.remove(ticker);
              ticker = undefined;
            }

            lenis?.destroy();
            lenis = undefined;
          };

          try {
            lenis = new Lenis({
              anchors: true,
              autoRaf: false,
              lerp: 0.09,
              smoothWheel: true,
              syncTouch: false,
              wheelMultiplier: 0.9,
            });

            removeLenisScroll = lenis.on("scroll", () => {
              ScrollTrigger.update();
            });

            ticker = (time) => {
              lenis?.raf(time * 1000);
            };
            gsap.ticker.add(ticker);

            refreshLenis = () => {
              lenis?.resize();
            };
            ScrollTrigger.addEventListener("refresh", refreshLenis);

            const sceneStarts = new Map<StoryChapter, number>();
            let elapsedBeats = 0;

            storySceneConfig.forEach((scene) => {
              sceneStarts.set(scene.chapter, elapsedBeats);
              elapsedBeats += scene.beats;
            });

            // The last viewport has no remaining distance to scroll, so the
            // master duration mirrors rootHeight - viewportHeight.
            const masterDuration = Math.max(1, elapsedBeats - 1);
            const at = (chapter: StoryChapter): number =>
              sceneStarts.get(chapter) ?? 0;
            const span = (chapter: StoryChapter): number => {
              const sceneIndex = storySceneConfig.findIndex(
                (scene) => scene.chapter === chapter,
              );
              const nextScene = storySceneConfig[sceneIndex + 1];
              return nextScene
                ? at(nextScene.chapter) - at(chapter)
                : masterDuration - at(chapter);
            };
            const layer = (chapter: StoryChapter): HTMLElement | null =>
              first<HTMLElement>(
                '[data-stage-chapter="' + chapter + '"]',
              );
            const copy = (chapter: StoryChapter): HTMLElement[] =>
              select<HTMLElement>(
                '[data-chapter="' + chapter + '"] .chapter-copy',
              );

            const playhead = { progress: 0 };

            master = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.72,
                invalidateOnRefresh: true,
              },
            });

            storySceneConfig.forEach((scene) => {
              master?.addLabel(scene.chapter, at(scene.chapter));
            });
            master.addLabel("end", masterDuration);
            master.to(
              playhead,
              {
                progress: 1,
                duration: masterDuration,
                ease: "none",
              },
              0,
            );

            const allCopy = select<HTMLElement>(
              '[data-chapter]:not([data-chapter="intro"]) .chapter-copy',
            );
            const introCopy = copy("intro");
            const contactDetails = select<HTMLElement>(
              '[data-chapter="outro"] .contact-links, ' +
                '[data-chapter="outro"] .contact-signoff',
            );
            const introLines = select<HTMLElement>("[data-intro-line]");
            const fragments = select<HTMLElement>("[data-fragment]");
            const codeLines = select<HTMLElement>("[data-code-line]");
            const frame = first<HTMLElement>("[data-interface-frame]");
            const frameHorizontal = select<HTMLElement>(
              '[data-interface-corner="top"], ' +
                '[data-interface-corner="bottom"]',
            );
            const frameVertical = select<HTMLElement>(
              '[data-interface-corner="left"], ' +
                '[data-interface-corner="right"]',
            );
            const frameChrome = first<HTMLElement>(".frame-chrome");
            const projectScenes =
              select<HTMLElement>("[data-project-scene]");
            const timelinePath = first<HTMLElement>("[data-timeline-path]");
            const timelineNodes =
              select<HTMLElement>("[data-timeline-node]");
            const timelineCopy =
              select<HTMLElement>("[data-timeline-copy]");
            const skillHub = first<HTMLElement>("[data-skill-hub]");
            const skillBranches =
              select<HTMLElement>("[data-skill-branch]");
            const skillLabels =
              select<HTMLElement>("[data-skill-label]");
            const presentHub = first<HTMLElement>("[data-present-hub]");
            const presentOrbit = first<HTMLElement>(".present-orbit");
            const presentRails =
              select<HTMLElement>("[data-present-rail]");
            const presentLabels =
              select<HTMLElement>("[data-present-label]");
            const futureGrid = first<HTMLElement>("[data-future-grid]");
            const futureRays =
              select<SVGPathElement>("[data-future-ray]");
            const futurePhrases =
              select<HTMLElement>("[data-future-phrase]");
            const outroTerminal = first<HTMLElement>(".outro-terminal");
            const outroCursor = first<HTMLElement>("[data-outro-cursor]");
            const outroText = select<HTMLElement>("[data-outro-text]");

            master.set(stageLayers, { autoAlpha: 0 }, 0);
            master.set(allCopy, { autoAlpha: 0, y: 44 }, 0);
            master.set(introCopy, { autoAlpha: 1, y: 0 }, 0);
            master.set(contactDetails, { autoAlpha: 0, y: 24 }, 0);
            master.set(introLines, { autoAlpha: 0, y: 18 }, 0);
            master.set(fragments, {
              autoAlpha: 0,
              scale: 0.82,
              y: 24,
            }, 0);
            master.set(codeLines, {
              autoAlpha: 0,
              transformOrigin: "left center",
              y: 22,
            }, 0);
            master.set(projectScenes, {
              autoAlpha: 0,
              scale: 0.985,
              xPercent: 7,
            }, 0);
            master.set(timelineNodes, {
              autoAlpha: 0.2,
              scale: 0.65,
            }, 0);
            master.set(timelineCopy, {
              autoAlpha: 0,
              x: 32,
            }, 0);
            master.set(skillBranches, {
              opacity: 0.15,
              scaleX: 0,
            }, 0);
            master.set(skillLabels, {
              autoAlpha: 0,
              x: -24,
            }, 0);
            master.set(presentRails, {
              opacity: 0.15,
              scaleX: 0,
            }, 0);
            master.set(presentLabels, {
              autoAlpha: 0,
              y: 18,
            }, 0);
            master.set(futureRays, {
              strokeDasharray: 1,
              strokeDashoffset: 1,
            }, 0);
            master.set(futurePhrases, {
              autoAlpha: 0,
              scale: 0.96,
            }, 0);
            master.set(outroText, { autoAlpha: 0, y: 16 }, 0);
            master.set(signalPath, {
              opacity: 0.72,
              strokeDasharray: 1,
              strokeDashoffset: 1,
            }, 0);
            master.set(signalHead, {
              autoAlpha: 1,
              scale: 1,
              xPercent: -50,
              yPercent: -50,
              x: 0,
              y: 0,
            }, 0);

            if (frameHorizontal.length > 0) {
              master.set(frameHorizontal, { scaleX: 0 }, 0);
            }
            if (frameVertical.length > 0) {
              master.set(frameVertical, { scaleY: 0 }, 0);
            }
            if (frameChrome) {
              master.set(frameChrome, { autoAlpha: 0 }, 0);
            }
            if (timelinePath) {
              master.set(timelinePath, { scaleY: 0 }, 0);
            }
            if (skillHub) {
              master.set(skillHub, { autoAlpha: 0, scale: 0.4 }, 0);
            }
            if (presentHub) {
              master.set(presentHub, { autoAlpha: 0, scale: 0.4 }, 0);
            }
            if (presentOrbit) {
              master.set(presentOrbit, {
                autoAlpha: 0,
                scale: 0.55,
              }, 0);
            }
            if (futureGrid) {
              master.set(futureGrid, {
                autoAlpha: 0,
                yPercent: 14,
              }, 0);
            }
            if (outroTerminal) {
              master.set(outroTerminal, { autoAlpha: 0, scale: 0.97 }, 0);
            }
            if (outroCursor) {
              master.set(outroCursor, { autoAlpha: 0 }, 0);
            }

            const animateChapterCopy = (
              chapter: StoryChapter,
              enterOffset = 0.22,
              exitOffset?: number,
            ) => {
              const targets = copy(chapter);

              if (targets.length === 0) {
                return;
              }

              const sceneStart = at(chapter);
              const sceneSpan = span(chapter);
              const exitAt = exitOffset ?? sceneSpan - 0.62;
              master?.to(
                targets,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: Math.min(0.72, sceneSpan * 0.2),
                  stagger: Math.min(0.14, sceneSpan * 0.035),
                  ease: "power2.out",
                },
                sceneStart + enterOffset,
              );
              master?.to(
                targets,
                {
                  autoAlpha: 0,
                  y: -34,
                  duration: Math.min(0.48, sceneSpan * 0.14),
                  stagger: 0.04,
                  ease: "power2.in",
                },
                sceneStart + exitAt,
              );
            };

            const copyExitOffsets: Record<StoryChapter, number> = {
              intro: 2.9,
              curiosity: 2.15,
              code: 2.0,
              projects: 1.9,
              journey: 1.9,
              skills: 1.9,
              present: 1.75,
              future: 1.85,
              outro: 2.45,
            };

            storySceneConfig.filter((scene) => scene.chapter !== "intro").forEach((scene) => {
              animateChapterCopy(
                scene.chapter,
                0.22,
                copyExitOffsets[scene.chapter],
              );
            });

            const intro = at("intro");
            const introLayer = layer("intro");
            master.to(
              introCopy,
              {
                autoAlpha: 0,
                y: -34,
                duration: 0.48,
                stagger: 0.04,
                ease: "power2.in",
              },
              intro + 2.9,
            );
            if (introLayer) {
              master.set(introLayer, { autoAlpha: 1 }, intro);
              master.to(
                introLayer,
                { autoAlpha: 0, duration: 0.55 },
                intro + span("intro") - 0.7,
              );
            }
            master.to(
              introLines,
              {
                autoAlpha: 0.32,
                y: 0,
                duration: 0.58,
                stagger: 0.24,
                ease: "power2.out",
              },
              intro + 0.08,
            );
            master.to(
              signalPath,
              {
                strokeDashoffset: 0,
                duration: 2.5,
                ease: "power2.inOut",
              },
              intro + 0.62,
            );
            master.to(
              signalHead,
              {
                y: () => window.innerHeight * 0.47,
                duration: 2.5,
                ease: "power2.inOut",
              },
              intro + 0.62,
            );
            master.to(
              introLines,
              { autoAlpha: 0, y: -18, duration: 0.45, stagger: 0.06 },
              intro + 2.75,
            );

            const curiosity = at("curiosity");
            const curiosityLayer = layer("curiosity");
            if (curiosityLayer) {
              master.set(
                curiosityLayer,
                { autoAlpha: 1 },
                curiosity - 0.22,
              );
              master.to(
                curiosityLayer,
                { autoAlpha: 0, duration: 0.42 },
                curiosity + span("curiosity") - 0.35,
              );
            }
            master.to(
              fragments,
              {
                autoAlpha: 0.62,
                scale: 1,
                y: 0,
                duration: 0.62,
                stagger: 0.1,
                ease: "power2.out",
              },
              curiosity + 0.12,
            );
            master.to(
              fragments,
              {
                x: (index) => (index % 2 === 0 ? 18 : -18),
                y: (index) => (index % 3 - 1) * 22,
                duration: 1.5,
                stagger: 0.04,
              },
              curiosity + 1.0,
            );
            master.to(
              signalHead,
              {
                autoAlpha: 0,
                y: () => window.innerHeight * 0.58,
                duration: 0.65,
              },
              curiosity + 0.25,
            );
            master.to(
              fragments,
              {
                autoAlpha: 0,
                scale: 0.9,
                duration: 0.45,
                stagger: 0.04,
              },
              curiosity + span("curiosity") - 0.58,
            );

            const code = at("code");
            const codeLayer = layer("code");
            if (codeLayer) {
              master.set(codeLayer, { autoAlpha: 1 }, code - 0.28);
              master.to(
                codeLayer,
                { autoAlpha: 0, duration: 0.52 },
                code + span("code") - 0.24,
              );
            }
            master.to(
              codeLines,
              {
                autoAlpha: 0.86,
                y: 0,
                duration: 0.52,
                stagger: 0.14,
                ease: "power2.out",
              },
              code + 0.08,
            );
            master.to(
              codeLines,
              {
                autoAlpha: 0,
                scaleX: (index) => 0.42 + index * 0.13,
                x: (index) => (index - 1.5) * 48,
                duration: 0.78,
                stagger: 0.06,
                ease: "power3.inOut",
              },
              code + 1.82,
            );
            master.to(
              signalPath,
              { opacity: 0.2, duration: 0.7 },
              code + 0.1,
            );

            const projects = at("projects");
            const projectsLayer = layer("projects");
            if (projectsLayer) {
              master.set(
                projectsLayer,
                { autoAlpha: 1 },
                projects - 0.82,
              );
            }
            if (frame) {
              master.set(frame, { autoAlpha: 1, scale: 1 }, projects - 0.82);
            }
            master.to(
              frameHorizontal,
              {
                scaleX: 1,
                duration: 0.68,
                stagger: 0.08,
                ease: "power3.inOut",
              },
              projects - 0.78,
            );
            master.to(
              frameVertical,
              {
                scaleY: 1,
                duration: 0.68,
                stagger: 0.08,
                ease: "power3.inOut",
              },
              projects - 0.62,
            );
            if (frameChrome) {
              master.to(
                frameChrome,
                { autoAlpha: 1, duration: 0.42 },
                projects - 0.12,
              );
            }

            const projectStep = 1.78;
            projectScenes.forEach((scene, index) => {
              const sceneEnter = projects + 0.42 + index * projectStep;
              const previous = projectScenes[index - 1];

              if (previous) {
                master?.to(
                  previous,
                  {
                    autoAlpha: 0,
                    scale: 0.95,
                    xPercent: -8,
                    duration: 0.5,
                    ease: "power2.in",
                  },
                  sceneEnter - 0.18,
                );
              }

              master?.to(
                scene,
                {
                  autoAlpha: 1,
                  scale: 1,
                  xPercent: 0,
                  duration: 0.62,
                  ease: "power3.out",
                },
                sceneEnter,
              );
            });

            const finalProject = projectScenes.at(-1);
            const journey = at("journey");
            if (finalProject) {
              master.to(
                finalProject,
                {
                  autoAlpha: 0.45,
                  scale: 0.72,
                  duration: 0.72,
                  ease: "power3.in",
                },
                journey - 1.02,
              );
            }
            if (frame) {
              master.to(
                frame,
                {
                  autoAlpha: 0,
                  scale: 0.045,
                  duration: 0.88,
                  ease: "power3.inOut",
                },
                journey - 0.92,
              );
            }
            if (projectsLayer) {
              master.set(
                projectsLayer,
                { autoAlpha: 0 },
                journey + 0.06,
              );
            }

            const journeyLayer = layer("journey");
            if (journeyLayer) {
              master.set(
                journeyLayer,
                { autoAlpha: 1 },
                journey - 0.62,
              );
              master.to(
                journeyLayer,
                { autoAlpha: 0, duration: 0.5 },
                journey + span("journey") - 0.16,
              );
            }
            if (timelinePath) {
              master.to(
                timelinePath,
                {
                  scaleY: 1,
                  duration: span("journey") - 1.25,
                  ease: "none",
                },
                journey + 0.3,
              );
            }

            const milestoneStep = 1.16;
            timelineNodes.forEach((node, index) => {
              const milestoneEnter = journey + 0.55 + index * milestoneStep;
              const milestoneCopy = timelineCopy[index];
              const previousCopy = timelineCopy[index - 1];

              if (previousCopy) {
                master?.to(
                  previousCopy,
                  {
                    autoAlpha: 0,
                    x: -24,
                    duration: 0.36,
                  },
                  milestoneEnter - 0.16,
                );
              }

              master?.to(
                node,
                {
                  autoAlpha: 1,
                  backgroundColor: "#6fe7ff",
                  borderColor: "#6fe7ff",
                  scale: 1.35,
                  duration: 0.35,
                  ease: "power2.out",
                },
                milestoneEnter,
              );
              master?.to(
                node,
                {
                  autoAlpha: 0.48,
                  scale: 0.88,
                  duration: 0.38,
                },
                milestoneEnter + 0.72,
              );

              if (milestoneCopy) {
                master?.to(
                  milestoneCopy,
                  {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0.48,
                    ease: "power2.out",
                  },
                  milestoneEnter + 0.08,
                );
              }
            });

            if (timelineCopy.length > 0) {
              master.to(
                timelineCopy,
                { autoAlpha: 0, duration: 0.4 },
                journey + span("journey") - 0.52,
              );
            }

            const skills = at("skills");
            const skillsLayer = layer("skills");
            if (skillsLayer) {
              master.set(skillsLayer, { autoAlpha: 1 }, skills - 0.66);
              master.to(
                skillsLayer,
                { autoAlpha: 0, duration: 0.52 },
                skills + span("skills") - 0.12,
              );
            }
            if (skillHub) {
              master.to(
                skillHub,
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.62,
                  ease: "back.out(1.7)",
                },
                skills - 0.52,
              );
            }

            const skillStep = 1.35;
            skillBranches.forEach((branch, index) => {
              const branchEnter = skills + 0.38 + index * skillStep;
              const branchLabel = skillLabels[index];

              master?.to(
                branch,
                {
                  opacity: 0.88,
                  scaleX: 1,
                  duration: 0.62,
                  ease: "power2.out",
                },
                branchEnter,
              );

              if (branchLabel) {
                master?.to(
                  branchLabel,
                  {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0.48,
                    ease: "power2.out",
                  },
                  branchEnter + 0.12,
                );
                master?.to(
                  branchLabel,
                  {
                    autoAlpha: 0,
                    x: 22,
                    duration: 0.38,
                  },
                  branchEnter + 1.0,
                );
              }

              master?.to(
                branch,
                { opacity: 0.2, duration: 0.4 },
                branchEnter + 1.02,
              );
            });

            const present = at("present");
            master.to(
              skillBranches,
              {
                opacity: 0,
                scaleX: 0,
                duration: 0.68,
                stagger: 0.05,
                ease: "power3.in",
              },
              present - 0.92,
            );
            if (skillHub) {
              master.to(
                skillHub,
                { autoAlpha: 0.3, scale: 0.6, duration: 0.55 },
                present - 0.72,
              );
            }

            const presentLayer = layer("present");
            if (presentLayer) {
              master.set(
                presentLayer,
                { autoAlpha: 1 },
                present - 0.72,
              );
              master.to(
                presentLayer,
                { autoAlpha: 0, duration: 0.52 },
                present + span("present") - 0.08,
              );
            }
            if (presentHub) {
              master.to(
                presentHub,
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.58,
                  ease: "back.out(1.5)",
                },
                present - 0.48,
              );
            }
            if (presentOrbit) {
              master.to(
                presentOrbit,
                {
                  autoAlpha: 0.8,
                  scale: 1,
                  duration: 0.9,
                  ease: "power2.out",
                },
                present + 0.05,
              );
            }

            presentRails.forEach((rail, index) => {
              const railEnter = present + 0.45 + index * 0.48;
              const railLabel = presentLabels[index];
              master?.to(
                rail,
                {
                  opacity: 0.72,
                  scaleX: 1,
                  duration: 0.58,
                  ease: "power2.out",
                },
                railEnter,
              );

              if (railLabel) {
                master?.to(
                  railLabel,
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.46,
                    ease: "power2.out",
                  },
                  railEnter + 0.12,
                );
              }
            });

            const future = at("future");
            master.to(
              presentLabels,
              { autoAlpha: 0, y: -16, duration: 0.42, stagger: 0.04 },
              future - 0.72,
            );
            master.to(
              presentRails,
              {
                opacity: 0,
                scaleX: 0,
                duration: 0.58,
                stagger: 0.04,
                ease: "power3.in",
              },
              future - 0.66,
            );
            if (presentOrbit) {
              master.to(
                presentOrbit,
                {
                  autoAlpha: 0,
                  scale: 2.35,
                  duration: 0.78,
                  ease: "power2.in",
                },
                future - 0.76,
              );
            }

            const futureLayer = layer("future");
            if (futureLayer) {
              master.set(
                futureLayer,
                { autoAlpha: 1 },
                future - 0.78,
              );
              master.to(
                futureLayer,
                { autoAlpha: 0, duration: 0.72 },
                future + span("future") - 0.35,
              );
            }
            if (futureGrid) {
              master.to(
                futureGrid,
                {
                  autoAlpha: 0.72,
                  yPercent: 0,
                  duration: 1.18,
                  ease: "power2.out",
                },
                future - 0.62,
              );
              master.to(
                futureGrid,
                {
                  yPercent: -7,
                  duration: span("future"),
                  ease: "none",
                },
                future,
              );
            }
            master.to(
              futureRays,
              {
                strokeDashoffset: 0,
                duration: 1.8,
                stagger: 0.07,
                ease: "power2.inOut",
              },
              future - 0.28,
            );

            const futurePhraseStep = 1.18;
            futurePhrases.forEach((phrase, index) => {
              const phraseEnter = future + 0.36 + index * futurePhraseStep;
              const previousPhrase = futurePhrases[index - 1];

              if (previousPhrase) {
                master?.to(
                  previousPhrase,
                  {
                    autoAlpha: 0,
                    scale: 1.035,
                    duration: 0.36,
                  },
                  phraseEnter - 0.18,
                );
              }

              master?.to(
                phrase,
                {
                  autoAlpha: 0.13,
                  scale: 1,
                  duration: 0.52,
                  ease: "power2.out",
                },
                phraseEnter,
              );
            });

            const outro = at("outro");
            master.to(
              futurePhrases,
              { autoAlpha: 0, duration: 0.42 },
              outro - 0.34,
            );
            master.to(
              futureRays,
              {
                autoAlpha: 0,
                strokeDashoffset: 1,
                duration: 0.66,
              },
              outro - 0.4,
            );
            master.to(
              signalPath,
              {
                opacity: 0,
                strokeDashoffset: 1,
                duration: 0.58,
              },
              outro - 0.42,
            );
            master.to(
              signalHead,
              {
                autoAlpha: 1,
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.78,
                ease: "power3.inOut",
              },
              outro - 0.35,
            );

            const outroLayer = layer("outro");
            if (outroLayer) {
              master.set(outroLayer, { autoAlpha: 1 }, outro - 0.42);
            }
            if (outroTerminal) {
              master.to(
                outroTerminal,
                {
                  autoAlpha: 0.24,
                  scale: 1,
                  duration: 0.55,
                  ease: "power2.out",
                },
                outro + 0.1,
              );
            }
            if (outroCursor) {
              master.to(
                outroCursor,
                { autoAlpha: 1, duration: 0.18 },
                outro + 0.04,
              );
            }
            master.to(
              outroText,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.52,
                ease: "power2.out",
              },
              outro + 0.35,
            );
            master.to(
              contactDetails,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.58,
                stagger: 0.12,
                ease: "power2.out",
              },
              outro + 1.12,
            );

            if (!master.scrollTrigger) {
              throw new Error("The story ScrollTrigger was not created.");
            }

            lenis.resize();
            ScrollTrigger.refresh();
            documentElement.classList.add(MOTION_READY_CLASS);

            refreshFrame = window.requestAnimationFrame(() => {
              lenis?.resize();
              ScrollTrigger.refresh();
            });
          } catch {
            master?.revert();
            master = undefined;
            disposeRuntime();
          }

          return disposeRuntime;
        },
      );
    }, root);

    return () => {
      documentElement.classList.remove(MOTION_READY_CLASS);
      media?.revert();
      context.revert();
    };
  }, [rootRef]);
}
