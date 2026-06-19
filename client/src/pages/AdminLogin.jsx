import React, { useState } from "react";
import "./AdminLogin.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import logo from "../assets/logo.png";

function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post(
        "/admin/login",
        form
      );

      localStorage.setItem(
        "adminToken",
        res.data.token
      );

      toast.success(
        "Login Successful"
      );

      navigate(
        "/admin/dashboard"
      );

    } catch (err) {
      toast.error(
        err.response?.data
          ?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      <form
        className="admin-login-card"
        onSubmit={login}
      >

        <img
          src={logo}
          alt=""
          className="login-logo"
        />

        <h1>
          Admin Login
        </h1>

        <div className="input-group">
          <FaEnvelope />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <FaLock />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button
          disabled={loading}
          className="login-btn"
        >
          {loading
            ? "Logging..."
            : "Login"}
        </button>

      </form>
    </div>
  );
}

export default AdminLogin;