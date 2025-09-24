import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaAddressBook,
  FaFileDownload,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../assets/css/About.css";
import apiURL from "../utils/api";

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch(`${apiURL}/api/about`)
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!aboutData)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );

  // Extract skills from description or define them
  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Backend Development",
    "Problem Solving",
    "Quick Learning",
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
              src={aboutData.image}
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
          <h2 className="name-gradient">{aboutData.name}</h2>
          <h4 className="role-text">{aboutData.role}</h4>
          <p className="description-text">{aboutData.description}</p>

          {/* Skills Section */}
          <motion.div
            className="skills-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="skills-title">Core Technologies</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="skill-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            {aboutData.socials?.github && (
              <a
                href={aboutData.socials.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <FaGithub /> GitHub
              </a>
            )}
            {aboutData.socials?.linkedin && (
              <a
                href={aboutData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                <FaLinkedin /> LinkedIn
              </a>
            )}
            {aboutData.resume && (
              <a href={aboutData.resume} download className="btn btn-secondary">
                <FaFileDownload /> Resume
              </a>
            )}
            {aboutData.contact && aboutData.contact[0] && (
              <Link
                to={aboutData.contact[0].url}
                className="btn btn-primary contact-link"
              >
                <FaAddressBook /> {aboutData.contact[0].label}
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
