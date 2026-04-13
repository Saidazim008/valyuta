import React from 'react';
import { useNavigate } from 'react-router-dom';
import './notepage.css';

const NotePage = () => {
  const navigation = useNavigate();
  return (
    <div className="error-box">
      <h1>Bunday sahifa mavjud emas</h1>
      {/* navigation(-1) - bu bir qadam orqaga qaytarish buyrug'i */}
      <button className="back-btn" onClick={() => navigation(-1)}>Orqaga</button>
    </div>
  );
};

export default NotePage;