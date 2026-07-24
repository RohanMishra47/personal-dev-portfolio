import "../assets/css/Home.css";
import About from "../components/About";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import projectData from "../data/projects.json";

const Home = () => {
  const featuredProjects = projectData.filter(
    (project) => project.status === "featured",
  );

  const otherProjects = projectData.filter(
    (project) => project.status === "other",
  );

  // Function to render project cards
  const renderProjects = (projects) =>
    projects.map((project, index) => (
      <ProjectCard
        key={getUniqueKey(project, index)}
        title={project.title || project.name}
        description={project.description}
        url={project.url || project.link || project.html_url}
        github={project.github}
      />
    ));

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
      <h1>Selected Projects</h1>

      <section className="projects-section">
        <h2>Featured Projects</h2>
        <p className="section-description">
          A selection of my strongest work in data analytics and software
          engineering.
        </p>

        <div className="projects-grid">{renderProjects(featuredProjects)}</div>
      </section>

      <section className="projects-section">
        <h2>Other Projects</h2>
        <p className="section-description">
          Additional projects showcasing my experience across web development
          and engineering.
        </p>

        <div className="projects-grid">{renderProjects(otherProjects)}</div>
      </section>
    </div>
  );
};

export default Home;
