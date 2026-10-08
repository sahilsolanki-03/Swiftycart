import React from "react";

function AdminSidebar({ go }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <p>SWIFTYCART</p>
        <h2>Admin Panel</h2>
      </div>

      <button onClick={() => go("admin-dashboard")}>Dashboard</button>

      <button onClick={() => go("admin-users")}>Users</button>

      <button onClick={() => go("admin-products")}>Products</button>

      <button onClick={() => go("admin-orders")}>Orders</button>

      <button onClick={() => go("admin-payments")}>Payments</button>

      <button onClick={() => go("admin-add-product")}>Add Product</button>

      <button onClick={() => go("home")}>Store</button>
    </aside>
  );
}

export default AdminSidebar;
