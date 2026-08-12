import type { CSSProperties, ReactNode } from "react";

import {
  currentFocus,
  milestones,
  projects,
  skillBranches,
  storyPhrases,
} from "@/data/portfolio";

type PositionedFragment = {
  text: string;
  left: string;
  top: string;
};

type CodeLine = {
  content: ReactNode;
};

const fragments: readonly PositionedFragment[] = [
  { text: "{ curiosity }", left: "13%", top: "24%" },
  { text: "idea.observe()", left: "72%", top: "19%" },
  { text: "[ 06.2081, 106.8456 ]", left: "76%", top: "41%" },
  { text: "const why", left: "20%", top: "68%" },
  { text: "<something />", left: "68%", top: "73%" },
  { text: "npm run begin", left: "35%", top: "83%" },
] as const;

const codeLines: readonly CodeLine[] = [
  {
    content: (
      <>
        <span className="token">function</span> buildSomething() {"{"}
      </>
    ),
  },
  {
    content: (
      <>
        &nbsp;&nbsp;<span className="token">const</span> idea = curiosity.follow();
      </>
    ),
  },
  {
    content: (
      <>
        &nbsp;&nbsp;<span className="token">return</span> idea + code;
      </>
    ),
  },
  { content: "}" },
] as const;

const branchAngles = ["-152deg", "-28deg", "28deg", "152deg"] as const;

const branchPositions = [
  { x: "8%", y: "22%" },
  { x: "68%", y: "20%" },
  { x: "67%", y: "68%" },
  { x: "9%", y: "70%" },
] as const;

const railAngles = ["-150deg", "-30deg", "90deg"] as const;

const focusPositions = [
  { x: "12%", y: "24%" },
  { x: "69%", y: "25%" },
  { x: "45%", y: "72%" },
] as const;

const timelinePositions = ["20%", "40%", "60%", "80%"] as const;

function ProjectDashboard({ index }: { index: number }) {
  if (index === 1) {
    return (
      <div className="project-visual project-visual--form">
        <span className="ui-sidebar" />
        <span className="ui-topbar" />
        <span className="ui-chart" />
        <span className="ui-blocks">
          <i />
          <i />
          <i />
        </span>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="project-visual project-visual--atlas">
        <span className="ui-sidebar" />
        <span className="ui-topbar" />
        <span className="ui-chart" />
        <span className="ui-blocks">
          <i />
          <i />
          <i />
        </span>
      </div>
    );
  }

  return (
    <div className="project-visual project-visual--signal">
      <span className="ui-sidebar" />
      <span className="ui-topbar" />
      <span className="ui-chart" />
      <span className="ui-blocks">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

/**
 * The persistent, decorative half of the story. Motion is intentionally kept
 * out of this component; `useStoryDirector` owns every GSAP state transition.
 */
export function StoryStage() {
  return (
    <div className="story-stage" aria-hidden="true">
      <div className="stage-grid" />
      <div className="stage-vignette" />

      <div data-story-signal="">
        <svg
          className="signal-svg"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path
            className="signal-path signal-path-muted"
            d="M 500 500 L 500 1000"
            pathLength="1"
          />
          <path
            className="signal-path"
            data-story-signal-path=""
            d="M 500 500 L 500 1000"
            pathLength="1"
          />
        </svg>
        <span
          className="signal-head"
          data-story-signal-head=""
          style={{ left: "50%", top: "50%" }}
        />
      </div>

      <div className="stage-layer" data-stage-chapter="intro">
        <div className="stage-intro">
          <p className="intro-line" data-intro-line="0">
            {storyPhrases.opening.system}
          </p>
          <p className="intro-line is-name" data-intro-line="1">
            {storyPhrases.opening.greeting}
          </p>
          <p className="intro-line is-role" data-intro-line="2">
            {storyPhrases.opening.statement}
          </p>
        </div>
      </div>

      <div className="stage-layer" data-stage-chapter="curiosity">
        {fragments.map((fragment, index) => (
          <span
            className="code-fragment"
            data-fragment={index}
            key={fragment.text}
            style={{ left: fragment.left, top: fragment.top }}
          >
            {fragment.text}
          </span>
        ))}
      </div>

      <div className="stage-layer" data-stage-chapter="code">
        <div className="code-panel">
          {codeLines.map((line, index) => (
            <div className="code-line" data-code-line={index} key={index}>
              {line.content}
            </div>
          ))}
        </div>
      </div>

      <div className="stage-layer" data-stage-chapter="projects">
        <div className="interface-frame" data-interface-frame="">
          <span className="frame-edge top" data-interface-corner="top" />
          <span className="frame-edge right" data-interface-corner="right" />
          <span className="frame-edge bottom" data-interface-corner="bottom" />
          <span className="frame-edge left" data-interface-corner="left" />

          <span className="frame-chrome">
            <i />
            <i />
            <i />
          </span>

          {projects.map((project, index) => (
            <article
              className="project-scene"
              data-project={index}
              data-project-scene={index}
              key={project.id}
            >
              <div className="project-meta">
                <p className="project-count" data-project-counter={index}>
                  {project.number} / {String(projects.length).padStart(2, "0")}
                </p>
                <p className="project-label">{project.category}</p>
                <h3 className="project-title" data-project-title={index}>
                  {project.name}
                </h3>
                <p className="project-summary">{project.summary}</p>
                <p className="project-stack">{project.stack.join("  /  ")}</p>
              </div>
              <ProjectDashboard index={index} />
            </article>
          ))}
        </div>
      </div>

      <div className="stage-layer" data-stage-chapter="journey">
        <div className="timeline-stage">
          <div className="timeline-spine">
            <span className="timeline-fill" data-timeline-path="" />
          </div>

          {milestones.map((milestone, index) => (
            <span
              className="timeline-node"
              data-timeline-node={index}
              key={milestone.year}
              style={{ "--node-y": timelinePositions[index] } as CSSProperties}
            />
          ))}

          {milestones.map((milestone, index) => (
            <p className="timeline-copy" data-timeline-copy={index} key={milestone.title}>
              <strong>{milestone.year}</strong>
              <span>{milestone.title}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="stage-layer" data-stage-chapter="skills">
        <div className="skill-stage">
          <span className="skill-hub" data-skill-hub="" />

          {skillBranches.map((branch, index) => (
            <span
              className="skill-branch"
              data-skill-branch={index}
              key={`${branch.id}-branch`}
              style={{ "--branch-angle": branchAngles[index] } as CSSProperties}
            />
          ))}

          {skillBranches.map((branch, index) => (
            <p
              className="skill-copy"
              data-skill-label={index}
              key={branch.id}
              style={
                {
                  "--label-x": branchPositions[index].x,
                  "--label-y": branchPositions[index].y,
                } as CSSProperties
              }
            >
              <strong>{branch.name}</strong>
              <span>{branch.technologies.join("  /  ")}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="stage-layer" data-stage-chapter="present">
        <div className="present-stage">
          <span className="present-orbit" />
          <span className="skill-hub" data-present-hub="" />

          {currentFocus.map((focus, index) => (
            <span
              className="present-rail"
              data-present-rail={index}
              key={`${focus.id}-rail`}
              style={{ "--rail-angle": railAngles[index] } as CSSProperties}
            />
          ))}

          {currentFocus.map((focus, index) => (
            <p
              className="skill-copy present-copy"
              data-present-label={index}
              key={focus.id}
              style={
                {
                  "--label-x": focusPositions[index].x,
                  "--label-y": focusPositions[index].y,
                } as CSSProperties
              }
            >
              <strong>{focus.label}</strong>
              <span>{focus.title}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="stage-layer" data-stage-chapter="future">
        <div className="future-stage">
          <span className="future-plane" data-future-grid="" />
          <svg
            className="signal-svg"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            focusable="false"
          >
            {[80, 220, 360, 500, 640, 780, 920].map((x, index) => (
              <path
                className="future-ray"
                data-future-ray={index}
                d={`M 500 430 L ${x} 1000`}
                key={x}
                pathLength="1"
              />
            ))}
          </svg>

          {storyPhrases.future.map((phrase, index) => (
            <p className="future-phrase" data-future-phrase={index} key={phrase}>
              {phrase}
            </p>
          ))}
        </div>
      </div>

      <div className="stage-layer" data-stage-chapter="outro">
        <div className="outro-stage">
          <div className="outro-terminal">
            <span className="terminal-cursor" data-outro-cursor="" />
            <p className="outro-question" data-outro-text="0">
              {storyPhrases.closing.prompt}
            </p>
            <p className="outro-cta" data-outro-text="1">
              {storyPhrases.closing.invitation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryStage;
