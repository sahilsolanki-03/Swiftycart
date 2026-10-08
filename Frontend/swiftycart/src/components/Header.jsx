import React from "react";

function Header({ go, cartCount, user, isAdmin, logout }) {
  return (
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
}

export default Header;
