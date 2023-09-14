import React from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";

function Login({ loginUser, isLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    loginUser(email, password);
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace/>;
  }

  return (
    <main className="content">
      <section className="auth">
        <h2 className="auth__title">Sign in</h2>
        <form onSubmit={handleSubmit} className="auth__form">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            className="auth__input"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            className="auth__input"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="auth__button">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
