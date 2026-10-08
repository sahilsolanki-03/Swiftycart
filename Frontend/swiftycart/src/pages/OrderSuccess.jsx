import React from "react";
import { money } from "../utils/helpers";

function OrderSuccess({ selectedOrder, go }) {
  return (
    <section className="success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>

        <p className="small-title">SWIFTYCART</p>

        <h1>Order Placed!</h1>

        <p>Your order has been successfully placed.</p>

        {selectedOrder && (
          <>
            <p className="order-id">Order #{selectedOrder.id}</p>

            <h2>{money(selectedOrder.total)}</h2>
          </>
        )}

        <div className="success-actions">
          <button className="primary-btn" onClick={() => go("orders")}>
            View My Orders
          </button>

          <button className="secondary-btn" onClick={() => go("products")}>
            Continue Shopping
          </button>
        </div>
      </div>
    </section>
  );
}

export default OrderSuccess;
