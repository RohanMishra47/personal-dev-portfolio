// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Edit3, Plus, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import "../assets/css/ProjectForm.css";

const ProjectForm = ({ onSubmit, initialData, onCancel }) => {
  const isEditMode = !!initialData?.id;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    id: null,
  });

  useEffect(() => {
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
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    onSubmit({ ...formData, id: formData.id || Date.now() });
    if (!isEditMode) {
      setFormData({ title: "", description: "", url: "", id: null });
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="project-form-container"
    >
      <div className="form-header">
        <div className={`form-icon ${isEditMode ? "edit-icon" : "add-icon"}`}>
          {isEditMode ? <Edit3 className="icon" /> : <Plus className="icon" />}
        </div>
        <h3 className="form-title">
          {isEditMode ? "Edit Project" : "Add New Project"}
        </h3>
      </div>

      <div className="form-content">
        <div className="form-grid">
          <motion.div whileFocus={{ scale: 1.02 }} className="form-group">
            <label className="form-label">Project Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter project title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }} className="form-group">
            <label className="form-label">Project URL</label>
            <input
              type="url"
              name="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={handleChange}
              className="form-input"
              required
            />
          </motion.div>
        </div>

        <motion.div whileFocus={{ scale: 1.02 }} className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            placeholder="Describe your project..."
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="form-textarea"
            required
          />
        </motion.div>

        <div className="form-actions">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="form-spinner"
              />
            ) : (
              <>
                <Save size={18} />
                {isEditMode ? "Update Project" : "Add Project"}
              </>
            )}
          </motion.button>

          {onCancel && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onCancel}
              className="cancel-button"
            >
              <X size={18} />
              Cancel
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectForm;
