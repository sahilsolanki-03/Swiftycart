import React from "react";

function Login({ loginData, setLoginData, handleLogin, go }) {
  return (
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
}

export default Login;
