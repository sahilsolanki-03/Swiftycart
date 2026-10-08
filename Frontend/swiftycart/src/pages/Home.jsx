import React from "react";
import ProductCard from "../components/ProductCard";

function Home({
  go,
  categories,
  setCategory,
  products,
  setSelectedProduct,
  addToCart,
}) {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="small-title">WELCOME TO SWIFTYCART</p>

          <h1>
            Shop Smart.
            <br />
            Shop Swift.
          </h1>

          <p>Discover amazing products at great prices.</p>

          <button
            className="primary-btn large-btn"
            onClick={() => go("products")}
          >
            Start Shopping
          </button>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="small-title">EXPLORE</p>
            <h2>Shop by Category</h2>
          </div>
        </div>

        <div className="category-grid">
          {categories
            .filter((c) => c !== "All")
            .map((cat) => (
              <button
                className="category-card"
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  go("products");
                }}
              >
                <h3>{cat}</h3>

                <p>
                  {
                    products.filter((product) => product.category === cat)
                      .length
                  }{" "}
                  Products
                </p>
              </button>
            ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="small-title">FEATURED</p>
            <h2>Popular Products</h2>
          </div>

          <button className="secondary-btn" onClick={() => go("products")}>
            View All
          </button>
        </div>

        <div className="products-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              setSelectedProduct={setSelectedProduct}
              go={go}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
