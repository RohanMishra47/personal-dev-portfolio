import React, { useState } from "react";
import AdminLogin from "./AdminLogin";

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Admin Dashboard</h2>
          {/* Later we'll add form to add/edit/delete projects */}
        </div>
      ) : (
        <AdminLogin onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export default AdminDashboard;