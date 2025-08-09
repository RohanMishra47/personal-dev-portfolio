console.log("=== SERVER STARTUP INFO ===");
console.log("Current working directory:", process.cwd());
console.log("__dirname:", __dirname);
console.log("Blog file path:", path.join(__dirname, "data", "blog.json"));
console.log(
  "Blog file exists:",
  fs.existsSync(path.join(__dirname, "data", "blog.json"))
);
console.log("===============================");

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
require("dotenv").config(); // Uncomment if using dotenv
const apiKey = process.env.sendgrid_key_portfolio_2025;
sgMail.setApiKey(apiKey);

// 🧭 Utility Functions
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE));
const writeData = (data) =>
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// 🔌 Routes
app.use("/api", contactRoute);

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

    fs.writeFile(
      projectsFile,
      JSON.stringify(updatedProjects, null, 2),
      (err) => {
        if (err) return res.status(500).json({ error: "Failed to write file" });
        res.json({ message: "Project deleted" });
      }
    );
  });
});

app.put("/api/projects/:id", (req, res) => {
  const projectId = Number(req.params.id);
  const { title, description, url } = req.body;

  // Add validation
  if (!title || !description || !url) {
    return res.status(400).json({ error: "All fields are required" });
  }

  fs.readFile(projectsFile, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read file" });

    let projects = JSON.parse(data);
    const index = projects.findIndex((p) => p.id === projectId);
    if (index === -1)
      return res.status(404).json({ error: "Project not found" });

    projects[index] = { ...projects[index], title, description, url };

    fs.writeFile(projectsFile, JSON.stringify(projects, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to write file" });
      res.json(projects[index]);
    });
  });
});

const blogFilePath = path.join(__dirname, "data", "blog.json");

// Add this debug endpoint to your server.js
app.get("/api/debug/blog-file", (req, res) => {
  const blogFilePath = path.join(__dirname, "data", "blog.json");

  console.log("=== DEBUG BLOG FILE ===");
  console.log("Server environment:", process.env.NODE_ENV || "development");
  console.log("Current working directory:", process.cwd());
  console.log("__dirname:", __dirname);
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

  fs.readFile(blogFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.json({
        error: "Failed to read blog file",
        errorMessage: err.message,
        path: blogFilePath,
      });
    }

    try {
      const posts = JSON.parse(data);
      res.json({
        success: true,
        path: blogFilePath,
        fileSize: data.length,
        postsCount: posts.length,
        posts: posts,
        rawData: data.substring(0, 500) + (data.length > 500 ? "..." : ""),
      });
    } catch (parseErr) {
      res.json({
        error: "Failed to parse JSON",
        errorMessage: parseErr.message,
        rawData: data.substring(0, 500),
      });
    }
  });
});

// IMPORTANT: Remove this endpoint before going to production for security!

app.get("/api/blog", (req, res) => {
  console.log("=== GET /api/blog called ===");
  console.log("Blog file path:", blogFilePath);
  console.log("File exists:", fs.existsSync(blogFilePath));

  fs.readFile(blogFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading blog file:", err);
      return res.status(500).json({ error: "Failed to read blog posts" });
    }

    console.log("Blog data length:", data.length);
    console.log("Blog data preview:", data.substring(0, 100));

    const posts = JSON.parse(data);
    console.log("Number of posts:", posts.length);
    res.json(posts);
  });
});

app.get("/api/blog/:slug", (req, res) => {
  fs.readFile(blogFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read blog post" });
    const posts = JSON.parse(data);
    const post = posts.find((p) => p.slug === req.params.slug);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  });
});

app.patch("/api/blog/:slug/view", (req, res) => {
  const slug = req.params.slug;

  fs.readFile(blogFilePath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read blog file" });
    if (!data) return console.warn("JSON file is empty.");

    const posts = JSON.parse(data);
    const postIndex = posts.findIndex((p) => p.slug === slug);

    if (postIndex === -1)
      return res.status(404).json({ error: "Post not found" });

    posts[postIndex].views = (posts[postIndex].views || 0) + 1;

    fs.writeFile(blogFilePath, JSON.stringify(posts, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to update views" });
      res.json({
        message: "View count updated",
        views: posts[postIndex].views,
      });
    });
  });
});

app.post("/api/blog", (req, res) => {
  console.log("=== POST /api/blog called ===");
  console.log("Request body:", req.body);
  console.log("Blog file path:", blogFilePath);

  const { title, content, date, tags, featured } = req.body;
  const slug = title.toLowerCase().replace(/ /g, "-");

  if (!title || !content || !date) {
    return res
      .status(400)
      .json({ error: "Title, content, and date are required" });
  }

  fs.readFile(blogFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading blog file for POST:", err);
      return res.status(500).json({ error: "Failed to read blog" });
    }

    console.log("Existing data before POST:", data.substring(0, 100));

    const blogPosts = JSON.parse(data);
    console.log("Existing posts count:", blogPosts.length);

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

    console.log("New post created:", newPost);
    blogPosts.push(newPost);
    console.log("Total posts after adding:", blogPosts.length);

    const jsonString = JSON.stringify(blogPosts, null, 2);
    console.log("Writing to file:", blogFilePath);
    console.log("JSON string length:", jsonString.length);

    fs.writeFile(blogFilePath, jsonString, (err) => {
      if (err) {
        console.error("Error writing blog file:", err);
        return res.status(500).json({ error: "Failed to write blog" });
      }

      console.log("✅ Blog file written successfully!");

      // Verify the write was successful
      fs.readFile(blogFilePath, "utf-8", (verifyErr, verifyData) => {
        if (verifyErr) {
          console.error("❌ Verification read failed:", verifyErr);
        } else {
          const verifyPosts = JSON.parse(verifyData);
          console.log(
            "✅ Verification: File now contains",
            verifyPosts.length,
            "posts"
          );
        }
      });

      res.status(201).json(newPost);
    });
  });
});

// Blog PUT
app.put("/api/blog/:id", (req, res) => {
  console.log("=== PUT /api/blog called ===");
  console.log("Post ID:", req.params.id);
  console.log("Request body:", req.body);

  const { title, content, date, tags, featured } = req.body;
  const postId = Number(req.params.id);

  fs.readFile(blogFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading blog file for PUT:", err);
      return res.status(500).json({ error: "Failed to read blog" });
    }

    const blogPosts = JSON.parse(data);
    console.log("Current posts count:", blogPosts.length);

    const index = blogPosts.findIndex((p) => p.id === postId);
    if (index === -1) {
      console.log("❌ Post not found with ID:", postId);
      return res.status(404).json({ error: "Post not found" });
    }

    console.log("Found post at index:", index);

    const slug = title.toLowerCase().replace(/ /g, "-");
    let featuredValue = false;
    if (typeof featured === "boolean") {
      featuredValue = featured;
    } else if (typeof featured === "string") {
      featuredValue = featured === "true";
    }

    const updatedPost = {
      ...blogPosts[index],
      title,
      content,
      date,
      tags: tags || [],
      slug,
      featured: featuredValue,
    };

    blogPosts[index] = updatedPost;
    console.log("Updated post:", updatedPost);

    const jsonString = JSON.stringify(blogPosts, null, 2);
    console.log("Writing updated data to:", blogFilePath);

    fs.writeFile(blogFilePath, jsonString, (err) => {
      if (err) {
        console.error("Error writing updated blog file:", err);
        return res.status(500).json({ error: "Failed to update blog" });
      }

      console.log("✅ Blog file updated successfully!");
      res.json(updatedPost);
    });
  });
});

// Blog DELETE
app.delete("/api/blog/:id", (req, res) => {
  console.log("=== DELETE /api/blog called ===");
  console.log("Post ID to delete:", req.params.id);

  const postId = Number(req.params.id);

  fs.readFile(blogFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading blog file for DELETE:", err);
      return res.status(500).json({ error: "Failed to read blog" });
    }

    const blogPosts = JSON.parse(data);
    console.log("Posts count before delete:", blogPosts.length);

    const filteredPosts = blogPosts.filter((p) => p.id !== postId);
    console.log("Posts count after filter:", filteredPosts.length);

    const jsonString = JSON.stringify(filteredPosts, null, 2);
    console.log("Writing filtered data to:", blogFilePath);

    fs.writeFile(blogFilePath, jsonString, (err) => {
      if (err) {
        console.error("Error writing filtered blog file:", err);
        return res.status(500).json({ error: "Failed to delete blog post" });
      }

      console.log("✅ Blog post deleted successfully!");
      res.json({ message: "Post deleted" });
    });
  });
});

app.get("/api/about", (req, res) => {
  const filePath = path.join(__dirname, "data/about.json");
  console.log("Reading from:", filePath);

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to load about data" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// 🚀 Server Bootup
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
