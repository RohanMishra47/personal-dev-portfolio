import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaComment,
  FaEnvelope,
  FaPaperPlane,
  FaReplyAll,
  FaUser,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/ContactForm.css";
import Navbar from "./Navbar";

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
      setLoading(true);
      setSubmitted(false);

      // Prepare payload for Web3Forms
      const payload = {
        ...formData,
        access_key: import.meta.env.VITE_WEB3FORMS_KEY,
        from_name: formData.name,
        subject: "New Submission from Portfolio",
      };

      // Send data to Web3Forms
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(async (res) => {
          const data = await res.json();

          // Web3Forms returns success: true in the data object
          if (data.success) {
            setSubmitted(true);
            setFormData({ name: "", email: "", message: "" });
            toast.success("Message sent via Web3Forms!");
          } else {
            toast.error(data.message || "Failed to send message.");
          }
        })
        .catch((err) => {
          toast.error("Network error. Please try again.");
          console.error("Web3Forms error:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="contact-section">
      <div className="fixed top-4 right-4 z-50 bg-white border border-gray-200 rounded-xl shadow-lg">
        <Navbar />
      </div>
      {/* Intro Heading */}
      <div className="contact-intro">
        <h1>Let's Work Together</h1>
        <p>
          Have a project in mind or just want to chat? I'd love to hear from
          you. Drop me a message and I'll get back to you as soon as possible.
        </p>
      </div>

      {/* Form + Info Wrapper */}
      <div className="contact-wrapper">
        {/* Left Info Panel */}
        <div className="contact-info">
          <h3>Get In Touch</h3>
          <p>
            <FaEnvelope /> mydearluffy@gmail.com
          </p>
          <p>
            <FaUser /> +91 (700) 047-6533
          </p>
          <p>
            <FaComment /> Response Time: Usually within 24 hours
          </p>
          <p>
            <FaReplyAll /> Response Rate: 100%
          </p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="contact-form"
        >
          {/* Progress Bar */}
          <label>Form Progress</label>
          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${Math.round(
                  (Object.values(formData).filter((v) => v.trim() !== "")
                    .length /
                    3) *
                    100
                )}%`,
              }}
            >
              {Math.round(
                (Object.values(formData).filter((v) => v.trim() !== "").length /
                  3) *
                  100
              )}
              %
            </div>
          </div>

          {/* Name */}
          <div className="input-group">
            <label>Your Name</label>
            <div className="input-with-icon">
              <FaUser />
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          {/* Message */}
          <div className="input-group">
            <label>Your Message</label>
            <div className="input-with-icon">
              <FaComment />
              <textarea
                name="message"
                placeholder="Tell me about your project, ideas, or just say hello..."
                maxLength={500}
                value={formData.message}
                onChange={handleChange}
              />
              <small>{formData.message.length}/500</small>
            </div>
            {errors.message && <p className="error">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`bg-gradient-to-br from-[#00c6ff] to-[#0072ff] 
              hover:from-[#00aaff] hover:to-[#0055cc] 
              disabled:bg-[#888] disabled:cursor-not-allowed disabled:opacity-70 
              text-white px-[1.4rem] py-[0.9rem] rounded-[12px] 
              text-base font-bold transition-all duration-300 ease-in-out 
              flex items-center justify-center gap-2 w-full`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-[18px] h-[18px] border-[3px] border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </div>
            ) : (
              <>
                <FaPaperPlane className="mr-2" /> Send Message
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
      {/* Trust Indicators */}
      <div className="trust-indicators">
        <hr />
        <div className="trust-items">
          <div>
            <span className="dot green"></span> Secure
          </div>
          <div>
            <span className="dot blue"></span> Private
          </div>
          <div>
            <span className="dot pink"></span> No Spam
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default ContactForm;
