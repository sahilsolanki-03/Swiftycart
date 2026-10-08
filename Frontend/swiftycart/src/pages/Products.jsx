import React from "react";
import ProductCard from "../components/ProductCard";

function Products({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  sort,
  setSort,
  filteredProducts,
  go,
  setSelectedProduct,
  addToCart,
}) {
  return (
    <section className="section page-section">
      <div className="section-heading">
        <div>
          <p className="small-title">SWIFTYCART STORE</p>
          <h1>All Products</h1>
        </div>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort By</option>
          <option value="low">Price Low to High</option>
          <option value="high">Price High to Low</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              setSelectedProduct={setSelectedProduct}
              go={go}
              addToCart={addToCart}
            />
          ))
        ) : (
          <div className="empty-box">No products found.</div>
        )}
      </div>
    </section>
  );
}

export default Products;
