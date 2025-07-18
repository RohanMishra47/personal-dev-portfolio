import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaComment, FaPaperPlane, FaReplyAll } from "react-icons/fa";
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

  const totalFields = 3;
  const filledFields = Object.values(formData).filter((v) => v.trim() !== "").length;
  const progress = Math.round((filledFields / totalFields) * 100);

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

      fetch(`${apiURL}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then(async (res) => {
          const data = await res.json();
          console.log("Status:", res.status, "| res.ok:", res.ok, "| Data:", data);

          if (res.status === 429) {
            alert("Rate limit exceeded");
          }

          if (res.ok && data.success) {
            setTimeout(() => {
              setSubmitted(true);
              setFormData({ name: "", email: "", message: "" });
            }, 800);
            toast.success("Message sent successfully!");
          } else {
            alert("Failed to send email.");
          }
        })
        .catch((err) => {
          toast.error("Failed to send email. Try again.");
          console.error("Email send error:", err);
          alert("An error occurred while sending the email.");
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 800);
        });
    }
  };

  return (
    <div className="contact-section">
      {/* Intro Heading */}
      <div className="contact-intro">
        <h1>Let's Work Together</h1>
        <p>
          Have a project in mind or just want to chat? I'd love to hear from you.
          Drop me a message and I'll get back to you as soon as possible.
        </p>
      </div>

      {/* Form + Info Wrapper */}
      <div className="contact-wrapper">
        {/* Left Info Panel */}
        <div className="contact-info">
          <h3>Get In Touch</h3>
          <p><FaEnvelope /> mydearluffy@gmail.com</p>
          <p><FaUser /> +91 (700) 047-6533</p>
          <p><FaComment /> Response Time: Usually within 24 hours</p>
          <p><FaReplyAll /> Response Rate: 100%</p>
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
                  (Object.values(formData).filter((v) => v.trim() !== "").length / 3) * 100
                )}%`
              }}
            >
              {Math.round(
                (Object.values(formData).filter((v) => v.trim() !== "").length / 3) * 100
              )}%
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
          <div><span className="dot green"></span> Secure</div>
          <div><span className="dot blue"></span> Private</div>
          <div><span className="dot pink"></span> No Spam</div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default ContactForm;