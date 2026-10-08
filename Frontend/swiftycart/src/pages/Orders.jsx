import React from "react";
import { money } from "../utils/helpers";

function Orders({ orders, user, go, setSelectedOrder }) {
  const myOrders = orders.filter((order) => order.userId === user?.id);

  return (
    <section className="section page-section">
      <div className="section-heading">
        <div>
          <p className="small-title">ACCOUNT</p>
          <h1>My Orders</h1>
        </div>
      </div>

      {!myOrders.length ? (
        <div className="empty-box">
          <h2>No orders yet.</h2>

          <button className="primary-btn" onClick={() => go("products")}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {myOrders.map((order) => (
            <div className="order-card" key={order.id}>
              <div>
                <p className="order-id">Order #{order.id}</p>

                <h3>{money(order.total)}</h3>

                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </div>

              <div>
                <span className="status">{order.orderStatus}</span>

                <p>{order.paymentMethod}</p>
              </div>

              <button
                className="secondary-btn"
                onClick={() => {
                  setSelectedOrder(order);
                  go("order-details");
                }}
              >
                View Order
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Orders;
