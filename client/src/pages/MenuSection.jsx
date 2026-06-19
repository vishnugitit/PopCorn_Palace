import React from "react";
import "./MenuSection.css";

import logo from "../assets/logo.png";

import snapImg from "../assets/snap.png";
import primeImg from "../assets/prime.png";
import titanImg from "../assets/titan.png";

const MENU = [
  {
    title: "SNAP",
    size: "Small Bucket",
    image: snapImg,
    color: "snap",
    items: [
      { flavor: "Cheese", price: 35 },
      { flavor: "Caramel", price: 40 },
      { flavor: "Classic Salted", price: 25 },
      { flavor: "Spicy", price: 30 },
    ],
  },

  {
    title: "PRIME",
    size: "Medium Bucket",
    image: primeImg,
    color: "prime",
    items: [
      { flavor: "Cheese", price: 50 },
      { flavor: "Caramel", price: 60 },
      { flavor: "Classic Salted", price: 35 },
      { flavor: "Spicy", price: 40 },
    ],
  },

  {
    title: "TITAN",
    size: "Large Bucket",
    image: titanImg,
    color: "titan",
    items: [
      { flavor: "Cheese", price: 65 },
      { flavor: "Caramel", price: 80 },
      { flavor: "Classic Salted", price: 45 },
      { flavor: "Spicy", price: 55 },
    ],
  },
];

function MenuSection() {
  return (
    <section id="menu" className="menu-section">

      <div className="menu-header">

        <img
          src={logo}
          alt="logo"
          className="menu-logo"
        />

        <h2>🍿 Popcorn Palace Menu</h2>

        <p>
          Freshly Prepared | Hot & Crispy |
          Delivered To Your Doorstep
        </p>

      </div>

      <div className="menu-grid">

        {MENU.map((bucket) => (

          <div
            key={bucket.title}
            className={`menu-card ${bucket.color}`}
          >

            <div className="menu-top">

              <img
                src={bucket.image}
                alt={bucket.title}
              />

              <h3>{bucket.title}</h3>

              <span>{bucket.size}</span>

            </div>

            <div className="menu-body">

              {bucket.items.map((item) => (

                <div
                  key={item.flavor}
                  className="menu-item"
                >

                  <span>
                    {item.flavor}
                  </span>

                  <strong>
                    ₹{item.price}
                  </strong>

                </div>

              ))}

              {/* <button
                className="order-btn"
                onClick={() =>
                  document
                    .getElementById("order")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Order Now
              </button> */}
              <button
            className="order-btn"
            onClick={() =>
              window.location.href = "/"
            }
          >
            Order Now
          </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default MenuSection;