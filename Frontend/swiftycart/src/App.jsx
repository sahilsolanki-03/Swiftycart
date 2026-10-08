import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

import { ADMIN, INITIAL_PRODUCTS } from "./data/constants";
import { readStorage } from "./utils/helpers";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import OrderDetails from "./pages/OrderDetails";
import OrderSuccess from "./pages/OrderSuccess";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminAddProduct from "./pages/admin/AdminAddProduct";

function App() {
  const [page, setPage] = useState("home");

  const [products, setProducts] = useState(() =>
    readStorage("swiftyProducts", INITIAL_PRODUCTS),
  );

  const [users, setUsers] = useState(() => readStorage("swiftyUsers", []));

  const [orders, setOrders] = useState(() => readStorage("swiftyOrders", []));

  const [user, setUser] = useState(() => readStorage("swiftyUser", null));

  const [cart, setCart] = useState(() => readStorage("swiftyCart", []));

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const [message, setMessage] = useState("");

  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "Mobile",
    brand: "",
    image: "",
    description: "",
    stock: "",
    rating: "4.5",
  });

  const [checkoutData, setCheckoutData] = useState({
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "COD",
  });

  useEffect(() => {
    localStorage.setItem("swiftyProducts", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("swiftyUsers", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("swiftyOrders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("swiftyCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("swiftyUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("swiftyUser");
    }
  }, [user]);

  const isAdmin = user?.role === "admin";

  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((p) => p.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, search, category, sort]);

  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) return null;

      return {
        ...item,
        product,
        subtotal: product.price * item.quantity,
      };
    })
    .filter(Boolean);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce((total, item) => total + item.subtotal, 0);

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const go = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product) => {
    if (product.stock <= 0) {
      showMessage("Product is out of stock.");
      return;
    }

    setCart((oldCart) => {
      const exists = oldCart.find((item) => item.productId === product.id);

      if (exists) {
        return oldCart.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, product.stock),
              }
            : item,
        );
      }

      return [
        ...oldCart,
        {
          productId: product.id,
          quantity: 1,
        },
      ];
    });

    showMessage("Product added to cart.");
  };

  const increaseQuantity = (id) => {
    setCart((oldCart) =>
      oldCart.map((item) => {
        if (item.productId !== id) return item;

        const product = products.find((p) => p.id === id);

        return {
          ...item,
          quantity: Math.min(
            item.quantity + 1,
            product?.stock || item.quantity,
          ),
        };
      }),
    );
  };

  const decreaseQuantity = (id) => {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.productId === id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id) => {
    setCart((oldCart) => oldCart.filter((item) => item.productId !== id));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !registerData.firstname ||
      !registerData.lastname ||
      !registerData.email ||
      !registerData.password
    ) {
      showMessage("Please fill all fields.");
      return;
    }

    const alreadyExists = users.some(
      (u) => u.email.toLowerCase() === registerData.email.toLowerCase(),
    );

    if (alreadyExists) {
      showMessage("Email already registered.");
      return;
    }

    const newUser = {
      id: Date.now(),
      ...registerData,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    setUsers((oldUsers) => [...oldUsers, newUser]);

    setUser(newUser);

    setRegisterData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });

    showMessage("Registration successful.");
    go("home");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      loginData.email === ADMIN.email &&
      loginData.password === ADMIN.password
    ) {
      setUser(ADMIN);
      showMessage("Admin login successful.");
      go("admin-dashboard");
      return;
    }

    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase() === loginData.email.toLowerCase() &&
        u.password === loginData.password,
    );

    if (!foundUser) {
      showMessage("Invalid email or password.");
      return;
    }

    setUser(foundUser);
    setLoginData({
      email: "",
      password: "",
    });

    showMessage("Login successful.");
    go("home");
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    go("home");
    showMessage("Logged out.");
  };

  const placeOrder = (e) => {
    e.preventDefault();

    if (!user) {
      showMessage("Please login first.");
      go("login");
      return;
    }

    if (!cartItems.length) {
      showMessage("Your cart is empty.");
      go("cart");
      return;
    }

    if (!checkoutData.address || !checkoutData.city || !checkoutData.pincode) {
      showMessage("Please enter complete address.");
      return;
    }

    for (const item of cartItems) {
      if (item.quantity > item.product.stock) {
        showMessage(`${item.product.name} has insufficient stock.`);
        return;
      }
    }

    const order = {
      id: `SC${Date.now()}`,
      userId: user.id,
      customerName: `${user.firstname} ${user.lastname}`,
      customerEmail: user.email,
      items: cartItems.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      total: cartTotal,
      address: checkoutData.address,
      city: checkoutData.city,
      pincode: checkoutData.pincode,
      paymentMethod: checkoutData.paymentMethod,
      paymentStatus: checkoutData.paymentMethod === "COD" ? "Pending" : "Paid",
      orderStatus: "Pending",
      createdAt: new Date().toISOString(),
    };

    setOrders((oldOrders) => [order, ...oldOrders]);

    setProducts((oldProducts) =>
      oldProducts.map((product) => {
        const cartItem = cart.find((item) => item.productId === product.id);

        if (!cartItem) return product;

        return {
          ...product,
          stock: product.stock - cartItem.quantity,
        };
      }),
    );

    setCart([]);

    setCheckoutData({
      address: "",
      city: "",
      pincode: "",
      paymentMethod: "COD",
    });

    setSelectedOrder(order);

    go("order-success");
  };

  const addProduct = (e) => {
    e.preventDefault();

    if (
      !productData.name ||
      !productData.price ||
      !productData.brand ||
      !productData.stock
    ) {
      showMessage("Please fill required product fields.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: productData.name,
      price: Number(productData.price),
      category: productData.category,
      brand: productData.brand,
      image:
        productData.image ||
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      description: productData.description || "New SwiftyCart product.",
      stock: Number(productData.stock),
      rating: Number(productData.rating) || 4.5,
    };

    setProducts((oldProducts) => [newProduct, ...oldProducts]);

    setProductData({
      name: "",
      price: "",
      category: "Mobile",
      brand: "",
      image: "",
      description: "",
      stock: "",
      rating: "4.5",
    });

    showMessage("Product added.");
    go("admin-products");
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product?")) return;

    setProducts((oldProducts) =>
      oldProducts.filter((product) => product.id !== id),
    );

    setCart((oldCart) => oldCart.filter((item) => item.productId !== id));

    showMessage("Product deleted.");
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((oldOrders) =>
      oldOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              orderStatus: status,
            }
          : order,
      ),
    );

    showMessage("Order status updated.");
  };

  const renderPage = () => {
    if (page === "home")
      return (
        <Home
          go={go}
          categories={categories}
          setCategory={setCategory}
          products={products}
          setSelectedProduct={setSelectedProduct}
          addToCart={addToCart}
        />
      );
    if (page === "products")
      return (
        <Products
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={categories}
          sort={sort}
          setSort={setSort}
          filteredProducts={filteredProducts}
          go={go}
          setSelectedProduct={setSelectedProduct}
          addToCart={addToCart}
        />
      );
    if (page === "product-details")
      return (
        <ProductDetails
          selectedProduct={selectedProduct}
          products={products}
          go={go}
          addToCart={addToCart}
        />
      );
    if (page === "register")
      return (
        <Register
          registerData={registerData}
          setRegisterData={setRegisterData}
          handleRegister={handleRegister}
          go={go}
        />
      );
    if (page === "login")
      return (
        <Login
          loginData={loginData}
          setLoginData={setLoginData}
          handleLogin={handleLogin}
          go={go}
        />
      );
    if (page === "cart")
      return (
        <Cart
          cartItems={cartItems}
          cartCount={cartCount}
          cartTotal={cartTotal}
          user={user}
          go={go}
          showMessage={showMessage}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
        />
      );
    if (page === "checkout")
      return (
        <Checkout
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
          placeOrder={placeOrder}
          cartItems={cartItems}
          cartTotal={cartTotal}
        />
      );
    if (page === "orders")
      return (
        <Orders
          orders={orders}
          user={user}
          go={go}
          setSelectedOrder={setSelectedOrder}
        />
      );
    if (page === "profile") return <Profile user={user} orders={orders} />;
    if (page === "order-details")
      return (
        <OrderDetails selectedOrder={selectedOrder} isAdmin={isAdmin} go={go} />
      );
    if (page === "order-success")
      return <OrderSuccess selectedOrder={selectedOrder} go={go} />;

    if (page === "admin-dashboard" && isAdmin)
      return (
        <AdminDashboard
          users={users}
          products={products}
          orders={orders}
          go={go}
          logout={logout}
        />
      );

    if (page === "admin-users" && isAdmin)
      return <AdminUsers users={users} go={go} logout={logout} />;

    if (page === "admin-products" && isAdmin)
      return (
        <AdminProducts
          products={products}
          go={go}
          logout={logout}
          deleteProduct={deleteProduct}
        />
      );

    if (page === "admin-orders" && isAdmin)
      return (
        <AdminOrders
          orders={orders}
          go={go}
          logout={logout}
          updateOrderStatus={updateOrderStatus}
          setSelectedOrder={setSelectedOrder}
        />
      );

    if (page === "admin-payments" && isAdmin)
      return <AdminPayments orders={orders} go={go} logout={logout} />;

    if (page === "admin-add-product" && isAdmin)
      return (
        <AdminAddProduct
          productData={productData}
          setProductData={setProductData}
          addProduct={addProduct}
          go={go}
          logout={logout}
        />
      );

    return (
      <Home
        go={go}
        categories={categories}
        setCategory={setCategory}
        products={products}
        setSelectedProduct={setSelectedProduct}
        addToCart={addToCart}
      />
    );
  };

  return (
    <div className="app">
      {!page.startsWith("admin-") && (
        <Header
          go={go}
          cartCount={cartCount}
          user={user}
          isAdmin={isAdmin}
          logout={logout}
        />
      )}

      {message && <div className="toast">{message}</div>}

      {renderPage()}

      {!page.startsWith("admin-") && <Footer />}
    </div>
  );
}

export default App;
