import React, { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import ProjectForm from "./ProjectForm";
import apiURL from "../utils/api";

const AdminDashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(null);

    useEffect(() => {
        fetch(`${apiURL}/api/projects`)
            .then((res) => res.json())
            .then(setProjects);
    }, []);

    const handleAddProject = (newProject) => {
        setProjects([...projects, newProject]);
    };

    const handleUpdateProject = async (updatedProject) => {
        try {
            const res = await fetch(`${apiURL}/api/projects/${updatedProject.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProject),
            });

            if (res.ok) {
                const data = await res.json();
                setProjects(projects.map((p) => (p.id === data.id ? data : p)));
                setEditingProject(null);
            } else {
                alert("Failed to update project");
            }
        } catch (err) {
            console.error("Edit error:", err);
        }
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this project?");
        if (!confirm) return;

        try {
            const res = await fetch(`${apiURL}/api/projects/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setProjects(projects.filter((p) => p.id !== id));
            } else {
                alert("Failed to delete project");
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    return isLoggedIn ? (
        <div>
            <h2>Admin Dashboard</h2>
            <ProjectForm
                key={editingProject?.id || "new"} // keeps form from remounting unnecessarily
                initialData={editingProject || null}
                onSubmit={(project) => {
                    if (editingProject) {
                        handleUpdateProject(project);
                    } else {
                        handleAddProject(project);
                    }
                    setEditingProject(null);
                }}
                onCancel={() => setEditingProject(null)}
            />
            <ul>
                {projects.map((proj) => (
                    <li key={proj.id}>
                        <strong>{proj.title}</strong> — {proj.description}
                        <button onClick={() => handleDelete(proj.id)}>Delete</button>
                        <button onClick={() => setEditingProject(proj)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <AdminLogin onLogin={() => setIsLoggedIn(true)} />
    );
};

export default AdminDashboard;