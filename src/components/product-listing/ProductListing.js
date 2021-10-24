import React from "react";
import { useCartConext } from "../../context/CartContext";
import productStyle from "./product.module.css";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";

export const ProductListing = () => {
  const {
    state: { products, cart, wishlist },
    dispatch,
  } = useCartConext();
  return (
    <div className={productStyle.container}>
      <div className={productStyle.grid}>
        {products.products?.map(
          ({ id, name, price, discount, image, brand }) => (
            <div key={id} className={productStyle.card}>
              <div style={{ position: "relative", zIndex: "1" }}>
                <img src={image} alt="brand" />
                <button
                  style={{
                    position: "absolute",
                    zIndex: "3",
                    color: "black",
                    right: "8px",
                    top: "8px",
                    fontSize: "1.25rem",
                    border: "none",
                    backgroundColor: "inherit",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    wishlist.find((item) => item.id === id)
                      ? dispatch({ type: "REMOVE-FROM-WISHLIST", payload: id })
                      : dispatch({
                          type: "ADD-TO-WISHLIST",
                          payload: products.products.find(
                            (product) => product.id === id
                          ),
                        });
                  }}
                >
                  {" "}
                  {wishlist.find((product) => product.id === id) ? (
                    <RiHeartFill />
                  ) : (
                    <RiHeartLine />
                  )}
                </button>
              </div>
              <div className={productStyle.cardBody}>
                <p className={productStyle.brand}>{brand}</p>
                <h1 className={productStyle.name}>{name}</h1>
                <p className={productStyle.price}>
                  ₹ {discount}{" "}
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "gray",
                      marginLeft: "1.5rem",
                    }}
                  >
                    {" "}
                    ₹ {price}
                  </span>
                  <span className={productStyle.discount}>
                    {Math.floor(Math.abs(((price - discount) / price) * 100))} %
                    off
                  </span>
                </p>
                <button
                  className={productStyle.btn}
                  onClick={() => {
                    cart?.find((product) => product.id === id)
                      ? dispatch({
                          type: "REMOVE-FROM-CART",
                          payload: id,
                        })
                      : dispatch({
                          type: "ADD-TO-CART",
                          payload: products.products.find(
                            (product) => product.id === id
                          ),
                        });
                  }}
                >
                  {cart?.find((product) => product.id === id)
                    ? "Remove from cart"
                    : "Add to cart"}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
