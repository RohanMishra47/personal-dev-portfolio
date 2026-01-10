import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import "../assets/css/ProjectCard.css";
import getProjectIcon from "./getProjectIcon";

const ProjectCard = ({ title, description, url, github }) => {
  const IconComponent = getProjectIcon(title, description);

  return (
    <div className="project-card">
      <div className="project-icon">
        <IconComponent />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>

      {/* Action Buttons Container */}
      <div className="project-links">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-live"
        >
          <FaExternalLinkAlt /> Live
        </a>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-github"
        >
          <FaGithub /> Code
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
