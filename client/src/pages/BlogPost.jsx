import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiURL from "../utils/api";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`${apiURL}/api/blog/${slug}`)
      .then((res) => res.json())
      .then(setPost)
      .catch((err) => console.error("Blog post fetch error:", err));
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <p><em>{post.date}</em></p>
      <div>{post.content}</div>
    </div>
  );
};

export default BlogPost;