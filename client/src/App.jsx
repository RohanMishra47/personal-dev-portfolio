import { Analytics } from "@vercel/analytics/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./assets/css/App.css";
import ContactForm from "./components/ContactForm";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
