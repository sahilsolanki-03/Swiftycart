import React from "react";
import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children, go, logout }) {
  return (
    <div className="admin-layout">
      <AdminSidebar go={go} />

      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <p className="small-title">ADMINISTRATION</p>
            <h1>SwiftyCart Admin</h1>
          </div>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
