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
        console.log("GitHub Projects Data:", data);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="home-container">
      <About />
      <h1>My Projects</h1>
      <div className="projects-grid">
        {projects.length ? (
          projects.map((project) => (
            <ProjectCard
              key={project.id || project.name}
              title={project.title || project.name}
              description={project.description}
              link={project.link || project.html_url}
            />
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </div>
      <Link to="/contact">Contact</Link>
    </div>
  );
};

export default Home;