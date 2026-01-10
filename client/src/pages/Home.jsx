import "../assets/css/Home.css";
import About from "../components/About";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import projectData from "../data/projects.json";

const Home = () => {
  const projects = projectData;

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
              github={project.github}
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
