import React, { useEffect, useState } from "react";
import { Search, Filter, Calendar, Eye, Clock, Tag, X, ChevronDown, TrendingUp, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import apiURL from "../utils/api";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // or "oldest"
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    fetch(`${apiURL}/api/blog`)
      .then((res) => res.json())
      .then(setPosts)
      .catch((err) => console.error("Blog fetch error:", err));
  }, []);

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags || []))
  );

  const calculateReadingTime = (text) => {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes}-minute read`;
  };

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

      const matchesFeatured =
        !featuredOnly || post.featured === true;

      const matchesTag =
        !selectedTag || (post.tags && post.tags.includes(selectedTag));

      return matchesSearch && matchesDateRange && matchesFeatured && matchesTag;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") return new Date(b.date) - new Date(a.date);
      if (sortOrder === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortOrder === "mostViewed") return (b.views || 0) - (a.views || 0);
      return 0;
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
            <option value="mostViewed">Most Viewed</option>
          </select>
        </div>

        <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
          <input
            type="checkbox"
            checked={featuredOnly}
            onChange={(e) => setFeaturedOnly(e.target.checked)}
          />
          Featured Only
        </label>

        <div style={{ margin: "10px 0" }}>
          <strong>Filter by Tag:</strong>
          <button
            onClick={() => setSelectedTag("")}
            style={{ marginRight: "10px", fontWeight: selectedTag === "" ? "bold" : "normal" }}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              style={{
                marginRight: "10px",
                background: selectedTag === tag ? "#06090c" : "#17be3e",
                color: selectedTag === tag ? "#ffffff" : "#b933ab"
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {(searchTerm || startDate || endDate || featuredOnly || sortOrder !== "newest" && selectedTag !== "") && (
          <button
            onClick={() => {
              setSearchTerm("");
              setStartDate("");
              setEndDate("");
              setSortOrder("newest");
              setFeaturedOnly(false);
              setSelectedTag("");
            }}
          >
            Clear All Filters
          </button>
        )}
      </div>

      {filteredPosts.map((post) => (
        <div key={post.id} className="blog-card">
          <h2>{post.title}</h2>
          <p>{post.date} • {calculateReadingTime(post.content)}</p>
          <p>{post.content.substring(0, 150)}...</p>
          <Link to={`/blog/${post.slug}`}>Read More</Link>
        </div>
      ))}

    </div>
  );
};

export default Blog;