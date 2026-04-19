import "./App.css";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import OrderDetails from "./pages/OrderDetails";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./pages/Contact";  

function App() {

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [themeOn, setThemeOn] = useState(() => {
    const saved = localStorage.getItem("themeOn");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    document.body.classList.toggle("theme-active", themeOn);
    localStorage.setItem("themeOn", themeOn);
  }, [themeOn]);

  return (
    

            
    <BrowserRouter>
      <Routes>
        <Route path="/" element=
        {<Home cart={cart} setCart={setCart} themeOn={themeOn} setThemeOn={setThemeOn} />} />

        <Route path="/cart" element=
        {<Cart cart={cart} setCart={setCart} />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/orders/:id" element={<OrderDetails />} />

        <Route path="/products/:id" element=
        {<ProductDetails cart={cart} setCart={setCart} />}  />

        <Route path="/checkout" element=
        {<Checkout cart={cart} setCart={setCart} />} />

        <Route path="/contact" element={<Contact />} />

      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        newestOnTop={true}
        closeOnClick
        pauseOnHover={false}
        transition={Slide}
        theme="light"
        toastStyle={{
          borderRadius: "20px",
          background: "#ffffff",
          color: "#111",
          boxShadow: "0 18px 40px rgba(0, 0, 0, 0.18)",
          fontWeight: 600,
        }}
      />
    </BrowserRouter>
  );
}
 

export default App;