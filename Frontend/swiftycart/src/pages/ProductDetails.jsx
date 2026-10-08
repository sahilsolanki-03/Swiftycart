import React from "react";
import { money } from "../utils/helpers";

function ProductDetails({ selectedProduct, products, go, addToCart }) {
  if (!selectedProduct) {
    return (
      <section className="section page-section">
        <h2>Product not found.</h2>
      </section>
    );
  }

  const product = products.find((p) => p.id === selectedProduct.id);

  if (!product) {
    return (
      <section className="section page-section">
        <h2>Product not found.</h2>
      </section>
    );
  }

  return (
    <section className="section page-section">
      <button className="back-btn" onClick={() => go("products")}>
        ← Back
      </button>

      <div className="details-layout">
        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-content">
          <span className="category-label">{product.category}</span>

          <h1>{product.name}</h1>

          <p className="brand">Brand: {product.brand}</p>

          <div className="rating big-rating">⭐ {product.rating}</div>

          <h2 className="details-price">{money(product.price)}</h2>

          <p>{product.description}</p>

          <p className="stock available">{product.stock} items available</p>

          <button
            className="primary-btn large-btn"
            disabled={product.stock <= 0}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
