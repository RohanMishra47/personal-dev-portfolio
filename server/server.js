// 🔼 Required Packages (Grouped Together)
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const sgMail = require("@sendgrid/mail");
const contactRoute = require('./routes/contact');

// 🌐 App Configuration
const app = express();
const PORT = process.env.PORT || 5000;

// 🧠 Middlewares
app.use(cors());
app.use(bodyParser.json());

// 📁 Constants and Configs
const DATA_FILE = './data/projects.json';
require('dotenv').config(); // Uncomment if using dotenv
const apiKey = process.env.sendgrid_key_portfolio_2025;
sgMail.setApiKey(apiKey);

// 🧭 Utility Functions
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// 🔌 Routes
app.use('/api', contactRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

const projectsFile = path.join(__dirname, "data", "projects.json");

app.post("/api/projects", (req, res) => {
  const { title, description, url } = req.body;

  if (!title || !description || !url) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newProject = {
    id: Date.now(), // unique ID
    title,
    description,
    url,
  };

  fs.readFile(projectsFile, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading file" });

    const projects = JSON.parse(data);
    projects.push(newProject);

    fs.writeFile(projectsFile, JSON.stringify(projects, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Error writing file" });
      res.status(201).json(newProject);
    });
  });
});

app.get("/api/projects", (req, res) => {

  fs.readFile(projectsFile, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading projects.json:", err);
      return res.status(500).json({ error: "Failed to read project data" });
    }

    try {
      const projects = JSON.parse(data);
      res.json(projects);
    } catch (parseErr) {
      console.error("Invalid JSON format in projects.json:", parseErr);
      res.status(500).json({ error: "Malformed JSON in project data" });
    }
  });
});

app.delete("/api/projects/:id", (req, res) => {
  const projectId = Number(req.params.id);

  fs.readFile(projectsFile, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read file" });

    const projects = JSON.parse(data);
    const updatedProjects = projects.filter((p) => p.id !== projectId);

    fs.writeFile(projectsFile, JSON.stringify(updatedProjects, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to write file" });
      res.json({ message: "Project deleted" });
    });
  });
});

app.put("/api/projects/:id", (req, res) => {
  const filePath = path.join(__dirname, "data", "projects.json");
  const projectId = Number(req.params.id);
  const { title, description, url } = req.body;

  // Add validation
  if (!title || !description || !url) {
    return res.status(400).json({ error: "All fields are required" });
  }

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read file" });

    let projects = JSON.parse(data);
    const index = projects.findIndex((p) => p.id === projectId);
    if (index === -1) return res.status(404).json({ error: "Project not found" });

    projects[index] = { ...projects[index], title, description, url };

    fs.writeFile(filePath, JSON.stringify(projects, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to write file" });
      res.json(projects[index]);
    });
  });
});

app.get('/api/about', (req, res) => {
  const filePath = path.join(__dirname, 'data/about.json');
  console.log("Reading from:", filePath);

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to load about data' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// 🚀 Server Bootup
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});