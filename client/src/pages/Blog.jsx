import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiURL from "../utils/api";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${apiURL}/api/blog`)
      .then((res) => res.json())
      .then(setPosts)
      .catch((err) => console.error("Blog fetch error:", err));
  }, []);

  return (
    <div className="blog-list">
      <h1>Blog</h1>
      {posts.map((post) => (
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