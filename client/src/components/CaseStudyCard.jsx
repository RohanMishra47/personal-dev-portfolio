import { Link } from "react-router-dom";

const CaseStudyCard = ({ id, title, tagline, techStack, headlineStat }) => {
  return (
    <Link
      to={`/projects/${id}`}
      className="group block border border-hairline rounded-md p-8 bg-paper hover:border-pine transition-colors duration-200"
    >
      <span className="font-mono text-xs text-pine bg-pine/10 px-2 py-1 rounded-sm inline-block mb-4">
        data analytics case study
      </span>

      <h3 className="font-serif text-2xl font-semibold text-ink mb-2">
        {title}
      </h3>

      <p className="text-base text-ink/80 mb-6 max-w-[52ch]">{tagline}</p>

      {headlineStat && (
        <div className="mb-6">
          <span className="font-mono text-2xl font-semibold text-pine block">
            {headlineStat.number}
          </span>
          <span className="text-sm text-graphite">{headlineStat.label}</span>
        </div>
      )}

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

      <span className="font-mono text-sm text-pine border-b border-pine-light pb-px group-hover:text-pine-dark">
        read the case study
      </span>
    </Link>
  );
};

export default CaseStudyCard;
