import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Eye } from "lucide-react";
import apiURL from "../utils/api";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`${apiURL}/api/blog/${slug}`)
      .then((res) => res.json())
      .then(setPost)
      .catch((err) => console.error("Blog post fetch error:", err));

    fetch(`${apiURL}/api/blog/${slug}/view`, {
      method: "PATCH",
    });
  }, [slug]);

  const calculateReadingTime = (text) => {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} minute read`;
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <p><em>{post.date} • {calculateReadingTime(post.content)} • {post.views} Views</em></p>
      <div>{post.content}</div>
      {post.tags.map((tag, index) => (
        <span
          key={index}
          className="mr-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-purple-100 hover:text-purple-700 transition-colors cursor-pointer"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default BlogPost;