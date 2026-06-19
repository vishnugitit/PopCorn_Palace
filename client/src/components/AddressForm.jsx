import React, { useState } from "react";
import "./AddressForm.css";

import { motion } from "framer-motion";

import {
  FaMapMarkerAlt,
  FaCity,
  FaLandmark,
  FaArrowLeft,
  FaArrowRight,
  FaMapPin
} from "react-icons/fa";

import { toast } from "react-toastify";

import logo from "../assets/logo.png";

function AddressForm({
  formData,
  setFormData,
  next,
  prev
}) {

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    setFormData({
      ...formData,
      addressInfo: {
        ...formData.addressInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  const validate = () => {

    const newErrors = {};

    if (!formData.addressInfo.address.trim()) {
      newErrors.address =
        "Address is required";
    }

    if (!formData.addressInfo.city.trim()) {
      newErrors.city =
        "City is required";
    }

    if (
      !/^[0-9]{6}$/.test(
        formData.addressInfo.pincode
      )
    ) {
      newErrors.pincode =
        "Enter valid 6 digit pincode";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleNext = () => {

    if (!validate()) {

      toast.error(
        "Please complete address details"
      );

      return;
    }

    toast.success(
      "Address Saved"
    );

    next();
  };

  return (

    <motion.div
      className="address-container"
      initial={{
        opacity: 0,
        y: 30
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: .4
      }}
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
              width: "60%"
            }}
          />

        </div>

        <span>
          Step 3 of 5
        </span>

      </div>

      <div className="address-card">

        <h2>
          Delivery Address
        </h2>

        <p>
          Tell us where to deliver
          your popcorn.
        </p>

        {/* Address */}

        <div className="input-group">

          <FaMapMarkerAlt
            className="icon"
          />

          <textarea
            name="address"
            placeholder="Full Address"
            value={
              formData.addressInfo.address
            }
            onChange={handleChange}
          />

        </div>

        {errors.address && (
          <small className="error">
            {errors.address}
          </small>
        )}

        {/* Landmark */}

        <div className="input-group">

          <FaLandmark
            className="icon"
          />

          <input
            name="landmark"
            placeholder="Landmark"
            value={
              formData.addressInfo.landmark
            }
            onChange={handleChange}
          />

        </div>

        {/* City */}

        <div className="input-group">

          <FaCity
            className="icon"
          />

          <input
            name="city"
            placeholder="City"
            value={
              formData.addressInfo.city
            }
            onChange={handleChange}
          />

        </div>

        {errors.city && (
          <small className="error">
            {errors.city}
          </small>
        )}

        {/* Pincode */}

        <div className="input-group">

          <FaMapPin
            className="icon"
          />

          <input
            name="pincode"
            maxLength="6"
            placeholder="Pincode"
            value={
              formData.addressInfo.pincode
            }
            onChange={handleChange}
          />

        </div>

        {errors.pincode && (
          <small className="error">
            {errors.pincode}
          </small>
        )}

        <div className="button-group">

          <button
            className="back-btn"
            onClick={prev}
          >
            <FaArrowLeft />
            Back
          </button>

          <button
            className="next-btn"
            onClick={handleNext}
          >
            Next
            <FaArrowRight />
          </button>

        </div>

      </div>

    </motion.div>
  );
}

export default AddressForm;