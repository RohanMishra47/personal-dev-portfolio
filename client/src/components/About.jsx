import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";
import "../assets/css/About.css";

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/about')
      .then(res => res.json())
      .then(data => setAboutData(data))
      .catch(err => console.error(err));
  }, []);

  if (!aboutData) return <p>Loading...</p>;

  return (
    <div className="about-container">
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
        </div>
      </div>
    </div>
  );
};

export default About;