import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiURL from "../utils/api";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // or "oldest"

  useEffect(() => {
    fetch(`${apiURL}/api/blog`)
      .then((res) => res.json())
      .then(setPosts)
      .catch((err) => console.error("Blog fetch error:", err));
  }, []);

  const filteredPosts = posts
    .filter((post) => {
      const term = searchTerm.toLowerCase();
      const postDate = post.date;

      const matchesSearch =
        post.title.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term) ||
        (Array.isArray(post.tags) && post.tags.join(" ").toLowerCase().includes(term));

      const matchesDateRange =
        (!startDate || postDate >= startDate) &&
        (!endDate || postDate <= endDate);

      return matchesSearch && matchesDateRange;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date) - new Date(a.date); // Descending
      } else {
        return new Date(a.date) - new Date(b.date); // Ascending
      }
    });

  return (
    <div className="blog-list">
      <h1>Blog</h1>
      <input
        type="text"
        placeholder="Search blog posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", marginBottom: "20px", width: "100%", maxWidth: "400px" }}
      />

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <div>
          <label>Start Date:</label><br />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label><br />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Sort by: </label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {(startDate || endDate) && (
          <button onClick={() => { setStartDate(""); setEndDate(""); }}>
            Clear Date Range
          </button>
        )}
      </div>


      {filteredPosts.map((post) => (
        <div key={post.id} className="blog-card">
          <h2>{post.title}</h2>
          <p>{post.date}</p>
          <p>{post.content.substring(0, 150)}...</p>
          <Link to={`/blog/${post.slug}`}>Read More</Link>
        </div>
      ))}

    </div>
  );
};

export default Blog;