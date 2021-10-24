import { useState } from "react";
import homeStyle from "./App.module.css";
import { ProductListing } from "./components/product-listing/ProductListing";
import { useCartConext } from "./context/CartContext";
import { Cart } from "./components/cart/Cart";
import { Wishlist } from "./components/wishlist/Wishlist";

function App() {
  const {
    state: { cart, wishlist },
  } = useCartConext();
  const [route, setRoute] = useState("products");
  return (
    <div className="App">
      <div className={homeStyle.nav}>
        <button
          onClick={() => setRoute("products")}
          className={`${route === "products" && homeStyle.active}  ${
            homeStyle.btn
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setRoute("cart")}
          className={`${route === "cart" && homeStyle.active} ${homeStyle.btn}`}
        >
          Cart{" "}
          <span
            style={{
              backgroundColor: "darkgray",
              color: "#fff",
              padding: "0.25rem",
              borderRadius: "50%",
              textAlign: "right",
            }}
          >
            {" "}
            {cart.length}
          </span>
        </button>
        <button
          onClick={() => setRoute("wishlist")}
          className={`${route === "wishlist" && homeStyle.active} ${
            homeStyle.btn
          }`}
        >
          Wishlist{" "}
          <span
            style={{
              backgroundColor: "darkgray",
              color: "#fff",
              padding: "0.25rem",
              borderRadius: "50%",
              textAlign: "right",
            }}
          >
            {" "}
            {wishlist.length}
          </span>
        </button>
      </div>
      {route === "products" && <ProductListing />}
      {route === "cart" && <Cart />}
      {route === "wishlist" && <Wishlist />}
    </div>
  );
}

export default App;
