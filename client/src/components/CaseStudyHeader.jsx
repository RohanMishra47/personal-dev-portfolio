import { Link } from "react-router-dom";

const CaseStudyHeader = ({ eyebrow, title, tagline, techStack, github, live }) => (
  <header className="mb-14">
    <Link
      to="/"
      className="font-mono text-sm text-graphite hover:text-pine mb-8 inline-block"
    >
      ← back to projects
    </Link>

    <span className="font-mono text-xs text-pine bg-pine/10 px-2 py-1 rounded-sm inline-block mb-4">
      {eyebrow}
    </span>

    <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-4 leading-tight">
      {title}
    </h1>

    <p className="font-serif text-lg text-graphite max-w-prose mb-6">
      {tagline}
    </p>

    <div className="flex flex-wrap gap-2 mb-6">
      {techStack.map((tech) => (
        <span
          key={tech}
          className="font-mono text-xs text-graphite border border-hairline rounded-sm px-2 py-1"
        >
          {tech}
        </span>
      ))}
    </div>

    <div className="flex gap-6 font-mono text-sm text-pine">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-pine-light pb-px hover:text-pine-dark"
        >
          view repository
        </a>
      )}
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-pine-light pb-px hover:text-pine-dark"
        >
          view live
        </a>
      )}
    </div>
  </header>
);

export default CaseStudyHeader;
