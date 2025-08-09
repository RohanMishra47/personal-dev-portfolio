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
    } else {
      // Reset form when not in edit mode
      setFormData({
        title: "",
        description: "",
        url: "",
        id: null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.url.trim()
    ) {
      alert("Please fill in all fields");
      return;
    }

    // URL validation
    try {
      new URL(formData.url);
    } catch {
      alert("Please enter a valid URL");
      return;
    }

    setIsLoading(true);

    try {
      await onSubmit({
        ...formData,
        id: formData.id || Date.now(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        url: formData.url.trim(),
      });

      // Reset form only if not in edit mode
      if (!isEditMode) {
        setFormData({ title: "", description: "", url: "", id: null });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    // Reset form when canceling
    setFormData({ title: "", description: "", url: "", id: null });
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

      <form onSubmit={handleSubmit} className="form-content">
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
              disabled={isLoading}
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
              disabled={isLoading}
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
            disabled={isLoading}
            required
          />
        </motion.div>

        <div className="form-actions">
          <motion.button
            type="submit"
            whileHover={!isLoading ? { scale: 1.05 } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="form-spinner"
                />
                {isEditMode ? "Updating..." : "Adding..."}
              </>
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
              onClick={handleCancel}
              disabled={isLoading}
              className="cancel-button"
            >
              <X size={18} />
              Cancel
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default ProjectForm;
