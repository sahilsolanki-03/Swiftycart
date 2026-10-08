import React from "react";
import AdminLayout from "../../components/AdminLayout";

function AdminAddProduct({
  productData,
  setProductData,
  addProduct,
  go,
  logout,
}) {
  return (
    <AdminLayout go={go} logout={logout}>
      <div className="admin-panel add-product-panel">
        <p className="small-title">INVENTORY</p>
        <h2>Add New Product</h2>

        <form onSubmit={addProduct}>
          <div className="two-inputs">
            <input
              placeholder="Product Name *"
              value={productData.name}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  name: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Price *"
              value={productData.price}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  price: e.target.value,
                })
              }
            />
          </div>

          <div className="two-inputs">
            <input
              placeholder="Brand *"
              value={productData.brand}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  brand: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Stock *"
              value={productData.stock}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  stock: e.target.value,
                })
              }
            />
          </div>

          <div className="two-inputs">
            <select
              value={productData.category}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  category: e.target.value,
                })
              }
            >
              <option>Mobile</option>
              <option>Laptop</option>
              <option>Audio</option>
              <option>TV</option>
              <option>Accessories</option>
              <option>Other</option>
            </select>

            <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              placeholder="Rating"
              value={productData.rating}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  rating: e.target.value,
                })
              }
            />
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setProductData({
                  ...productData,
                  image: URL.createObjectURL(file),
                });
              }
            }}
          />

          <textarea
            placeholder="Description"
            value={productData.description}
            onChange={(e) =>
              setProductData({
                ...productData,
                description: e.target.value,
              })
            }
          />

          <button className="primary-btn">Add Product</button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AdminAddProduct;
