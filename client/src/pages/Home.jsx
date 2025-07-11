import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import About from "../components/About";
import ProjectCard from "../components/ProjectCard";
import "../assets/css/Home.css";
import apiURL from "../utils/api";

const Home = () => {
  const [projects, setProjects] = useState([]);

  console.log("Projects:", projects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`
          ${apiURL}/api/projects
        `);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const getUniqueKey = (project, index) => {
    if (project.id) return `manual-${project.id}`;
    if (project.name) return `github-${project.name}`;
    return `project-${index}`;
  };

  return (
    <div className="home-container">
      <About />
      <h1>My Projects</h1>
      <div className="projects-grid">
        {projects.length ? (
          projects.map((project, index) => (
            <ProjectCard
              key={getUniqueKey(project, index)}
              title={project.title || project.name}
              description={project.description}
              url={project.url || project.link || project.html_url}
            />
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </div>
      <Link to="/contact" className="footer-contact-link">
        Contact
      </Link>
      <Link to="/admin" className="footer-contact-link">
        Dashboard
      </Link>
    </div>
  );
};

export default Home;