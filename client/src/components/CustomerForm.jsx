import React, { useState } from "react";
import "./CustomerForm.css";

import { motion } from "framer-motion";

import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaArrowRight
} from "react-icons/fa";

import { toast } from "react-toastify";

import logo from "../assets/logo.png";

const CustomerForm = ({
  formData,
  setFormData,
  next
}) => {

  const [errors, setErrors] = useState({});

  const validate = () => {

    const newErrors = {};

    if (!formData.customer.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.customer.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^[6-9]\d{9}$/.test(
        formData.customer.phone
      )
    ) {
      newErrors.phone =
        "Enter valid phone number";
    }

    if (
      formData.customer.email &&
      !/^\S+@\S+\.\S+$/.test(
        formData.customer.email
      )
    ) {
      newErrors.email =
        "Invalid email address";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      customer: {
        ...formData.customer,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleSubmit = () => {

    if (!validate()) {
      toast.error(
        "Please fix validation errors"
      );
      return;
    }

    toast.success(
      "Customer details saved"
    );

    next();
  };

  return (
    <motion.div
      className="customer-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      {/* Logo */}

      <div className="logo-section">
        <img
          src={logo}
          alt="logo"
          className="logo"
        />

        <h1>
          Popcorn Express
        </h1>
      </div>

      {/* Progress */}

      <div className="progress-wrapper">

        <div className="progress-track">

          <div
            className="progress-fill"
            style={{
              width: "20%"
            }}
          />

        </div>

        <span>
          Step 1 of 5
        </span>

      </div>

      <div className="customer-card">

        <h2>
          Customer Details
        </h2>

        <p>
          Tell us who will receive
          the order.
        </p>

        {/* Name */}

        <div className="input-group">

          <FaUser className="icon" />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={
              formData.customer.name
            }
            onChange={handleChange}
          />

        </div>

        {errors.name && (
          <small className="error">
            {errors.name}
          </small>
        )}

        {/* Phone */}

        <div className="input-group">

          <FaPhone className="icon" />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={
              formData.customer.phone
            }
            onChange={handleChange}
          />

        </div>

        {errors.phone && (
          <small className="error">
            {errors.phone}
          </small>
        )}

        {/* Email */}

        <div className="input-group">

          <FaEnvelope className="icon" />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={
              formData.customer.email
            }
            onChange={handleChange}
          />

        </div>

        {errors.email && (
          <small className="error">
            {errors.email}
          </small>
        )}

        <button
          className="next-btn"
          onClick={handleSubmit}
        >
          Continue

          <FaArrowRight />
        </button>

      </div>

    </motion.div>
  );
};

export default CustomerForm;