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
// require('dotenv').config(); // Uncomment if using dotenv
// const apiKey = process.env.sendgrid_key_portfolio_2025;
// sgMail.setApiKey(apiKey);

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
    const [reposResponse, featuredRaw] = await Promise.all([
      fetch('https://api.github.com/users/RohanMishra47/repos', {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      }),
      fs.promises.readFile('./featured-projects.json', 'utf-8')
    ]);

    const allRepos = await reposResponse.json();
    const featuredList = JSON.parse(featuredRaw);

    console.log('--- GitHub Repos ---');
    allRepos.forEach(r => console.log(r.name));

    console.log('--- Featured Projects ---');
    console.log(featuredList);

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
    console.error('Error fetching projects:', err);
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