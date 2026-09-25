import { Link } from "react-router-dom";

const EngineeringCard = ({ id, title, tagline, techStack, headlineStat }) => {
  return (
    <Link
      to={`/projects/${id}`}
      className="group block border border-hairline rounded-md p-6 bg-paper hover:border-graphite transition-colors duration-200"
    >
      <span className="font-mono text-xs text-graphite bg-graphite/10 px-2 py-1 rounded-sm inline-block mb-3">
        featured engineering project
      </span>

      <h3 className="font-serif text-xl font-semibold text-ink mb-2">
        {title}
      </h3>

      <p className="text-sm text-ink/80 mb-4 max-w-[52ch]">{tagline}</p>

      {headlineStat && (
        <div className="mb-4">
          <span className="font-mono text-lg font-semibold text-ink block">
            {headlineStat.number}
          </span>
          <span className="text-xs text-graphite">{headlineStat.label}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs text-graphite border border-hairline rounded-sm px-2 py-1"
          >
            {tech}
          </span>
        ))}
      </div>

      <span className="font-mono text-sm text-ink border-b border-graphite pb-px group-hover:text-pine">
        see how it's built
      </span>
    </Link>
  );
};

export default EngineeringCard;
