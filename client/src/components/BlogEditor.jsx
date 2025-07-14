import React, { useState, useEffect } from "react";

const BlogEditor = ({ onSubmit, initialData = {}, onCancel }) => {
    const [formData, setFormData] = useState({
        title: initialData.title || "",
        content: initialData.content || "",
        date: initialData.date || "",
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : "",
        featured: initialData.featured === true || initialData.featured === "true",
        id: initialData.id || null,
    });

    useEffect(() => {
        setFormData({
            title: initialData.title || "",
            content: initialData.content || "",
            date: initialData.date || "",
            tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : "",
            featured: !!initialData.featured, // Convert to boolean properly
            id: initialData.id || null,
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFeaturedChange = (e) => {
        setFormData((prev) => ({ ...prev, featured: e.target.checked }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const tagsArray = formData.tags.split(",").map((tag) => tag.trim());
        
        // Ensure featured is explicitly a boolean
        const submitData = {
            ...formData,
            tags: tagsArray,
            featured: Boolean(formData.featured)
        };
        
        console.log("Submitting data:", submitData);
        onSubmit(submitData);
    };

    console.log("Current form data:", formData);

    return (
        <form onSubmit={handleSubmit} className="blog-form">
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <input name="date" type="date" value={formData.date} onChange={handleChange} required />
            <textarea name="content" placeholder="Content" value={formData.content} onChange={handleChange} required />
            <input name="tags" placeholder="Tags (comma-separated)" value={formData.tags} onChange={handleChange} />
            <label>
                <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={handleFeaturedChange}
                />
                Mark as Featured
            </label>
            <button type="submit">{initialData.id ? "Update Post" : "Create Post"}</button>
            {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
    );
};

export default BlogEditor;