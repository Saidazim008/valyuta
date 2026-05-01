import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiShoppingBasketLine } from "react-icons/ri";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import "./home.css";

// BARCHA RASMLAR
import sabzavot from "../../assets/image copy.png";
import non from "../../assets/image copy 2.png";
import karam from "../../assets/image copy 3.png";
import baliq from "../../assets/image copy 4.png";
import gosht from "../../assets/image copy 5.png";
import ichimlik from "../../assets/image copy 6.png";
import sakkizoyoq from "../../assets/image copy 7.png";
import muzqaymoq from "../../assets/image copy 8.png";
import lemonat from "../../assets/image copy 9.png";
import murabbo from "../../assets/image copy 10.png";
import qulupnay from "../../assets/image copy 11.png";
import kattakaram from "../../assets/image copy 12.png";
import gulkaram from "../../assets/image copy 13.png";
import mandarin from "../../assets/image copy 14.png";
import olma from "../../assets/image copy 15.png";
import sabzavotlar_offer from "../../assets/image copy 16.png";
import arava_offer from "../../assets/image copy 17.png";
import tuplam_offer from "../../assets/image copy 18.png";

const Home = ({ onAddToCart, cartItems = [], setCartItems }) => {
  const [liked, setLiked] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [phone, setPhone] = useState("+998");

  const toggleLike = (id) => {
    if (liked.includes(id)) {
      setLiked(liked.filter((item) => item !== id));
    } else {
      setLiked([...liked, id]);
      alert("Siz buni tanladingiz!");
    }
  };

  const handleFinalOrder = (e) => {
    e.preventDefault();
    if (phone.length !== 13) {
      alert("Telefon raqami 13 ta bo'lishi shart!");
      return;
    }
    alert("Buyurtma qabul qilindi!");
    setCartItems([]);
    setIsOrderModalOpen(false);
    setIsCartOpen(false);
  };

  const categories = [
    { id: 1, name: "Fruits", img: sabzavot },
    { id: 2, name: "Bakery", img: non },
    { id: 3, name: "Cabbage", img: karam },
    { id: 4, name: "Fish", img: baliq },
    { id: 5, name: "Meat", img: gosht },
    { id: 6, name: "Drinks", img: ichimlik },
    { id: 7, name: "Seafood", img: sakkizoyoq },
    { id: 8, name: "Ice Cream", img: muzqaymoq },
    { id: 9, name: "Lemonade", img: lemonat },
    { id: 10, name: "Jam", img: murabbo }
  ];

  const products = [
    { id: 1, name: "Strawberry", price: "15.00", img: qulupnay },
    { id: 2, name: "Big Cabbage", price: "8.00", img: kattakaram },
    { id: 3, name: "Cauliflower", price: "10.00", img: gulkaram },
    { id: 4, name: "Mandarin", price: "12.00", img: mandarin },
    { id: 5, name: "Red Apple", price: "5.00", img: olma }
  ];

  const specialOffers = [
    {
      id: 1,
      name: "Sabzavotlar to'plami",
      discount: "35%",
      img: sabzavotlar_offer,
      bgColor: "#f3f9f5",
      price: "25.00",
      oldPrice: "38.00",
      desc: "Ushbu to'plam haftalik vitamin ehtiyojingizni qoplash uchun maxsus saralangan.",
      features: ["100% Organik", "Dala hovlidan yangi"]
    },
    {
      id: 2,
      name: "Arava xaridi",
      discount: "20%",
      img: arava_offer,
      bgColor: "#fef5ee",
      price: "120.00",
      oldPrice: "150.00",
      desc: "Katta savatdagi barcha mahsulotlar uchun 20% chegirma!",
      features: ["Bepul yetkazib berish", "Keshbek tizimi"]
    },
    {
      id: 3,
      name: "Maxsus to'plam",
      discount: "10%",
      img: tuplam_offer,
      bgColor: "#f3f3fe",
      price: "45.00",
      oldPrice: "50.00",
      desc: "Premium darajadagi saralangan mahsulotlar to'plami.",
      features: ["Premium sifat", "Sovg'abop qadoq"]
    }
  ];

  return (
    <div className="home-layout">
      <main className="home-main">
        <div className="container">
          <div className="categors-qisim">
            <h3>Categories</h3>
            <div className="flex-box">
              <div className="basket-wrapper" onClick={() => setIsCartOpen(true)} style={{ position: "relative", cursor: "pointer" }}>
                <RiShoppingBasketLine className="basket-icon" />
                {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
              </div>
              <div className="juft-iconlar">
                <MdOutlineChevronLeft className="arrow-icon" />
                <MdOutlineChevronRight className="arrow-icon" />
              </div>
            </div>
          </div>

          <div className="categories-wrapper">
            {categories.map((item) => (
              <div key={item.id} className="category-cart">
                <div className="cart-img-box"><img src={item.img} alt={item.name} /></div>
                <p className="cart-text">{item.name}</p>
              </div>
            ))}
          </div>

          <br />
          <h3>Production</h3>
          <div className="products-grid">
            {products.map((item) => {
              const isLiked = liked.includes(item.id);
              return (
                <div key={item.id} className="product-cart">
                  <div className="heart-icon" onClick={() => toggleLike(item.id)}>
                    {isLiked ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart />}
                  </div>
                  <div className="product-img-box"><img src={item.img} alt={item.name} /></div>
                  <h4 className="product-title">{item.name}</h4>
                  <div className="product-bottom">
                    <span className="product-price">${item.price}</span>
                    <button className="add-to-cart-btn" onClick={() => { onAddToCart(item); alert("Savatga utdi!") }}>+</button>
                  </div>
                </div>
              );
            })}
          </div>

          <br />
          <h3>Discount Shop</h3>
          <div className="special-offers-grid">
            {specialOffers.map((offer) => (
              <Link to={`/discount/${offer.id}`} state={{ offer }} key={offer.id} style={{ textDecoration: 'none' }}>
                <div className="discount-card" style={{ backgroundColor: offer.bgColor }}>
                  <div className="discount-info">
                    <span className="discount-percent">{offer.discount} discount</span>
                    <h4>{offer.name}</h4>
                    <p>Hamyonbop narx va yuqori sifatli mahsulotlar.</p>
                    <button className="shop-now-white">Shop Now</button>
                  </div>
                  <div className="discount-img"><img src={offer.img} alt={offer.name} /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SAVAT DRAWERI */}
        <div className={`side-cart ${isCartOpen ? "open" : ""}`} style={{ transform: isCartOpen ? "translateX(0)" : "translateX(100%)" }}>
          <div className="cart-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>Savat</h3>
            <button onClick={() => setIsCartOpen(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>&times;</button>
          </div>
          <div className="cart-body-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item-row">
                <img src={item.img} width="50" height="50" alt="" />
                <div>
                  <p style={{ margin: 0, fontWeight: "600" }}>{item.name}</p>
                  <p style={{ margin: 0, color: "#27ae60" }}>${item.price}</p>
                </div>
                <button
                  style={{ marginLeft: "auto", border: "none", color: "red", cursor: "pointer", background: "none" }}
                  onClick={() => setCartItems(cartItems.filter((_, i) => i !== index))}
                >
                  uchirish
                </button>
              </div>
            ))}
          </div>
          {cartItems.length > 0 && <button className="save-btn-main" onClick={() => setIsOrderModalOpen(true)}>Saqlash</button>}
        </div>

        {/* ORDER MODALI */}
        {isOrderModalOpen && (
          <div className="order-overlay">
            <div className="order-modal-box">
              <h3>Ma'lumotlar</h3>
              <form onSubmit={handleFinalOrder}>
                <input type="text" placeholder="Ism" required />
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={13} required />
                <textarea placeholder="Manzil" required rows="3"></textarea>
                <div className="order-btns">
                  <button type="button" onClick={() => setIsOrderModalOpen(false)}>Yopish</button>
                  <button type="submit" className="confirm-btn">Tasdiqlash</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;