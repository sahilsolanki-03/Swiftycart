import React from "react";
import { money } from "../utils/helpers";

function ProductCard({ product, setSelectedProduct, go, addToCart }) {
  return (
    <div className="product-card" key={product.id}>
      <img
        src={product.image}
        alt={product.name}
        onError={(e) => {
          e.currentTarget.src =
            "https://via.placeholder.com/500x400?text=Product";
        }}
      />

      <div className="product-info">
        <span className="category-label">{product.category}</span>

        <h3>{product.name}</h3>

        <p className="brand">{product.brand}</p>

        <div className="rating">⭐ {product.rating}</div>

        <h2>{money(product.price)}</h2>

        <p
          className={
            product.stock > 0 ? "stock available" : "stock unavailable"
          }
        >
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p>

        <div className="product-actions">
          <button
            className="secondary-btn"
            onClick={() => {
              setSelectedProduct(product);
              go("product-details");
            }}
          >
            View
          </button>

          <button
            className="primary-btn"
            disabled={product.stock <= 0}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
