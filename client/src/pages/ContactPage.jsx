import React, { useState } from "react";
import "./ContactPage.css";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";

import { toast } from "react-toastify";

import api from "../services/api";
import logo from "../assets/logo.png";

function ContactPage() {
  const [loading, setLoading] =
    useState(false);

const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  rating: "5",
  message: "",
});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await api.post(
          "/contact/send",
          form
        );

        toast.success(
          "Message Sent Successfully"
        );

        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } catch (err) {
        toast.error(
          err?.response?.data
            ?.message ||
            "Failed to send message"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <section
      id="contact"
      className="contact-page"
    >
      <div className="contact-container">

        {/* LEFT */}

        <div className="contact-left">

          <img
            src={logo}
            alt="logo"
            className="contact-logo"
          />

          <h2>
            Contact Popcorn Palace
          </h2>

          <p>
            Have questions, feedback,
            franchise enquiries or
            support requests?
            We'd love to hear from you.
          </p>

          <div className="contact-info">

            <div className="info-card">
              <FaPhoneAlt />
              <div>
                <h4>Phone</h4>
                <p>
                  +91 7989006946
                </p>
              </div>
            </div>

            <div className="info-card">
              <FaEnvelope />
              <div>
                <h4>Email</h4>
                <p>
                  support@popcornpalace.com
                </p>
              </div>
            </div>

            <div className="info-card">
              <FaMapMarkerAlt />
              <div>
                <h4>Location</h4>
                <p>
                  Kavali,
                  Andhra Pradesh
                </p>
              </div>
            </div>

            <div className="info-card">
              <FaClock />
              <div>
                <h4>Working Hours</h4>
                <p>
                  9 AM - 10 PM
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT */}

        <div className="contact-right">

          <form
            onSubmit={
              handleSubmit
            }
            className="contact-form"
          >

       <h3>🍿 Customer Feedback</h3>

<p className="feedback-subtitle">
Your feedback helps us improve our products
and customer experience.
</p>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={
                handleChange
              }
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={
                handleChange
              }
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={
                handleChange
              }
              required
            />

<select
  name="rating"
  value={form.rating}
  onChange={handleChange}
>
  <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
  <option value="4">⭐⭐⭐⭐ Good</option>
  <option value="3">⭐⭐⭐ Average</option>
  <option value="2">⭐⭐ Poor</option>
  <option value="1">⭐ Very Poor</option>
</select>
            <textarea
              rows="6"
              name="message"
              placeholder="Write your message..."
              value={
                form.message
              }
              onChange={
                handleChange
              }
              required
            />
            

            <button
              type="submit"
              disabled={loading}
            >
              <FaPaperPlane />

              {loading
                ? "Sending..."
                : "Send Message"}
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default ContactPage;