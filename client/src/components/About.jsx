import { motion } from "framer-motion";
import {
  FaAddressBook,
  FaFileDownload,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../assets/css/About.css";
import aboutData from "../data/about.json";

const About = () => {
  const aboutInfo = aboutData;

  if (!aboutInfo)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );

  const skillCategories = [
    {
      title: "Frontend",
      items: ["React", "Next.js", "TypeScript"],
    },
    {
      title: "Backend & DB",
      items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Prisma"],
    },
    {
      title: "DevOps & Tools",
      items: ["Docker", "Git", "Vercel", "Cloudflare"],
    },
  ];

  return (
    <motion.div
      className="about-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Decorative elements */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      <div className="decorative-circle circle-3"></div>

      <div className="content-wrapper">
        <motion.div
          className="profile-section"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="profile-image-wrapper">
            <img
              src={aboutInfo.image}
              alt="Profile"
              className="profile-image"
            />
            <div className="profile-ring"></div>
          </div>
        </motion.div>

        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="name-gradient">{aboutInfo.name}</h2>
          <h4 className="role-text">{aboutInfo.role}</h4>
          <p className="description-text">{aboutInfo.description}</p>

          {/* Skills Section */}
          <motion.div
            className="skills-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="skills-title">Technical Expertise</h3>
            <div className="categories-grid">
              {skillCategories.map((category, catIndex) => (
                <div key={category.title} className="skill-category">
                  <h4 className="category-subtitle">{category.title}</h4>
                  <div className="skills-grid">
                    {category.items.map((skill, index) => (
                      <motion.span
                        key={skill}
                        className="skill-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.8 + catIndex * 0.2 + index * 0.1,
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            {aboutInfo.socials?.github && (
              <a
                href={aboutInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <FaGithub /> GitHub
              </a>
            )}
            {aboutInfo.socials?.linkedin && (
              <a
                href={aboutInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                <FaLinkedin /> LinkedIn
              </a>
            )}
            {aboutInfo.resume && (
              <a href={aboutInfo.resume} download className="btn btn-secondary">
                <FaFileDownload /> Resume
              </a>
            )}
            {aboutInfo.contact && aboutInfo.contact[0] && (
              <Link
                to={aboutInfo.contact[0].url}
                className="btn btn-primary contact-link"
              >
                <FaAddressBook /> {aboutInfo.contact[0].label}
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
