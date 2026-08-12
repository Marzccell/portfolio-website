import type React from 'react';

import {
  currentFocus,
  milestones,
  personalInfo,
  projects,
  skillBranches,
  socialLinks,
  storyPhrases,
} from '../../data/portfolio';

const codeSample = `const idea = curiosity.follow();
const product = build(idea, { care: true });

return product.ship();`;

export function StoryContent() {
  return (
    <div className="story-content">
      <section
        id="home"
        className="story-chapter chapter chapter--home"
        data-chapter="intro"
        aria-labelledby="home-title"
        style={{ '--beats': 4 } as React.CSSProperties}
      >
        <div className="chapter-shell">
          <div className="chapter-copy-stack chapter-copy-stack--home">
            <p className="chapter-copy chapter-kicker" data-copy="home-system">
              {storyPhrases.opening.system}<span className="text-cursor" aria-hidden="true">_</span>
            </p>
            <h1 id="home-title" className="chapter-copy chapter-title" data-copy="home-title">
              {storyPhrases.opening.greeting}
            </h1>
            <p className="chapter-copy chapter-statement" data-copy="home-statement">
              {storyPhrases.opening.statement}
            </p>
            <p className="chapter-copy chapter-meta" data-copy="home-meta">
              {personalInfo.role} <span aria-hidden="true">/</span> {personalInfo.location}
            </p>
          </div>

          <div className="opening-signal" aria-hidden="true">
            <span className="opening-signal__cursor">_</span>
            <span className="opening-signal__line" />
          </div>
        </div>
      </section>

      <section
        id="about"
        className="story-chapter chapter chapter--about"
        data-chapter="curiosity"
        aria-labelledby="about-title"
        style={{ '--beats': 3 } as React.CSSProperties}
      >
        <div className="chapter-shell">
          <div className="chapter-copy-stack">
            <p className="chapter-copy chapter-kicker" data-copy="about-kicker">01 / Curiosity &rarr; Code</p>
            <h2 id="about-title" className="chapter-copy chapter-title" data-copy="about-title">
              {storyPhrases.curiosity[0]}
            </h2>
            <p className="chapter-copy chapter-shift" data-copy="about-curiosity">
              {storyPhrases.curiosity[1]}
            </p>
            <p className="chapter-copy chapter-note" data-copy="about-note">{personalInfo.introduction}</p>
          </div>

          <div className="curiosity-fragments" aria-hidden="true">
            <span>const</span>
            <span>{'{}'}</span>
            <span>01:14:07</span>
            <span>build()</span>
            <span>&rarr;</span>
          </div>
        </div>
      </section>

      <section
        className="story-chapter chapter chapter--code"
        data-chapter="code"
        aria-labelledby="code-title"
        style={{ '--beats': 3 } as React.CSSProperties}
      >
        <div className="chapter-shell">
          <div className="chapter-copy-stack">
            <p className="chapter-copy chapter-kicker" data-copy="code-kicker">Code &rarr; Structure</p>
            <h2 id="code-title" className="chapter-copy chapter-title" data-copy="code-title">
              {storyPhrases.structure[0]}
            </h2>
            <p className="chapter-copy chapter-lede" data-copy="code-lede">
              {storyPhrases.structure[1]}
            </p>
          </div>

          <div className="code-structure" aria-label="Code resolving into a product interface">
            <div className="code-structure__bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <small>idea.ts</small>
            </div>
            <pre className="code-structure__sample"><code>{codeSample}</code></pre>
            <div className="code-structure__interface" aria-hidden="true">
              <span className="interface-rail" />
              <span className="interface-heading" />
              <span className="interface-copy" />
              <span className="interface-action" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="story-chapter chapter chapter--projects"
        data-chapter="projects"
        aria-labelledby="projects-title"
        style={{ '--beats': 7 } as React.CSSProperties}
      >
        <div className="chapter-shell">
          <div className="chapter-copy-stack">
            <p className="chapter-copy chapter-kicker" data-copy="projects-kicker">02 / Code &rarr; Building</p>
            <h2 id="projects-title" className="chapter-copy chapter-title" data-copy="projects-title">
              {storyPhrases.building[0]}
            </h2>
            <p className="chapter-copy chapter-lede" data-copy="projects-lede">
              {storyPhrases.building[1]}
            </p>
          </div>

          <div className="static-projects" aria-label="Selected projects">
            {projects.map((project) => (
              <article className="static-project" data-project={project.id} key={project.id}>
                <div className="static-project__visual" aria-hidden="true">
                  <div className="static-project__chrome">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="static-project__canvas">
                    <span className="project-visual__rail" />
                    <span className="project-visual__primary" />
                    <span className="project-visual__secondary" />
                    <span className="project-visual__signal" />
                  </div>
                </div>
                <div className="static-project__copy">
                  <p className="static-project__eyebrow">
                    <span>Project {project.number}</span>
                    <span>{project.category}</span>
                  </p>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <p className="static-project__outcome">{project.outcome}</p>
                  <ul className="tag-list" aria-label={`${project.name} technologies`}>
                    {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="journey"
        className="story-chapter chapter chapter--journey"
        data-chapter="journey"
        aria-labelledby="journey-title"
        style={{ '--beats': 6 } as React.CSSProperties}
      >
        <div className="chapter-shell">
          <div className="chapter-copy-stack">
            <p className="chapter-copy chapter-kicker" data-copy="journey-kicker">03 / Building &rarr; Growth</p>
            <h2 id="journey-title" className="chapter-copy chapter-title" data-copy="journey-title">
              {storyPhrases.growth[0]}
            </h2>
            <p className="chapter-copy chapter-shift" data-copy="journey-shift">
              {storyPhrases.growth[1]}
            </p>
            <p className="chapter-copy chapter-lede" data-copy="journey-lede">
              {storyPhrases.growth[2]}
            </p>
          </div>

          <ol className="static-timeline" aria-label="Alex Morgan's development journey">
            {milestones.map((milestone, index) => (
              <li className="static-milestone" data-milestone={index} key={milestone.year}>
                <span className="static-milestone__node" aria-hidden="true" />
                <time>{milestone.year}</time>
                <div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="skills"
        className="story-chapter chapter chapter--skills"
        data-chapter="skills"
        aria-labelledby="skills-title"
        style={{ '--beats': 7 } as React.CSSProperties}
      >
        <div className="chapter-shell">
          <div className="chapter-copy-stack">
            <p className="chapter-copy chapter-kicker" data-copy="skills-kicker">04 / Growth &rarr; Capability</p>
            <h2 id="skills-title" className="chapter-copy chapter-title" data-copy="skills-title">
              {storyPhrases.capability[0]}
            </h2>
            <p className="chapter-copy chapter-shift" data-copy="skills-tools">{storyPhrases.capability[1]}</p>
            <p className="chapter-copy chapter-shift" data-copy="skills-goal">{storyPhrases.capability[2]}</p>
            <p className="chapter-copy chapter-lede" data-copy="skills-build">{storyPhrases.capability[3]}</p>
          </div>

          <div className="static-skills" aria-label="Technical capabilities">
            <span className="static-skills__trunk" aria-hidden="true" />
            {skillBranches.map((branch, index) => (
              <article className="static-skill" data-skill={branch.id} key={branch.id}>
                <span className="static-skill__node" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{branch.name}</h3>
                  <p>{branch.description}</p>
                  <ul className="tag-list" aria-label={`${branch.name} technologies`}>
                    {branch.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="present"
        className="story-chapter chapter chapter--present"
        data-chapter="present"
        aria-labelledby="present-title"
        style={{ '--beats': 5 } as React.CSSProperties}
      >
        <div className="chapter-shell">
          <div className="chapter-copy-stack">
            <p className="chapter-copy chapter-kicker" data-copy="present-kicker">05 / The signal converges</p>
            <h2 id="present-title" className="chapter-copy chapter-title" data-copy="present-title">
              {storyPhrases.present[0]}
            </h2>
            <p className="chapter-copy chapter-lede" data-copy="present-lede">{storyPhrases.present[1]}</p>
          </div>

          <div className="static-focus" aria-label="Current focus">
            <span className="static-focus__signal" aria-hidden="true" />
            {currentFocus.map((focus, index) => (
              <article className="static-focus__item" data-focus={focus.id} key={focus.id}>
                <p>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {focus.label}
                </p>
                <h3>{focus.title}</h3>
                <p>{focus.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="future"
        className="story-chapter chapter chapter--future"
        data-chapter="future"
        aria-labelledby="future-title"
        style={{ '--beats': 6 } as React.CSSProperties}
      >
        <div className="chapter-shell">
          <div className="chapter-copy-stack">
            <p className="chapter-copy chapter-kicker" data-copy="future-kicker">06 / Present &rarr; Future</p>
            <h2 id="future-title" className="chapter-copy chapter-title" data-copy="future-title">
              {storyPhrases.future[0]}
            </h2>
            {storyPhrases.future.slice(1).map((phrase, index) => (
              <p className="chapter-copy chapter-shift" data-copy={`future-${index + 1}`} key={phrase}>{phrase}</p>
            ))}
          </div>

          <div className="future-perspective" aria-hidden="true">
            <span className="future-perspective__horizon" />
            <span className="future-perspective__signal" />
            {Array.from({ length: 7 }, (_, index) => (
              <span className="future-perspective__ray" style={{ '--ray': index } as React.CSSProperties} key={index} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="story-chapter chapter chapter--contact"
        data-chapter="outro"
        aria-labelledby="contact-title"
        style={{ '--beats': 4 } as React.CSSProperties}
      >
        <div className="chapter-shell">
          <div className="chapter-copy-stack">
            <p className="chapter-copy chapter-kicker contact-prompt" data-copy="contact-prompt">
              {storyPhrases.closing.prompt}<span className="text-cursor" aria-hidden="true">_</span>
            </p>
            <h2 id="contact-title" className="chapter-copy chapter-title" data-copy="contact-title">
              {storyPhrases.closing.invitation}
            </h2>
            <p className="chapter-copy chapter-lede" data-copy="contact-lede">{personalInfo.availability}</p>
          </div>

          <nav className="contact-links" aria-label="Contact Alex Morgan">
            {socialLinks.map((link) => (
              <a
                className="contact-link"
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                key={link.id}
              >
                <span>
                  <strong>{link.label}</strong>
                  <small>{link.detail}</small>
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>

          <p className="contact-signoff">
            <span>{personalInfo.name}</span>
            <span>{personalInfo.role} &middot; {personalInfo.location}</span>
          </p>
        </div>
      </section>
    </div>
  );
}

export default StoryContent;
