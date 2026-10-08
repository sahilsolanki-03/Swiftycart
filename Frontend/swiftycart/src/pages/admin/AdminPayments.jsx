import React from "react";
import { money } from "../../utils/helpers";
import AdminLayout from "../../components/AdminLayout";

function AdminPayments({ orders, go, logout }) {
  const paidOrders = orders.filter(
    (order) => order.paymentMethod === "UPI" || order.paymentMethod === "Card",
  );

  const codOrders = orders.filter((order) => order.paymentMethod === "COD");

  return (
    <AdminLayout go={go} logout={logout}>
      <>
        <div className="stats-grid">
          <div className="stat-card">
            <span>Paid Online Orders</span>
            <strong>{paidOrders.length}</strong>
          </div>

          <div className="stat-card">
            <span>COD Orders</span>
            <strong>{codOrders.length}</strong>
          </div>

          <div className="stat-card">
            <span>Online Revenue</span>
            <strong>
              {money(paidOrders.reduce((sum, order) => sum + order.total, 0))}
            </strong>
          </div>
        </div>

        <div className="admin-panel">
          <div className="panel-header">
            <div>
              <p className="small-title">TRANSACTIONS</p>
              <h2>Payment Records</h2>
            </div>
          </div>

          {!orders.length ? (
            <div className="empty-box">No payment records.</div>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Method</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.paymentMethod}</td>
                      <td>{money(order.total)}</td>
                      <td>{order.paymentStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    </AdminLayout>
  );
}

export default AdminPayments;
