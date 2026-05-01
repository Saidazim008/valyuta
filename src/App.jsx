import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Saidbar from "./component/saidbar/Saidbar";
import Home from "./pages/home/Home";
import Yangisahifa from "./component/yangisahifa/Yangisahifa";
import Header from "./component/header/Header";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* 1. Sidebar chap tomonda qotib turadi */}
      <Saidbar cartCount={cartItems.length} />

      {/* 2. O'ng tomon: Header va Kontent uchun alohida ustun */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Header tepada turadi */}
        <Header />

        {/* Sahifalar (Home, Discount va h.k.) pastda almashadi */}
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route
              path="/home"
              element={<Home onAddToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} />}
            />
            <Route
              path="/discount/:id"
              element={<Yangisahifa onAddToCart={addToCart} />}
            />
            <Route
              path="/"
              element={<Home onAddToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} />}
            />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;