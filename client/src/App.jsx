import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import Home from "./pages/Home";
import ContactForm from "./components/ContactForm";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminBlog from "./components/AdminBlog";
import "./assets/css/App.css";
import ProtectedLanding from "./components/ProtectedLanding";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/admin" element={<ProtectedLanding />} />
        <Route path="/admin/project" element={<AdminDashboard />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
      </Routes>
    </Router>
  );
}

export default App;