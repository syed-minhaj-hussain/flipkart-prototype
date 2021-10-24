import React from "react";
import { useCartConext } from "../../context/CartContext";
import cartStyle from "./cart.module.css";

export const Cart = () => {
  const {
    state: { cart, products },
    dispatch,
  } = useCartConext();
  const getTotal = cart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const getTotalDiscount = cart.reduce(
    (acc, item) => acc + item.discount * item.quantity,
    0
  );
  return (
    <div className={cartStyle.container}>
      <div className={cartStyle.grid}>
        {cart.map(({ image, name, quantity, id, discount }) => (
          <div key={id} className={cartStyle.card}>
            <div className={cartStyle.cardHead}>
              <img src={image} alt="" />
            </div>
            <div className={cartStyle.cardBody}>
              <h1>{name}</h1>
              <div style={{ marginTop: "28%" }} className={cartStyle.controls}>
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
                ₹ {discount * quantity}
              </p>
              <button
                className={cartStyle.btn}
                onClick={() =>
                  dispatch({ type: "REMOVE-FROM-CART", payload: id })
                }
              >
                Remove from cart
              </button>
              <button
                className={cartStyle.btn}
                onClick={() =>
                  dispatch({
                    type: "ADD-TO-SAVE-FOR-LATER",
                    payload: products.products.find((item) => item.id === id),
                  })
                }
              >
                Save For Later
              </button>
            </div>
          </div>
        ))}
      </div>
      {cart?.length < 1 ? (
        <h1
          style={{ fontWeight: "200", textAlign: "center", marginTop: "40vh" }}
        >
          Cart is empty!
        </h1>
      ) : (
        <>
          <h1
            style={{
              fontWeight: "200",
              textAlign: "center",
              marginTop: "0.2rem",
            }}
          >
            Checkout
          </h1>
          <div
            style={{
              textAlign: "center",
              fontWeight: "200",
              fontSize: "2rem",
            }}
            className={cartStyle.total}
          >
            <div>
              <span className={cartStyle.left}>
                Price of ({cart.length} Item)
              </span>{" "}
              <span className={cartStyle.right}>{getTotal}</span>
            </div>
            <br />
            <div>
              <span className={cartStyle.left}> Discount :</span>{" "}
              <span className={cartStyle.right} style={{ color: "green" }}>
                - {getTotalDiscount}
              </span>{" "}
            </div>
            <br />
            <div>
              <span className={cartStyle.left}> Delivery Charges : </span>
              <span className={cartStyle.right} style={{ color: "green" }}>
                Free
              </span>{" "}
            </div>
            <br />
            <div>
              <span className={cartStyle.left}> Total Price =</span>{" "}
              <span style={{ fontWeight: "600" }} className={cartStyle.right}>
                ₹ {getTotal - getTotalDiscount}
              </span>
            </div>
            <br />
          </div>
        </>
      )}
    </div>
  );
};
