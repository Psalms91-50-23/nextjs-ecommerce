import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping, AiFillHome } from 'react-icons/ai';
import { Cart } from "./";
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [hover, setHover] = useState(false)
  return (
    <div className="navbar-container">
      <div className="logo">
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
        {!showCart && (
          <button
            type="button"
            className="cart-icon"
            onClick={() => setShowCart(true)}
          >
            <AiOutlineShopping/>
            <span className="cart-item-qty">{totalQuantities}</span>
          </button>
        )
        }
        {showCart &&  (
        <Cart />
        )}
      </div>
    </div>
  )
}

export default Navbar