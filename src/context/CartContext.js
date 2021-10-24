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
      case "ADD-TO-SAVE-FOR-LATER":
        return {
          ...state,
          cart: state.cart?.filter((item) => item.id !== action.payload.id),
          saveLater: [...state.saveLater, action.payload],
        };
      case "REMOVE-FROM-SAVE-FOR-LATER":
        return {
          ...state,
          saveLater: state.saveLater?.filter(
            (item) => item.id !== action.payload
          ),
        };
      case "MOVE-FROM-SAVE-FOR-LATER-TO-CART":
        return {
          ...state,
          saveLater: state.saveLater?.filter(
            (item) => item.id !== action.payload.id
          ),
          cart: [...state.cart, action.payload],
        };
      default:
        break;
    }
  };
  const [state, dispatch] = useReducer(reducerFunc, {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
    saveLater: JSON.parse(localStorage.getItem("saveLater")) || [],
    products,
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
  }, [state.wishlist]);
  useEffect(() => {
    localStorage.setItem("saveLater", JSON.stringify(state.saveLater));
  }, [state.saveLater]);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartConext = () => useContext(CartContext);
