import React from "react";
import "./HomePage.css";
import logo from "../assets/logo.png";

import {
  FaStar,
  FaShippingFast,
  FaAward,
  FaSmile,
} from "react-icons/fa";

function HomePage() {
  return (
    <div className="home-page">

      {/* Hero Section */}

      <section className="hero-section">

        <div className="hero-content">

          <h1>
            Fresh Popcorn
            <span> Delivered Fast 🍿</span>
          </h1>

          <p>
            Enjoy premium handcrafted popcorn
            with exciting flavors delivered
            straight to your doorstep.
          </p>

          <button
            className="hero-btn"
            onClick={() =>
              window.location.href = "/"
            }
          >
            Order Now
          </button>

        </div>

        <div className="hero-image">

          <img
            src={logo}
            alt="Popcorn"
          />

        </div>

      </section>

      {/* Popular Flavors */}

      <section className="flavor-section">

        <h2>Popular Flavors</h2>

        <div className="flavor-grid">

          <div className="flavor-card">
            <h3>🧀 Cheese</h3>
            <p>
              Rich creamy cheese flavor
              loved by everyone.
            </p>
          </div>

          <div className="flavor-card">
            <h3>🍯 Caramel</h3>
            <p>
              Sweet buttery caramel
              popcorn delight.
            </p>
          </div>

          <div className="flavor-card">
            <h3>🌶️ Spicy</h3>
            <p>
              Perfect blend of heat
              and crunch.
            </p>
          </div>

          <div className="flavor-card">
            <h3>🧂 Salted</h3>
            <p>
              Classic movie-time
              popcorn experience.
            </p>
          </div>

        </div>

      </section>

      {/* Why Choose Us */}

      <section className="why-section">

        <h2>Why Choose Us?</h2>

        <div className="why-grid">

          <div className="why-card">
            <FaShippingFast />

            <h3>Fast Delivery</h3>

            <p>
              Get your popcorn
              delivered quickly.
            </p>
          </div>

          <div className="why-card">
            <FaAward />

            <h3>Premium Quality</h3>

            <p>
              Fresh ingredients
              every single day.
            </p>
          </div>

          <div className="why-card">
            <FaSmile />

            <h3>Happy Customers</h3>

            <p>
              Thousands of satisfied
              popcorn lovers.
            </p>
          </div>

        </div>

      </section>

      {/* Reviews */}

      <section className="review-section">

        <h2>Customer Reviews</h2>

        <div className="review-grid">

          <div className="review-card">

            <FaStar className="star" />

            <p>
              Best popcorn I've ever had.
              Fast delivery and amazing taste.
            </p>

            <h4>- Rahul</h4>

          </div>

          <div className="review-card">

            <FaStar className="star" />

            <p>
              Caramel flavor is absolutely
              delicious.
            </p>

            <h4>- Priya</h4>

          </div>

          <div className="review-card">

            <FaStar className="star" />

            <p>
              Great quality and affordable
              pricing.
            </p>

            <h4>- Vishnu</h4>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="cta-section">

        <h2>
          Ready For Your Next Snack?
        </h2>

        <button
          className="cta-btn"
          onClick={() =>
            window.location.href = "/"
          }
        >
          Order Popcorn Now
        </button>

      </section>

    </div>
  );
}

export default HomePage;