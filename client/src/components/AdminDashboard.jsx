import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, CheckCircle, Plus } from "lucide-react";
import AdminLogin from "./AdminLogin";
import ProjectForm from "./ProjectForm";
import "../assets/css/AdminDashboard.css";

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState([
    { id: 1, title: "E-commerce Platform", description: "Modern shopping experience with React and Node.js", url: "https://example.com/shop" },
    { id: 2, title: "Portfolio Website", description: "Personal portfolio showcasing creative work", url: "https://example.com/portfolio" },
    { id: 3, title: "Task Management App", description: "Collaborative project management tool", url: "https://example.com/tasks" }
  ]);
  const [editingProject, setEditingProject] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAddProject = (newProject) => {
    setProjects([...projects, { ...newProject, id: Date.now() }]);
    showToast("Project added successfully!");
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
    setEditingProject(null);
    showToast("Project updated successfully!");
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
    showToast("Project deleted successfully!");
  };

  const showToast = (message) => {
    setShowSuccessMessage(message);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return isLoggedIn ? (
    <div className="admin-dashboard-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-content"
      >
        <div className="dashboard-header">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="dashboard-title"
          >
            <div className="dashboard-icon">
              <Shield className="dashboard-icon-svg" />
            </div>
            Admin Dashboard
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="project-count"
          >
            <span className="count-text">Projects: {projects.length}</span>
          </motion.div>
        </div>

        <ProjectForm
          key={editingProject?.id || "new"}
          initialData={editingProject}
          onSubmit={(project) => {
            if (editingProject) {
              handleUpdateProject(project);
            } else {
              handleAddProject(project);
            }
            setEditingProject(null);
          }}
          onCancel={() => setEditingProject(null)}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="projects-container"
        >
          <h2 className="projects-title">
            <div className="projects-icon">
              <CheckCircle className="projects-icon-svg" />
            </div>
            Project Portfolio
          </h2>

          <div className="projects-grid">
            <AnimatePresence>
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="project-card"
                >
                  <div className="project-header">
                    <h3 className="project-name">
                      {project.title}
                    </h3>
                    <div className="project-actions">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setEditingProject(project)}
                        className="edit-button"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(project.id)}
                        className="delete-button"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>

                  <p className="project-description">
                    {project.description}
                  </p>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    style={{ position: "relative", zIndex: 10 }} // Fix hover unresponsiveness
                  >
                    View Project →
                  </a>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {projects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="empty-projects"
            >
              <div className="empty-icon">
                <Plus className="empty-icon-svg" />
              </div>
              <p className="empty-text">No projects yet. Add your first project above!</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="success-toast"
          >
            <CheckCircle size={20} />
            {showSuccessMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : (
    <AdminLogin onLogin={() => setIsLoggedIn(true)} />
  );
};

export default AdminDashboard;