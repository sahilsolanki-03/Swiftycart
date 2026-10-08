import React from "react";
import { money } from "../../utils/helpers";
import AdminLayout from "../../components/AdminLayout";

function AdminOrders({
  orders,
  go,
  logout,
  updateOrderStatus,
  setSelectedOrder,
}) {
  return (
    <AdminLayout go={go} logout={logout}>
      <div className="admin-panel">
        <div className="panel-header">
          <div>
            <p className="small-title">SALES</p>
            <h2>All Orders ({orders.length})</h2>
          </div>
        </div>

        {!orders.length ? (
          <div className="empty-box">No orders available.</div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.customerEmail}</td>
                    <td>{money(order.total)}</td>
                    <td>
                      {order.paymentMethod}
                      <br />
                      {order.paymentStatus}
                    </td>

                    <td>
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>

                    <td>
                      <button
                        className="secondary-btn"
                        onClick={() => {
                          setSelectedOrder(order);
                          go("order-details");
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminOrders;
