import React, { useState, useEffect } from "react";
import BlogEditor from "./BlogEditor";
import apiURL from "../utils/api";

const AdminBlog = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    fetch(`${apiURL}/api/blog`)
      .then((res) => res.json())
      .then(data => {
        console.log("Fetched posts:", data);
        data.forEach(post => {
          console.log(`Post ${post.id}: featured = ${post.featured} (type: ${typeof post.featured})`);
        });
        setPosts(data);
      })
      .catch(error => console.error("Error fetching posts:", error));
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
      return sortOrder === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date);
    });

  const addOrUpdatePost = async (postData) => {
    console.log("Submitting post data:", postData);
    
    const method = postData.id ? "PUT" : "POST";
    const url = postData.id
      ? `${apiURL}/api/blog/${postData.id}`
      : `${apiURL}/api/blog`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const updated = await res.json();
      console.log("Server response:", updated);
      
      if (postData.id) {
        setPosts(prevPosts => prevPosts.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        setPosts(prevPosts => [...prevPosts, updated]);
      }
      setEditingPost(null);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const deletePost = async (id) => {
    const confirm = window.confirm("Delete this post?");
    if (!confirm) return;

    try {
      const res = await fetch(`${apiURL}/api/blog/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPosts(prevPosts => prevPosts.filter((p) => p.id !== id));
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (post) => {
    console.log("Editing post:", post);
    setEditingPost(post);
  };

  const handleCancel = () => {
    setEditingPost(null);
  };

  return (
    <div className="admin-blog">
      <h2>Blog Admin</h2>
      <BlogEditor
        onSubmit={addOrUpdatePost}
        initialData={editingPost || {}}
        onCancel={handleCancel}
      />

      <input
        type="text"
        placeholder="Search blog..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>

      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> ({post.date})
            {post.featured && <span style={{ color: "gold", marginLeft: "10px" }}>★ Featured</span>}
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBlog;