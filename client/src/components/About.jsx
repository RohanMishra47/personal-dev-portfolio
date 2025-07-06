import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";
import "../assets/css/About.css";
import apiURL from '../utils/api';

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch(`${apiURL}/api/about`)
      .then(res => res.json())
      .then(data => setAboutData(data))
      .catch(err => console.error(err));
  }, []);

  if (!aboutData) return <p>Loading...</p>;

  return (
    <motion.div
      className="about-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}>
      <img src={aboutData.image} alt="Profile" className="profile-image" />
      <div className="about-text">
        <h2>{aboutData.name}</h2>
        <h4>{aboutData.role}</h4>
        <p>{aboutData.description}</p>

        <div className="about-buttons">
          {aboutData.socials?.github && (
            <a href={aboutData.socials.github} target="_blank" rel="noreferrer">
              <FaGithub /> GitHub
            </a>
          )}
          {aboutData.socials?.linkedin && (
            <a href={aboutData.socials.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
          )}
          {aboutData.resume && (
            <a href={aboutData.resume} download>
              <FaFileDownload /> Resume
            </a>
          )}
          {aboutData.contact && aboutData.contact[0] && (
            <Link to={aboutData.contact[0].url} className="contact-link">
              {aboutData.contact[0].label}
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default About;