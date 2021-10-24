import React from "react";
import { useCartConext } from "../../context/CartContext";
import cartStyle from "./cart.module.css";

export const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = useCartConext();
  const getTotal = cart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className={cartStyle.container}>
      {cart?.length < 1 ? (
        <h1
          style={{ fontWeight: "200", textAlign: "center", marginTop: "40vh" }}
        >
          Cart is empty!
        </h1>
      ) : (
        <h1
          style={{ textAlign: "center", fontWeight: "200", fontSize: "2rem" }}
        >
          Total Price = <span style={{ fontWeight: "bold" }}> {getTotal}</span>
        </h1>
      )}
      <div className={cartStyle.grid}>
        {cart.map(({ image, name, quantity, id, price }) => (
          <div key={id} className={cartStyle.card}>
            <div className={cartStyle.cardHead}>
              <img src={image} alt="" />
            </div>
            <div className={cartStyle.cardBody}>
              <h1>{name}</h1>
              <div style={{ marginTop: "28%" }}>
                <button
                  className={cartStyle.increment}
                  onClick={() => dispatch({ type: "INCREMENT", payload: id })}
                >
                  +
                </button>
                {quantity}
                <button
                  className={cartStyle.decrement}
                  onClick={() => dispatch({ type: "DECREMENT", payload: id })}
                >
                  -
                </button>
              </div>
              <p style={{ marginLeft: "1rem", marginTop: "0.25rem" }}>
                ₹ {price * quantity}
              </p>
              <button
                className={cartStyle.btn}
                onClick={() =>
                  dispatch({ type: "REMOVE-FROM-CART", payload: id })
                }
              >
                Remove from cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
