import React, { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import ProjectForm from "./ProjectForm";
import apiURL from "../utils/api";

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${apiURL}/api/projects`)
      .then((res) => res.json())
      .then(setProjects);
  }, []);

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  return isLoggedIn ? (
    <div>
      <h2>Admin Dashboard</h2>
      <ProjectForm onAdd={handleAddProject} />
      <ul>
        {projects.map((proj) => (
          <li key={proj.id}>
            <strong>{proj.title}</strong> — {proj.description}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <AdminLogin onLogin={() => setIsLoggedIn(true)} />
  );
};

export default AdminDashboard;