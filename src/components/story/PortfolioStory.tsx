"use client";

import { useRef } from "react";
import { StoryContent } from "./StoryContent";
import { StoryStage } from "./StoryStage";
import { StoryNav } from "./StoryNav";
import { ScrollProgress } from "./ScrollProgress";
import { useStoryDirector } from "./useStoryDirector";

export default function PortfolioStory() {
  const rootRef = useRef<HTMLElement>(null);
  useStoryDirector(rootRef);

  return (
    <main ref={rootRef} data-story-root className="story-root">
      <a className="skip-link" href="#about">Skip to the story</a>
      <StoryNav />
      <ScrollProgress />
      <StoryStage />
      <StoryContent />
    </main>
  );
}
