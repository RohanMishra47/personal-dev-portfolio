// eslint-disable-next-line no-unused-vars
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
import Navbar from "./Navbar";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

      const payload = {
        ...formData,
        access_key: import.meta.env.VITE_WEB3FORMS_KEY,
        from_name: formData.name,
        subject: "New Submission from Portfolio",
      };

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
          if (data.success) {
            setFormData({ name: "", email: "", message: "" });
            toast.success("Message sent — I'll get back to you soon.");
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

  const progress = Math.round(
    (Object.values(formData).filter((v) => v.trim() !== "").length / 3) * 100,
  );

  return (
    <div className="bg-paper min-h-screen">
      <div className="fixed top-4 right-4 z-50 bg-paper/95 backdrop-blur-sm border border-hairline rounded-xl shadow-sm">
        <Navbar />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-4">
            Let's work together
          </h1>
          <p className="font-serif text-lg text-graphite max-w-prose mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from
            you. Drop me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-10 border border-hairline rounded-md p-8">
          {/* Info panel */}
          <div className="space-y-4">
            <h3 className="font-mono text-sm text-graphite border-b border-hairline pb-3 mb-4">
              Get in touch
            </h3>
            <p className="flex items-center gap-3 text-sm text-ink/90">
              <FaEnvelope className="text-pine flex-shrink-0" />
              rohan.mishra.analytics@gmail.com
            </p>
            <p className="flex items-center gap-3 text-sm text-ink/90">
              <FaUser className="text-pine flex-shrink-0" />
              +91 (700) 047-6533
            </p>
            <p className="flex items-center gap-3 text-sm text-ink/90">
              <FaComment className="text-pine flex-shrink-0" />
              Response time: usually within 24 hours
            </p>
            <p className="flex items-center gap-3 text-sm text-ink/90">
              <FaReplyAll className="text-pine flex-shrink-0" />
              Response rate: 100%
            </p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <label className="font-mono text-xs text-graphite block mb-2">
              Form progress
            </label>
            <div className="w-full h-2 bg-hairline rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-pine transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mb-5">
              <label className="text-sm font-medium text-ink block mb-1.5">
                Your name
              </label>
              <div className="flex items-center gap-3 border border-hairline rounded-md px-4 py-3 focus-within:border-pine">
                <FaUser className="text-graphite flex-shrink-0" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="flex-1 bg-transparent outline-none text-ink text-sm"
                />
              </div>
              {errors.name && (
                <p className="text-brick text-sm mt-1.5">{errors.name}</p>
              )}
            </div>

            <div className="mb-5">
              <label className="text-sm font-medium text-ink block mb-1.5">
                Email address
              </label>
              <div className="flex items-center gap-3 border border-hairline rounded-md px-4 py-3 focus-within:border-pine">
                <FaEnvelope className="text-graphite flex-shrink-0" />
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 bg-transparent outline-none text-ink text-sm"
                />
              </div>
              {errors.email && (
                <p className="text-brick text-sm mt-1.5">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-ink block mb-1.5">
                Your message
              </label>
              <div className="flex items-start gap-3 border border-hairline rounded-md px-4 py-3 focus-within:border-pine relative">
                <FaComment className="text-graphite flex-shrink-0 mt-1" />
                <textarea
                  name="message"
                  placeholder="Tell me about your project, ideas, or just say hello..."
                  maxLength={500}
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="flex-1 bg-transparent outline-none text-ink text-sm resize-none"
                />
              </div>
              <small className="text-xs text-graphite block text-right mt-1">
                {formData.message.length}/500
              </small>
              {errors.message && (
                <p className="text-brick text-sm mt-1.5">{errors.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-pine hover:bg-pine-dark disabled:bg-graphite disabled:cursor-not-allowed text-paper px-6 py-3.5 rounded-md font-mono text-sm transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-paper border-t-transparent rounded-full animate-spin" />
                  sending...
                </>
              ) : (
                <>
                  <FaPaperPlane /> send message
                </>
              )}
            </motion.button>

            <div className="flex items-start gap-3 mt-5 p-4 rounded-md bg-pine/5 border border-hairline">
              <FaEnvelope className="text-pine flex-shrink-0 mt-0.5" />
              <span className="text-sm text-ink/80 leading-relaxed">
                Message not going through? Email me directly at{" "}
                <a
                  href="mailto:rohan.mishra.analytics@gmail.com"
                  className="text-pine underline"
                >
                  rohan.mishra.analytics@gmail.com
                </a>
              </span>
            </div>
          </motion.form>
        </div>

        <div className="mt-10 pt-8 border-t border-hairline flex justify-center gap-8 font-mono text-xs text-graphite">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pine inline-block" />
            Secure
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-graphite inline-block" />
            Private
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brick inline-block" />
            No spam
          </span>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default ContactForm;
