import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.user); // Pass user to parent
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={loginHandler}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
      <p className="mt-3">
        Don't have an account?{" "}
        <button className="btn btn-link p-0" onClick={onSwitchToRegister}>
          Register here
        </button>
      </p>
    </div>
  );
};

export default Login;
