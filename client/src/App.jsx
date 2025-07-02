import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ContactForm from "./components/ContactForm";
import "./assets/css/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
    </Router>
  );
}

export default App;