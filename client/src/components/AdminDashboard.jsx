// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Edit2, Home, Plus, Shield, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "../assets/css/AdminDashboard.css";
import apiURL from "../utils/api.js";
import ProjectForm from "./ProjectForm";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${apiURL}/api/projects`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        showToast("Error loading projects", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleEditClick = (project) => {
    setEditingProject(project);
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 10);
  };

  const handleAddProject = async (newProject) => {
    try {
      const response = await fetch(`${apiURL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        const createdProject = await response.json();
        setProjects((prev) => [...prev, createdProject]);
        showToast("Project added successfully!");
      } else {
        throw new Error("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      showToast("Error adding project", "error");
    }
  };

  const handleUpdateProject = async (updatedProject) => {
    try {
      const response = await fetch(
        `${apiURL}/api/projects/${updatedProject.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProject),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setProjects((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
        setEditingProject(null);
        showToast("Project updated successfully!");
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      showToast("Error updating project", "error");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`${apiURL}/api/projects/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setProjects((prev) => prev.filter((p) => p.id !== id));
          showToast("Project deleted successfully!");
        } else {
          throw new Error("Failed to delete project");
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        showToast("Error deleting project", "error");
      }
    }
  };

  const showToast = (message, type = "success") => {
    setShowSuccessMessage({ message, type });
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="admin-dashboard-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="dashboard-content"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <div className="loading-spinner">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{
                width: "40px",
                height: "40px",
                border: "4px solid #f3f4f6",
                borderTop: "4px solid #3b82f6",
                borderRadius: "50%",
              }}
            />
            <p style={{ marginTop: "16px", color: "#6b7280" }}>
              Loading projects...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
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

          <div className="header-actions">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="project-count"
            >
              <span className="count-text">Projects: {projects.length}</span>
            </motion.div>

            <motion.a
              aria-label="Return to public homepage"
              role="button"
              href="/"
              className="home-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={18} />
              <span>Home</span>
            </motion.a>
          </div>
        </div>

        <div ref={formRef} className={editingProject ? "editing-form" : ""}>
          <ProjectForm
            key={editingProject?.id || "new"}
            initialData={editingProject}
            onSubmit={(project) => {
              if (editingProject) {
                handleUpdateProject(project);
              } else {
                handleAddProject(project);
              }
            }}
            onCancel={() => setEditingProject(null)}
          />
        </div>

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
                    <h3 className="project-name">{project.title}</h3>
                    <div className="project-actions">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditClick(project)}
                        className="edit-button"
                        aria-label="Edit project"
                      >
                        <Edit2 size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(project.id)}
                        className="delete-button"
                        aria-label="Delete project"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </div>

                  <p className="project-description">{project.description}</p>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    style={{ position: "relative", zIndex: 10 }}
                  >
                    View Project →
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {projects.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="empty-projects"
            >
              <div className="empty-icon">
                <Plus className="empty-icon-svg" />
              </div>
              <p className="empty-text">
                No projects yet. Add your first project above!
              </p>
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
            className={`success-toast ${
              showSuccessMessage.type === "error" ? "error-toast" : ""
            }`}
          >
            <CheckCircle size={20} />
            {showSuccessMessage.message || showSuccessMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
