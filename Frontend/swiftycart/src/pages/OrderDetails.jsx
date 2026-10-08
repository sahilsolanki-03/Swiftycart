import React from "react";
import { money } from "../utils/helpers";

function OrderDetails({ selectedOrder, isAdmin, go }) {
  if (!selectedOrder) {
    return (
      <section className="section page-section">
        <h2>Order not found.</h2>
      </section>
    );
  }

  return (
    <section className="section page-section">
      <button
        className="back-btn"
        onClick={() => go(isAdmin ? "admin-orders" : "orders")}
      >
        ← Back
      </button>

      <div className="order-details-card">
        <div className="order-detail-header">
          <div>
            <p className="small-title">ORDER</p>
            <h1>#{selectedOrder.id}</h1>
          </div>

          <span className="status">{selectedOrder.orderStatus}</span>
        </div>

        <div className="detail-grid">
          <div>
            <strong>Customer</strong>
            <p>{selectedOrder.customerName}</p>
            <p>{selectedOrder.customerEmail}</p>
          </div>

          <div>
            <strong>Payment</strong>
            <p>{selectedOrder.paymentMethod}</p>
            <p>Payment Status: {selectedOrder.paymentStatus}</p>
          </div>

          <div>
            <strong>Delivery</strong>
            <p>{selectedOrder.address}</p>
            <p>
              {selectedOrder.city} - {selectedOrder.pincode}
            </p>
          </div>
        </div>

        <h2>Products</h2>

        <div className="order-products">
          {selectedOrder.items.map((item) => (
            <div className="order-product-row" key={item.productId}>
              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>{money(item.price * item.quantity)}</strong>
            </div>
          ))}
        </div>

        <div className="order-total">
          <strong>Total</strong>
          <strong>{money(selectedOrder.total)}</strong>
        </div>
      </div>
    </section>
  );
}

export default OrderDetails;
