import React from "react";
import "./PopcornSelector.css";
import popcornIcon from "../assets/logo.png";

import { motion } from "framer-motion";

import {
  FaArrowLeft,
  FaArrowRight,
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaFire,
} from "react-icons/fa";

// import { GiPopcorn } from "react-icons/gi";

import { toast } from "react-toastify";

import logo from "../assets/logo.png";

const MENU = [
  {
    id: 1,
    flavor: "Cheese",
    prices: {
      SNAP: 35,
      PRIME: 50,
      TITAN: 65,
    },
    popular: true,
  },

  {
    id: 2,
    flavor: "Caramel",
    prices: {
      SNAP: 40,
      PRIME: 60,
      TITAN: 80,
    },
  },

  {
    id: 3,
    flavor: "Classic Salted",
    prices: {
      SNAP: 25,
      PRIME: 35,
      TITAN: 45,
    },
  },

  {
    id: 4,
    flavor: "Spicy",
    prices: {
      SNAP: 30,
      PRIME: 40,
      TITAN: 55,
    },
  },
];

function PopcornSelector({ formData, setFormData, next, prev }) {
  const addItem = (flavor, size, price) => {
    const existing = formData.items.find(
      (item) => item.flavor === flavor && item.size === size,
    );

    let updatedItems;

    if (existing) {
      updatedItems = formData.items.map((item) =>
        item.flavor === flavor && item.size === size
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );
    } else {
      updatedItems = [
        ...formData.items,
        {
          flavor,
          size,
          quantity: 1,
          price,
        },
      ];
    }

    setFormData({
      ...formData,
      items: updatedItems,
    });

    toast.success(`${flavor} Added`);
  };

  const increaseQty = (flavor, size) => {
    const updated = formData.items.map((item) =>
      item.flavor === flavor && item.size === size
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item,
    );

    setFormData({
      ...formData,
      items: updated,
    });
  };

  const decreaseQty = (flavor, size) => {
    const updated = formData.items
      .map((item) => {
        if (item.flavor === flavor && item.size === size) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    setFormData({
      ...formData,
      items: updated,
    });
  };

  const total = formData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const goNext = () => {
    if (formData.items.length === 0) {
      toast.error("Add at least one popcorn");
      return;
    }

    next();
  };
const getQuantity = (flavor, size) => {
  const selectedItem = formData.items.find(
    (item) =>
      item.flavor === flavor &&
      item.size === size
  );

  return selectedItem
    ? selectedItem.quantity
    : 0;
};
  return (
    <div className="popcorn-page">
      {/* HEADER */}

      <div className="top-header">
        <img src={logo} alt="" className="logo" />

        <div>
          <h1>Popcorn Express</h1>

          <p>Fresh • Crunchy • Delicious</p>
        </div>
      </div>

      {/* PROGRESS */}

      <div className="progress-wrapper">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: "40%",
            }}
          />
        </div>

        <span>Step 2 of 5</span>
      </div>

      <div className="layout">
        {/* MENU */}

        <div className="menu-grid">
          {MENU.map((menu) => (
            <motion.div
              key={menu.id}
              whileHover={{
                scale: 1.03,
              }}
              className="menu-card"
            >
              {menu.popular && (
                <div className="popular">
                  <FaFire />
                  Popular
                </div>
              )}

              {/* <GiPopcorn
        className="popcorn-icon"
       /> */}

              <img
                src={popcornIcon}
                alt={menu.flavor}
                className="popcorn-icon-img"
              />
              <h3>{menu.flavor}</h3>

              <div className="sizes">
                {Object.entries(menu.prices).map(([size, price]) => (
                  //   <button
                  //    key={size}
                  //    className="size-btn"
                  //    onClick={() =>
                  //     addItem(
                  //      menu.flavor,
                  //      size,
                  //      price
                  //     )
                  //    }
                  //   >

                  //   <button
                  //     key={size}
                  //     className={`size-btn ${
                  //       formData.items.some(
                  //         (item) =>
                  //           item.flavor === menu.flavor && item.size === size,
                  //       )
                  //         ? "size-btn-selected"
                  //         : ""
                  //     }`}
                  //     onClick={() => addItem(menu.flavor, size, price)}
                  //   >
                  //     <span>{size}</span>

                  //     <strong>₹{price}</strong>
                  //   </button>

                  <button
                    key={size}
                    className={`size-btn ${
                      getQuantity(menu.flavor, size) > 0
                        ? "size-btn-selected"
                        : ""
                    }`}
                    onClick={() => addItem(menu.flavor, size, price)}
                  >
                    <div className="size-info">
                      <span>{size}</span>

                      <strong>₹{price}</strong>
                    </div>

                    {getQuantity(menu.flavor, size) > 0 && (
                      <div className="selected-badge">
                        ✓ Added x{getQuantity(menu.flavor, size)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CART */}

        <div className="cart">
          <div className="cart-header">
            <FaShoppingCart />

            <h3>Your Cart</h3>
          </div>

          {formData.items.length === 0 ? (
            <p>No items selected</p>
          ) : (
            formData.items.map((item, index) => (
              <div key={index} className="cart-item">
                <div>
                  <h4>{item.flavor}</h4>

                  <span>{item.size}</span>
                </div>

                <div className="qty">
                  <button onClick={() => decreaseQty(item.flavor, item.size)}>
                    <FaMinus />
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQty(item.flavor, item.size)}>
                    <FaPlus />
                  </button>
                </div>
              </div>
            ))
          )}

          <div className="total">Total: ₹{total}</div>

          <div className="actions">
            <button className="back-btn" onClick={prev}>
              <FaArrowLeft />
              Back
            </button>

            <button className="next-btn" onClick={goNext}>
              Next
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopcornSelector;
