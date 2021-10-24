import React, { createContext, useContext, useReducer, useEffect } from "react";
import products from "../productsDB.json";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "ADD-TO-CART":
        return { ...state, cart: [...state.cart, action.payload] };
      case "REMOVE-FROM-CART":
        return {
          ...state,
          cart: state.cart?.filter((product) => product.id !== action.payload),
        };
      case "ADD-TO-WISHLIST":
        return { ...state, wishlist: [...state.wishlist, action.payload] };
      case "REMOVE-FROM-WISHLIST":
        return {
          ...state,
          wishlist: state.wishlist?.filter(
            (product) => product.id !== action.payload
          ),
        };
      case "INCREMENT":
        return {
          ...state,
          cart: state.cart?.map((product) =>
            product.id === action.payload
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        };
      case "DECREMENT":
        return {
          ...state,
          cart: state.cart?.map((product) =>
            product.id === action.payload
              ? {
                  ...product,
                  quantity: product.quantity === 1 ? 1 : product.quantity - 1,
                }
              : product
          ),
        };
      default:
        break;
    }
  };
  const [state, dispatch] = useReducer(reducerFunc, {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
    products,
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
  }, [state.wishlist]);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartConext = () => useContext(CartContext);
