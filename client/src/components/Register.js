import React, { useState } from "react";
import axios from "axios";

const Register = ({ onSwitchToLogin, onRegisterSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
        username,
        password,
      });
      onSwitchToLogin(); // Go back to login on success
    } catch (err) {
      setError("Registration failed. Try another username.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={registerHandler}>
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
        <button className="btn btn-primary">Register</button>
      </form>
      <p className="mt-3">
        Already have an account?{" "}
        <button className="btn btn-link p-0" onClick={onSwitchToLogin}>
          Login here
        </button>
      </p>
    </div>
  );
};

export default Register;
