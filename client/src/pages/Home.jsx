import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
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
      <div className="fixed top-4 right-4 z-50 bg-white border border-gray-200 rounded-xl shadow-lg">
        <Navbar />
      </div>
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
    </div>
  );
};

export default Home;