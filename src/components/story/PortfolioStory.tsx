"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  MoveUpRight,
  BookOpen,
  CalendarDays,
  LayoutDashboard,
  Check,
  Search,
  Gamepad2,
} from "lucide-react";
import {
  profile,
  selectedProjects,
  tools,
  experience,
} from "@/data/portfolio-content";
import { useStoryDirector } from "./useStoryDirector";

function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M50 0V100M0 50H100M14.65 14.65L85.35 85.35M14.65 85.35L85.35 14.65"
        stroke="currentColor"
        strokeWidth="15"
      />
    </svg>
  );
}

function Orbit() {
  return (
    <div className="orbit-art" aria-hidden="true">
      <svg viewBox="0 0 600 600" className="orbit-svg">
        <defs>
          <radialGradient id="orbit-shade">
            <stop stopColor="#1c2946" />
            <stop offset="1" stopColor="#10182c" />
          </radialGradient>
        </defs>
        <circle
          cx="300"
          cy="300"
          r="164"
          fill="url(#orbit-shade)"
          stroke="#33405b"
        />
        <g className="orbit-lines" fill="none" stroke="#ff5145" strokeWidth="2">
          <ellipse
            cx="300"
            cy="300"
            rx="266"
            ry="92"
            transform="rotate(-35 300 300)"
          />
          <ellipse
            cx="300"
            cy="300"
            rx="266"
            ry="92"
            transform="rotate(35 300 300)"
          />
          <ellipse
            cx="300"
            cy="300"
            rx="266"
            ry="92"
            transform="rotate(90 300 300)"
          />
        </g>
        <g fill="none" stroke="#34415c" strokeWidth="1">
          <circle cx="300" cy="300" r="120" />
          <ellipse cx="300" cy="300" rx="67" ry="164" />
          <path d="M142 250H458M142 350H458M136 300H464" />
        </g>
        <circle cx="485" cy="173" r="9" fill="#f1eddf" />
        <circle cx="76" cy="381" r="6" fill="#ff5145" />
      </svg>
      <div className="orbit-core">
        <span>MM</span>
        <span>L.</span>
      </div>
      <span className="orbit-note note-one">ALWAYS A WORK IN PROGRESS</span>
      <span className="orbit-note note-two">IDEA → BUILD → LEARN ↗</span>
      <span className="orbit-cross cross-one">+</span>
      <span className="orbit-cross cross-two">+</span>
    </div>
  );
}

function StudyPreview() {
  return (
    <div className="study-preview">
      <aside>
        <div className="study-brand">
          <BookOpen size={18} /> StudyFlow
        </div>
        <span className="study-active">
          <LayoutDashboard size={14} /> Dashboard
        </span>
        <span>
          <Check size={14} /> Assignments
        </span>
        <span>
          <CalendarDays size={14} /> Study planner
        </span>
        <small>YOUR SPACE TO FOCUS</small>
      </aside>
      <div className="study-main">
        <div className="study-top">
          <span>Overview</span>
          <span className="avatar">M</span>
        </div>
        <h4>A clearer day starts here.</h4>
        <p>Your assignments and study plans, together.</p>
        <div className="study-stats">
          <div>
            <i />
            <b>Assignments</b>
            <span>Organize</span>
          </div>
          <div>
            <i />
            <b>Progress</b>
            <span>Keep track</span>
          </div>
          <div>
            <i />
            <b>Study time</b>
            <span>Plan ahead</span>
          </div>
        </div>
        <div className="study-panels">
          <div>
            <h5>
              Upcoming assignments <span>↗</span>
            </h5>
            {[
              "Programming practice",
              "Database design",
              "Project preparation",
            ].map((t, i) => (
              <div className="study-task" key={t}>
                <span className="task-check">
                  {i === 0 && <Check size={10} />}
                </span>
                <span>
                  {t}
                  <small>{["In progress", "To do", "To do"][i]}</small>
                </span>
                <i />
              </div>
            ))}
          </div>
          <div>
            <h5>Today’s study plan</h5>
            <div className="study-calendar">
              {["M", "T", "W", "T", "F"].map((d, i) => (
                <span className={i === 2 ? "selected" : ""} key={i}>
                  {d}
                  <b>{12 + i}</b>
                </span>
              ))}
            </div>
            <div className="study-session">
              <span>FOCUS SESSION</span>
              <b>One thing at a time.</b>
              <div className="session-line" />
            </div>
          </div>
        </div>
      </div>
      <span className="preview-caption">
        INTERFACE PREVIEW · ILLUSTRATIVE DATA
      </span>
    </div>
  );
}

function ArchivePreview() {
  return (
    <div className="archive-preview">
      <Image
        sizes="(max-width: 700px) 90vw, 55vw"
        src="/projects/archive-museum.png"
        alt="Museum interior artwork from The Last Archive"
        width={1672}
        height={941}
        loading="lazy"
      />
      <div className="archive-shade" />
      <div className="archive-title">
        <span>A MUSEUM. A MYSTERY. YOUR INVESTIGATION.</span>
        <h4>
          THE LAST
          <br />
          <em>ARCHIVE</em>
        </h4>
        <div>
          <Gamepad2 size={16} /> SOLO UNITY PROJECT
        </div>
      </div>
      <span className="archive-corner">CASE FILE / 001</span>
    </div>
  );
}

function MarflixPreview() {
  return (
    <div className="marflix-preview">
      <div className="marflix-brand">
        MARFLIX<span>↗</span>
      </div>
      <Image
        sizes="(max-width: 700px) 45vw, 25vw"
        src="/projects/marflix-art.png"
        alt="Movie artwork used in the Marflix project"
        width={473}
        height={440}
        loading="lazy"
      />
      <h4>
        Find your next
        <br />
        <span>great watch.</span>
      </h4>
      <div className="movie-search">
        <Search size={15} />
        <span>Discover something worth watching</span>
      </div>
      <span className="preview-caption">
        PROJECT ARTWORK · INTERFACE PREVIEW
      </span>
    </div>
  );
}

export default function PortfolioStory() {
  const rootRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  useStoryDirector(rootRef, motionPaused);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <main
      ref={rootRef}
      className={`portfolio ${motionPaused ? "motion-paused" : ""}`}
    >
      <a className="skip-link" href="#work">
        Skip to selected work
      </a>
      <header className="site-nav">
        <a
          className="brand"
          href="#home"
          aria-label="Marcell Matthew Loemanto, home"
        >
          <span className="brand-monogram">
            mml<span>↗</span>
          </span>
          <span className="brand-caption">
            THE PORTFOLIO
            <br />
            OF MARCELL
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {[
            ["Work", "work"],
            ["About", "about"],
            ["Experience", "experience"],
          ].map(([label, id]) => (
            <a href={`#${id}`} key={id}>
              {label}
              <span>↗</span>
            </a>
          ))}
        </nav>
        <a className="nav-contact" href="#contact">
          Let’s connect <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        {menuOpen && (
          <nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
            onKeyDown={(event) => {
              if (event.key === "Escape") setMenuOpen(false);
            }}
          >
            {[
              ["Work", "work"],
              ["About", "about"],
              ["Experience", "experience"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowUpRight />
              </a>
            ))}
          </nav>
        )}
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-topline">
          <span>
            <i /> INFORMATICS STUDENT / PCU
          </span>
          <span>PERSONAL PORTFOLIO — 2026</span>
        </div>
        <div className="hero-body">
          <div className="hero-copy">
            <p className="hero-eyebrow">HELLO, I’M</p>
            <h1 id="hero-title">
              <span className="hero-name">
                MARCELL<span className="name-dot">.</span>
              </span>
              <span className="hero-surname">MATTHEW LOEMANTO</span>
            </h1>
            <p className="hero-description">
              Turning what I learn
              <br />
              into things you can <em>use.</em>
            </p>
            <div className="hero-actions">
              <a className="pill-button" href="#work">
                Explore my work <ArrowDown size={17} />
              </a>
              <a
                className="text-link"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <Orbit />
        </div>
        <div className="hero-bottom">
          <span className="availability">
            <i /> OPEN TO INTERNSHIPS & ORGANIZATIONS
          </span>
          <a href="#intro" className="scroll-cue">
            <span>SCROLL TO MEET ME</span>
            <ArrowDown size={16} />
          </a>
          <span className="hero-index">01 — THE BEGINNING</span>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1, 2, 3].map((i) => (
            <span key={i}>
              CURIOUS MIND <Asterisk /> HANDS-ON BUILDER <Asterisk /> STILL
              LEARNING <Asterisk />
            </span>
          ))}
        </div>
      </div>

      <section
        className="intro section-gutter"
        id="intro"
        aria-labelledby="intro-title"
      >
        <div className="section-label">
          <span>01 / THE IDEA</span>
          <span>FROM LEARNING TO MAKING</span>
        </div>
        <div className="intro-layout">
          <Asterisk className="intro-star" />
          <div>
            <h2 id="intro-title" className="intro-statement">
              <span data-word>Curiosity</span> <span data-word>is</span>{" "}
              <span data-word>where</span>
              <br className="desktop-break" /> <span data-word>it</span>{" "}
              <span data-word>starts.</span>{" "}
              <span data-word className="red-word">
                Building
              </span>
              <br className="desktop-break" /> <span data-word>is</span>{" "}
              <span data-word>how</span> <span data-word>I</span>{" "}
              <span data-word>learn.</span>
            </h2>
            <div className="intro-foot">
              <p>
                I’m an Informatics student at Petra Christian University. My
                projects are where lessons turn into practice—from organizing a
                student’s day to building a world to investigate.
              </p>
              <a
                href="#work"
                className="circle-link"
                aria-label="Go to selected projects"
              >
                <ArrowDown />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className="work section-gutter"
        id="work"
        aria-labelledby="work-title"
      >
        <div className="work-stage">
          <div className="section-label">
            <span>02 / SELECTED WORK</span>
            <span>THREE PROJECTS. DIFFERENT WORLDS.</span>
          </div>
          <div className="work-heading">
            <h2 id="work-title">
              A FEW THINGS
              <br />
              I’VE <span>BUILT.</span>
            </h2>
            <div
              className="work-pagination"
              aria-label="Three selected projects"
            >
              <span data-work-current>01</span>
              <i />
              <span>03</span>
            </div>
          </div>
          <div className="work-slides">
            {selectedProjects.map((project, index) => (
              <article
                className={`work-slide project-${project.id}`}
                data-work-slide
                key={project.id}
                aria-labelledby={`title-${project.id}`}
              >
                <div className="project-preview" aria-hidden="true">
                  {index === 0 ? (
                    <StudyPreview />
                  ) : index === 1 ? (
                    <ArchivePreview />
                  ) : (
                    <MarflixPreview />
                  )}
                </div>
                <div className="project-copy">
                  <p className="project-type">
                    <span>{project.number}</span> {project.type}
                  </p>
                  <h3 id={`title-${project.id}`}>{project.title}</h3>
                  <p className="project-line">{project.category}</p>
                  <p className="project-description">{project.description}</p>
                  <ul className="project-features">
                    {project.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <ul
                    className="project-stack"
                    aria-label={`${project.title} technologies`}
                  >
                    {project.stack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <div className="project-links">
                    {project.live && (
                      <a
                        className="project-primary"
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.liveLabel}
                        <ArrowUpRight size={18} />
                      </a>
                    )}
                    <a
                      className="text-link"
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View code <Github size={17} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="work-bottom">
            <span>IDEAS, PUT INTO PRACTICE.</span>
            <span className="desktop-work-hint">
              KEEP SCROLLING TO EXPLORE <ArrowDown size={14} />
            </span>
          </div>
        </div>
      </section>

      <section
        className="about section-gutter"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="section-label">
          <span>03 / THE PERSON BEHIND THE PROJECTS</span>
          <span>MORE THAN A STACK OF TOOLS</span>
        </div>
        <div className="about-layout">
          <div className="about-left">
            <div className="about-stamp">
              <Asterisk />
              <span>
                LEARN
                <br />
                BUILD
                <br />
                REPEAT.
              </span>
            </div>
            <h2 id="about-title" data-reveal>
              STILL LEARNING.
              <br />
              <span>ALWAYS MAKING.</span>
            </h2>
          </div>
          <div className="about-right" data-reveal>
            <p className="about-lede">
              Hi, I’m Marcell.
              <br />A student who likes to put ideas to work.
            </p>
            <p>
              I’m in my third semester of Informatics at Petra Christian
              University. I enjoy exploring how code becomes something people
              can interact with—whether that’s a web application or a game.
            </p>
            <p>
              Alongside my projects, I’m involved in PCE’s IT division and
              IRGL’s game division. I’m looking for an internship and
              organizational opportunities where I can contribute, collaborate,
              and keep learning.
            </p>
            <div className="about-facts">
              <div>
                <span>EDUCATION</span>
                <b>Informatics, PCU</b>
              </div>
              <div>
                <span>CURRENT CHAPTER</span>
                <b>Semester 3</b>
              </div>
              <div>
                <span>LOOKING FOR</span>
                <b>Internship & collaboration</b>
              </div>
            </div>
          </div>
        </div>
        <div className="toolbox">
          <div>
            <span>MY TOOLBOX</span>
            <p>
              What I work with
              <br />& keep exploring.
            </p>
          </div>
          <ul>
            {tools.map((tool) => (
              <li data-reveal key={tool}>
                {tool}
                <span>↗</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="experience section-gutter"
        id="experience"
        aria-labelledby="experience-title"
      >
        <div className="section-label">
          <span>04 / ALONG THE WAY</span>
          <span>LEARNING WITH OTHERS</span>
        </div>
        <div className="experience-heading">
          <h2 id="experience-title" data-reveal>
            THE STORY
            <br />
            SO <em>FAR.</em>
          </h2>
          <p data-reveal>
            A growing collection of experiences,
            <br />
            with plenty more ahead.
          </p>
        </div>
        <div className="experience-list">
          {experience.map((item, index) => (
            <article data-reveal key={item.role}>
              <span className="experience-year">{item.year}</span>
              <div>
                <p>{item.role}</p>
                <h3>{item.title}</h3>
                <span className="experience-detail">{item.detail}</span>
              </div>
              <span className="experience-number">0{index + 1}</span>
            </article>
          ))}
        </div>
      </section>

      <section
        className="contact section-gutter"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="section-label">
          <span>05 / THE NEXT CHAPTER</span>
          <span>
            <i className="status-dot" /> OPEN TO OPPORTUNITIES
          </span>
        </div>
        <div className="contact-main">
          <p data-reveal>AN INTERNSHIP. A TEAM. AN IDEA.</p>
          <h2 id="contact-title" data-reveal>
            LET’S BUILD
            <br />
            WHAT’S <em>NEXT.</em>
            <Asterisk />
          </h2>
          <div className="contact-row" data-reveal>
            <p>
              I’d love to hear about opportunities to learn,
              <br />
              contribute, and make something together.
            </p>
            <a
              className="contact-cta"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Let’s connect <MoveUpRight size={24} />
            </a>
          </div>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`}>
              <Mail size={17} />
              {profile.email}
              <ArrowUpRight size={17} />
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              {copied ? "Copied!" : "Copy email"}
              <span aria-live="polite" className="sr-only">
                {copied ? "Email address copied" : ""}
              </span>
            </button>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github size={17} />
              GitHub
              <ArrowUpRight size={17} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={17} />
              LinkedIn
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <footer>
          <span>
            MARCELL MATTHEW LOEMANTO <small>© 2026</small>
          </span>
          <button
            className="motion-toggle"
            type="button"
            aria-pressed={motionPaused}
            onClick={() => setMotionPaused(!motionPaused)}
          >
            {motionPaused ? "Enable motion" : "Pause motion"}
            <span className={motionPaused ? "" : "is-running"} />
          </button>
          <a href="#home">
            BACK TO TOP <ArrowUp size={15} />
          </a>
        </footer>
      </section>
    </main>
  );
}
