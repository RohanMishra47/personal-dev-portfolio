// 🔼 Required Packages (Grouped Together)
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const rateLimit = require("express-rate-limit");
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

app.get('/api/projects', async (req, res) => {
  try {
    // Fetch GitHub repos
    const reposResponse = await fetch('https://api.github.com/users/RohanMishra47/repos', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      }
    });

    if (!reposResponse.ok) {
      const errMsg = await reposResponse.text();
      console.error('GitHub API error:', reposResponse.status, errMsg);
      return res.status(502).json({ error: 'Failed to fetch GitHub repositories' });
    }

    console.log('Remaining GitHub requests:', reposResponse.headers.get('x-ratelimit-remaining'))

    const allRepos = await reposResponse.json();

    if (!Array.isArray(allRepos)) {
      console.error('Unexpected GitHub API format:', allRepos);
      return res.status(500).json({ error: 'Invalid GitHub data structure' });
    }

    // Read featured projects from file using safe absolute path
    const filePath = path.join(__dirname, 'featured-projects.json');
    const featuredRaw = await fs.promises.readFile(filePath, 'utf-8');
    const featuredList = JSON.parse(featuredRaw);

    console.log('Featured projects:', featuredList);

    const filtered = allRepos.filter(repo =>
      featuredList.includes(repo.name)
    );

    const simplified = filtered.map(repo => ({
      id: repo.id,
      title: repo.name,
      description: repo.description,
      url: repo.html_url
    }));

    res.json(simplified);
  } catch (err) {
    console.error('🔥 /api/projects failed:', err);
    res.status(500).json({ message: 'Failed to load projects' });
  }
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