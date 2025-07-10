import React, { useState, useEffect } from "react";
import apiURL from "../utils/api";

const ProjectForm = ({ onSubmit, initialData, onCancel }) => {
  const isEditMode = !!initialData?.id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    id: null,
  });

  useEffect(() => {
    // Sync form state with initialData when editing
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        url: initialData.url || "",
        id: initialData.id || null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEditMode ? "PUT" : "POST";
    const endpoint = isEditMode
      ? `${apiURL}/api/projects/${formData.id}`
      : `${apiURL}/api/projects`;

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if response is ok before parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        alert(`Failed to ${isEditMode ? 'update' : 'add'} project: ${response.status}`);
        return;
      }

      const data = await response.json();
      onSubmit(data);
      // Reset form
      setFormData({ title: "", description: "", url: "", id: null });
    } catch (error) {
      console.error("Error:", error);
      alert("Network error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <h3>{isEditMode ? "Edit Project" : "Add New Project"}</h3>
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
        name="url"
        placeholder="Project Link"
        value={formData.url}
        onChange={handleChange}
        required
      />
      <button type="submit">{isEditMode ? "Update Project" : "Add Project"}</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ProjectForm;