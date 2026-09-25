import About from "../components/About";
import CaseStudyCard from "../components/CaseStudyCard";
import EngineeringCard from "../components/EngineeringCard";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import OtherProjectCard from "../components/OtherProjectCard";
import content from "../data/projectsContent.json";

const SectionTitle = ({ children, subtitle }) => (
  <div className="mb-8">
    <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ink leading-tight">
      {children}
    </h2>

    {subtitle && (
      <p className="font-mono text-sm text-graphite mt-2">{subtitle}</p>
    )}
  </div>
);

const Home = () => {
  const { hero, dataAnalyticsCaseStudies, engineeringProject, otherProjects } =
    content;

  return (
    <div className="bg-paper min-h-screen">
      <div className="fixed top-4 right-4 z-50 bg-paper/95 backdrop-blur-sm border border-hairline rounded-xl shadow-sm">
        <Navbar />
      </div>

      <Hero headline={hero.headline} subhead={hero.subhead} />

      <About />

      <section
        id="projects"
        className="max-w-4xl mx-auto px-6 py-16 scroll-mt-28"
      >
        <SectionTitle subtitle="Data analytics case studies">
          Selected Work
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-6">
          {dataAnalyticsCaseStudies.map((project) => (
            <CaseStudyCard key={project.id} {...project} />
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <SectionTitle>Featured engineering project</SectionTitle>
        <div className="max-w-xl">
          <EngineeringCard {...engineeringProject} />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <SectionTitle>Other projects</SectionTitle>
        <div>
          {otherProjects.map((project) => (
            <OtherProjectCard key={project.id} {...project} />
          ))}
        </div>
      </section>

      <footer className="max-w-4xl mx-auto px-6 py-16 border-t border-hairline text-center">
        <a
          href="/contact"
          className="font-mono text-sm text-pine border-b border-pine-light pb-px hover:text-pine-dark"
        >
          get in touch
        </a>
      </footer>
    </div>
  );
};

export default Home;
