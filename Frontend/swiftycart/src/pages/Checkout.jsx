import React from "react";
import { money } from "../utils/helpers";

function Checkout({
  checkoutData,
  setCheckoutData,
  placeOrder,
  cartItems,
  cartTotal,
}) {
  return (
    <section className="section page-section">
      <div className="section-heading">
        <div>
          <p className="small-title">CHECKOUT</p>
          <h1>Complete Your Order</h1>
        </div>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={placeOrder}>
          <h2>Delivery Address</h2>

          <textarea
            placeholder="Full Address"
            value={checkoutData.address}
            onChange={(e) =>
              setCheckoutData({
                ...checkoutData,
                address: e.target.value,
              })
            }
          />

          <div className="two-inputs">
            <input
              placeholder="City"
              value={checkoutData.city}
              onChange={(e) =>
                setCheckoutData({
                  ...checkoutData,
                  city: e.target.value,
                })
              }
            />

            <input
              placeholder="Pincode"
              value={checkoutData.pincode}
              onChange={(e) =>
                setCheckoutData({
                  ...checkoutData,
                  pincode: e.target.value,
                })
              }
            />
          </div>

          <h2>Payment Method</h2>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={checkoutData.paymentMethod === "COD"}
              onChange={(e) =>
                setCheckoutData({
                  ...checkoutData,
                  paymentMethod: e.target.value,
                })
              }
            />

            <span>
              <strong>Cash on Delivery</strong>
              <small>Pay when your order arrives.</small>
            </span>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={checkoutData.paymentMethod === "UPI"}
              onChange={(e) =>
                setCheckoutData({
                  ...checkoutData,
                  paymentMethod: e.target.value,
                })
              }
            />

            <span>
              <strong>UPI</strong>
              <small>Demo online payment.</small>
            </span>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Card"
              checked={checkoutData.paymentMethod === "Card"}
              onChange={(e) =>
                setCheckoutData({
                  ...checkoutData,
                  paymentMethod: e.target.value,
                })
              }
            />

            <span>
              <strong>Card</strong>
              <small>Demo card payment.</small>
            </span>
          </label>

          <button className="primary-btn full-btn">Place Order</button>
        </form>

        <div className="summary-card">
          <h2>Your Order</h2>

          {cartItems.map((item) => (
            <div className="summary-product" key={item.product.id}>
              <span>
                {item.product.name} × {item.quantity}
              </span>

              <strong>{money(item.subtotal)}</strong>
            </div>
          ))}

          <hr />

          <div className="summary-row total-row">
            <strong>Total</strong>
            <strong>{money(cartTotal)}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
