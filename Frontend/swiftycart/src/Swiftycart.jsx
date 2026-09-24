import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

const ADMIN = {
  email: "sahilsolanki4021@gmail.com",
  password: "sahil123",
  firstname: "Sahil",
  lastname: "Solnaki",
  role: "admin",
};

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "iPhone 15",
    price: 69999,
    category: "Mobile",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600",
    description: "Apple iPhone with powerful performance and excellent camera.",
    stock: 20,
    rating: 4.7,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 109999,
    category: "Mobile",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600",
    description: "Premium Samsung smartphone with powerful camera and display.",
    stock: 15,
    rating: 4.8,
  },
  {
    id: 3,
    name: "OnePlus 13R",
    price: 42999,
    category: "Mobile",
    brand: "OnePlus",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600",
    description: "Fast and powerful OnePlus smartphone.",
    stock: 25,
    rating: 4.6,
  },
  {
    id: 4,
    name: "boAt Rockerz Headphones",
    price: 1999,
    category: "Audio",
    brand: "boAt",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    description: "Wireless headphones with powerful sound.",
    stock: 50,
    rating: 4.4,
  },
  {
    id: 5,
    name: "MacBook Air",
    price: 99999,
    category: "Laptop",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
    description: "Slim and powerful Apple MacBook Air.",
    stock: 10,
    rating: 4.9,
  },
  {
    id: 6,
    name: "HP 15 Laptop",
    price: 54999,
    category: "Laptop",
    brand: "HP",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
    description: "Reliable laptop for students and professionals.",
    stock: 18,
    rating: 4.3,
  },
  {
    id: 7,
    name: "ASUS VivoBook",
    price: 62999,
    category: "Laptop",
    brand: "ASUS",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600",
    description: "Modern laptop with great performance.",
    stock: 12,
    rating: 4.5,
  },
  {
    id: 8,
    name: "Samsung 43 inch 4K TV",
    price: 37999,
    category: "TV",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600",
    description: "4K Smart TV with vivid picture quality.",
    stock: 8,
    rating: 4.6,
  },
  {
    id: 9,
    name: "OnePlus Nord Buds",
    price: 2499,
    category: "Audio",
    brand: "OnePlus",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600",
    description: "Compact wireless earbuds with clear audio.",
    stock: 40,
    rating: 4.4,
  },
  {
    id: 10,
    name: "Sony Smart TV",
    price: 59999,
    category: "TV",
    brand: "Sony",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600",
    description: "Sony smart television with premium display.",
    stock: 7,
    rating: 4.7,
  },
];

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function Swiftycart() {
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

  const renderHeader = () => (
    <header className="navbar">
      <div className="nav-container">
        <button className="logo" onClick={() => go("home")}>
          <span>Swift</span>yCart
        </button>

        <nav>
          <button onClick={() => go("home")}>Home</button>

          <button onClick={() => go("products")}>Products</button>

          <button onClick={() => go("cart")}>Cart ({cartCount})</button>

          {user && !isAdmin && (
            <>
              <button onClick={() => go("orders")}>My Orders</button>

              <button onClick={() => go("profile")}>Profile</button>
            </>
          )}

          {isAdmin && (
            <button onClick={() => go("admin-dashboard")}>Admin</button>
          )}
        </nav>

        <div className="nav-right">
          {user ? (
            <>
              <span className="welcome">Hi, {user.firstname}</span>

              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => go("login")}>Login</button>

              <button
                className="register-nav-btn"
                onClick={() => go("register")}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );

  const renderFooter = () => (
    <footer className="footer">
      <div>
        <h2>SwiftyCart</h2>
        <p>Shop Smart. Shop Swift.</p>
      </div>

      <div>
        <p>© 2026 SwiftyCart</p>
        <p>All Rights Reserved.</p>
      </div>
    </footer>
  );

  const renderProductCard = (product) => (
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

  const renderHome = () => (
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
          {products.slice(0, 4).map((product) => renderProductCard(product))}
        </div>
      </section>
    </>
  );

  const renderProducts = () => (
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
          filteredProducts.map((product) => renderProductCard(product))
        ) : (
          <div className="empty-box">No products found.</div>
        )}
      </div>
    </section>
  );

  const renderProductDetails = () => {
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
  };

  const renderRegister = () => (
    <section className="auth-page">
      <div className="auth-card">
        <p className="small-title">SWIFTYCART</p>
        <h1>Create Account</h1>
        <p>Register to start shopping.</p>

        <form onSubmit={handleRegister}>
          <div className="two-inputs">
            <input
              placeholder="First Name"
              value={registerData.firstname}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  firstname: e.target.value,
                })
              }
            />

            <input
              placeholder="Last Name"
              value={registerData.lastname}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  lastname: e.target.value,
                })
              }
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                password: e.target.value,
              })
            }
          />

          <button className="primary-btn full-btn">Register</button>
        </form>

        <p>
          Already have an account?{" "}
          <button className="link-btn" onClick={() => go("login")}>
            Login
          </button>
        </p>
      </div>
    </section>
  );

  const renderLogin = () => (
    <section className="auth-page">
      <div className="auth-card">
        <p className="small-title">SWIFTYCART</p>
        <h1>Login</h1>
        <p>Login to continue.</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                password: e.target.value,
              })
            }
          />

          <button className="primary-btn full-btn">Login</button>
        </form>

        <div className="demo-admin">
          <p>Email: sahilsolanki4021@gmail.com</p>
          <p>Password: sahil123</p>
        </div>

        <p>
          New user?{" "}
          <button className="link-btn" onClick={() => go("register")}>
            Register
          </button>
        </p>
      </div>
    </section>
  );

  const renderCart = () => (
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

  const renderCheckout = () => (
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

  const renderOrders = () => {
    const myOrders = orders.filter((order) => order.userId === user?.id);

    return (
      <section className="section page-section">
        <div className="section-heading">
          <div>
            <p className="small-title">ACCOUNT</p>
            <h1>My Orders</h1>
          </div>
        </div>

        {!myOrders.length ? (
          <div className="empty-box">
            <h2>No orders yet.</h2>

            <button className="primary-btn" onClick={() => go("products")}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {myOrders.map((order) => (
              <div className="order-card" key={order.id}>
                <div>
                  <p className="order-id">Order #{order.id}</p>

                  <h3>{money(order.total)}</h3>

                  <p>{new Date(order.createdAt).toLocaleString()}</p>
                </div>

                <div>
                  <span className="status">{order.orderStatus}</span>

                  <p>{order.paymentMethod}</p>
                </div>

                <button
                  className="secondary-btn"
                  onClick={() => {
                    setSelectedOrder(order);
                    go("order-details");
                  }}
                >
                  View Order
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  };

  const renderProfile = () => (
    <section className="section page-section">
      <div className="profile-card">
        <p className="small-title">MY ACCOUNT</p>

        <h1>
          {user?.firstname} {user?.lastname}
        </h1>

        <div className="profile-row">
          <strong>Email</strong>
          <span>{user?.email}</span>
        </div>

        <div className="profile-row">
          <strong>Account Type</strong>
          <span>User</span>
        </div>

        <div className="profile-row">
          <strong>Total Orders</strong>
          <span>
            {orders.filter((order) => order.userId === user?.id).length}
          </span>
        </div>
      </div>
    </section>
  );

  const renderOrderDetails = () => {
    if (!selectedOrder) {
      return (
        <section className="section page-section">
          <h2>Order not found.</h2>
        </section>
      );
    }

    return (
      <section className="section page-section">
        <button
          className="back-btn"
          onClick={() => go(isAdmin ? "admin-orders" : "orders")}
        >
          ← Back
        </button>

        <div className="order-details-card">
          <div className="order-detail-header">
            <div>
              <p className="small-title">ORDER</p>
              <h1>#{selectedOrder.id}</h1>
            </div>

            <span className="status">{selectedOrder.orderStatus}</span>
          </div>

          <div className="detail-grid">
            <div>
              <strong>Customer</strong>
              <p>{selectedOrder.customerName}</p>
              <p>{selectedOrder.customerEmail}</p>
            </div>

            <div>
              <strong>Payment</strong>
              <p>{selectedOrder.paymentMethod}</p>
              <p>Payment Status: {selectedOrder.paymentStatus}</p>
            </div>

            <div>
              <strong>Delivery</strong>
              <p>{selectedOrder.address}</p>
              <p>
                {selectedOrder.city} - {selectedOrder.pincode}
              </p>
            </div>
          </div>

          <h2>Products</h2>

          <div className="order-products">
            {selectedOrder.items.map((item) => (
              <div className="order-product-row" key={item.productId}>
                <span>
                  {item.name} × {item.quantity}
                </span>

                <strong>{money(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>

          <div className="order-total">
            <strong>Total</strong>
            <strong>{money(selectedOrder.total)}</strong>
          </div>
        </div>
      </section>
    );
  };

  const renderOrderSuccess = () => (
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

  const renderAdminSidebar = () => (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <p>SWIFTYCART</p>
        <h2>Admin Panel</h2>
      </div>

      <button onClick={() => go("admin-dashboard")}>Dashboard</button>

      <button onClick={() => go("admin-users")}>Users</button>

      <button onClick={() => go("admin-products")}>Products</button>

      <button onClick={() => go("admin-orders")}>Orders</button>

      <button onClick={() => go("admin-payments")}>Payments</button>

      <button onClick={() => go("admin-add-product")}>Add Product</button>

      <button onClick={() => go("home")}>Store</button>
    </aside>
  );

  const renderAdminLayout = (children) => (
    <div className="admin-layout">
      {renderAdminSidebar()}

      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <p className="small-title">ADMINISTRATION</p>
            <h1>SwiftyCart Admin</h1>
          </div>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        {children}
      </main>
    </div>
  );

  const renderAdminDashboard = () => {
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

    const onlinePayments = orders.filter(
      (order) =>
        order.paymentMethod === "UPI" || order.paymentMethod === "Card",
    ).length;

    const pendingOrders = orders.filter(
      (order) => order.orderStatus === "Pending",
    ).length;

    return renderAdminLayout(
      <>
        <div className="stats-grid">
          <div className="stat-card">
            <span>Registered Users</span>
            <strong>{users.length}</strong>
          </div>

          <div className="stat-card">
            <span>Total Products</span>
            <strong>{products.length}</strong>
          </div>

          <div className="stat-card">
            <span>Total Orders</span>
            <strong>{orders.length}</strong>
          </div>

          <div className="stat-card">
            <span>Total Sales</span>
            <strong>{money(totalSales)}</strong>
          </div>

          <div className="stat-card">
            <span>Online Payments</span>
            <strong>{onlinePayments}</strong>
          </div>

          <div className="stat-card">
            <span>Pending Orders</span>
            <strong>{pendingOrders}</strong>
          </div>
        </div>

        <div className="admin-content-grid">
          <div className="admin-panel">
            <div className="panel-header">
              <h2>Recent Orders</h2>

              <button
                className="secondary-btn"
                onClick={() => go("admin-orders")}
              >
                View All
              </button>
            </div>

            {!orders.length ? (
              <p>No orders available.</p>
            ) : (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customerName}</td>
                        <td>{money(order.total)}</td>
                        <td>
                          <span className="status">{order.orderStatus}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="admin-panel">
            <h2>Quick Actions</h2>

            <div className="quick-actions">
              <button onClick={() => go("admin-users")}>Manage Users</button>

              <button onClick={() => go("admin-products")}>
                Manage Products
              </button>

              <button onClick={() => go("admin-orders")}>Manage Orders</button>

              <button onClick={() => go("admin-add-product")}>
                Add New Product
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderAdminUsers = () =>
    renderAdminLayout(
      <div className="admin-panel">
        <div className="panel-header">
          <div>
            <p className="small-title">CUSTOMERS</p>
            <h2>Registered Users ({users.length})</h2>
          </div>
        </div>

        {!users.length ? (
          <div className="empty-box">No registered users yet.</div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Registered</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>
                      {u.firstname} {u.lastname}
                    </td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );

  const renderAdminProducts = () =>
    renderAdminLayout(
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
    );

  const renderAdminOrders = () =>
    renderAdminLayout(
      <div className="admin-panel">
        <div className="panel-header">
          <div>
            <p className="small-title">SALES</p>
            <h2>All Orders ({orders.length})</h2>
          </div>
        </div>

        {!orders.length ? (
          <div className="empty-box">No orders available.</div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.customerEmail}</td>
                    <td>{money(order.total)}</td>
                    <td>
                      {order.paymentMethod}
                      <br />
                      {order.paymentStatus}
                    </td>

                    <td>
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>

                    <td>
                      <button
                        className="secondary-btn"
                        onClick={() => {
                          setSelectedOrder(order);
                          go("order-details");
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );

  const renderAdminPayments = () => {
    const paidOrders = orders.filter(
      (order) =>
        order.paymentMethod === "UPI" || order.paymentMethod === "Card",
    );

    const codOrders = orders.filter((order) => order.paymentMethod === "COD");

    return renderAdminLayout(
      <>
        <div className="stats-grid">
          <div className="stat-card">
            <span>Paid Online Orders</span>
            <strong>{paidOrders.length}</strong>
          </div>

          <div className="stat-card">
            <span>COD Orders</span>
            <strong>{codOrders.length}</strong>
          </div>

          <div className="stat-card">
            <span>Online Revenue</span>
            <strong>
              {money(paidOrders.reduce((sum, order) => sum + order.total, 0))}
            </strong>
          </div>
        </div>

        <div className="admin-panel">
          <div className="panel-header">
            <div>
              <p className="small-title">TRANSACTIONS</p>
              <h2>Payment Records</h2>
            </div>
          </div>

          {!orders.length ? (
            <div className="empty-box">No payment records.</div>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Method</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.paymentMethod}</td>
                      <td>{money(order.total)}</td>
                      <td>{order.paymentStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    );
  };

  const renderAdminAddProduct = () =>
    renderAdminLayout(
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
    );

  const renderPage = () => {
    if (page === "home") return renderHome();
    if (page === "products") return renderProducts();
    if (page === "product-details") return renderProductDetails();
    if (page === "register") return renderRegister();
    if (page === "login") return renderLogin();
    if (page === "cart") return renderCart();
    if (page === "checkout") return renderCheckout();
    if (page === "orders") return renderOrders();
    if (page === "profile") return renderProfile();
    if (page === "order-details") return renderOrderDetails();
    if (page === "order-success") return renderOrderSuccess();

    if (page === "admin-dashboard" && isAdmin) return renderAdminDashboard();

    if (page === "admin-users" && isAdmin) return renderAdminUsers();

    if (page === "admin-products" && isAdmin) return renderAdminProducts();

    if (page === "admin-orders" && isAdmin) return renderAdminOrders();

    if (page === "admin-payments" && isAdmin) return renderAdminPayments();

    if (page === "admin-add-product" && isAdmin) return renderAdminAddProduct();

    return renderHome();
  };

  return (
    <div className="app">
      {!page.startsWith("admin-") && renderHeader()}

      {message && <div className="toast">{message}</div>}

      {renderPage()}

      {!page.startsWith("admin-") && renderFooter()}
    </div>
  );
}

export default Swiftycart;
