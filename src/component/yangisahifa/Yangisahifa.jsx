import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import "./yangisahifa.css";

const Yangisahifa = ({ onAddToCart }) => {
    const { id } = useParams();
    const location = useLocation();
    const offer = location.state?.offer;

    if (!offer) {
        return (
            <div style={{ padding: "100px", textAlign: "center", marginLeft: "250px" }}>
                <h2>❌ Mahsulot topilmadi</h2>
                <Link to="/home">⬅ Home ga qaytish</Link>
            </div>
        );
    }

    return (
        <div className="home-layout" style={{ paddingTop: "100px" }}>
            <div className="container">
                <Link to="/home" className="back-btn" style={{ textDecoration: "none", color: "#00ff95", fontWeight: "bold", fontSize: "18px" }}>
                    ← Orqaga qaytish
                </Link>

                <div className="discount-card" style={{ backgroundColor: offer.bgColor, marginTop: "20px", cursor: "default", padding: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "20px" }}>
                    <div className="discount-info" style={{ flex: 1 }}>
                        <span className="discount-percent" style={{ background: "#27ae60", color: "#fff", padding: "5px 15px", borderRadius: "20px", fontSize: "14px" }}>
                            {offer.discount} CHEGIRMA
                        </span>
                        <h1 style={{ fontSize: "40px", margin: "20px 0", color: "#333" }}>{offer.name}</h1>
                        <p style={{ fontSize: "18px", color: "#666", marginBottom: "20px" }}>{offer.desc}</p>

                        <ul style={{ marginBottom: "30px", padding: 0 }}>
                            {offer.features?.map((item, i) => (
                                <li key={i} style={{ listStyle: "none", fontSize: "16px", margin: "10px 0", color: "#444" }}>✔ {item}</li>
                            ))}
                        </ul>

                        <div style={{ display: "flex", alignItems: "center", gap: "25px", marginBottom: "30px" }}>
                            <h2 style={{ fontSize: "36px", color: "#222" }}>${offer.price}</h2>
                            <del style={{ color: "gray", fontSize: "20px" }}>${offer.oldPrice}</del>
                        </div>

                        <button
                            className="save-btn-main"
                            style={{ width: "250px", height: "55px", fontSize: "18px" }}
                            onClick={() => { onAddToCart(offer); alert("Savatga qo‘shildi!"); }}
                        >
                            Savatga qo‘shish
                        </button>
                    </div>

                    <div className="discount-img" style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                        <img src={offer.img} alt={offer.name} style={{ maxWidth: "350px", height: "auto", filter: "drop-shadow(10px 10px 20px rgba(0,0,0,0.1))" }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Yangisahifa;