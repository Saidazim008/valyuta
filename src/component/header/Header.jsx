import React from 'react'
import { FaRegBell } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import "./header.css"
import { FiSearch } from "react-icons/fi";
import Img from "../../assets/saidazim.jpg"
const Header = () => {
  return (
    <div>
      <header>
        <div className='search-qisim'>
          <FiSearch className='icon-header' />
          <input className='input-header' type="text" placeholder='Search' />
        </div>
        <div className='iconkalar'>
          <FaRegCalendarAlt />
          <CiMail />
          <FaRegBell />
          <img className='img' src={Img} alt="Uzimdi rasmim" />
        </div>
      </header>
    </div>
  )
}

export default Header
