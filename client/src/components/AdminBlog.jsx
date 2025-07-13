import React, { useState, useEffect } from "react";
import BlogEditor from "./BlogEditor";
import apiURL from "../utils/api";

const AdminBlog = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetch(`${apiURL}/api/blog`)
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const addOrUpdatePost = async (postData) => {
    const method = postData.id ? "PUT" : "POST";
    const url = postData.id
      ? `${apiURL}/api/blog/${postData.id}`
      : `${apiURL}/api/blog`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

    const updated = await res.json();
    if (postData.id) {
      setPosts(posts.map((p) => (p.id === updated.id ? updated : p)));
    } else {
      setPosts([...posts, updated]);
    }
    setEditingPost(null);
  };

  const deletePost = async (id) => {
    const confirm = window.confirm("Delete this post?");
    if (!confirm) return;

    const res = await fetch(`${apiURL}/api/blog/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="admin-blog">
      <h2>Blog Admin</h2>
      <BlogEditor
        onSubmit={addOrUpdatePost}
        initialData={editingPost || {}}
        onCancel={() => setEditingPost(null)}
      />

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> ({post.date})
            <button onClick={() => setEditingPost(post)}>Edit</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBlog;