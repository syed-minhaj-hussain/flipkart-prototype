import React from "react";
import { useCartConext } from "../../context/CartContext";
import wishlistStyle from "../wishlist/wishlist.module.css";

export const SaveForLater = () => {
  const {
    state: { products, saveLater },
    dispatch,
  } = useCartConext();

  return (
    <div className={wishlistStyle.container}>
      {" "}
      {saveLater?.length < 1 && (
        <h1
          style={{ fontWeight: "200", textAlign: "center", marginTop: "40vh" }}
        >
          Save Later is empty!
        </h1>
      )}{" "}
      <div className={wishlistStyle.grid}>
        {saveLater?.map(({ image, name, id }) => (
          <div key={id} className={wishlistStyle.card}>
            <div className={wishlistStyle.cardHead}>
              <img src={image} alt="" />
            </div>
            <div className={wishlistStyle.cardBody}>
              <h1>{name}</h1>

              <button
                className={wishlistStyle.btn}
                onClick={() =>
                  dispatch({ type: "REMOVE-FROM-SAVE-FOR-LATER", payload: id })
                }
              >
                Remove from Save Later
              </button>
              <button
                className={wishlistStyle.btn}
                onClick={() =>
                  dispatch({
                    type: "MOVE-FROM-SAVE-FOR-LATER-TO-CART",
                    payload: products.products?.find((item) => item.id === id),
                  })
                }
              >
                Move to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
