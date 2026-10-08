import React from "react";

function Register({ registerData, setRegisterData, handleRegister, go }) {
  return (
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
}

export default Register;
