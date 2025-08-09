// 🔼 Required Packages (Grouped Together)
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const sgMail = require("@sendgrid/mail");
const contactRoute = require("./routes/contact");

// 🌐 App Configuration
const app = express();
const PORT = process.env.PORT || 5000;

// 🧠 Middlewares
app.use(cors());
app.use(bodyParser.json());

// 📁 Constants and Configs
const DATA_FILE = "./data/projects.json";
require("dotenv").config();
const apiKey = process.env.sendgrid_key_portfolio_2025;
if (apiKey) {
  sgMail.setApiKey(apiKey);
}

// Debug startup info
console.log("=== SERVER STARTUP INFO ===");
console.log("Current working directory:", process.cwd());
console.log("__dirname:", __dirname);
console.log("NODE_ENV:", process.env.NODE_ENV || "development");
console.log("===============================");

// 🧭 Utility Functions
const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE));
  } catch (error) {
    console.error("Error reading data file:", error);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing data file:", error);
    return false;
  }
};

// 🔌 Routes
app.use("/api", contactRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

// Debug endpoint (remove in production)
if (process.env.NODE_ENV !== "production") {
  app.get("/api/debug/blog-file", (req, res) => {
    const blogFilePath = path.join(__dirname, "data", "blog.json");

    try {
      console.log("=== DEBUG BLOG FILE ===");
      console.log("Blog file path:", blogFilePath);
      console.log("File exists:", fs.existsSync(blogFilePath));

      if (!fs.existsSync(blogFilePath)) {
        return res.json({
          error: "Blog file doesn't exist",
          path: blogFilePath,
          cwd: process.cwd(),
          dirname: __dirname,
        });
      }

      const data = fs.readFileSync(blogFilePath, "utf-8");
      const posts = JSON.parse(data);

      res.json({
        success: true,
        path: blogFilePath,
        fileSize: data.length,
        postsCount: posts.length,
        posts: posts,
      });
    } catch (error) {
      res.status(500).json({
        error: "Debug endpoint failed",
        message: error.message,
      });
    }
  });
}

const projectsFile = path.join(__dirname, "data", "projects.json");
const blogFilePath = path.join(__dirname, "data", "blog.json");

// Ensure data directory and files exist
const ensureDataFiles = () => {
  const dataDir = path.join(__dirname, "data");

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(projectsFile)) {
    fs.writeFileSync(projectsFile, JSON.stringify([], null, 2));
  }

  if (!fs.existsSync(blogFilePath)) {
    fs.writeFileSync(blogFilePath, JSON.stringify([], null, 2));
  }
};

// Initialize data files
try {
  ensureDataFiles();
  console.log("✅ Data files initialized");
} catch (error) {
  console.error("❌ Failed to initialize data files:", error);
}

// Projects endpoints
app.post("/api/projects", (req, res) => {
  try {
    const { title, description, url } = req.body;

    if (!title || !description || !url) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProject = {
      id: Date.now(),
      title,
      description,
      url,
    };

    const data = fs.readFileSync(projectsFile, "utf-8");
    const projects = JSON.parse(data);
    projects.push(newProject);

    fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2));
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

app.get("/api/projects", (req, res) => {
  try {
    const data = fs.readFileSync(projectsFile, "utf-8");
    const projects = JSON.parse(data);
    res.json(projects);
  } catch (error) {
    console.error("Error reading projects:", error);
    res.status(500).json({ error: "Failed to read projects" });
  }
});

app.delete("/api/projects/:id", (req, res) => {
  try {
    const projectId = Number(req.params.id);
    const data = fs.readFileSync(projectsFile, "utf-8");
    const projects = JSON.parse(data);
    const updatedProjects = projects.filter((p) => p.id !== projectId);

    fs.writeFileSync(projectsFile, JSON.stringify(updatedProjects, null, 2));
    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

app.put("/api/projects/:id", (req, res) => {
  try {
    const projectId = Number(req.params.id);
    const { title, description, url } = req.body;

    if (!title || !description || !url) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const data = fs.readFileSync(projectsFile, "utf-8");
    let projects = JSON.parse(data);
    const index = projects.findIndex((p) => p.id === projectId);

    if (index === -1) {
      return res.status(404).json({ error: "Project not found" });
    }

    projects[index] = { ...projects[index], title, description, url };
    fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2));
    res.json(projects[index]);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
});

// Blog endpoints
app.get("/api/blog", (req, res) => {
  try {
    console.log("=== GET /api/blog called ===");
    const data = fs.readFileSync(blogFilePath, "utf-8");
    const posts = JSON.parse(data);
    console.log("Number of posts:", posts.length);
    res.json(posts);
  } catch (error) {
    console.error("Error reading blog:", error);
    res.status(500).json({ error: "Failed to read blog posts" });
  }
});

app.get("/api/blog/:slug", (req, res) => {
  try {
    const data = fs.readFileSync(blogFilePath, "utf-8");
    const posts = JSON.parse(data);
    const post = posts.find((p) => p.slug === req.params.slug);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error reading blog post:", error);
    res.status(500).json({ error: "Failed to read blog post" });
  }
});

app.patch("/api/blog/:slug/view", (req, res) => {
  try {
    const slug = req.params.slug;
    const data = fs.readFileSync(blogFilePath, "utf-8");
    const posts = JSON.parse(data);
    const postIndex = posts.findIndex((p) => p.slug === slug);

    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" });
    }

    posts[postIndex].views = (posts[postIndex].views || 0) + 1;
    fs.writeFileSync(blogFilePath, JSON.stringify(posts, null, 2));

    res.json({
      message: "View count updated",
      views: posts[postIndex].views,
    });
  } catch (error) {
    console.error("Error updating view count:", error);
    res.status(500).json({ error: "Failed to update view count" });
  }
});

app.post("/api/blog", (req, res) => {
  try {
    console.log("=== POST /api/blog called ===");
    console.log("Request body:", req.body);

    const { title, content, date, tags, featured } = req.body;

    if (!title || !content || !date) {
      return res
        .status(400)
        .json({ error: "Title, content, and date are required" });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    let featuredValue = false;
    if (typeof featured === "boolean") {
      featuredValue = featured;
    } else if (typeof featured === "string") {
      featuredValue = featured === "true";
    }

    const newPost = {
      id: Date.now(),
      title,
      content,
      date,
      tags: tags || [],
      featured: featuredValue,
      views: 0,
      slug,
    };

    const data = fs.readFileSync(blogFilePath, "utf-8");
    const blogPosts = JSON.parse(data);
    blogPosts.push(newPost);

    fs.writeFileSync(blogFilePath, JSON.stringify(blogPosts, null, 2));
    console.log("✅ Blog post created successfully!");

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Failed to create blog post" });
  }
});

app.put("/api/blog/:id", (req, res) => {
  try {
    console.log("=== PUT /api/blog called ===");

    const { title, content, date, tags, featured } = req.body;
    const postId = Number(req.params.id);

    if (!title || !content || !date) {
      return res
        .status(400)
        .json({ error: "Title, content, and date are required" });
    }

    const data = fs.readFileSync(blogFilePath, "utf-8");
    const blogPosts = JSON.parse(data);
    const index = blogPosts.findIndex((p) => p.id === postId);

    if (index === -1) {
      return res.status(404).json({ error: "Post not found" });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    let featuredValue = false;
    if (typeof featured === "boolean") {
      featuredValue = featured;
    } else if (typeof featured === "string") {
      featuredValue = featured === "true";
    }

    blogPosts[index] = {
      ...blogPosts[index],
      title,
      content,
      date,
      tags: tags || [],
      slug,
      featured: featuredValue,
    };

    fs.writeFileSync(blogFilePath, JSON.stringify(blogPosts, null, 2));
    console.log("✅ Blog post updated successfully!");

    res.json(blogPosts[index]);
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: "Failed to update blog post" });
  }
});

app.delete("/api/blog/:id", (req, res) => {
  try {
    console.log("=== DELETE /api/blog called ===");

    const postId = Number(req.params.id);
    const data = fs.readFileSync(blogFilePath, "utf-8");
    let blogPosts = JSON.parse(data);

    const initialLength = blogPosts.length;
    blogPosts = blogPosts.filter((p) => p.id !== postId);

    if (blogPosts.length === initialLength) {
      return res.status(404).json({ error: "Post not found" });
    }

    fs.writeFileSync(blogFilePath, JSON.stringify(blogPosts, null, 2));
    console.log("✅ Blog post deleted successfully!");

    res.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Failed to delete blog post" });
  }
});

// About endpoint
app.get("/api/about", (req, res) => {
  try {
    const filePath = path.join(__dirname, "data/about.json");
    console.log("Reading from:", filePath);

    const data = fs.readFileSync(filePath, "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading about data:", error);
    res.status(500).json({ error: "Failed to load about data" });
  }
});

// 🚀 Server Bootup
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
