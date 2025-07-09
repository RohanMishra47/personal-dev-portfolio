import React, { useState } from "react";
import apiURL from "../utils/api";

const ProjectForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiURL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        onAdd(data); // update UI
        setFormData({ title: "", description: "", link: "" });
      } else {
        alert("Failed to add project");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Project Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="link"
        placeholder="Project Link"
        value={formData.link}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Project</button>
    </form>
  );
};

export default ProjectForm;