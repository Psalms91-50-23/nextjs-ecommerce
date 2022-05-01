import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping,AiFillHome } from 'react-icons/ai';

const Navbar = () => {

  const [hover, setHover] = useState(false)
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href={"/"}>
          <span className="home-button"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <span style={{ color: hover ? "rgb(255,255,255)" : null}}>
              JB Hi-Kho
            </span>
            <span className="home-icon">
              <AiFillHome size={21} color={hover ? "rgb(255,255,255)" : null}/>
            </span>
          </span>
        </Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => {}}
      >
        <AiOutlineShopping/>
        <span className="cart-item-qty">1</span>
      </button>
    </div>
  )
}

export default Navbar