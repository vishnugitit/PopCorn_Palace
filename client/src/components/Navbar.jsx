import React, { useState } from "react";
import logo from "../assets/logo.png";
import "./Navbar.css";

import {
  FaBars,
  FaTimes,
  FaHome,
  FaUtensils,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "Home",
      icon: <FaHome />,
      link: "/home",
    },
    {
      name: "Menu",
      icon: <FaUtensils />,
      link: "/menu",
    },
    {
      name: "Locations",
      icon: <FaMapMarkerAlt />,
      link: "/locations",
    },
    {
      name: "Contact",
      icon: <FaPhoneAlt />,
      link: "/contact",
    },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}

          <div className="logo-section">
            <img src={logo} alt="logo" className="logo-img" />

            <div className="brand">
              <h1>Popcorn Express</h1>

              <p>Fresh • Crunchy • Delicious</p>
            </div>
          </div>

          {/* Desktop Menu */}

          <div className="desktop-menu">
            {menuItems.map((item) => (
              <a key={item.name} href={item.link} className="nav-link">
                {item.icon}
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}

          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {isOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-inner">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="mobile-link"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
