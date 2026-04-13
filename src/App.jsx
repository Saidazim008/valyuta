import React, { useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './home/Home';
import NotePage from './num/NotePage';
import './App.css';

const App = () => {

  const navigation = useNavigate();

  const [active, setActive] = useState(false);

  return (
    <div className="app-container">

      <h1>Hello my library</h1>

      <div className="button-group">

        <button onClick={() => setActive(true)}>Modalni ochish</button>

        <button onClick={() => navigation("/home")}>Click me</button>
      </div>

      {active && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Modal </h3>
            <p>Salom Hammaga</p>

            <button className="close-btn" onClick={() => setActive(false)}>
              Yopish
            </button>
          </div>
        </div>
      )}

      {/* Sahifa almashganda aynan mana shu qism o'zgaradi */}
      <Routes>

        {/* Asosiy kirish qismi */}
        <Route path="/" element={<Home />} />

        {/* Home sahifasi - Agar kamentga olinsa pastdagi NotePage chiqadi */}
        <Route path="/home" element={<Home />} />

        {/* Noto'g'ri manzil yozilsa yoki yuqoridagilar o'chirilsa ishlaydi */}
        <Route path="*" element={<NotePage />} />

      </Routes>
    </div>
  );
}

export default App;