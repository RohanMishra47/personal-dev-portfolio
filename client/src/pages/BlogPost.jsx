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

    fetch(`${apiURL}/api/blog/${slug}/view`, {
      method: "PATCH",
    });
  }, [slug]);

  const calculateReadingTime = (text) => {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  if (!post) return (
    <div className="flex flex-col items-center justify-center p-12 gap-4">
      <div className="w-10 h-10 border-[3px] border-[#f3f3f3] border-t-[#667eea] rounded-full animate-spin"></div>
      <p>Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-tt">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center font-normal text-xl text-gray-600 mb-6">
            <span className="mr-4">{post.date}</span>
            <span className="mr-4">•</span>
            <span className="mr-4">{calculateReadingTime(post.content)}</span>
            <span className="mr-4">•</span>
            <span>{post.views.toLocaleString()} Views</span>
          </div>

          <div className="h-px bg-gray-200 w-full"></div>
        </div>

        <div className="prose prose-lg max-w-none mb-10 font-normal text-xl text-gray-700">
          {post.content}
        </div>

        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-lg font-medium hover:bg-purple-100 hover:text-purple-700 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;