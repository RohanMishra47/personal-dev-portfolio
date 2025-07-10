import React from "react";
import getProjectIcon from "./getProjectIcon";
import "../assets/css/ProjectCard.css";

const ProjectCard = ({ title, description, url }) => {
    const IconComponent = getProjectIcon(title, description);

    return (
        <div className="project-card">
            <div className="project-icon">
                <IconComponent />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">
                View Project
            </a>
        </div>
    );
};

export default ProjectCard;