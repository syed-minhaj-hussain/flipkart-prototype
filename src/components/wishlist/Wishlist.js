import React from "react";
import { useCartConext } from "../../context/CartContext";
import wishlistStyle from "./wishlist.module.css";

export const Wishlist = () => {
  const {
    state: { cart, wishlist },
    dispatch,
  } = useCartConext();

  return (
    <div className={wishlistStyle.container}>
      {" "}
      {wishlist?.length < 1 && (
        <h1
          style={{ fontWeight: "200", textAlign: "center", marginTop: "40vh" }}
        >
          Wishlist is empty!
        </h1>
      )}{" "}
      <div className={wishlistStyle.grid}>
        {wishlist?.map(({ image, name, id }) => (
          <div key={id} className={wishlistStyle.card}>
            <div className={wishlistStyle.cardHead}>
              <img src={image} alt="" />
            </div>
            <div className={wishlistStyle.cardBody}>
              <h1>{name}</h1>

              <button
                className={wishlistStyle.btn}
                onClick={() =>
                  dispatch({ type: "REMOVE-FROM-WISHLIST", payload: id })
                }
              >
                Remove from wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
