import React from "react";
import { money } from "../utils/helpers";

function Cart({
  cartItems,
  cartCount,
  cartTotal,
  user,
  go,
  showMessage,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  return (
    <section className="section page-section">
      <div className="section-heading">
        <div>
          <p className="small-title">YOUR SHOPPING BAG</p>
          <h1>Shopping Cart</h1>
        </div>
      </div>

      {!cartItems.length ? (
        <div className="empty-box">
          <h2>Your cart is empty.</h2>

          <button className="primary-btn" onClick={() => go("products")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.product.id}>
                <img src={item.product.image} alt={item.product.name} />

                <div className="cart-item-info">
                  <h3>{item.product.name}</h3>

                  <p>{item.product.brand}</p>

                  <h3>{money(item.product.price)}</h3>

                  <div className="quantity">
                    <button onClick={() => decreaseQuantity(item.product.id)}>
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item.product.id)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-right">
                  <strong>{money(item.subtotal)}</strong>

                  <button
                    className="delete-btn"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-card">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <span>{cartCount}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{money(cartTotal)}</strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>FREE</span>
            </div>

            <hr />

            <div className="summary-row total-row">
              <strong>Total</strong>
              <strong>{money(cartTotal)}</strong>
            </div>

            <button
              className="primary-btn full-btn"
              onClick={() => {
                if (!user) {
                  showMessage("Login required.");
                  go("login");
                  return;
                }

                go("checkout");
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
