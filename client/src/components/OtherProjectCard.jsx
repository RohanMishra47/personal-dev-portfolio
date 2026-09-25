import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const OtherProjectCard = ({ title, description, url, github }) => {
  return (
    <div className="border-t border-hairline py-5 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
      <div className="max-w-[50ch]">
        <h4 className="font-serif text-base font-semibold text-ink">{title}</h4>
        <p className="text-sm text-graphite mt-1">{description}</p>
      </div>
      <div className="flex gap-4 flex-shrink-0 font-mono text-xs text-pine">
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-pine-dark"
          >
            <FaExternalLinkAlt size={11} /> live
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-pine-dark"
          >
            <FaGithub size={13} /> code
          </a>
        )}
      </div>
    </div>
  );
};

export default OtherProjectCard;
