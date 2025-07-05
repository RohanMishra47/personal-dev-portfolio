import React, { useState } from "react";
import { FaUser, FaEnvelope, FaComment, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import "../assets/css/ContactForm.css";
import apiURL from "../utils/api";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Setting loading to true"); // Debug log
      setLoading(true);
      setSubmitted(false);

      fetch(`${apiURL}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then(async (res) => {
          const data = await res.json();
          console.log("Status:", res.status, "| res.ok:", res.ok, "| Data:", data);

          if (res.ok && data.success) {
            setTimeout(() => {
              setSubmitted(true);
              setFormData({ name: "", email: "", message: "" });
            }, 1000); // Increased delay to 1 second
          } else {
            alert("Failed to send email.");
          }
        })
        .catch((err) => {
          console.error("Email send error:", err);
          alert("An error occurred while sending the email.");
        })
        .finally(() => {
          setTimeout(() => {
            console.log("Setting loading to false"); // Debug log
            setLoading(false);
          }, 1000);
        });
    }
  };

  // Debug: Log loading state
  console.log("Current loading state:", loading);

  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      {submitted && <p className="success-msg">Message sent successfully!</p>}
      <motion.form
        onSubmit={handleSubmit}
        noValidate
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="input-group">
          <FaComment className="input-icon" />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <p className="error">{errors.message}</p>}
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#999" : "#0077cc",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? (
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px",
              justifyContent: "center",
              width: "100%"
            }}>
              <div 
                className="spinner"
                style={{
                  width: "20px",
                  height: "20px",
                  border: "3px solid #f3f3f3",
                  borderTop: "3px solid #0077cc",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }}
              />
              <span>Sending...</span>
            </div>
          ) : (
            <>
              <FaPaperPlane style={{ marginRight: "8px" }} /> Send Message
            </>
          )}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default ContactForm;