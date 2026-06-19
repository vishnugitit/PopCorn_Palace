import React from "react";
import "./SuccessPage.css";

import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

import {
  FaCheckCircle,
  FaShoppingBag,
  FaHome,
  FaClock
} from "react-icons/fa";

import logo from "../assets/logo.png";

function SuccessPage() {

  const { orderId } = useParams();

  const navigate = useNavigate();

  return (

    <div className="success-page">

      {/* Floating Background */}

      <div className="success-bg-circle circle1" />
      <div className="success-bg-circle circle2" />

      <motion.div
        className="success-card"
        initial={{
          opacity: 0,
          scale: 0.8
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 0.5
        }}
      >

        <img
          src={logo}
          alt="logo"
          className="success-logo"
        />

        <motion.div
          initial={{
            scale: 0
          }}
          animate={{
            scale: 1
          }}
          transition={{
            delay: .3
          }}
        >

          <FaCheckCircle
            className="success-icon"
          />

        </motion.div>

        <h1>
          Order Placed Successfully
        </h1>

        <p className="success-message">

          Your delicious popcorn is
          being freshly prepared.

        </p>

        <div className="order-id-card">

          <span>
            Order ID
          </span>

          <h2>
            #{orderId}
          </h2>

        </div>

        <div className="delivery-info">

          <FaClock />

          <span>
            Estimated Delivery:
            20 - 30 Minutes
          </span>

        </div>

        <div className="action-buttons">

          <button
            className="home-btn"
            onClick={() =>
              navigate("/")
            }
          >
            <FaHome />
            Order More
          </button>

          <button
            className="track-btn"
          >
            <FaShoppingBag />
            Track Order
          </button>

        </div>

      </motion.div>

    </div>

  );
}

export default SuccessPage;