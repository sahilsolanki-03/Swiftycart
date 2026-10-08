import React from "react";
import { money } from "../../utils/helpers";
import AdminLayout from "../../components/AdminLayout";

function AdminProducts({ products, go, logout, deleteProduct }) {
  return (
    <AdminLayout go={go} logout={logout}>
      <div className="admin-panel">
        <div className="panel-header">
          <div>
            <p className="small-title">INVENTORY</p>
            <h2>Products ({products.length})</h2>
          </div>

          <button
            className="primary-btn"
            onClick={() => go("admin-add-product")}
          >
            + Add Product
          </button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{money(product.price)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminProducts;
