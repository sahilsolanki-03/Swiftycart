import React from "react";
import { money } from "../../utils/helpers";
import AdminLayout from "../../components/AdminLayout";

function AdminDashboard({ users, products, orders, go, logout }) {
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

  const onlinePayments = orders.filter(
    (order) => order.paymentMethod === "UPI" || order.paymentMethod === "Card",
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending",
  ).length;

  return (
    <AdminLayout go={go} logout={logout}>
      <>
        <div className="stats-grid">
          <div className="stat-card">
            <span>Registered Users</span>
            <strong>{users.length}</strong>
          </div>

          <div className="stat-card">
            <span>Total Products</span>
            <strong>{products.length}</strong>
          </div>

          <div className="stat-card">
            <span>Total Orders</span>
            <strong>{orders.length}</strong>
          </div>

          <div className="stat-card">
            <span>Total Sales</span>
            <strong>{money(totalSales)}</strong>
          </div>

          <div className="stat-card">
            <span>Online Payments</span>
            <strong>{onlinePayments}</strong>
          </div>

          <div className="stat-card">
            <span>Pending Orders</span>
            <strong>{pendingOrders}</strong>
          </div>
        </div>

        <div className="admin-content-grid">
          <div className="admin-panel">
            <div className="panel-header">
              <h2>Recent Orders</h2>

              <button
                className="secondary-btn"
                onClick={() => go("admin-orders")}
              >
                View All
              </button>
            </div>

            {!orders.length ? (
              <p>No orders available.</p>
            ) : (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customerName}</td>
                        <td>{money(order.total)}</td>
                        <td>
                          <span className="status">{order.orderStatus}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="admin-panel">
            <h2>Quick Actions</h2>

            <div className="quick-actions">
              <button onClick={() => go("admin-users")}>Manage Users</button>

              <button onClick={() => go("admin-products")}>
                Manage Products
              </button>

              <button onClick={() => go("admin-orders")}>Manage Orders</button>

              <button onClick={() => go("admin-add-product")}>
                Add New Product
              </button>
            </div>
          </div>
        </div>
      </>
    </AdminLayout>
  );
}

export default AdminDashboard;
