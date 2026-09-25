import { Analytics } from "@vercel/analytics/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import Home from "./pages/Home";
import OlistCaseStudy from "./pages/OlistCaseStudy";
import OttCaseStudy from "./pages/OttCaseStudy";
import VortexPage from "./pages/VortexPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/projects/olist-ecommerce" element={<OlistCaseStudy />} />
        <Route path="/projects/ott-streaming" element={<OttCaseStudy />} />
        <Route path="/projects/vortex" element={<VortexPage />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
