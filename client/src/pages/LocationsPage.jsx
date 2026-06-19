import React from "react";
import "./LocationsPage.css";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaMotorcycle,
} from "react-icons/fa";

const LOCATIONS = [
  {
    city: "Kavali",
    address:
      "Near RTC Bus Stand, Kavali, Andhra Pradesh",
    phone: "+91 7989006946",
    timing: "9:00 AM - 10:00 PM",
  },

  {
    city: "Nellore",
    address:
      "Magunta Layout, Nellore, Andhra Pradesh",
    phone: "+91 9876543210",
    timing: "9:00 AM - 10:00 PM",
  },

  {
    city: "Tirupati",
    address:
      "AIR Bypass Road, Tirupati, Andhra Pradesh",
    phone: "+91 9123456780",
    timing: "9:00 AM - 11:00 PM",
  },
];

function LocationsPage() {
  return (
    <section
      id="locations"
      className="locations-page"
    >
      <div className="locations-header">

        <h2>
          📍 Our Locations
        </h2>

        <p>
          Fresh popcorn delivered
          near you.
        </p>

      </div>

      <div className="locations-grid">

        {LOCATIONS.map((location, index) => (

          <div
            key={index}
            className="location-card"
          >

            <div className="location-top">

              <FaMapMarkerAlt />

              <h3>
                {location.city}
              </h3>

            </div>

            <div className="location-body">

              <p>
                <FaMapMarkerAlt />
                {location.address}
              </p>

              <p>
                <FaPhoneAlt />
                {location.phone}
              </p>

              <p>
                <FaClock />
                {location.timing}
              </p>

              <p>
                <FaMotorcycle />
                Delivery Available
              </p>

            </div>

           <button
            className="hero-btn"
            onClick={() =>
              window.location.href = "/"
            }
          >
            Order Now
          </button>

          </div>

        ))}

      </div>
    </section>
  );
}

export default LocationsPage;