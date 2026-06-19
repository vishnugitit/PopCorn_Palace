import React from "react";
import "./PaymentForm.css";

import { motion } from "framer-motion";

import {
  FaMoneyBillWave,
  FaCreditCard,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle
} from "react-icons/fa";

import { SiGooglepay, SiPhonepe, SiPaytm } from "react-icons/si";

import { toast } from "react-toastify";

import logo from "../assets/logo.png";

const PAYMENT_OPTIONS = [
  {
    id: "COD",
    title: "Cash On Delivery",
    icon: <FaMoneyBillWave />
  },
  {
    id: "UPI",
    title: "UPI Payment",
    icon: <SiGooglepay />
  },
  {
    id: "CARD",
    title: "Credit / Debit Card",
    icon: <FaCreditCard />
  }
];

function PaymentForm({
  formData,
  setFormData,
  next,
  prev
}) {

  const handleNext = () => {

    if (!formData.paymentMethod) {
      toast.error(
        "Please select a payment method"
      );
      return;
    }

    toast.success(
      "Payment method selected"
    );

    next();
  };

  return (
    <motion.div
      className="payment-container"
      initial={{
        opacity: 0,
        y: 20
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
              width: "80%"
            }}
          />

        </div>

        <span>
          Step 4 of 5
        </span>

      </div>

      <div className="payment-card">

        <h2>
          Choose Payment Method
        </h2>

        <p>
          Select how you'd like
          to pay for your order.
        </p>

        <div className="payment-grid">

          {PAYMENT_OPTIONS.map(
            option => (

              <motion.div
                key={option.id}
                whileHover={{
                  scale: 1.03
                }}
                whileTap={{
                  scale: .98
                }}
                className={`payment-option ${
                  formData.paymentMethod ===
                  option.id
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    paymentMethod:
                      option.id
                  })
                }
              >

                <div className="payment-icon">
                  {option.icon}
                </div>

                <div>

                  <h3>
                    {option.title}
                  </h3>

                </div>

                {formData.paymentMethod ===
                  option.id && (

                  <FaCheckCircle
                    className="check-icon"
                  />

                )}

              </motion.div>

            )
          )}

        </div>

        {/* UPI Apps Preview */}

        {formData.paymentMethod ===
          "UPI" && (

          <div className="upi-apps">

            <h4>
              Supported UPI Apps
            </h4>

            <div className="upi-icons">

              <SiGooglepay />
              <SiPhonepe />
              <SiPaytm />

            </div>

          </div>

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
            Review Order
            <FaArrowRight />
          </button>

        </div>

      </div>

    </motion.div>
  );
}

export default PaymentForm;