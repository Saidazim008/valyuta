import React from "react";
import "./saidbar.css";
import logo from "../../assets/image.png";
import { IoGridOutline } from "react-icons/io5";
import { BsPieChartFill } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import { BiCartAdd } from "react-icons/bi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const Saidbar = ({ cartCount }) => {
  const location = useLocation();

  // Sahifa aktivligini aniqlash (Path bo'yicha)
  const isActive = (path) => location.pathname === path ? "active-link" : "";

  return (
    <div className="saidbar">
      <div className="sidebar-top">
        <img className="saidbar-img" src={logo} alt="saidbar-logo" />
        <hr className="sidebar-hr" />
      </div>

      <div className="dashbortlar">
        {/* Home / Dashbord */}
        <Link to="/home" className={`sidebar-link ${isActive("/home") || isActive("/")}`}>
          <h3>
            <IoGridOutline /> <span>Dashbord</span>
          </h3>
        </Link>

        {/* Categories */}
        <Link to="/categories" className={`sidebar-link ${isActive("/categories")}`}>
          <h3>
            <BsPieChartFill /> <span>Categories</span>
          </h3>
        </Link>

        {/* Favourite */}
        <Link to="/favourite" className={`sidebar-link ${isActive("/favourite")}`}>
          <h3>
            <IoMdHeart /> <span>Favourite</span>
          </h3>
        </Link>

        {/* Orders (Savat badge bilan) */}
        <Link to="/orders" className={`sidebar-link ${isActive("/orders")}`}>
          <h3 style={{ position: "relative" }}>
            <BiCartAdd /> <span>Orders</span>
            {cartCount > 0 && (
              <span className="sidebar-badge">{cartCount}</span>
            )}
          </h3>
        </Link>

        {/* Messages */}
        <Link to="/messages" className={`sidebar-link ${isActive("/messages")}`}>
          <h3>
            <IoChatbubbleEllipsesOutline /> <span>Messages</span>
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default Saidbar;