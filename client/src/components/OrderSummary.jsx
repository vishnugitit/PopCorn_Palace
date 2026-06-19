import React, { useState } from "react";
import "./OrderSummary.css";

import { motion } from "framer-motion";

import {
  FaArrowLeft,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaMoneyBillWave,
  FaShoppingBag,
} from "react-icons/fa";

import { toast } from "react-toastify";

import logo from "../assets/logo.png";
import api from "../services/api";

function OrderSummary({ formData, prev, navigate }) {
  const [loading, setLoading] = useState(false);

  const totalAmount = formData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryFee = 20;

  const grandTotal = totalAmount + deliveryFee;

  //   const placeOrder = async () => {
  //     setLoading(true);

  //     // const payload = {
  //     //   customer: formData.customer,

  //     //   address: formData.addressInfo.address,

  //     //   paymentMethod: formData.paymentMethod,

  //     //   items: formData.items,

  //     //   totalAmount: grandTotal,
  //     // };
  //     const payload = {
  //       customer: formData.customer,

  //       addressInfo: {
  //         address: formData.addressInfo.address,
  //         landmark: formData.addressInfo.landmark,
  //         city: formData.addressInfo.city,
  //         pincode: formData.addressInfo.pincode,
  //         deliveryDate: formData.addressInfo.deliveryDate,
  //       },

  //       paymentMethod: formData.paymentMethod,

  //       items: formData.items,

  //       totalAmount,
  //     };

  //     try {
  //       const res = await api.post("/orders", payload);

  //       toast.success("Order Placed Successfully");

  //       navigate(`/success/${res.data.orderId}`);

  //       //   }catch (err) {
  //       console.error(err);

  //       toast.error(
  //         err?.response?.data?.message || err.message || "Failed to place order",
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const placeOrder = async () => {
    setLoading(true);

    const payload = {
      customer: formData.customer,

      addressInfo: {
        address: formData.addressInfo.address,
        landmark: formData.addressInfo.landmark,
        city: formData.addressInfo.city,
        pincode: formData.addressInfo.pincode,
        deliveryDate: formData.addressInfo.deliveryDate,
      },

      paymentMethod: formData.paymentMethod,

      items: formData.items,

      totalAmount: grandTotal,
    };

    try {
      console.log("Payload:", payload);

      const res = await api.post("/orders", payload);

      toast.success("Order Placed Successfully 🎉");

      navigate(`/success/${res.data.orderId}`);
    } catch (err) {
      console.error("Order Error:", err.response?.data || err);

      toast.error(err?.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.div
      className="summary-page"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      {/* Header */}

      <div className="summary-header">
        <img src={logo} alt="" className="logo" />

        <div>
          <h1>Popcorn Express</h1>

          <p>Review Your Order</p>
        </div>
      </div>

      {/* Progress */}

      <div className="progress-wrapper">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: "100%",
            }}
          />
        </div>

        <span>Step 5 of 5</span>
      </div>

      <div className="summary-grid">
        {/* LEFT */}

        <div>
          {/* Customer */}

          <div className="card">
            <h3>
              <FaUser />
              Customer Details
            </h3>

            <p>{formData.customer.name}</p>

            <p>
              <FaPhone /> {formData.customer.phone}
            </p>
          </div>

          {/* Address */}

          <div className="card">
            <h3>
              <FaMapMarkerAlt />
              Delivery Address
            </h3>

            <p>{formData.addressInfo.address}</p>

            <p>{formData.addressInfo.city}</p>
          </div>

          {/* Payment */}

          <div className="card">
            <h3>
              <FaMoneyBillWave />
              Payment Method
            </h3>

            <p>{formData.paymentMethod}</p>
          </div>
        </div>

        {/* RIGHT */}

        <div className="card">
          <h3>
            <FaShoppingBag />
            Order Items
          </h3>

          {formData.items.map((item, index) => (
            <div key={index} className="order-item">
              <div>
                <strong>{item.flavor}</strong>

                <p>{item.size}</p>
              </div>

              <div>
                Qty: {item.quantity}
                <br />₹{item.price * item.quantity}
              </div>
            </div>
          ))}

          <div className="bill">
            <div>
              <span>Items Total</span>

              <span>₹{totalAmount}</span>
            </div>

            <div>
              <span>Delivery Fee</span>

              <span>₹20</span>
            </div>

            <div className="grand-total">
              <span>Grand Total</span>

              <span>₹{grandTotal}</span>
            </div>
          </div>

          <div className="actions">
            <button className="back-btn" onClick={prev}>
              <FaArrowLeft />
              Back
            </button>

            <button
              className="place-btn"
              onClick={placeOrder}
              disabled={loading}
            >
              {loading ? (
                "Placing..."
              ) : (
                <>
                  <FaCheckCircle />
                  Place Order
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default OrderSummary;
